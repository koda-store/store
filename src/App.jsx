import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/ui/NavBar";
import Footer from "./components/Footer";

import { CartProvider } from "./context/CartContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Carts from "./pages/Carts";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";


function App() {
  return (
    <CartProvider>

      <div className="
        flex
        flex-col
        min-h-screen
        bg-gray-50
        dark:bg-gray-900
      ">

        <Navbar />

        <main className="flex-grow pt-12">

          <Routes>

            <Route path="/" element={<Home />} />

            <Route path="/shop" element={<Products />} />

            <Route path="/cart" element={<Carts />} />

            <Route path="/checkout" element={<Checkout />} />

            <Route path="/login" element={<Login />} />

            <Route path="/wishlist" element={<Wishlist />} />

            <Route
              path="/orders"
              element={
                <div className="p-8">
                  My Orders Page
                </div>
              }
            />

          </Routes>

        </main>

        <Footer />

      </div>


      <ToastContainer
        position="top-center"
        autoClose={3000}
      />

    </CartProvider>
  );
}


export default App;