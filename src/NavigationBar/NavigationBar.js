import React from "react";
import { Link } from "react-router-dom";
import { classes } from "./NavigationBar.module.css";

const NavigationBar = () => {
  return (
    <div>
      <nav>
        <ul>
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
        <ul>
          <li>
            <Link to="/login">Войти</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavigationBar;
