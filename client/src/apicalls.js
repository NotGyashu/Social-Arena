import axios from "axios";

export const logincall = async (userCredential, dispatch) => {
  const axiosInstance = axios.create({
    baseURL: String(process.env.REACT_APP_BASE_URL),
  });
console.log(axiosInstance.defaults.baseURL);
  dispatch({ type: "Login_Start" });
  try {
    const res = await axiosInstance.post("/api/auth/login", userCredential);

    dispatch({ type: "Login_Sucess", payload: res.data });
  } catch (error) {
    dispatch({ type: "Login_Fail", payload: error });
  }
};
