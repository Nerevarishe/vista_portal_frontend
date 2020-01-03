import React from "react";
import Button from "../Button";

const AddNewsPostButton = props => (
  <Button text="Add News Post" clicked={props.btnClicked} />
);

export default AddNewsPostButton;
