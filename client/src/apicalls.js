import axios from "axios";

export const logincall = async (userCredential, dispatch) => {
  dispatch({ type: "Login_Start" });
  try {
    const temp = process.env.REACT_APP_BASE_URL;
    console.log({ temp });
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}api/auth/login`,
      
      userCredential
    );

    dispatch({ type: "Login_Sucess", payload: res.data });
  } catch (error) {
    dispatch({ type: "Login_Fail", payload: error });
  }
};


