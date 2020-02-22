import React from "react";
import classes from "./Button.module.css"

const Button = props => (
  <button id={props.id} onClick={props.clicked} disabled={props.btnDisabled} className={classes["basicButton"]}>
    {props.text}
  </button>
);

export default Button;
