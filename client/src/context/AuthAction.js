export const LoginStart = (usercredentials)=>(
    {
        type:"Login_Start",
      
    }
);
export const LoginSuccess = (user)=>(
    {
        type:"Login_Sucess",
          payload:user,
    }
);
export const LoginFailure= (error)=>(
    {
        type:"Login_Fail",
        payload:error
    }
);