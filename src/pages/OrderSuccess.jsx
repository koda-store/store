import React from "react";
import { Package, ShoppingBag,  CircleCheckBig } from "lucide-react";
import { NavLink } from "react-router-dom";

function OrderSuccess() {
    return (

        <div className="min-h-[60vh] bg-slate-100 ">OrderSuccess Page
            <div className=" flex items-center justify-center px-4 pt-[40px]">
                {/* <h3>OrderSuccess</h3> */}
                <div className="flex flex-col text-center space-y-4 ">
                    <div className="mx-auto w-20 h-22 rounded-full bg-green-100 flex items-center justify-center">
                        <CircleCheckBig 
                            size={55}
                            className="text-green-600"
                            strokeWidth={1.5}
                        />
                    </div>
                    <div className="text-slate-800 font-bold text-xl">
                        Order Placed Successfully !
                    </div>
                    <div className="text-slate-500 text-sm ">
                        Thank you for your Purchase .Your Order has been confirmed .
                    </div>
                    <div className="text-slate-500 text-sm ">
                        Order ID : # 123456
                    </div>

                    <div className="flex gap-4">
                        <NavLink to="/orders"
                            className="flex items-center gap-2 border border-indigo-600 rounded rounded-lg px-4 py-2 text-indigo-600 font-semibold
                            hover:bg-slate-300/20 transtion-all">
                            <Package size={18} />
                             Track My Order  
                            
                        </NavLink>
                        <NavLink to="/"
                            className="flex items-center gap-2 bg-indigo-600/80 text-white px-4 py-2 rounded rounded-lg
                            hover:bg-indigo-700/80 transtion-all">
                            <ShoppingBag size={18} />
                            Continue Shopping 
                           
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default OrderSuccess;