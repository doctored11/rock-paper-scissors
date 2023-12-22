import React from "react";

const Button = ({ label, onClick, disabled, choiceImage }) => (
  <button className={`btn btn--${label.toLowerCase()}`} onClick={onClick} disabled={disabled}>
    {choiceImage && (
      <img
        src={require(`${choiceImage}`).default}
        alt={`${label} Choice`}
        className="button-image"
      />
    )}
   
  </button>
);

export default Button;
