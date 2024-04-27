import axios from 'axios';
import { useEffect, useState } from 'react'
import { BACKEND_URL } from '../config';


export interface Blog {
    "title": string,
    "content": string,
    "id":number,
    "author": {
        "name": "string"
    }

}

export const useBlog = ({id} : {id: string})=>{
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then((res)=>{
            if(res.data && res.data.blog){
                setBlog(res.data.blog);
                setLoading(false);
            }else{
                alert("Error while fetching data");
                setLoading(false);
            }
        })
        .catch((error)=>{
            console.log("Error while fetching blog details", error);
            setLoading(false);
            
        })
    },[id])

  return {
    loading,
    blog
  }
}

function useBlogs() {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then((res)=>{
            if(res.data && res.data.blogs){
                setBlogs(res.data.blogs);
                setLoading(false);
            }else{
                alert("Error while fetching data");
                setLoading(false);
            }
            
        })
        .catch((error)=>{
            console.log("Error while fetching blog details", error);
            setLoading(false);
            
        })
    },[])

  return {
    loading,
    blogs
  }
}

export default useBlogs