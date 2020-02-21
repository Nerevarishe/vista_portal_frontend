import React, { useContext } from "react";
import { Context } from "../../stores/store";
import { history } from "../../App";

const PrivateRoute = (props) => {
  const [state, dispatch] = useContext(Context);
  if (state.auth["isLoggedIn"] === false) {
    history.push("/login");
  }
  return props.children
};

export default PrivateRoute
