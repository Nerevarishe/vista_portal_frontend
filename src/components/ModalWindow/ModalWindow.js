import React, { useContext } from "react";
import { Context } from "../../stores/store";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";


const ModalWindow = (props) => {
  const [state, dispatch] = useContext(Context);

  let buttons = null;
  if (state.modal.buttons === "YN") {
    buttons = (
      <React.Fragment>
        <Button onClick={state.modal.handlers.btnYesHandler} className="m-1">Yes</Button>
        <Button onClick={state.modal.handlers.btnNoHandler} className="m-1">No</Button>
      </React.Fragment>
    );
  }
  if (state.modal.buttons === "OK") {
    buttons = <Button>OK</Button>;
  }

  return (
    <React.Fragment>
      <Modal show={props.show} onHide={props.hide}>
        <Modal.Header>
          {/* TODO: Add Tittle to modal in store and reducer */}
          <Modal.Title>Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>{state.modal.content}</Modal.Body>
        <Modal.Footer>{buttons}</Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default ModalWindow;
