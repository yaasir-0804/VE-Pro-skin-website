"""
Seed script to populate MongoDB with product data
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()

# Product data
products_data = [
    # CLEANSERS
    {
        "id": "cleanser-oily",
        "name": "Pore-Purify Gel Cleanser",
        "category": "Cleanser",
        "skinType": "Oily / Acne-Prone",
        "price": 299,
        "originalPrice": 399,
        "discount": 25,
        "ingredients": ["Salicylic Acid", "Niacinamide", "Zinc PCA"],
        "benefits": ["Clears pores", "Controls oil", "Prevents acne"],
        "description": "This deep-cleansing gel removes oil, dirt and acne-causing bacteria while keeping your skin balanced and calm.",
        "fullDescription": """This deep-cleansing gel removes oil, dirt and acne-causing bacteria while keeping your skin balanced and calm. It penetrates pores to dissolve sebum and prevent new breakouts without stripping the skin.

Why you'll love it:
• Clears blackheads & whiteheads
• Controls excess oil
• Helps prevent acne
• Soothes redness & irritation
• Non-drying, pH-balanced""",
        "image": "https://customer-assets.emergentagent.com/job_luxskin-builder/artifacts/xic5eoc9_WhatsApp%20Image%202026-01-13%20at%207.03.58%20PM.jpeg",
        "rating": 4.8,
        "reviews": 1420,
        "stock": 27,
        "badge": "Best Seller",
        "viewsToday": 47,
        "boughtToday": 389,
        "comingSoon": False
    },
    {
        "id": "cleanser-normal",
        "name": "Hydra-Balance Gel Cleanser",
        "category": "Cleanser",
        "skinType": "Normal / Combination",
        "price": 279,
        "originalPrice": 379,
        "discount": 26,
        "ingredients": ["Niacinamide", "Hyaluronic Acid", "Panthenol"],
        "benefits": ["Hydrates while cleansing", "Improves texture", "Maintains balance"],
        "description": "A gentle daily cleanser that removes impurities while maintaining skin's natural moisture.",
        "fullDescription": """A gentle daily cleanser that removes impurities while maintaining skin's natural moisture. It cleans without tightness, leaving skin soft, fresh and hydrated.

Why you'll love it:
• Hydrates while cleansing
• Improves skin texture
• Maintains oil-water balance
• Strengthens skin barrier""",
        "image": "https://customer-assets.emergentagent.com/job_luxskin-builder/artifacts/xic5eoc9_WhatsApp%20Image%202026-01-13%20at%207.03.58%20PM.jpeg",
        "rating": 4.7,
        "reviews": 982,
        "stock": 45,
        "badge": "New",
        "viewsToday": 34,
        "boughtToday": 267,
        "comingSoon": False
    },
    {
        "id": "cleanser-dry",
        "name": "Barrier Cream Cleanser",
        "category": "Cleanser",
        "skinType": "Dry / Sensitive",
        "price": 319,
        "originalPrice": 429,
        "discount": 26,
        "ingredients": ["Ceramides", "Oat Extract", "Squalane"],
        "benefits": ["Repairs barrier", "Reduces redness", "Deeply nourishes"],
        "description": "A rich, creamy cleanser that cleanses while repairing your skin barrier.",
        "fullDescription": """A rich, creamy cleanser that cleanses while repairing your skin barrier. It prevents dryness and irritation while keeping skin soft and nourished.

