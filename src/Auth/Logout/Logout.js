import React, { useContext } from "react";
import { Context } from "../../stores/store";
import { logoutUser } from "../utils"
import { Redirect } from "react-router";

const Logout = () => {
  const [state, dispatch] = useContext(Context);
  logoutUser()
    .then(() => {
      dispatch({type: "LOGOUT_USER"});
    })
    .catch(console.log);
  return <Redirect to={"/"} />
};

export default Logout
