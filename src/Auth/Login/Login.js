import React, { useContext } from "react";
import { Context } from "../../stores/store";
import { history } from "../../App";
import { loginUser } from "../../Auth/utils";
import { Redirect } from "react-router";

const Login = (props) => {
  const [state, dispatch] = useContext(Context);
  const loginHandler = async () => {
    const data = await loginUser(
      props.location.state.username,
      props.location.state.password
    );
    if (data) {
      await dispatch({ type: "LOGIN_USER", data: data });
    }
  };
  loginHandler();
  // .then(() => {
  //   // TODO: Check if user logged in, and only after that make redirect
  //   dispatch({ type: "LOGIN_USER", data: props.location.state.username });
  //   // TODO: Implement redirect to previous page.
  //   // history.push("/");
  //   return <Redirect to={"/"} />;
  // })
  // .catch();

  return <Redirect to={"/"} />;
};

export default Login;
