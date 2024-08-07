import React, { useState } from 'react';
import Question from './Question';
import ProgressBar from './ProgressBar';
import quizData1 from '../data/quiz1.json';
import quizData2 from '../data/quiz2.json';
import '../styles/Quiz.scss';

const Quiz = () => {
  const [step, setStep] = useState('start');
  const [userName, setUserName] = useState('');
  const [quizChoice, setQuizChoice] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizData, setQuizData] = useState([]);

  const handleStart = () => {
    setStep('chooseQuiz');
  };

  const handleQuizChoice = (choice) => {
    setQuizChoice(choice);
    setQuizData(choice === 'quiz1' ? quizData1 : quizData2);
    setStep('quiz');
  };

  const handleNext = (nextQuestionId) => {
    if (nextQuestionId === null) {
      setCurrentQuestion(quizData.length); // End of quiz
    } else {
      const nextQuestionIndex = quizData.findIndex(q => q.id === nextQuestionId);
      setCurrentQuestion(nextQuestionIndex !== -1 ? nextQuestionIndex : quizData.length);
    }
  };

  const handleRestart = () => {
    setStep('start');
    setUserName('');
    setQuizChoice(null);
    setCurrentQuestion(0);
    setQuizData([]);
  };

  if (step === 'start') {
    return (
      <div className="quiz-container">
        <h2>Welcome to the Quiz!</h2>
        <input 
          type="text" 
          placeholder="Enter your name" 
          value={userName} 
          onChange={(e) => setUserName(e.target.value)} 
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleStart();
            }
          }}
        />
        <button onClick={handleStart} disabled={!userName}>Start</button>
      </div>
    );
  }

  if (step === 'chooseQuiz') {
    return (
      <div className="quiz-container">
        <h2>Hello {userName}, choose your quiz:</h2>
        <button onClick={() => handleQuizChoice('quiz1')}>Quiz 1</button>
        <button onClick={() => handleQuizChoice('quiz2')}>Quiz 2</button>
      </div>
    );
  }

  if (currentQuestion >= quizData.length) {
    return (
      <div className="quiz-container">
        <h2>Quiz Completed!</h2>
        <p>Thank you for participating, {userName}.</p>
        <button onClick={handleRestart}>Restart</button>
      </div>
    );
  }
  return (
    <div className="quiz-container">
      <ProgressBar current={currentQuestion + 1} total={quizData.length} />
      <Question data={quizData[currentQuestion]} onNext={handleNext} />
    </div>
  );
};

export default Quiz;
