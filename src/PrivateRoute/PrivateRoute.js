import React, { useContext } from "react";
import { Context } from "../stores/AuthStore";
import { history } from "../App";

const PrivateRoute = (props) => {
  const [state, dispatch] = useContext(Context);
  if (state.isLoggedIn === false) {
    history.push("/login");
  }
  return props.children
};

export default PrivateRoute
