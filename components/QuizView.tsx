
import React, { useState, useEffect } from 'react';
import { QuizSet, MCQ } from '../types';

interface QuizViewProps {
  quizSet: QuizSet;
  category: string;
}

const QuizView: React.FC<QuizViewProps> = ({ quizSet, category }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // Reset when category changes
  useEffect(() => {
    setCurrentStep(0);
    setUserAnswers({});
    setIsSubmitted(false);
    setScore(0);
  }, [category]);

  const handleOptionSelect = (qIndex: number, option: string) => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({ ...prev, [qIndex]: option }));
  };

  const handleSubmit = () => {
    let finalScore = 0;
    quizSet.questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctAnswer) {
        finalScore++;
      }
    });
    setScore(finalScore);
    setIsSubmitted(true);
  };

  const currentQuestion = quizSet.questions[currentStep];

  if (isSubmitted) {
    return (
      <div className="animate-fadeIn max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 border border-gray-100">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-2">Quiz Results</h2>
            <p className="text-blue-100 opacity-90">Based on your performance in {category.toUpperCase()} Current Affairs</p>
            <div className="mt-6 inline-flex items-center justify-center w-24 h-24 rounded-full bg-white text-blue-600 text-4xl font-bold border-4 border-blue-200">
              {score}/{quizSet.totalQuestions}
            </div>
          </div>
          
          <div className="p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-4">Question Review & Explanations</h3>
            <div className="space-y-8">
              {quizSet.questions.map((q, idx) => (
                <div key={idx} className="p-6 rounded-xl border border-gray-200 bg-gray-50">
                  <p className="font-bold text-gray-800 mb-4 text-lg">
                    <span className="text-blue-600 mr-2">Q{idx + 1}.</span> {q.question}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    {Object.entries(q.options).map(([key, value]) => {
                      const isCorrect = key === q.correctAnswer;
                      const isUserChoice = key === userAnswers[idx];
                      
                      let variantClasses = "border-gray-200 text-gray-600 bg-white";
                      if (isCorrect) variantClasses = "border-green-500 bg-green-50 text-green-700 ring-1 ring-green-500";
                      else if (isUserChoice && !isCorrect) variantClasses = "border-red-500 bg-red-50 text-red-700 ring-1 ring-red-500";

                      return (
                        <div key={key} className={`p-3 rounded-lg border flex items-center gap-3 ${variantClasses}`}>
                          <span className="font-bold">{key}:</span>
                          <span>{value}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="text-sm font-bold text-blue-700 uppercase tracking-wider mb-1">Expert Explanation</p>
                    <p className="text-gray-700 leading-relaxed">{q.explanation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <button 
          onClick={() => {
            setIsSubmitted(false);
            setUserAnswers({});
            setCurrentStep(0);
          }}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2"
        >
          <i className="fas fa-redo"></i> Retake Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn max-w-2xl mx-auto">
      <div className="mb-6 flex items-center justify-between px-2">
        <span className="text-sm font-bold text-gray-500 uppercase">Question {currentStep + 1} of {quizSet.totalQuestions}</span>
        <div className="h-2 w-32 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-600 transition-all duration-300" 
            style={{ width: `${((currentStep + 1) / quizSet.totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-8 leading-snug">
          {currentQuestion.question}
        </h2>

        <div className="space-y-4">
          {Object.entries(currentQuestion.options).map(([key, value]) => {
            const isSelected = userAnswers[currentStep] === key;
            return (
              <button
                key={key}
                onClick={() => handleOptionSelect(currentStep, key)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 group ${
                  isSelected 
                    ? 'border-blue-600 bg-blue-50' 
                    : 'border-gray-100 hover:border-blue-200 hover:bg-gray-50'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg border-2 ${
                  isSelected ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-50 text-gray-500 border-gray-200 group-hover:border-blue-300'
                }`}>
                  {key}
                </div>
                <span className={`font-medium ${isSelected ? 'text-blue-900' : 'text-gray-700'}`}>{value}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
          disabled={currentStep === 0}
          className="flex-1 bg-white border border-gray-200 text-gray-600 font-bold py-3 px-6 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Previous
        </button>
        {currentStep === quizSet.totalQuestions - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={Object.keys(userAnswers).length < quizSet.totalQuestions}
            className="flex-1 bg-green-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-green-700 disabled:opacity-50 shadow-lg transition-all flex items-center justify-center gap-2"
          >
            Submit Quiz <i className="fas fa-check-circle"></i>
          </button>
        ) : (
          <button
            onClick={() => setCurrentStep(prev => prev + 1)}
            className="flex-1 bg-blue-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-700 shadow-lg transition-all"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizView;
