import React from "react";
import Button from "../Button";

const Delete = props => (
  <Button id={props.id} text="Delete" clicked={props.btnClicked} />
);

export default Delete;
