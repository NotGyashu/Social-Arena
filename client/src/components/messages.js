
import { useState } from "react";
import { format } from "timeago.js";

export const Messages = ({ message,own }) => {

console.log(message.text)
 

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
                src="https://hips.hearstapps.com/hmg-prod/images/gettyimages-1656263038.jpg?crop=0.674xw:1.00xh;0.216xw,0&resize=640:*"
                alt="her"
                className="h-7 w-7 rounded-full border border-white my-1"
              />
            </>
          ) : (
            <>
              <img
                src="https://hips.hearstapps.com/hmg-prod/images/gettyimages-1656263038.jpg?crop=0.674xw:1.00xh;0.216xw,0&resize=640:*"
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
