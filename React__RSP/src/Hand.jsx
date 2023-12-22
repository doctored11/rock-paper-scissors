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
    <div className={`result-field ${shouldAnimate ? "winner" : " "}`}>
      <h4>{isPlayer ? "Выбор игрока:" : "Выбор компьютера:"}</h4>
      {choice !== null ? (
        <img
          key={Math.random()}
          src={require(`${imagePath}`).default}
          alt={`${isPlayer ? "Player" : "Computer"} Choice`}
          className={`player-image ${showChoice ? "appear" : ""} ${
            hideHands ? "hide" : ""
          } ${shouldAnimate ? "winner" : ""}`}
        />
      ) : (
        "-"
      )}
    </div>
  );
};

export default Hand;
