import { useRef } from "react";
import Login from "./login";
import { logincall } from "../apicalls";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordagain = useRef();
  const PhoneNo = useRef();
  const history = useNavigate();
  const navigate = useNavigate();
  const handle = async (e) => {
    e.preventDefault();
    if (password.current.value !== passwordagain.current.value) {
      passwordagain.current.setCustomValidity("passwords don't match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
        PhoneNo: PhoneNo.current.value,
      };
      try {
        await axios.post("/api/auth/register", user);
        history("login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div class="grid grid-cols-8 overflow-hidden h-screen w-screen bg-slate-100  ">
      {/* logo */}

      <div class="col-span-8  lg:col-span-4 bg-slate-100 m-0 lg:m-10 flex flex-col justify-center">
        <h1 class=" text-2xl md:text-3xl lg:text-5xl text-green-600 font-serif ml-8 md:ml-15 lg:ml-20 w-full">
          <span class=" text-4xl md:text-6xl lg:text-7xl">S</span>ocialArena
        </h1>
        <hr class="w-full h-1 bg-white ml-5 md:ml-15 lg:ml-20"></hr>
        <h1 class="ml-8 md:ml-15 lg:ml-20 sm:text-sm  font-sans text-black">
          Socialise with the people around the world, Using Arena
        </h1>
      </div>
      
      {/* login form */}

      <div class="col-span-8 lg:col-span-3 bg-white m-10 my-10 p-5  justify-center items-center">
        <form
          class="flex flex-wrap gap-3 h-full w-full justify-center items-center"
          onSubmit={handle}
        >
          <input
            type="text"
            placeholder="Username"
            class="w-full h-8 md:h-10  p-3 outline-none border border-gray-400 rounded-md"
            ref={username}
            required
          ></input>
          <input
            type="email"
            placeholder="Email"
            class="w-full h-8 md:h-10 p-3 outline-none border border-gray-400 rounded-md"
            ref={email}
            required
          ></input>
          <input
            type="Number"
            placeholder="Phone No."
            class="w-full h-8 md:h-10 p-3 outline-none border border-gray-400 rounded-md"
            ref={PhoneNo}
            required
          ></input>
          <input
            type="Password"
            placeholder="Password"
            class="w-full h-8 md:h-10 p-3 outline-none border border-gray-400 rounded-md"
            ref={password}
            required
            minLength={6}
          ></input>
          <input
            type="Password"
            placeholder="Confirm Password"
            class="w-full h-8 md:h-10 p-3 outline-none border border-gray-400 rounded-md"
            ref={passwordagain}
            required
            minLength={6}
          ></input>

          <button
            class="w-full h-8 md:h-10 flex justify-center items-center  bg-green-500 text-white p-3  rounded-md   "
            type="submit"
          >
            Register
          </button>
          <div
            onClick={() => {
              navigate("/login");
            }}
            class="text-blue-700 hover:text-blue-400  md:ml-7 lg:ml-12 cursor-pointer underline"
          >
            Already have an account?
          </div>
          <hr></hr>
        </form>
      </div>
    </div>
  );
}
