import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Comments = () => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const comment = () => {
    setOpen(true);
  };

  return (
    <div onClick={comment} class="w-full">
      Comments
      <div>
        {/* comment head */}
        <div className={`${open ? "h-2 w-full" : "hidden"}  flex col-span-5`}>
          <form>
            <img
              src={user.profilePicture}
              alt="Profile"
              className="h-9 w-9 rounded-full inline border border-green-400"
            />
            <input type="text" id="comment" required class="w-[100%] bg-slate-200" placeholder="comment" />
            <button type="submit">Send</button>
          </form>
        </div>
        {/* comment body */}
      </div>
    </div>
  );
};

export default Comments;
