import Posts from "./posts";
import Share from "./share";
import React, { useContext } from "react";
import {useState,useEffect} from "react"; 
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
export default function Feed({username}){
const [posts,setPosts] = useState([]);
const {user} = useContext(AuthContext)
useEffect(()=>{
    const fetchPost = async()=>{
        try {
        const res = username
          ? await axios.get(`posts/profile/${username}`)
          : await axios.get(`posts/timeline/${user._id}`);

        // Log for debugging purposes
        console.log(username, user._id);
        console.log(res.data);

        setPosts(res.data);
      } catch (error) {
        // Handle error, e.g., log or show an error message
        console.error('Error fetching posts:', error);
      }
    fetchPost();
}
},[username,user._id])



    return (
        <div class="  p-4 mt-12  col-span-5">
         <Share/>

        {
            posts.map((p) => (
            <Posts key={p._id} post = {p}/>
         ))
        }
       
        </div>
    )
}