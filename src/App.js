import React, { useState, useEffect } from "react";
import Card from "./components/card";
import Questions from "./utils/questions";

function App() {
  const [activeQuestion, setActiveQuestion] = useState(() => {
    const storedQuestion = localStorage.getItem("activeQuestion");
    return storedQuestion ? parseInt(storedQuestion) : 0;
  });

  const [answers, setAnswers] = useState(() => {
    const storedAnswers = localStorage.getItem("surveyAnswers");
    return storedAnswers ? JSON.parse(storedAnswers) : {};
  });

  const [surveyComplete, setSurveyComplete] = useState(false);

  useEffect(() => {
    localStorage.setItem("activeQuestion", activeQuestion.toString());
  }, [activeQuestion]);

  useEffect(() => {
    localStorage.setItem("surveyAnswers", JSON.stringify(answers));
  }, [answers]);

  const handleNextQuestion = () => {
    if (activeQuestion < Questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setSurveyComplete(true);
    }
  };

  const handleAnswerSelect = (questionId, selectedAnswer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedAnswer,
    }));
  };

  const handleSurveyRestart = () => {
    setActiveQuestion(0);
    setAnswers({});
    setSurveyComplete(false);
    localStorage.removeItem("surveyAnswers");
    localStorage.removeItem("activeQuestion");
  };

  return (
    <>
      <section className="main">
        {surveyComplete ? (
          <div>
            <h2 className="survey-text">Thank you for completing the survey!</h2>
            <button onClick={handleSurveyRestart} className="restart-btn">Restart Survey</button>
          </div>
        ) : (
          <Card
            question={Questions[activeQuestion]}
            onAnswerSelect={handleAnswerSelect}
            onNext={handleNextQuestion}
          />
        )}
      </section>
    </>
  );
}

export default App;
