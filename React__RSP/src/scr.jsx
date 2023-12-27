import React, { useState, useEffect, useRef } from "react";
import Hand from "./Hand.jsx";
import Button from "./Button.jsx";
import Slider from "./Slider.jsx";
import LevelBar from "./LevelBar.jsx";

import "./index.css";
import "./media.css";
//

// import { Gameinfo } from "./GameInfo.jsx";
const gameDelay = 800;

// пример компонента
export function GameField() {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [showPlayerChoice, setShowPlayerChoice] = useState(false);

  const [disableButtons, setDisableButtons] = useState(false);
  const [restartButtonDisabled, setRestartButtonDisabled] = useState(false);

  const [animateWinner, setAnimateWinner] = useState(false);

  const [hideHands, setHideHands] = useState(false);

  const [mainBalance, setMainBalance] = useState(1000);
  const [gameBalance, setGameBalance] = useState(0);
  const [betAmount, setBetAmount] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);

  const [multipliers] = useState({
    1: 1.3,
    2: 1.5,
    3: 1.3,
    4: 3,
    5: 1.5,
    6: 1.5,
    7: 1.8,
    8: 5,
    9: 1.3,
    10: 10,
  });
  const [round, setRound] = useState(1);

  const levels = Object.keys(multipliers).map(Number);

  const resetGame = () => {
    setAnimateWinner(false);
    setHideHands(true);
    setRestartButtonDisabled(true);

    setTimeout(() => {
      setPlayerChoice(null);
      setComputerChoice(null);
      setResult(null);
      setShowPlayerChoice(false);
      setDisableButtons(false);
      setAnimateWinner(false);
      setHideHands(false);
      setRestartButtonDisabled(false);

      setCurrentLevel(1);
      setGameBalance(0);
      setBetAmount(0);
      setRound(1);
    }, gameDelay);
  };
  // const [key, setKey] = useState(generateKey());

  const choicesImages = {
    1: "./source/rock.png",
    2: "./source/scissors.png",
    3: "./source/paper.png",
  };

  // Обработчик изменения значения ползунка
  const handleSliderChange = (value) => {
    setBetAmount(value);
  };

  const handleStartClick = () => {
    setHideHands(false);
    setDisableButtons(false);
    setRestartButtonDisabled(true);

    setMainBalance((prevBalance) => prevBalance - betAmount);
    setGameBalance(betAmount);

    setCurrentLevel(1); //на всякий
  };

  const handleOnClick = (id) => {
    if (disableButtons || betAmount > gameBalance) {
      return;
    }

    setHideHands(false);
    setAnimateWinner(false);
    setDisableButtons(true);
    setRestartButtonDisabled(true);

    const computerRandomChoice = Math.floor(Math.random() * 3) + 1;

    setPlayerChoice(id);
    setComputerChoice(computerRandomChoice);

    const roundResult = calculateResult(id, computerRandomChoice);
    setResult(roundResult);

    setShowPlayerChoice(true);

    if (roundResult === "Победа") {
      setTimeout(() => {
        setGameBalance(
          (prevBalance) =>
            (prevBalance = prevBalance * (multipliers[currentLevel] * round))
        );
        setShowPlayerChoice(false);
        setRestartButtonDisabled(false);
        //переход на след ступень

        if (currentLevel == 10) setRound(parseInt(round) + 1);

        setCurrentLevel((prevLevel) => (prevLevel < 10 ? prevLevel + 1 : 1));

        setDisableButtons(false);
        setAnimateWinner(true);
        console.log(Object.keys(multipliers).length);
      }, gameDelay);
    } else if (roundResult === "Проигрыш") {
      setTimeout(() => {
        setShowPlayerChoice(false);
        setRestartButtonDisabled(false);
        setAnimateWinner(true);
      }, gameDelay * 0.8);
    } else {
      // Ничья
      setTimeout(() => {
        setShowPlayerChoice(false);
        setRestartButtonDisabled(false);
        if (currentLevel == 10) setRound(parseInt(round) + 1);
        setCurrentLevel((prevLevel) => (prevLevel < 10 ? prevLevel + 1 : 1));

        setDisableButtons(false);
      }, gameDelay * 0.8);
    }
  };
  //

  const handleTakeWin = () => {
    setMainBalance((prevBalance) => prevBalance + gameBalance);
    resetGame();
  };

  useEffect(() => {
    const showImage = async () => {
      setShowPlayerChoice(true);
    };

    showImage();
  }, [playerChoice]);

  useEffect(() => {
    const storedMainBalance = localStorage.getItem("mainBalance");
    if (storedMainBalance) {
      setMainBalance(parseFloat(storedMainBalance));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("mainBalance", mainBalance.toFixed(3));
  }, [mainBalance]);
  useEffect(() => {
    if (mainBalance < 5 && betAmount < 1) {
      setTimerSeconds(45);
    }
  }, [mainBalance, betAmount]);

  const [timerSeconds, setTimerSeconds] = useState(null);
  const getRandomCoins = () =>
    (Math.floor(Math.random() * (50 - 0.5)) + 0.5) * 100;

  useEffect(() => {
    let timer;
    const bonusCoins = getRandomCoins();

    if (timerSeconds !== null && timerSeconds > 0) {
      timer = setTimeout(() => {
        setTimerSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setMainBalance((prevBalance) => prevBalance + bonusCoins);
      setTimerSeconds(null);
    }

    return () => clearTimeout(timer);
  }, [timerSeconds, mainBalance]);

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

  const showBalance = timerSeconds === null || timerSeconds <= 0;

  return (
    <div className="main-field">
      <header className="game-stage">
        <div className="frame">
          <div className="game-info">
            {timerSeconds !== null && timerSeconds > 0 && (
              <div className="timer">
                <p> Немного деняг через: {timerSeconds} </p>
              </div>
            )}

            {showBalance && (
              <div className="balance">
                <p>Баланс: {parseFloat(mainBalance.toFixed(3))}</p>
              </div>
            )}
          </div>
          <div className="game-stage__status">
            <LevelBar
              currentLevel={currentLevel}
              levels={levels}
              multipliers={multipliers}
              round={round}
            />
            <div className="game-result-block">
              <p className="txt result--txt">{result}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="game-zone frame">
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

      <ul
        className={`frame select-zone ${gameBalance <= 0 ? "bet-zone" : ""} `}
      >
        {gameBalance <= 0 ? (
          <>
            <Slider
              value={betAmount}
              onChange={handleSliderChange}
              disabled={disableButtons}
              max={mainBalance}
            />
            <button className="btn" onClick={handleStartClick}>
              {" "}
              Начать!
            </button>
          </>
        ) : (
          <div className="bottom-container">
            <div className="active-stats">
              <p>Ставка в игре: {parseFloat(gameBalance.toFixed(2))}</p>
              <p>
                Множитель:{" "}
                {parseFloat(multipliers[currentLevel] * round.toFixed(1))}
              </p>
            </div>
            <div className="select-block">
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
            </div>
            {result !== "Проигрыш" && (
              <button onClick={handleTakeWin} className="btn btn--take">
                Забрать
              </button>
            )}
          </div>
        )}
      </ul>
      {
        <div className={`result ${animateWinner ? "animate" : ""}`}>
          <button
            className="btn"
            onClick={() => {
              result !== "Проигрыш" ? handleTakeWin() : resetGame();
            }}
            disabled={restartButtonDisabled}
          >
            Новая игра
          </button>
        </div>
      }
    </div>
  );
}
