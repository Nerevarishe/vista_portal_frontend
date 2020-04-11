import React, { useContext } from 'react';
import Navigation from "../Navigation";
import TryLoginAfterIndexPageFirstLoad from "../../Auth/TryLoginAfterIndexPageFirstLoad";
import { Router } from "react-router-dom";

import { history } from "../../App";
import { Context } from "../../stores/store";
import Modal from "../Modal";

const RenderComponents = () => {
  const [state, dispatch] = useContext(Context);
  let modal = state.modal.showModal ? <Modal /> : null;

  return (
    <React.Fragment>
      { modal }
      <Router history={history}>
        <TryLoginAfterIndexPageFirstLoad />
        <Navigation />
      </Router>
    </React.Fragment>
  );
};

export default RenderComponents;
