import Appbar from "../components/Appbar";
import FullBlog from "../components/FullBlog";
import Spinner from "../components/Spinner";
// import Skeleton from "../components/Skeleton";
import { useBlog } from "../hooks"
import { useParams } from "react-router-dom";
//can use selectorFamily or atomFamily

function Blog() {
  const {id} = useParams();
  const {loading, blog} = useBlog({id : id || ""});

  if(loading){
    return <>
    <Appbar />
    <div className='h-screen flex flex-col justify-center'>
      <div className="flex justify-center">
        <Spinner />
      </div>
    </div>
    </>
  }

  if(!blog){
    return <div>Error: Blog not fount</div>
  }
  return (
      <FullBlog blog={blog}/>
  )
}

export default Blog