import React, { useState, useContext } from "react";
import { history } from "../../App";

import Button from "../../components/Button";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = () => {
    const data = {
      username: username,
      password: password,
    };
    history.push("/login/auth", data);
  };

  return (
    <React.Fragment>
      <p>Login Page</p>
      <input
        type="text"
        onChange={(event) => setUsername(event.target.value)}
      />
      <input
        type="password"
        onChange={(event) => setPassword(event.target.value)}
      />
      <Button text="Send" clicked={loginHandler} />
    </React.Fragment>
  );
};

export default LoginPage;
