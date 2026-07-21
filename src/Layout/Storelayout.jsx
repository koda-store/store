import { Outlet } from "react-router-dom"
import Navbar from "../components/ui/NavBar"
import Footer from "../components/Footer"
import { ToastContainer } from "react-toastify"


function Storelayout() {
  return (
    <div className="bg-white dark:bg-gray-950 text-gray-950 dark:text-white min-h-screen pt-10 ">
      <Navbar />
      <Outlet />
      <Footer />

      <ToastContainer position="top-center" autoClose={3000} />




    </div>
  )
}

export default Storelayout