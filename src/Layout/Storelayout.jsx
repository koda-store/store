import { Outlet } from "react-router-dom"
import Navbar from "../components/ui/NavBar"
import Footer from "../components/Footer"


function Storelayout() {
  return (
    <div>
<Navbar />
        <Outlet />
        <Footer />





    </div>
  )
}

export default Storelayout