import React from "react";
import rockImage from "./source/rock.png";
import scissorsImage from "./source/scissors.png";
import paperImage from "./source/paper.png";

const Hand = ({
  choice,
  showChoice,
  hideHands,
  isPlayer,
  result,
  isAniWinner,
  choicesImages,
}) => {
  const imagePath = choicesImages[choice];
 
  const shouldAnimate =
    (result === "Победа" && isPlayer && isAniWinner) ||
    (result === "Проигрыш" && !isPlayer && isAniWinner);

  return (
    <div className={`result-field `}>
      <h4>{isPlayer ? "Выбор игрока:" : "Выбор компьютера:"}</h4>
      {choice !== null ? (
        <div className={`hand ${shouldAnimate ? "winner" : ""} ${isPlayer? "player-hand":"computer-hand"}`}>
          <img
            key={Math.random()}
            src={require(`${imagePath}`).default}
            alt={`${isPlayer ? "Player" : "Computer"} Choice`}
            className={`${isPlayer ? "player-image" : "computer-image"} ${
              showChoice ? "appear" : ""
            } ${hideHands ? "hide" : ""} ${shouldAnimate ? "winner" : ""}`}
          />
        </div>
      ) : (
        "-"
      )}
    </div>
  );
};

export default Hand;
