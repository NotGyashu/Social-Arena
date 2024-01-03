import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Button, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgetPassword = ({ open, handleClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  //$2b$10$xW/eHFb4Nq5MZEuPuWkz.O8UxiPtlnLVEunHO/dBS5xPQsW4ZSPRC
  //$2b$10$xW/eHFb4Nq5MZEuPuWkz.O8UxiPtlnLVEunHO/dBS5xPQsW4ZSPRC  
  const update = async (e) => {
    e.preventDefault();
    try {
      const user = await axios.get(`/user/?email=${data.email}`);
      console.log(user.data._id);

      data._id = user.data._id;
      const res = await axios.put(`/user/${user.data._id}`, data);
      if (res.status == 200) {
        console.log("password changed");
        handleClose();
      }
    } catch (err) {
      console.log("err in changing", err);
    }
  };
  const serverInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setData((prev) => ({ ...prev, [id]: value }));
    console.log(data);
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
          <div>
            <form class="flex flex-wrap h-full w-full gap-6" onSubmit={update}>
              <input
                type="email"
                placeholder="Enter Your Email"
                class="w-full h-10 p-3 mt-16 outline-none border border-gray-400 rounded-md"
                id="email"
                onChange={serverInput}
                required
              ></input>
              <div className=" flex items-center justify-between  w-full h-10 p-2  border border-gray-400 rounded-md relative">
                <input
                  class="w-[80%] h-full focus:outline-none "
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  id="password"
                  required
                  onChange={serverInput}
                  minLength={6}
                />
                <IconButton
                  class="w-[15%] text-gray-400 absolute right-0"
                  onClick={handleTogglePassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </div>
              <div className=" flex items-center justify-between  w-full h-10 p-2  border border-gray-400 rounded-md relative">
                <input
                  class="w-[80%] h-full focus:outline-none "
                  type={showPassword ? "text" : "password"}
                  placeholder="confirm New Password"
                  id="confirmPassword"
                  onChange={serverInput}
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
                type="submit"
              >
                Save Changes
              </button>
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ForgetPassword;
