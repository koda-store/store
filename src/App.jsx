import { Route, Routes } from 'react-router-dom'
import Navbar from './components/ui/NavBar'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Product from './pages/Product'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Carts from './pages/Carts'
import Wishlist from './pages/Wishlist'
import Login from './pages/Login'
import Footer from './components/Footer'


function App() {
  return (
    <>
      <ToastContainer position="bottom-left" />
      <header className='fixed top-0 left-0 w-full z-50'>
        <Navbar />
      </header>
      <main className="bg-gray-100 dark:bg-gray-950">
        <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={'/shop'} element={<Shop />} />
          <Route path={'/shop/:category'} element={<Shop />} />
          <Route path={'/product/:id'} element={<Product />} />
          <Route path={'/shop/product/:id'} element={<Product />} />
          <Route path={'/shop/:category/product/:id'} element={<Product />} />
          <Route path={'/cart'} element={<Carts />} />
          <Route path={'/wishlist'} element={<Wishlist />} />
          <Route path={'/login'} element={<Login />} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}


export default App;