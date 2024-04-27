import { Link } from "react-router-dom"
import Appbar from "../components/Appbar"

function Home() {
  return (
    <div>
        <Appbar />
        <Link to={'/signup'}>GO TO SIGN UP</Link>
    </div>
  )
}

export default Home