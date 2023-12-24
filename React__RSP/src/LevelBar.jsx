import React, { useState } from "react";
import "./index.css";
import "./levelBar.css";

const LevelBar = ({ currentLevel, levels, multipliers, round }) => {
  const [hoveredLevel, setHoveredLevel] = useState(null);

  return (
    <div className="level-bar">
      {levels.map((level, index) => (
        <div
          key={index}
          className={`level ${currentLevel === level ? "current" : ""} ${
            hoveredLevel === level ? "hovered" : ""
          }`}
          onMouseEnter={() => setHoveredLevel(level)}
          onMouseLeave={() => setHoveredLevel(null)}
        >
          {hoveredLevel === level && (
            <div className="tooltip">
              <p>Уровень: {hoveredLevel + 10 * (round - 1)}</p>
              <p>
                Множитель:{" "}
                {parseFloat(multipliers[hoveredLevel] * round.toFixed(1))}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LevelBar;
