import React, { useState, useEffect } from 'react';
import pubaoImage from './pubao.PNG';
import './Result.css';

function Result({ percentage, onRetry }) {
  const [showRetry, setShowRetry] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [textColor, setTextColor] = useState('red');

  let resultText = '';
  if (percentage <= 20) {
    resultText = '초소바오';
  } else if (percentage <= 40) {
    resultText = '소바오';
  } else if (percentage <= 60) {
    resultText = '중바오';
  } else if (percentage <= 65) {
    resultText = '대바오';
  } else {
    resultText = '특대바오';
  }

  // 이미지 크기 계산
  const imageSize = 600 + (percentage / 100) * 400;

  const handleRetry = () => {
    setShowRetry(true);
    setRotationAngle(0);
  };

  useEffect(() => {
    let interval;
    let colorInterval;

    if (showRetry) {
      interval = setInterval(() => {
        setRotationAngle((prevAngle) => (prevAngle + 15) % 360);
      }, 1000);

      colorInterval = setInterval(() => {
        setTextColor((prevColor) => {
          switch (prevColor) {
            case 'red':
              return 'orange';
            case 'orange':
              return 'yellow';
            case 'yellow':
              return 'green';
            case 'green':
              return 'blue';
            case 'blue':
              return 'indigo';
            case 'indigo':
              return 'violet';
            case 'violet':
              return 'red';
            default:
              return 'red';
          }
        });
      }, 400);

      setTimeout(() => {
        setShowRetry(false);
        onRetry();
        clearInterval(colorInterval);
      }, 26000);
    }

    return () => {
      clearInterval(interval);
      clearInterval(colorInterval);
    };
  }, [showRetry, onRetry]);

  return (
    <div className="result-container">
      {showRetry ? (
        <div
          className="retry-screen"
          style={{
            transform: `rotate(${rotationAngle}deg)`,
            transition: 'transform 1s linear',
            color: textColor,
          }}
        >
          <h1>긁?</h1>
        </div>
      ) : (
        <>
          <img 
            src={pubaoImage} 
            alt="Pubao" 
            style={{
              width: `${imageSize}px`,
              height: `${imageSize}px`,
              objectFit: 'cover',
              transition: 'width 0.5s, height 0.5s'
            }}
          />
          <div className="result">
            <h2>당신의 푸바오 정도</h2>
            <p>{percentage.toFixed(2)}% - {resultText}</p>
            <button onClick={handleRetry}>다시하기</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Result;