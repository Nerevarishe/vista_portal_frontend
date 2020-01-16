import React from "react";
import { Link } from "react-router-dom";
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
      </nav>
    </div>
  );
};

export default NavigationBar;
