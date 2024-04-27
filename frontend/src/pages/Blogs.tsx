import Appbar from '../components/Appbar'
import BlogCard from '../components/BlogCard'
import Skeleton from '../components/Skeleton';
import useBlogs from '../hooks'

function Blogs() {
  const {loading, blogs} = useBlogs();

  if(loading){
    return <>
    <Appbar />
    <div className='flex justify-center'>
      <div>
        <Skeleton />
        <br />
        <Skeleton />
        <br />
        <Skeleton />
        <br />
        <Skeleton />
        <br />
        <Skeleton />
        <br />
      </div>
    </div>
    </>
  }
  return (
    <div>
      <Appbar />
    <div className='flex justify-center'>
      <div>
        {blogs.map(blog =>  <BlogCard 
          authorName={blog.author.name || "Anonymous"}
          title={blog.title}
          content={blog.content}
          publishedDate={"2nd Feb 2024"}
          id={blog.id}
        />)}

      </div>
    </div>
    </div>
  )
}

export default Blogs