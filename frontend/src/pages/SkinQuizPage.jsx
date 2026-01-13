import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import './SkinQuizPage.css';

const SkinQuizPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    skinType: '',
    concerns: [],
    sensitivity: '',
    climate: '',
    routine: ''
  });

  const questions = [
    {
      id: 'skinType',
      question: 'How would you describe your skin type?',
      options: [
        { value: 'oily', label: 'Oily / Acne-Prone', description: 'Shiny, large pores, prone to breakouts' },
        { value: 'normal', label: 'Normal / Combination', description: 'Balanced, T-zone might be oily' },
        { value: 'dry', label: 'Dry / Sensitive', description: 'Tight, flaky, easily irritated' }
      ]
    },
    {
      id: 'concerns',
      question: 'What are your main skin concerns?',
      multiple: true,
      options: [
        { value: 'acne', label: 'Acne & Breakouts' },
        { value: 'pigmentation', label: 'Dark Spots & Pigmentation' },
        { value: 'dullness', label: 'Dullness & Uneven Tone' },
        { value: 'dryness', label: 'Dryness & Dehydration' },
        { value: 'sensitivity', label: 'Redness & Sensitivity' },
        { value: 'aging', label: 'Fine Lines & Aging' }
      ]
    },
    {
      id: 'sensitivity',
      question: 'How sensitive is your skin?',
      options: [
        { value: 'not', label: 'Not Sensitive', description: 'Rarely reacts to products' },
        { value: 'somewhat', label: 'Somewhat Sensitive', description: 'Occasional reactions' },
        { value: 'very', label: 'Very Sensitive', description: 'Frequently reacts or gets irritated' }
      ]
    },
    {
      id: 'climate',
      question: 'What climate do you live in?',
      options: [
        { value: 'humid', label: 'Hot & Humid', description: 'High temperature and humidity' },
        { value: 'moderate', label: 'Moderate', description: 'Balanced temperature' },
        { value: 'dry', label: 'Hot & Dry', description: 'High temperature, low humidity' }
      ]
    },
    {
      id: 'routine',
      question: 'What is your current skincare routine?',
      options: [
        { value: 'minimal', label: 'Minimal', description: 'Just cleanser or moisturizer' },
        { value: 'basic', label: 'Basic', description: 'Cleanser, moisturizer, sunscreen' },
        { value: 'complete', label: 'Complete', description: 'Multiple steps with actives' }
      ]
    }
  ];

  const currentQuestion = questions[currentStep];

  const handleAnswer = (value) => {
    if (currentQuestion.multiple) {
      const currentConcerns = answers.concerns || [];
      const updated = currentConcerns.includes(value)
        ? currentConcerns.filter(c => c !== value)
        : [...currentConcerns, value];
      setAnswers({ ...answers, [currentQuestion.id]: updated });
    } else {
      setAnswers({ ...answers, [currentQuestion.id]: value });
    }
  };

  const canProceed = () => {
    if (currentQuestion.multiple) {
      return answers[currentQuestion.id]?.length > 0;
    }
    return answers[currentQuestion.id] !== '';
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save answers and navigate to results
      localStorage.setItem('quizAnswers', JSON.stringify(answers));
      navigate('/quiz/results');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="skin-quiz-page">
      <div className="container section-padding-small">
        <div className="quiz-header">
          <Sparkles size={32} color="var(--text-primary)" />
          <h1 className="hero-medium" style={{ marginTop: '16px' }}>Find Your Perfect Routine</h1>
          <p className="body-regular" style={{ color: 'var(--text-secondary)', marginTop: '12px' }}>
            Answer a few questions to get personalized product recommendations
          </p>
        </div>

        <div className="quiz-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
          <p className="body-small" style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
            Question {currentStep + 1} of {questions.length}
          </p>
        </div>

        <div className="quiz-content">
          <h2 className="heading-2" style={{ marginBottom: '32px' }}>
            {currentQuestion.question}
          </h2>

          <div className="quiz-options">
            {currentQuestion.options.map((option) => {
              const isSelected = currentQuestion.multiple
                ? answers[currentQuestion.id]?.includes(option.value)
                : answers[currentQuestion.id] === option.value;

              return (
                <button
                  key={option.value}
                  className={`quiz-option ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleAnswer(option.value)}
                >
                  <div className="option-content">
                    <div className="option-label heading-3">{option.label}</div>
                    {option.description && (
                      <div className="option-description body-small">{option.description}</div>
                    )}
                  </div>
                  {isSelected && <div className="option-check">✓</div>}
                </button>
              );
            })}
          </div>

          <div className="quiz-navigation">
            {currentStep > 0 && (
              <button className="btn-secondary" onClick={handleBack}>
                Back
              </button>
            )}
            <button 
              className="btn-primary"
              onClick={handleNext}
              disabled={!canProceed()}
              style={{ marginLeft: 'auto' }}
            >
              {currentStep < questions.length - 1 ? 'Next' : 'Get Results'}
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkinQuizPage;
