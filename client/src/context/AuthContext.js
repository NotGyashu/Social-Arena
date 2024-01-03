import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";
import { Password } from "@mui/icons-material";
let user = null;

try {
  const storedUserJSON = localStorage.getItem("user");

  if (storedUserJSON !== undefined && storedUserJSON !== null) {
    user = JSON.parse(storedUserJSON);
  }
} catch (error) {
  console.error("Error parsing user from localStorage:", error);
}

const INITIAL_STATE = {
  user: user,
  
};




export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    // Check if state.user is defined before storing in localStorage
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);


  return (
    <AuthContext.Provider
      value={{
        user: state.user, // Updated to use "user" property name
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
