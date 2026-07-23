import React from "react";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOrders,getOrderById } from "../services/ordersService";

function Orders() {
    const [myOrders, setMyOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
       fetchMyOrders() 
    },[])
    
    const fetchMyOrders=async () => {
        try {
            setLoading(true)
            setError(null)
            const data = await getOrders()
            console.log(data)
            setMyOrders(data.orders || [])
        }
        catch (err) {
            console.error(err)
            setError("Failed to load my orders") 
        }
        finally {
            setLoading(false)
        }
    }
    const getStatusClass = (status) => {
        switch (status.toLowerCase()) {
            case "pending":
                return "bg-yellow-100 text-yellow-700";

            case "confirmed":
                return "bg-blue-100 text-blue-700";

            case "delivered":
                return "bg-green-100 text-green-700";

            case "cancelled":
                return "bg-red-100 text-red-700";

            case "shipped":
                return "bg-purple-100 text-purple-700";

            default:
                return "bg-gray-100 text-gray-700";
        }
    };
    if (loading) {
        return (
            <div className="flex justify-center items-center bg-slate-100 h-[70vh] dark:bg-slate-800">
                <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
        );
    }
    if (error) {
        return (
            <div className="text-center text-red-600 mt-10">
                {error}
            </div>
        );
    }

    return (

        <>
            <div className="bg-slate-100 min-h-[80vh] overflow-scroll dark:bg-slate-800"> 
                <div className="mx-auto max-w-4xl space-y-4">
                    <h2>Orders</h2>
                    <h3 className="font-bold text-3xl text-slate-800 py-2 dark:text-slate-200">My Orders</h3>
                    {myOrders.map((order) => (
                        <NavLink to={`/orders/${order._id}`} key={order.id}>
                            <div className="bg-white border border-slate-200 rounded rounded-lg flex justify-between p-4 mb-2 mx-1
                             hover:shadow-lg dark:bg-slate-700 dark:border-slate-600">
                                <div className="flex  flex-col justify-evenly">
                                    <div>
                                        <span className="text-slate-800  font-semibold  pr-3 dark:text-slate-200">#{order._id.slice(-6)}</span>
                                        {/* <span className="pl-2 inline-block  text-xs font-semibold w-[70px] h-[20px] rounded rounded-full 
                                        flex justify-center items-center text-blue-500 "> */}
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium dark:bg-slate-400
                                                ${getStatusClass( order.status )}`}
                                        >
                                            {order.status[0].toUpperCase() + order.status.slice(1)}</span>
                                    </div>
                                    <div className="text-slate-400 text-sm">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </div>
                                    <div className="text-slate-400 text-sm font-semibold">
                                        {order.items.length} item (s)
                                    </div>

                                </div>

                                <div className="text-lg font-bold py-6 text-indigo-600  dark:text-indigo-500">
                                    {order.totalPrice} EGP
                                </div>
                            </div>
                        </NavLink>   
                    ))}
                    
                </div>
            </div>
        </>
    )

}

export default Orders;