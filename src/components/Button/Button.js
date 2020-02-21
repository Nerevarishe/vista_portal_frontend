import React from "react";

const Button = props => (
  <button id={props.id} onClick={props.clicked} disabled={props.btnDisabled}>
    {props.text}
  </button>
);

export default Button;
