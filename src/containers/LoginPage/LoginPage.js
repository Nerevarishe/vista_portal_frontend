import React, { useState, useContext } from "react";
import { Context } from "../../stores/store";

import { history } from "../../App";

import { loginUser } from "../../Auth/utils";
import Button from "../../components/Button";

const LoginPage = () => {
  const [state, dispatch] = useContext(Context);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginHandler = async () => {
    await loginUser(username, password);
    // TODO: Check if user logged in, and only after that make redirect
    dispatch({type: "LOGIN_USER", data: username});
    history.goBack();
  };

  return (
    <React.Fragment>
      <p>Login Page</p>
      <input type="text" onChange={event => setUsername(event.target.value)}/>
      <input type="password" onChange={event => setPassword(event.target.value)}/>
      <Button text="Send" clicked={loginHandler}/>
    </React.Fragment>
  )
};

export default LoginPage
