import React from "react";
import Button from "../Button";

const Edit = props => (
  <Button id={props.id} text="Edit" clicked={props.btnClicked} />
);

export default Edit;
