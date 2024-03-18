import Posts from "./posts";
import Share from "./share";
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
export default function Feed() {
  const username = useParams().username;
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/auth/all");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = username
          ? await axios.get(`/api/posts/profile/${username}`)
          : await axios.get(`/api/posts/timeline/${user._id}`);

        setPosts(res.data);
      } catch (error) {
        // Handle error, e.g., log or show an error message
        console.error("Error fetching posts:", error);
      }
    };
    fetchPost();
  }, [username, user._id]);

  console.log(user.username, username);

  return (
    <div className="md:p-2 p-1 lg:p-4 mt-12 lg:col-span-5 md:col-span-8 col-span-8">
      {(user.username === username || username === undefined) && <Share />}

      {posts.length > 0 ? (
        posts.map((p) => <Posts key={p._id} post={p} />)
      ) : (
        <div>
          <img
            src="https://uploads.dailydot.com/e52/31/87610fa1a0ae891d.png?auto=compress&fm=png"
            alt="no posts"
            class="mt-3"
          ></img>
          <div className="py-2 min-h-[20vh] border custom-scrollbar">
            <h1 className="text-3xl m-1 text-green-500 font-serif">
              Suggestions
            </h1>
            <div className="flex   overflow-x-scroll overflow-y-visible gap-x-8 mt-3">
              {users.map((u) => (
                <div
                  class="flex flex-col  text-sm  h-20 w-20 justify-center   hover:bg-green-100 rounded py-1 cursor-pointer"
                  onClick={() => {
                    navigate(`/profile/${u.username}`);
                  }}
                >
                  <img
                    src={
                      u?.profilePicture ||
                      "https://firebasestorage.googleapis.com/v0/b/socialarena-d6016.appspot.com/o/th.jpg?alt=media&token=c605506d-52d5-45e2-8957-86f1735c8dd2"
                    }
                    alt="freind1"
                    class="h-16 w-16  border border-green-300"
                  />

                  <div class="text-center">
                    {u?.username && u.username.split(" ")[0]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
