import React, { createContext, useReducer } from "react";
import Reducer from "../reducers/reducer";

const initialState = {
  auth: {
    username: null,
    isLoggedIn: false,
  },
  newsPosts: {
    editPostId: null,
    editorMode: "create",
  },
  modal: {
    showModal: false,
    data: null,
    content: null,
    buttons: null,
    handlers: null,
  },
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext(initialState);
export default Store;
