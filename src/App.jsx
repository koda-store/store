import { Route, Routes } from 'react-router-dom'
import Navbar from './components/ui/NavBar'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Product from './pages/Product'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <ToastContainer position="bottom-left" />
      <header className='fixed top-0 left-0 w-full z-50'>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={'/shop'} element={<Shop />} />
          <Route path={'/product/:id'} element={<Product />} />
          <Route path={'/shop/product/:id'} element={<Product />} />
        </Routes>
      </main>

    </>
  )
}

export default App
