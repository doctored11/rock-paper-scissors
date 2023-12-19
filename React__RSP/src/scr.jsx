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
  
  const [disableButtons, setDisableButtons] = useState(false);

  const [hideHands, setHideHands] = useState(false);
  // const [key, setKey] = useState(generateKey());

  const choicesImages = {
    1: rockImage,
    2: scissorsImage,
    3: paperImage,
  };

  function handleOnClick(id) {
    if (disableButtons) {
      return;
    }
    setHideHands(false);
    setDisableButtons(true);

    const computerRandomChoice = Math.floor(Math.random() * 3) + 1;

    setPlayerChoice(id);
    setComputerChoice(computerRandomChoice);

    const roundResult = calculateResult(id, computerRandomChoice);
    setResult(roundResult);

    setShowPlayerChoice(true);

    if (roundResult === "Победа") {
      console.log("ПОбеда_1");
      setTimeout(() => {
        console.log("Анимация победы");
        // setShowWinner(true);
        setShowPlayerChoice(false);

        setTimeout(() => {
          setHideHands(true); ///тут нужна Анимация вылета за экран рук
          console.log("Анимация конца");

          setDisableButtons(false);
        }, 500);
      }, 500);
    } else {
      console.log("НЕ_ПОбеда");
      setTimeout(() => {
        setShowPlayerChoice(false);

        setDisableButtons(false);
        setResult(null);
        console.log("Сброс2");
        setHideHands(true);
      }, 500);
    }
  }

  useEffect(() => {
    const showImage = async () => {
      setShowPlayerChoice(true);
      await new Promise((resolve) => setTimeout(resolve, 0));
      setShowPlayerChoice(false);
      // imageKeyRef.current = generateKey();
    };

    showImage();
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
  // function generateKey() {
  //   return `${Date.now()}-${Math.random()}`;
  // }

  return (
    <div className="main-field">
      <div className="game-zone">
        <div className="result-fields">
          <div
            className={`result-field  ${
              result == "Победа" ? "winner" : "player-field"
            }  `}
          >
            <h4>Выбор игрока:</h4>
            {playerChoice !== null ? (
              <img
                // key={imageKeyRef.current}

                key={Math.random()} //знаю что лучше так не делеть - но мне нужно именно такое поведение
                src={choicesImages[playerChoice]}
                alt="Player Choice"
                className={`player-image ${showPlayerChoice ? "appear" : ""}${
                  hideHands ? "hide" : ""
                }`}
              />
            ) : (
              "-"
            )}{" "}
          </div>

          <div
            className={`result-field  ${
              result == "Проигрыш" ? "winner" : "computer-choice"
            }  `} //TODO видимо тут ошибка с увеличением после победы игрока
          >
            <h4>Выбор компьютера:</h4>
            {computerChoice !== null ? (
              <img
                key={Math.random()}
                src={choicesImages[computerChoice]}
                alt="Computer Choice"
                className={`${hideHands ? "hide" : ""}`}
              />
            ) : (
              "-"
            )}
          </div>
        </div>
      </div>
      <ul className="select-zone">
        <button
          className="btn btn--rock"
          onClick={() => handleOnClick(1)}
          disabled={disableButtons}
        >
          <img src={rockImage} alt="Rock" />
        </button>

        <button
          className="btn btn--scissors"
          onClick={() => handleOnClick(2)}
          disabled={disableButtons}
        >
          <img src={scissorsImage} alt="Scissors" />
        </button>

        <button
          className="btn btn--paper"
          onClick={() => handleOnClick(3)}
          disabled={disableButtons}
        >
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
