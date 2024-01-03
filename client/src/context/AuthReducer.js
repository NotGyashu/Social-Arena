const AuthReducer = (state,action)=>{
    switch (action.type) {
      case "Login_Start":
        return {
          user: null,
          isFetching: true,
          error: false,
        };
      case "Login_Sucess":
        return {
          user: action.payload,
          isFetching: false,
          error: false,
        };
      case "Login_Fail":
        return {
          user: null,
          isFetching: false,
          error: false,
        };
      case "Logout":
        return {
          user: null,
          isFetching: false,
          error: null,
        };
      default:
        return state;
    }
}

export default AuthReducer;