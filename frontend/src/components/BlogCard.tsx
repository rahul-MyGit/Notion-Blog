import { Link } from "react-router-dom";
import Avatar from "./Avatar";

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id: number;
}
function BlogCard({
    authorName,
    title,
    content,
    publishedDate,
    id
} : BlogCardProps) {
  return (
    <Link to={`/blog/${id}`}>
    <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-lg cursor-pointer">
        <div className="flex">
            <div className="flex"><Avatar size="small" name={authorName} /></div>
            <div className="pl-2 flex justify-center flex-col font-extralight text-sm">{authorName}</div>
            <div className="flex justify-center flex-col pl-1"> <Circle /></div>
            <div className="pl-2 flex justify-center flex-col text-sm font-thin text-slate-400">{publishedDate}</div>
        </div>
        <div className="text-xl font-semibold pt-2">
            {title}
        </div>
        <div className="text-md font-thin">
            {content.slice(0,100) + "..."}
        </div>
        <div className="text-slate-500 text-sm font-thin pt-4">
            {`${Math.ceil(content.length/100)} minute(s) read`}
        </div>
    </div>
    </Link>
  )
}

export const Circle =()=>{
    return (
        <>
        <div className="h-1 w-1 rounded-full bg-slate-500">

        </div>
        </>
    )
}

export default BlogCard