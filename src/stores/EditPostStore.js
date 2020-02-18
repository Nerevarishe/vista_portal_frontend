import React, {createContext, useReducer} from "react";
import EditPostReducer from '../reducers/EditPostReducer'


const initialState = {
  editPostId: '',
  editorMode: 'create'
};

const EditPostStore = ({children}) => {
  const [state, dispatch] = useReducer(EditPostReducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>
      {children}
    </Context.Provider>
  )
};

export const Context = createContext(initialState);
export default EditPostStore;
