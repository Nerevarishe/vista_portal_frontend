import React, { useContext } from "react";
import { Context } from "../stores/AuthStore";
import { Link } from "react-router-dom";
import classes from "./NavigationBar.module.css";

const NavigationBar = () => {
  const [state, dispatch] = useContext(Context);
  const username = state.username || null;
  let navBarUser = <Link to="/login">Войти</Link>;
  if (username) {
    navBarUser = <React.Fragment>
      <li>{username}</li>
      <li><Link to="/logout">Выйти</Link></li>
    </React.Fragment>
  }

  return (
    <div>
      <nav>
        <ul className={classes["nav-bar__nav-part"]}>
          <li>
            <Link to="/news">Новости</Link>
          </li>
          <li>
            <Link to="/defectura">Дефектура</Link>
          </li>
          <li>
            <a href="/wiki">Вики</a>
          </li>
        </ul>
        <ul className={classes["nav-bar__user-part"]}>
          {navBarUser}
        </ul>
      </nav>
    </div>
  );
};

export default NavigationBar;
