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
        const res = username ? 
        await axios.get(`/posts/profile/${username}`) :
        await axios.get("/posts/timeline/" + user._id) ;
        
        setPosts(res.data)
      console.log(res.data);
    };
    fetchPost();
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