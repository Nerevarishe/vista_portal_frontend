import React, {useContext} from 'react';
import Navigation from "../Navigation";
import TryLoginAfterIndexPageFirstLoad from "../../Auth/TryLoginAfterIndexPageFirstLoad";
import {Route, Router, Switch, Link} from "react-router-dom";
import NewsPage from "../../containers/NewsPage";
import LoginPage from "../../containers/LoginPage";
import Login from "../../Auth/Login";
import Logout from "../../Auth/Logout";
import AddNewsPage from "../../containers/NewsPage/AddNewsPage";
import DefecturaPage from "../../containers/DefecturaPage";
import NotFoundPage from "../../containers/NotFoundPage";
import {history} from "../../App";
import {Context} from "../../stores/store";
import Modal from "../Modal";

import AppBar from "@material-ui/core/AppBar";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const RenderComponents = () => {
  const [state, dispatch] = useContext(Context);
  let modal = state.modal.showModal ? <Modal /> : null;

  return (
    <React.Fragment>
      { modal }
      <Router history={history}>
        {/*<Navigation />*/}
        <TryLoginAfterIndexPageFirstLoad />
        <Navigation />
      </Router>
    </React.Fragment>
  );
};

export default RenderComponents;
