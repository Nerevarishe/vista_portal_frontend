import React, { useContext } from "react";
import { Context } from "../../stores/store";

const ModeratorPanel = (props) => {
  const [state, dispatch] = useContext(Context);
  const data =
    state.auth.isLoggedIn &&
    (state.auth.role === "admin" || state.auth.role === "moderator")
      ? props.children
      : null;

  return <React.Fragment>{data}</React.Fragment>;
};

export default ModeratorPanel;
