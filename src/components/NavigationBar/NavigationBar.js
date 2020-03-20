import React, { useContext } from "react";
import { Context } from "../../stores/store";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar"
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const NavigationBar = (props) => {
  const [state, dispatch] = useContext(Context);
  const username = state.auth["username"];
  let navBarUser = <Link to="/login">Войти</Link>;
  if (username) {
    navBarUser = <React.Fragment>
      <li>{username}</li>
      <li><Link to="/logout">Выйти</Link></li>
    </React.Fragment>
  }

  return (
    <React.Fragment>
      {/*<nav>*/}
      {/*  <ul className={classes["nav-bar__nav-part"]}>*/}
      {/*    <li>*/}
      {/*      <Link to="/news">Новости</Link>*/}
      {/*    </li>*/}
      {/*    <li>*/}
      {/*      <Link to="/defectura">Дефектура</Link>*/}
      {/*    </li>*/}
      {/*    <li>*/}
      {/*      <a href="/wiki">Вики</a>*/}
      {/*    </li>*/}
      {/*  </ul>*/}
      {/*  <ul className={classes["nav-bar__user-part"]}>*/}
      {/*    {navBarUser}*/}
      {/*  </ul>*/}
      {/*</nav>*/}
      <AppBar position="fixed">
        <Tabs value={props.location.pathname} >
          <Tab label="Новости" />
          <Tab label="Деффектура"/>
          <Tab label="Вики"/>
        </Tabs>
      </AppBar>
    </React.Fragment>
  );
};

export default NavigationBar;
