import React from "react";
import classes from "./Button.module.css"

const Button = props => {
  let style = [classes["basicButton"]];
  if (props.btnDisabled) {
    style = [classes["disabled"]]
  }
  return (
    <button id={props.id} onClick={props.clicked} disabled={props.btnDisabled} className={style}>
      {props.text}
    </button>
  );
};

export default Button;
