import { createBrowserRouter } from "react-router-dom";

import Storelayout from "../Layout/Storelayout";

import Home from "../pages/Home";
import Products from "../pages/Products";
import Carts from "../pages/Carts";
import Login from "../pages/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Storelayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "products",
                element: <Products />
            },
            {
                path: "carts",
                element: <Carts />
            },
            {
                path: "login",
                element: <Login />
            }
        ]
    }
]);

export default router;
