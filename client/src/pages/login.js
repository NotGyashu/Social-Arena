import { useContext, useRef, useState } from "react";
import {AuthContext} from "../context/AuthContext"
import {apicalls, logincall} from "../../src/apicalls"
import CircularProgress from '@mui/material/CircularProgress';
import { Link, Navigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import ForgetPassword from "../components/forgetPassword";

export default function Login() {
    const email = useRef();
    const password = useRef();
    const {user,isFetching,error,dispatch} = useContext(AuthContext)
    const [showPassword, setShowPassword] = useState(false);
const [openForgetPassword, setOpenForgetPassword] = useState(false);

const handleOpenForgetPassword = () => {
  setOpenForgetPassword(true);
};

const handleCloseForgetPassword = () => {
  setOpenForgetPassword(false);
};

    //login
    const handle = (e)=>{
         console.log(user);
        e.preventDefault();
       logincall({email:email.current.value,password:password.current.value},dispatch)
       
    }
    const handleTogglePassword = () => {
      setShowPassword((prevShowPassword) => !prevShowPassword);
    };

   
    return (
      <div class="grid grid-cols-8 h-screen w-screen bg-slate-100 ">
        {/* logo */}

        <div class="col-span-4 bg-slate-100 m-10 flex flex-col justify-center">
          <h1 class=" text-5xl text-green-600 font-serif ml-20 w-full ">
            <span class=" text-7xl">S</span>ocialArena
          </h1>
          <hr class="w-full h-1 bg-white ml-20"></hr>
          <h1 class="ml-20 font-sans text-black">
            Socialise with the people around the world, Using Arena
          </h1>
        </div>

        {/* login form */}

        <div class="col-span-3 bg-white m-10 my-20 p-5 justify-center items-center">
          <form class="flex flex-wrap h-full w-full" onSubmit={handle}>
            <input
              type="email"
              placeholder="Email"
              class="w-full h-10 p-3 mt-16 outline-none border border-gray-400 rounded-md"
              ref={email}
              required
            ></input>
            <div className=" flex items-center justify-between  w-full h-10 p-2  border border-gray-400 rounded-md relative">
              <input
                class="w-[80%] h-full focus:outline-none "
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                ref={password}
                required
                minLength={6}
              />
              <IconButton
                class="w-[15%] text-gray-400 absolute right-0"
                onClick={handleTogglePassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </div>

            <button
              class="w-full h-10 flex justify-center items-center  bg-green-500 text-white p-3  rounded-md"
              disabled={isFetching}
            >
              {isFetching ? (
                <CircularProgress color="inherit" size="25px" />
              ) : (
                "Log In"
              )}
            </button>
            <div
              onClick={handleOpenForgetPassword}
              className="text-blue-700 hover:text-blue-400 cursor-pointer underline"
            >
              Forget password?
            </div>
            <hr></hr>

            <Link
              to="/register"
              class="w-full h-10 flex justify-center items-center  bg-green-500 text-white p-3  rounded-md"
            >
              <div>Create Account</div>
            </Link>
          </form>
        </div>
        <ForgetPassword
          open={openForgetPassword}
          handleClose={handleCloseForgetPassword}
        />
      </div>
    );
}