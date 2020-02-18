import React, {createContext, useReducer} from "react";
import AuthReducer from '../reducers/AuthReducer'


const initialState = {
  username: "",
  isLoggedIn: false
};

const AuthStore = ({children}) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>
      {children}
    </Context.Provider>
  )
};

export const Context = createContext(initialState);
export default AuthStore;
