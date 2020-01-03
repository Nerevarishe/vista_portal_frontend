import React from "react";
import Button from "../Button";

const PrevButton = props => (
  <Button text="Previous page" clicked={props.btnClicked} />
);

export default PrevButton;
