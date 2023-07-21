import React from "react";

function Card({ question, onAnswerSelect, onNext }) {
  const { id, text, options } = question;

  const handleOptionSelect = (option) => {
    onAnswerSelect(id, option);
  };

  return (
    <section className="card">
      <h3 className="qnumber">{id}</h3>
      <h2 className="question-text">{text}</h2>

      <ul className="answers">
        {options.map((option, index) => (
          <li key={index}>
            <input
              type="radio"
              id={`option-${id}-${index}`}
              name={`question-${id}`}
              value={option}
              onChange={() => handleOptionSelect(option)}
            />
            <label htmlFor={`option-${id}-${index}`} className="answer">
              {option}
            </label>
          </li>
        ))}
      </ul>

      <button className="next-btn" onClick={onNext}>
        {id === 10 ? "Finish Survey" : "Next"}
      </button>
    </section>
  );
}

export default Card;
