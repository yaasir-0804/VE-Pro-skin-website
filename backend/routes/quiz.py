from fastapi import APIRouter, HTTPException
from models import QuizAnswers, QuizResult
from motor.motor_asyncio import AsyncIOMotorClient
from emergentintegrations.llm.chat import LlmChat, UserMessage
import os
from dotenv import load_dotenv
import json

load_dotenv()

router = APIRouter(prefix="/quiz", tags=["quiz"])

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'test_database')]


@router.post("/analyze")
async def analyze_quiz(answers: QuizAnswers):
    """Analyze quiz answers and provide personalized recommendations using AI"""
    try:
        # Map skin type
        skin_type_map = {
            'oily': 'Oily / Acne-Prone',
            'normal': 'Normal / Combination',
            'dry': 'Dry / Sensitive'
        }
        
        skin_type_result = skin_type_map.get(answers.skinType, 'Normal / Combination')
        
        # Create AI chat instance
        api_key = os.environ.get('EMERGENT_LLM_KEY')
        if not api_key:
            # Fallback to rule-based recommendations
            return await get_rule_based_recommendations(answers, skin_type_result)
        
        chat = LlmChat(
            api_key=api_key,
            session_id=f"quiz_{answers.skinType}",
            system_message="You are a skincare expert specializing in Indian skin types. Provide personalized product recommendations based on the customer's skin type and concerns."
        ).with_model("openai", "gpt-5.1")
        
        # Create prompt
        concerns_text = ", ".join(answers.concerns) if answers.concerns else "general skincare"
        prompt = f"""
        Based on the following skin profile for an Indian customer:
        - Skin Type: {skin_type_result}
        - Main Concerns: {concerns_text}
        - Sensitivity Level: {answers.sensitivity}
        - Climate: {answers.climate}
        - Current Routine: {answers.routine}
        
        Recommend the best 3-step routine from these categories: Cleanser, Serum, Moisturiser
        
        Respond ONLY with a JSON object in this exact format:
        {{
            "recommendations": ["cleanser-id", "serum-id", "moisturiser-id"],
            "reason": "Brief explanation of why this routine works for them"
        }}
        
        Use these product IDs based on skin type:
        - Oily/Acne-Prone: cleanser-oily, serum-niacinamide, moisturiser-oily
        - Normal/Combination: cleanser-normal, serum-vitamin-c, moisturiser-normal
        - Dry/Sensitive: cleanser-dry, serum-ceramides, moisturiser-dry
        """
        
        user_message = UserMessage(text=prompt)
        ai_response = await chat.send_message(user_message)
        
        # Parse AI response
        try:
            response_data = json.loads(ai_response)
            recommendations = response_data.get('recommendations', [])
        except:
            # Fallback if AI response is not valid JSON
            recommendations = await get_default_recommendations(skin_type_result)
        
        # Save quiz result
        quiz_result = QuizResult(
            answers=answers,
            recommendations=recommendations,
            skinTypeResult=skin_type_result
        )
        
        await db.quiz_results.insert_one(quiz_result.dict())
        
        return {
            "skinType": skin_type_result,
            "recommendations": recommendations,
            "quiz_id": quiz_result.quiz_id
        }
    
    except Exception as e:
        print(f"Quiz analysis error: {str(e)}")
        # Fallback to rule-based
        return await get_rule_based_recommendations(answers, skin_type_result)


async def get_rule_based_recommendations(answers: QuizAnswers, skin_type_result: str):
    """Rule-based recommendations as fallback"""
    recommendations_map = {
        'Oily / Acne-Prone': ['cleanser-oily', 'serum-niacinamide', 'moisturiser-oily'],
        'Normal / Combination': ['cleanser-normal', 'serum-vitamin-c', 'moisturiser-normal'],
        'Dry / Sensitive': ['cleanser-dry', 'serum-ceramides', 'moisturiser-dry']
    }
    
    recommendations = recommendations_map.get(skin_type_result, recommendations_map['Normal / Combination'])
    
    # Save quiz result
    quiz_result = QuizResult(
        answers=answers,
        recommendations=recommendations,
        skinTypeResult=skin_type_result
    )
    
    await db.quiz_results.insert_one(quiz_result.dict())
    
    return {
        "skinType": skin_type_result,
        "recommendations": recommendations,
        "quiz_id": quiz_result.quiz_id
    }


async def get_default_recommendations(skin_type_result: str):
    """Get default recommendations based on skin type"""
    recommendations_map = {
        'Oily / Acne-Prone': ['cleanser-oily', 'serum-niacinamide', 'moisturiser-oily'],
        'Normal / Combination': ['cleanser-normal', 'serum-vitamin-c', 'moisturiser-normal'],
        'Dry / Sensitive': ['cleanser-dry', 'serum-ceramides', 'moisturiser-dry']
    }
    
    return recommendations_map.get(skin_type_result, recommendations_map['Normal / Combination'])


@router.get("/{quiz_id}")
async def get_quiz_result(quiz_id: str):
    """Get quiz result by ID"""
    quiz_result = await db.quiz_results.find_one({"quiz_id": quiz_id})
    
    if not quiz_result:
        raise HTTPException(status_code=404, detail="Quiz result not found")
    
    quiz_result.pop('_id', None)
    
    return quiz_result
