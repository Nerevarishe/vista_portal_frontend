import React, { useContext, useEffect } from "react";
import { Context } from "../../stores/store";
import { autoLoginUser } from "../utils";

const TryLoginAfterIndexPageFirstLoad = () => {
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    autoLoginUser()
      .then((user) => {
        dispatch({ type: "LOGIN_USER", data: user });
      })
      .catch();
  }, []);

  return null;
};

export default TryLoginAfterIndexPageFirstLoad;
