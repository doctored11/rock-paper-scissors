import React, { useState, useEffect, useRef } from "react";
import "./index.css";
//
import rockImage from "./source/rock.png";
import scissorsImage from "./source/scissors.png";
import paperImage from "./source/paper.png";

// import { Gameinfo } from "./GameInfo.jsx";

// пример компонента
export function GameField() {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [showPlayerChoice, setShowPlayerChoice] = useState(false);

  const imageKeyRef = useRef(generateKey());

  const choicesImages = {
    1: rockImage,
    2: scissorsImage,
    3: paperImage,
  };

  function handleOnClick(id) {
    const computerRandomChoice = Math.floor(Math.random() * 3) + 1;

    setPlayerChoice(id);
    setComputerChoice(computerRandomChoice);

    const roundResult = calculateResult(id, computerRandomChoice);
    setResult(roundResult);

    setShowPlayerChoice(true);

    console.log(id);
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPlayerChoice(false);
      imageKeyRef.current = generateKey();
    }, 300);
    return () => clearTimeout(timer);
  }, [playerChoice]);
 
  function calculateResult(playerValue, computerValue) {
    console.log(playerValue, computerValue);
    if (playerValue == computerValue) {
      return "Ничья";
    } else if ((playerValue % 3) + 1 === computerValue) {
      return "Победа";
    } else {
      return "Проигрыш";
    }
  }
  function generateKey() {
    return `${Date.now()}-${Math.random()}`;
  }

  return (
    <div className="main-field">
      <div className="game-zone">
        <div className="result-fields">
          <div className="result-field player-field">
            <h4>Выбор игрока:</h4>
            {playerChoice !== null ? (
              <img
                key={imageKeyRef.current}
                src={choicesImages[playerChoice]}
                alt="Player Choice"
                className={`player-image ${showPlayerChoice ? "appear" : ""}`}
              />
            ) : (
              "-"
            )}{" "}
          </div>

          <div className="result-field  computer-choice">
            <h4>Выбор компьютера:</h4>
            {computerChoice !== null ? (
              <img src={choicesImages[computerChoice]} alt="Computer Choice" />
            ) : (
              "-"
            )}
          </div>
        </div>
      </div>
      <ul className="select-zone">
        <button className="btn btn--rock" onClick={() => handleOnClick(1)}>
          <img src={rockImage} alt="Rock" />
        </button>

        <button className="btn btn--scissors" onClick={() => handleOnClick(2)}>
          <img src={scissorsImage} alt="Scissors" />
        </button>

        <button className="btn btn--paper" onClick={() => handleOnClick(3)}>
          <img src={paperImage} alt="Paper" />
        </button>
      </ul>
      {result && (
        <div className="result">
          <h3>Результат раунда:</h3>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}
