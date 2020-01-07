import React from "react";
import Button from "../Button";

const PrevButton = props => (
  <Button
    text="Previous page"
    clicked={props.btnClicked}
    btnDisabled={props.isDisabled}
  />
);

export default PrevButton;
