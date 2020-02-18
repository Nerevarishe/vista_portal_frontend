const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return {
        ...state,
        username: action.data,
        isLoggedIn: true
      };
    case 'LOGOUT_USER':
      return {
        ...state,
        username: "",
        isLoggedIn: false
      };
    default:
      return state;
  }
};

export default AuthReducer;
