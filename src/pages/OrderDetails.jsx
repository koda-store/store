import React from "react";
import { MapPin, CreditCard, Package, CircleCheckBig, Check } from "lucide-react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOrderById } from "../services/ordersService";

function OrderDetails() {
   
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const steps = [
        "Pending",
        "Confirmed",
        "Processing",
        "Shipped",
        "Delivered",
    ];
    const statusStep = {
        pending: 0,
        confirmed: 1,
        processing: 2,
        shipped: 3,
        delivered: 4,
    };
    const currentStep = statusStep[order?.status?.toLowerCase()] ?? 0;
    // const currentStep = 4;  


    useEffect(() => {
        fetchOrder();
    }, []);

    const fetchOrder = async () => {
        try {
            setLoading(true);
            setError(null) 
            const data = await getOrderById(id);
            console.log(data.order)
            setOrder(data.order);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };
    const getStatusClass = (status) => {
        if (!status) return "bg-gray-100 text-gray-700";
        switch (status.toLowerCase()) {
            case "pending":
                return "bg-yellow-100 text-yellow-700";

            case "confirmed":
                return "bg-blue-100 text-blue-700";
            case "processing":
                return "bg-indigo-100 text-indigo-700";

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
            <div className="flex justify-center items-center bg-slate-100 h-[70vh]">
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

        <div className="min-h-screen bg-slate-100 ">OrderDetails Page
            <div className="mx-auto max-w-4xl space-y-4">
                {/* <h3>OrderDetails</h3> */}
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-slate-800 font-bold text-2xl py-2">Order Details</h3>
                        <p className="text-slate-500">Order #{order?._id.slice(-6)}</p>
                   </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium 
                                                ${getStatusClass(order?.status)}`}>
                        {order?.status?.charAt(0).toUpperCase() + order?.status?.slice(1)}
                   </div>
                </div>

                {/* order progress */}
                <div className="bg-white rounded-lg border border-slate-200 p-4 ">
                    <h2 className="text-slate-700 font-semibold mb-4 text-lg">
                        Order Progress
                    </h2>

                    <div className="relative">

                        {/* Progress Line */}
                        <div className="absolute top-4 left-0 w-full h-0.5 bg-gray-200">
                            <div
                                className="h-full bg-indigo-600 transition-all duration-500"
                                style={{
                                    width: `${(currentStep / (steps.length - 1)) * 100}%`,
                                }}
                            />
                        </div>

                        {/* Steps */}
                        <div className="flex justify-between relative">
                            {steps.map((step, index) => (
                                <div
                                    key={step}
                                    className="flex flex-col items-center w-20"
                                >
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-500
                                                 ${index <= currentStep
                                                ? "bg-indigo-600 border-indigo-600 text-white"
                                                : "bg-white border-gray-300 text-gray-400"
                                            }`}
                                    >
                                        {index <= currentStep ? (
                                            <CircleCheckBig size={18} />
                                        ) : (
                                            <div className="w-3 h-3 rounded-full border border-gray-400"></div>
                                        )}
                                    </div>

                                    <span
                                        className={`mt-3 text-sm font-medium text-center
                                              ${index <= currentStep
                                                ? "text-indigo-600"
                                                : "text-gray-400"
                                            }`}
                                    >
                                        {step}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


                {/* order descreption */}
                <div className="w-full bg-white border border-slate-200 rounded rounded-lg p-6 ">
                    <p className="flex gap-2 text-slate-800 text-lg font-semibold pb-2">
                        <span><Package size={18} className="text-indigo-600" /> </span>
                        Items</p>
                    {order?.items.map((item) => (
                        <div className="flex justify-between space-y-4" key={item.product}>
                            <div className="flex justify-evenly">
                                <div className="w-15 h-15 text-lg rounded bg-slate-200 flex justify-center items-center text-slate-400/70">item</div>
                                <div className="flex flex-col justify-center">
                                    <p className=" px-2 text-sm text-slate-400 ">{item.name}</p>
                                    <p className=" px-2 text-sm text-slate-400 ">Qty : {item.quantity} × {item.price} EGP</p>
                                </div>                               
                            </div>
                            <span className="flex justify-center items-center text-slate-600 font-bold">{item.quantity * item.price} EGP</span>
                        </div>
                    ))}
                    
                </div>
                   
                {/* shipping&payment */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white border border-slate-200 rounded rounded-lg p-6 ">
                        
                        <h4 className="flex gap-2 text-slate-800 font-bold">
                            <span> <MapPin size={18} className="text-indigo-600" /> </span>
                            Shipping Address</h4>
                        <p className="text-slate-400 text-sm ">{order?.shippingAddress.fullName}</p>
                        <p className="text-slate-400 text-sm ">{order?.shippingAddress.city}</p>
                        <p className="text-slate-400 text-sm ">{order?.shippingAddress.country}</p>
                        <p className="text-slate-400 text-sm ">{order?.shippingAddress.phone}</p>
                    </div>

                    <div className="bg-white border border-slate-200 rounded rounded-lg p-6">
                        
                        <h4 className="flex gap-2 text-slate-800 font-bold">
                            <span> <CreditCard size={18} className="text-indigo-600" /> </span>
                            Payment
                        </h4>
                        <p className="text-slate-400 text-sm pb-2 ">{order?.paymentMethod?.toUpperCase()}</p>

                        <div className="border-t border-slate-200 ">
                            <div className="flex justify-between">
                                <span className="text-bold text-slate-600 font-bold pt-2">Total</span>
                                <span className="flex justify-center items-center text-slate-600 font-bold">{order?.totalPrice} EGP</span>
                            </div>
                            <p className="text-slate-400 text-sm ">Placed on{" "} {new Date(order?.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
            </div>
          
        </div>
    )

}

export default OrderDetails;