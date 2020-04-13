import React from "react";
import classes from "./Backdrop.module.css";

const Backdrop = (prop) => {
  const backdrop = prop.showBackdrop ? (
    <div className={classes["backdrop"]}>{prop.children}</div>
  ) : null;
  return <React.Fragment>{backdrop}</React.Fragment>;
};

export default Backdrop;
