import React from "react";
import Button from "../Button";

const NextButton = props => (
  <Button
    text="Next page"
    clicked={props.btnClicked}
    btnDisabled={props.isDisabled}
  />
);

export default NextButton;
