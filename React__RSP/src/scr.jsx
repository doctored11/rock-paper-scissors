import React, { useState, useEffect, useRef } from "react";
import Hand from "./Hand.jsx";
import Button from "./Button.jsx";
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
  const [animateWinner, setAnimateWinner] = useState(false);

  const [hideHands, setHideHands] = useState(false);

  const resetGame = () => {
    setHideHands(true);
    setTimeout(() => {
      setPlayerChoice(null);
      setComputerChoice(null);
      setResult(null);
      setShowPlayerChoice(false);
      setDisableButtons(false);
      setAnimateWinner(false);
      setHideHands(false);
    }, 1000);
  };
  // const [key, setKey] = useState(generateKey());

  const choicesImages = {
    1: "./source/rock.png",
    2: "./source/scissors.png",
    3: "./source/paper.png",
  };

  const handleOnClick = (id) => {
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

    if (roundResult === "Победа" || roundResult === "Проигрыш") {
      setTimeout(() => {
        setAnimateWinner(true);
        setShowPlayerChoice(false);
      }, 2500);
    } else {
      setTimeout(() => {
        setShowPlayerChoice(false);
      }, 2000);
    }
  };

  useEffect(() => {
    const showImage = async () => {
      setShowPlayerChoice(true);
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
        <Hand
          choice={playerChoice}
          showChoice={showPlayerChoice}
          hideHands={hideHands}
          isPlayer={true}
          result={result}
          isAniWinner={animateWinner}
          choicesImages={choicesImages}
        />
        <Hand
          choice={computerChoice}
          showChoice={showPlayerChoice}
          hideHands={hideHands}
          isPlayer={false}
          result={result}
          isAniWinner={animateWinner}
          choicesImages={choicesImages}
        />
      </div>
      <ul className="select-zone">
        <Button
          label="Rock"
          onClick={() => handleOnClick(1)}
          disabled={disableButtons}
          choiceImage={choicesImages[1]}
        />
        <Button
          label="Scissors"
          onClick={() => handleOnClick(2)}
          disabled={disableButtons}
          choiceImage={choicesImages[2]}
        />
        <Button
          label="Paper"
          onClick={() => handleOnClick(3)}
          disabled={disableButtons}
          choiceImage={choicesImages[3]}
        />
      </ul>
      {result && (
        <div className={`result ${animateWinner ? "animate" : ""}`}>
          <h3>Результат раунда:</h3>
          <p>{result}</p>
          <button onClick={resetGame}>Новая игра</button>
        </div>
      )}
    </div>
  );
}
