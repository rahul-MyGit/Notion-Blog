import axios from 'axios'
import Appbar from '../components/Appbar'
import TextEditor from '../components/TextEditor'
import { BACKEND_URL } from '../config'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Publish() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const navigate = useNavigate();
  return (
    <>
    <div>
        <Appbar />
    </div>
    <div className='flex justify-center pt-8'>
        <div className='max-w-screen-lg w-full'>
            <input onChange={(e)=>{
                setTitle(e.target.value)
            }} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Title" />

            <TextEditor onChange={(e)=>{
                setContent(e.target.value)
            }}/>

            <button onClick={async ()=>{
                const res = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                    title,
                    content
                },{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                navigate(`/blog/${res.data.id}`)
            }} type="submit" className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800">
                Publish post
            </button>
        </div>
    </div>
    </>
  )
}



export default Publish