import React, { useState } from 'react';
import Survey from './Survey';
import Result from './Result';
import './App.css';

const questions = [
    "블로그를 하나요?",
    "푸바오가 갈때 울었나요?",
    "마라탕을 얼마나 좋아나요?",
    "떡볶이를 좋아하나요?",
    "야구선수 인스타를 팔로우하나요?",
    "카톡 이모티콘을 많이 사용하나요?",
    "감성적인가요?",
    "운동을 안하나요?",
    "연애 프로그램(Ex 환승연애, 솔로지옥, 나는 솔로)을 좋아하나요?",
    "사진 보정을 하나요?",
    "서클렌즈(컨텍트 렌즈 제외)를 사용하나요?",
    "검색(유튜브, 인스타)해서 옷을 입나요?",
    "남자 아이돌을 좋아하나요?",
    "로제 맛을 좋아하나요",
    "탕후루를 좋아하나요",
    "라면 끓일 때 생수를 쓰나요?",
    "바퀴벌래를 얼마나 혐오하나요",
    "여자무리와 있을 때 더 편한가요?",
    "과일 소주를 좋아하나요?",
    "여름에 따뜻한 물로 샤워를 하나요",
    "재채기의 크기가 어느정도 되나요(크면 1, 작으면 5)",
    "애완동물(강아지 혹은 고양이)를 키우나요?",
    "자신의 퍼스널 컬러를 알고 있나요?",
    "치즈볼을 좋아하나요?",
];

function App() {
  const [scores, setScores] = useState(new Array(questions.length).fill(3));
  const [showResult, setShowResult] = useState(false);

  const handleScoreChange = (index, value) => {
    const newScores = [...scores];
    newScores[index] = value;
    setScores(newScores);
  };

  const calculateResult = () => {
    const totalScore = scores.reduce((sum, score) => sum + score, 0);
    const maxScore = questions.length * 5;
    return (totalScore / maxScore) * 100;
  };

  return (
    <div className="App">
      <h1>PuFinder</h1>
      <h4 style={{ display: showResult ? 'none' : 'block' }}>
        좋아하면 5, 싫어하면 1에 가깝도록 체크해주세요
      </h4>
      {!showResult ? (
        <Survey
          questions={questions}
          scores={scores}
          onScoreChange={handleScoreChange}
          onComplete={() => setShowResult(true)}
        />
      ) : (
        <Result percentage={calculateResult()} onRetry={() => {
          setScores(new Array(questions.length).fill(3));
          setShowResult(false);
        }} />
      )}
    </div>
  );
}

export default App;
