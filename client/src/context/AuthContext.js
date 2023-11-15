import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";
import { Password } from "@mui/icons-material";
const INITIAL_STATE = {
  user: {
    _id: "65463c2b2ebd9cdbbe455437",
    username: "Nauman ur rahman",
    email: "Arman@gmail.com",

    profilePicture:"",
    coverPicture:"",
    isAdmin: false,
    followers: [],
    followings: [],
  },
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children})=>{
    const [state,dispatch] = useReducer(AuthReducer,INITIAL_STATE);

    return(
        <AuthContext.Provider
        value={{
            user:state.user,
            isFetching:state.isFetching,
            error:state.error,
            dispatch,
        }}>
            {children}
        </AuthContext.Provider>
    )
}