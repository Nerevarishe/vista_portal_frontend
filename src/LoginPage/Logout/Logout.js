import React, { useContext } from "react";
import { Context } from "../../stores/AuthStore";
import { logoutUser } from "../utils"
import { history } from "../../App";

const Logout = () => {
  const [state, dispatch] = useContext(Context);
  logoutUser()
    .then(() => {
      dispatch({type: "LOGOUT_USER"});
      // history.push("/");
    })
    .catch(console.log);
  return null
};

export default Logout
