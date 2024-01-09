
import { useEffect, useState } from "react";
import { format } from "timeago.js";
import axios from "axios"
export const Messages = ({ message,own }) => {
const [sender,setSender] = useState(null)

 console.log(message)
 
 
 useEffect(() => {
   const sender = async () => {
     try {
       const res = await axios.get(`/user?userId=${message.sender}`);
       console.log(res.data);
       
       setSender(res.data);
     } catch (err) {
       console.log(err);
     }
   };

   sender();
 }, [message]);


  return (
    <div
      className={`max-h-[75vh] mb-4 ${own ? "flex flex-row-reverse" : "flex"}`}
    >
      <div className="max-w-[60%] overflow-hidden">
        <div className="flex px-3">
          {own ? (
            <>
              <div className="px-3 m-2 bg-green-400 text-white rounded-3xl">
                <div className="my-1">{message.text}</div>
              </div>
              <img
                src={
                  sender?.profilePicture ||
                  "https://firebasestorage.googleapis.com/v0/b/socialarena-d6016.appspot.com/o/th.jpg?alt=media&token=c605506d-52d5-45e2-8957-86f1735c8dd2"
                }
                alt="her"
                className="h-7 w-7 rounded-full border border-white my-1"
              />
            </>
          ) : (
            <>
              <img
                src={
                  sender?.profilePicture ||
                  "https://firebasestorage.googleapis.com/v0/b/socialarena-d6016.appspot.com/o/th.jpg?alt=media&token=c605506d-52d5-45e2-8957-86f1735c8dd2"
                }
                alt="her"
                className="h-7 w-7 rounded-full border border-white my-1"
              />
              <div className="px-3 m-2 bg-slate-200 text-black rounded-3xl">
                <div className="my-1">{message.text}</div>
              </div>
            </>
          )}
        </div>
        <p className="text-xs px-3">{format(message.createdAt)}</p>
      </div>
    </div>
  );
};
