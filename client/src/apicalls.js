import axios from "axios"

export const logincall = async (userCredential,dispatch)=>{
    dispatch({type:"Login_Start"});
    try{
const res = await axios.post("/auth/login",userCredential);

dispatch({type:"Login_Sucess" , payload:res.data});
    }catch(error){
dispatch({type:"Login_Fail" , payload:error})
    }
}
