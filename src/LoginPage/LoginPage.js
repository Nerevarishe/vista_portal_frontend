import React, { useState, useContext } from "react";
import { Context } from "../stores/AuthStore";

import { Redirect } from "react-router";

import { loginUser } from "./utils";
import Button from "../components/buttons/Button";

const LoginPage = () => {
  const [state, dispatch] = useContext(Context);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // TODO: redirect to previous page
  // Redirect to index page "/"
  const [redirectToIndexPage, setRedirectToIndexPage] = useState(false);


  const loginHandler = async () => {
    await loginUser(username, password);
    // TODO: Check if user logged in, and only after that make redirect
    dispatch({type: "LOGIN_USER", data: username});
    setRedirectToIndexPage(true);
  };

  if (redirectToIndexPage) {
    return <Redirect to="/" />
  }

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
