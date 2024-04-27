import { Link } from "react-router-dom"
import Appbar from "../components/Appbar"

function Home() {
  return (
    <div>
        <Appbar />
        <Link to={'/signup'}>
            <div className="flex flex-col justify-center">
                <div className="flex justify-center">GO TO SIGN UP</div>
            
            </div>
        </Link>
    </div>
  )
}

export default Home