Why you'll love it:
• Does not strip natural oils
• Repairs damaged skin barrier
• Reduces redness & tightness
• Ideal for sensitive skin""",
        "image": "https://customer-assets.emergentagent.com/job_luxskin-builder/artifacts/m7i92rdr_WhatsApp%20Image%202026-01-13%20at%207.03.58%20PM%20%281%29.jpeg",
        "rating": 4.9,
        "reviews": 756,
        "stock": 18,
        "badge": "Best Seller",
        "viewsToday": 52,
        "boughtToday": 301,
        "comingSoon": False
    },
    
    # MOISTURISERS
    {
        "id": "moisturiser-oily",
        "name": "Oil-Control Gel Moisturiser",
        "category": "Moisturiser",
        "skinType": "Oily / Acne-Prone",
        "price": 349,
        "originalPrice": 499,
        "discount": 30,
        "ingredients": ["Niacinamide", "Zinc PCA", "Hyaluronic Acid"],
        "benefits": ["Controls oil & shine", "Prevents breakouts", "Minimizes pores"],
        "description": "A lightweight, oil-free gel that hydrates without clogging pores.",
        "fullDescription": """A lightweight, oil-free gel that hydrates without clogging pores. It reduces shine and helps control acne while keeping your skin fresh all day.

Why you'll love it:
• Controls oil & shine
• Prevents breakouts
• Minimizes pores
• Gives matte, fresh look""",
        "image": "https://customer-assets.emergentagent.com/job_luxskin-builder/artifacts/wy4723bi_WhatsApp%20Image%202026-01-13%20at%205.32.42%20PM%20%282%29.jpeg",
        "rating": 4.8,
        "reviews": 2103,
        "stock": 32,
        "badge": "Best Seller",
        "viewsToday": 89,
        "boughtToday": 512,
        "comingSoon": False
    },
    {
        "id": "moisturiser-normal",
        "name": "Daily Glow Moisturiser",
        "category": "Moisturiser",
        "skinType": "Normal / Combination",
        "price": 369,
        "originalPrice": 499,
        "discount": 26,
        "ingredients": ["Ceramides", "Niacinamide", "Shea Butter"],
        "benefits": ["Brightens dull skin", "Smoothens texture", "Natural glow"],
        "description": "This silky lotion delivers deep hydration while improving skin texture and glow.",
        "fullDescription": """This silky lotion delivers deep hydration while improving skin texture and glow. It keeps your skin balanced, smooth and healthy-looking.

Why you'll love it:
• Brightens dull skin
• Smoothens texture
• Strengthens skin barrier
• Gives natural glow""",
        "image": "https://customer-assets.emergentagent.com/job_luxskin-builder/artifacts/v2dfwbh1_WhatsApp%20Image%202026-01-13%20at%205.32.42%20PM%20%283%29.jpeg",
        "rating": 4.7,
        "reviews": 1567,
        "stock": 41,
        "badge": "New",
        "viewsToday": 63,
        "boughtToday": 428,
        "comingSoon": False
    },
    {
        "id": "moisturiser-dry",
        "name": "Deep Barrier Cream",
        "category": "Moisturiser",
        "skinType": "Dry / Sensitive",
        "price": 399,
        "originalPrice": 549,
        "discount": 27,
        "ingredients": ["Ceramides", "Squalane", "Hyaluronic Acid"],
        "benefits": ["Repairs barrier", "Prevents dryness", "Long-lasting hydration"],
        "description": "An intense repair cream that deeply nourishes and restores damaged skin.",
        "fullDescription": """An intense repair cream that deeply nourishes and restores damaged skin. It locks in moisture and protects against dryness and irritation.

Why you'll love it:
• Repairs damaged barrier
• Prevents dryness & flaking
• Calms sensitive skin
• Long-lasting hydration""",
        "image": "https://customer-assets.emergentagent.com/job_luxskin-builder/artifacts/kivn2jol_WhatsApp%20Image%202026-01-13%20at%205.32.43%20PM.jpeg",
        "rating": 4.9,
        "reviews": 1891,
        "stock": 23,
        "badge": "Best Seller",
        "viewsToday": 71,
        "boughtToday": 445,
        "comingSoon": False
    },

    # SERUMS
    {
        "id": "serum-niacinamide",
        "name": "Clear Skin Serum",
        "category": "Serum",
        "skinType": "Oily / Acne-Prone",
        "subtitle": "10% Niacinamide + Zinc",
        "price": 449,
        "originalPrice": 699,
        "discount": 36,
        "ingredients": ["10% Niacinamide", "Zinc", "Hyaluronic Acid"],
        "benefits": ["Controls acne & oil", "Shrinks pores", "Fades marks"],
        "description": "A powerful acne-control serum that reduces pimples, oil and marks.",
        "fullDescription": """A powerful acne-control serum that reduces pimples, oil and marks while keeping your skin calm and clear.

