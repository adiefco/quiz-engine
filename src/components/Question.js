import React, { useState } from 'react';
import '../styles/Question.scss';

const Question = ({ data, onNext }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  if (!data) {
    return <div>Question data is not available.</div>;
  }

  const handleOptionChange = (optionId) => {
    if (data.type === 'one-choice') {
      setSelectedOptions([optionId]);
    } else {
      setSelectedOptions(prev => 
        prev.includes(optionId) 
        ? prev.filter(id => id !== optionId) 
        : [...prev, optionId]
      );
    }
  };

  const handleNextClick = () => {
    
    if (data.type === 'one-choice' || data.type === 'multiple-choice') {
      const correctOptions = data.options.filter(option => option.correct).map(option => option.id);
      const isCorrectAnswer = selectedOptions.length === correctOptions.length && selectedOptions.every(id => correctOptions.includes(id));
      setIsCorrect(isCorrectAnswer);
      !isCorrectAnswer ? setShowFeedback(true) : setShowFeedback(false)

      const nextQuestion = data.conditionalNavigation.find(nav => {
        if (data.type === 'one-choice') {
          return nav.optionId === selectedOptions[0];
        } else {
          return nav.optionIds && nav.optionIds.every(id => selectedOptions.includes(id));
        }
      }) || data.conditionalNavigation.find(nav => nav.default);

      if (nextQuestion) {
        setTimeout(() => {
          setShowFeedback(false);
          onNext(nextQuestion.nextQuestionId);
        }, 2000); 
      }
    } else if (data.type === 'input') {
      const isCorrectAnswer = selectedOptions[0] === data.conditionalNavigation[0].correctAnswer;
      setIsCorrect(isCorrectAnswer);
      !isCorrectAnswer ? setShowFeedback(true) : setShowFeedback(false)

      const nextQuestion = data.conditionalNavigation.find(nav => nav.correctAnswer === selectedOptions[0]) || data.conditionalNavigation.find(nav => nav.default);

      if (nextQuestion) {
        setTimeout(() => {
          setShowFeedback(false);
          onNext(nextQuestion.nextQuestionId);
        }, 2000); 
      }
    }
  };

  return (
    <div className="question-container">
      <h2>{data.title}</h2>
      <p>{data.description}</p>
      {data.image && <img src={data.image} alt={data.title} />}
      <div className="options">
        {data.options && data.options.map(option => (
          <label key={option.id}>
            <input 
              type={data.type === 'one-choice' ? 'radio' : 'checkbox'} 
              name="option" 
              checked={selectedOptions.includes(option.id)}
              onChange={() => handleOptionChange(option.id)}
            />
            {option.text}
          </label>
        ))}
      </div>
      {data.type === 'input' && (
        <input
          type="text"
          value={selectedOptions[0] || ''}
          onChange={e => setSelectedOptions([e.target.value])}
        />
      )}
      <button onClick={handleNextClick}>Next</button>
      {showFeedback && (
        <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
          {data.feedback}
        </div>
      )}
    </div>
  );
};

export default Question;
