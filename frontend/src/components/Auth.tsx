import { Link, useNavigate } from "react-router-dom"
import Input from "./Input"
import { useState } from "react"
import { SignupInput } from "@rahultech/med-common"
import axios from "axios"
import { BACKEND_URL } from "../config"

//TODO: Make different components for signup and signin 
function Auth({type} : {type: "signup" | "signin"}) {
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        email: "",
        password: ""
    })
    const navigate = useNavigate();

    async function sendRequest(){
        try {
        const res = await axios.post(`${BACKEND_URL}/api/v1/user/${type ==="signup"?"signup":"signin"}`, postInputs);
        const jwt = res.data;
        localStorage.setItem("token", jwt);
        navigate("/blogs");
        } catch (error) {
            alert("Error sending request");
        }
    }

  return (
    <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
                <div className="px-10">
                    <div className="text-3xl font-extrabold">
                        {type === "signup"?"Create an Account": "Welcome Back !!"}
                    </div>
                    <div className="text-slate-500">
                        {type === "signin" ?"Don't have an account?":"Already have an account?"} 
                        <Link className="pl-2 underline" to={type === "signin"?"/signup": "/signin"}>
                            {type === "signin"? "Sign up" : "Sign in"}
                        </Link>
                    </div>
                </div>


                <div className="pt-8">
                    {type === "signup" ?<Input label="Name" placeholder="Rahul Gujjar..." onChange={(e)=>{
                        setPostInputs({
                            ...postInputs,       //get existting username, password, name values
                            name: e.target.value // overeride only the name
                        })
                    }}/> : null }
                    <Input label="Username" placeholder="rahul@gmail.com" onChange={(e)=>{
                        setPostInputs({
                            ...postInputs,       //get existting username, password, name values
                            email: e.target.value // overeride only the name
                        })
                    }}/>
                    <Input label="Password" type="password" placeholder="Rahul123" onChange={(e)=>{
                        setPostInputs({
                            ...postInputs,       //get existting username, password, name values
                            password: e.target.value // overeride only the name
                        })
                    }}/>

                    <button onClick={sendRequest} type="button" className="mt-6 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup"? "Sign up" : "Sign in"}</button>
                </div>
            </div>
        </div>
    </div>
  )
}



export default Auth