Why you'll love it:
• Controls acne & oil
• Shrinks pores
• Reduces redness
• Fades acne marks""",
        "image": "https://customer-assets.emergentagent.com/job_luxskin-builder/artifacts/ep34dxxr_WhatsApp%20Image%202026-01-13%20at%205.32.43%20PM%20%281%29.jpeg",
        "rating": 4.9,
        "reviews": 2876,
        "stock": 15,
        "badge": "Best Seller",
        "viewsToday": 112,
        "boughtToday": 678,
        "comingSoon": False
    },
    {
        "id": "serum-vitamin-c",
        "name": "Glow + Repair Serum",
        "category": "Serum",
        "skinType": "Normal / Combination",
        "subtitle": "Vitamin C + Ferulic Acid",
        "price": 499,
        "originalPrice": 749,
        "discount": 33,
        "ingredients": ["Vitamin C", "Ferulic Acid", "Vitamin E"],
        "benefits": ["Brightens skin", "Reduces dark spots", "Protects from damage"],
        "description": "A brightening antioxidant serum that boosts glow and fades pigmentation.",
        "fullDescription": """A brightening antioxidant serum that boosts glow, fades pigmentation and protects skin from pollution and damage.

Why you'll love it:
• Brightens skin
• Reduces dark spots
• Improves skin tone
• Protects from free radicals""",
        "image": "https://customer-assets.emergentagent.com/job_luxskin-builder/artifacts/9r7f9mr7_WhatsApp%20Image%202026-01-13%20at%205.32.43%20PM%20%282%29.jpeg",
        "rating": 4.8,
        "reviews": 2234,
        "stock": 29,
        "badge": "New",
        "viewsToday": 94,
        "boughtToday": 567,
        "comingSoon": False
    },
    {
        "id": "serum-ceramides",
        "name": "Barrier Repair Serum",
        "category": "Serum",
        "skinType": "Dry / Sensitive",
        "subtitle": "Ceramides + Peptides",
        "price": 529,
        "originalPrice": 799,
        "discount": 34,
        "ingredients": ["Ceramides", "Peptides", "Centella Asiatica"],
        "benefits": ["Repairs damaged skin", "Reduces sensitivity", "Strengthens barrier"],
        "description": "This advanced repair serum strengthens weak skin barriers and reduces sensitivity.",
        "fullDescription": """This advanced repair serum strengthens weak skin barriers, reduces sensitivity and improves overall skin health.

Why you'll love it:
• Repairs damaged skin
• Reduces sensitivity
• Improves hydration
• Makes skin stronger & healthier""",
        "image": "https://customer-assets.emergentagent.com/job_luxskin-builder/artifacts/5zuayy26_WhatsApp%20Image%202026-01-13%20at%205.32.43%20PM%20%283%29.jpeg",
        "rating": 4.9,
        "reviews": 1998,
        "stock": 21,
        "badge": "Best Seller",
        "viewsToday": 78,
        "boughtToday": 489,
        "comingSoon": False
    }
]


async def seed_database():
    """Seed the database with product data"""
    mongo_url = os.environ['MONGO_URL']
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ.get('DB_NAME', 'test_database')]
    
    try:
        # Clear existing products
        await db.products.delete_many({})
        print("✓ Cleared existing products")
        
        # Insert new products
        result = await db.products.insert_many(products_data)
        print(f"✓ Inserted {len(result.inserted_ids)} products")
        
        # Verify insertion
        count = await db.products.count_documents({})
        print(f"✓ Total products in database: {count}")
        
        print("\n✅ Database seeded successfully!")
        
    except Exception as e:
        print(f"❌ Error seeding database: {str(e)}")
    finally:
        client.close()


if __name__ == "__main__":
    asyncio.run(seed_database())
