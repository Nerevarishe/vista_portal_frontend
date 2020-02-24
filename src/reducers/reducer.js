const Reducer = (state, action) => {
  switch (action.type) {
    // User authentication cases
    case 'LOGIN_USER':
      return {
        ...state,
        auth: {
          username: action.data,
          isLoggedIn: true
        }
      };
    case 'LOGOUT_USER':
      return {
        ...state,
        auth: {
          username: null,
          isLoggedIn: false
        }
      };

    // News Posts cases
    case 'EDIT_POST':
      return {
        ...state,
        newsPosts: {
          editPostId: action.data,
          editorMode: 'edit'
        }
      };
    case 'DELETE_POST':
      return {
        ...state,
        newsPosts: {
          editPostId: action.data,
          editorMode: 'create'
        }
      };

    default:
      return state;
  }
};

export default Reducer;
