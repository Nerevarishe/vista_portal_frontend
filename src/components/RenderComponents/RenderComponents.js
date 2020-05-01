import React, { useContext } from "react";
import Navigation from "../Navigation";
import TryLoginAfterIndexPageFirstLoad from "../../Auth/TryLoginAfterIndexPageFirstLoad";
import { Router } from "react-router-dom";

import { history } from "../../App";
import { Context } from "../../stores/store";
import ModalWindow from "../ModalWindow";

const RenderComponents = () => {
  const [state, dispatch] = useContext(Context);

  const handleModalClose = () => {
    dispatch({ type: "RESET_POST" });
  }

  let modal = state.modal.showModal
    ? <ModalWindow
      show={state.modal.showModal}
      hide={handleModalClose} />
    : null;

  return (
    <React.Fragment>
      {modal}
      <Router history={history}>
        <TryLoginAfterIndexPageFirstLoad />
        <Navigation />
      </Router>
    </React.Fragment>
  );
};

export default RenderComponents;
