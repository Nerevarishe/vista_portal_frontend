const EditPostReducer = (state, action) => {
  switch (action.type) {
    case 'EDIT_POST':
      return {
        ...state,
        editPostId: action.data,
        editorMode: 'edit'
      };
    // case 'DELETE_POST':
    //   return {
    //     ...state,
    //     posts: state.posts.filter(post => post.id !== action.payload)
    //   };
    // case 'SET_ERROR':
    //   return {
    //     ...state,
    //     error: action.payload
    //   };
    default:
      return state;
  }
};

export default EditPostReducer;
