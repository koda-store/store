import { Routes, Route } from "react-router-dom";
import { BrowserRouter ,} from "react-router-dom";

// import Login from "./pages/Login";

import Navbar from './components/ui/NavBar'
import Profile from "./pages/Profile";

function App() {
 return (
    <>
      <Navbar />
       <Routes>
       {/* <Route path="/" element={<Home />} />  */}
     {/* <Route path="/Login" element={<Login />} /> */}
       <Route path="/profile" element={<Profile />} /> 
   </Routes>
    </>
  )
}

export default App;
