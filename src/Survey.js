import React from 'react';

function Survey({ questions, scores, onScoreChange, onComplete }) {
  return (
    <div>
      {questions.map((question, index) => (
        <div key={index} className="question">
          <p>{index + 1}. {question}</p>
          <div className="score-buttons">
            {[1, 2, 3, 4, 5].map((score) => (
              <button
                key={score}
                className={scores[index] === score ? 'active' : ''}
                onClick={() => onScoreChange(index, score)}
              >
                {score}
              </button>
            ))}
          </div>
        </div>
      ))}
      <button className="complete-button" onClick={onComplete}>결과 확인</button>
    </div>
  );
}

export default Survey;
