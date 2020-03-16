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
    case 'RESET_POST':
      return {
        ...state,
        newsPosts: {
          editPostId: null,
          editorMode: 'create'
        }
      };
    // Modal cases
    case "DELETE_NEWS_POST_MODAL":
      // Data items:
      // 0 - id of post,
      // 1 - function that handling deletion,
      // 2 - function that reset modal state and close it
      return {
        ...state,
        modal: {
          showModal: true,
          data: action.data[0],
          content: "Delete news post?",
          buttons: "YN",
          handlers: {
            btnYesHandler: action.data[1],
            btnNoHandler: action.data[2]
          }
        }
      };
    case "RESET_MODAL":
      return {
        ...state,
        modal: {
          showModal: false,
          data: null,
          content: null,
          buttons: null,
          handlers: null
        }
      };

    default:
      return state;
  }
};

export default Reducer;
