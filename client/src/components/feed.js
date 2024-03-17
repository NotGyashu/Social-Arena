import Posts from "./posts";
import Share from "./share";
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";
export default function Feed() {
  const username = useParams().username;
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
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
        <img
          src="https://uploads.dailydot.com/e52/31/87610fa1a0ae891d.png?auto=compress&fm=png"
          alt="no posts"
          class="mt-3"
        ></img>
      )}
    </div>
  );
}
