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
        element: <Products />,
      },
      {
        path: "cart",
        element: <Carts />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "orders/:id",
        element: <OrderDetails />,
      },
      {
        path: "ordersuccess",
        element: <OrderSuccess />,
      },
      {
        path: "wishlist",
        element: <Wishlist />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
      {
  path: "shop/:category",
  element: <Products />
}
    ],
  },
]);

export default router;