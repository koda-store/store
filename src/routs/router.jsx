import { createBrowserRouter } from "react-router-dom";

import Storelayout from "../Layout/Storelayout";

import Home from "../pages/Home";
import Products from "../pages/Products";
import Carts from "../pages/Carts";
import Login from "../pages/Login";
import Checkout from "../pages/Checkout";
import Orders from "../pages/Orders";
import OrderDetails from "../pages/OrderDetails";
import OrderSuccess from "../pages/OrderSuccess";
import Wishlist from "../pages/Wishlist";
import NotFound from "../pages/NotFound";
import Shop from '../pages/Shop'
import Product from '../pages/Product'
import ProtectedRoute from "../components/ui/ProtectedRoute";
import GustOnly from "../components/ui/GustOnly";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Storelayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "shop/:category",
        element: <Shop />,
      },
      {
        path: "shop/:category/product/:id",
        element: <Product />,
      },
      {
        path: "shop/product/:id",
        element: <Product />,
      },
      {
        path: "product/:id",
        element: <Product />,
      },
      {
        path: "cart",
        element: <ProtectedRoute><Carts /></ProtectedRoute>,
      },
      {
        path: "login",
        element: <GustOnly><Login /></GustOnly> ,
      },
      {
        path: "checkout",
        element: <ProtectedRoute><Checkout /></ProtectedRoute>,
      },
      {
        path: "orders",
        element: <ProtectedRoute><Orders /></ProtectedRoute> ,
      },
      {
        path: "orders/:id",
        element: <OrderDetails />,
      },
      {
        path: "ordersuccess",
        element: <ProtectedRoute><OrderSuccess /></ProtectedRoute> ,
      },
      {
        path: "wishlist",
        element: <ProtectedRoute><Wishlist /></ProtectedRoute> ,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;