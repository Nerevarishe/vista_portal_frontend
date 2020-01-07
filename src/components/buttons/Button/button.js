import React from "react";

const button = props => (
  <button onClick={props.clicked} disabled={props.btnDisabled}>
    {props.text}
  </button>
);

export default button;
