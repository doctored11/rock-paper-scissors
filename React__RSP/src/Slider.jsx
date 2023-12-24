import React from "react";

const Slider = ({ value, onChange, disabled, max }) => {
  return (
    <div className="slider-container">
      <label htmlFor="betAmount">Выберите ставку:  </label>
      <input
        type="range"
        id="betAmount"
        name="betAmount"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        min="1"
        max={max}
        disabled={disabled}
      />
      <span>{value}</span>
    </div>
  );
};

export default Slider;
