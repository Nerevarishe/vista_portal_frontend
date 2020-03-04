import React, { useContext } from 'react';
import Backdrop from "../Backdrop";
import classes from "./Modal.module.css";
import { Context } from "../../stores/store";
import Button from "../Button";

const Modal = () => {
  const [state, dispatch] = useContext(Context);

  let buttons = null;
  if (state.modal.buttons === "YN") {
    buttons =
      <div className={classes["YNButtons"]}>
        <Button text={"Yes"} clicked={state.modal.handlers.btnYesHandler}/>
        <Button text={"No"} clicked={state.modal.handlers.btnNoHandler}/>
      </div>
  }
  if (state.modal.buttons === "OK") {
    buttons =
      <div className={classes["OKButton"]}>
        <Button text={"OK"}/>
      </div>
  }

  return (
    <React.Fragment>
      <Backdrop showBackdrop={state.modal["showModal"]}>
        <div className={classes.modal}>
          {state.modal.content}
          {buttons}
        </div>
      </Backdrop>
    </React.Fragment>
  );
};

export default Modal;
