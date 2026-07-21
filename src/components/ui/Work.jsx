import React, { useState } from 'react'
import HeadSec from './HeadSec'
import { ShoppingCart, ShoppingBag, Van } from 'lucide-react';

const Work = () => {
    const [works,] = useState([
        {
            icon: <ShoppingBag className='' size={25} />,
            h3: 'Browse Products',
            p: 'Explore our wide range of premium products'
        }, {
            icon: <ShoppingCart size={25} />,
            h3: 'Add to Cart',
            p: 'Select your favorites and add them to your cart'
        }, {
            icon: <Van className='' size={25} />,
            h3: 'Order & Receive',
            p: 'Place your order and get it delivered to your doorstep'
        }
    ]);
    return (
        <div className="py-2.5 container">
            <HeadSec Header={"How It Works"} />

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
                {works.map((w, index) => (
                    <div
                        key={index}
                        className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-lg transition"
                    >
                        <div className="flex flex-col items-center text-center py-10 px-8">
                            <div className="my-4 rounded-xl bg-blue-100 dark:bg-blue-500/20 p-4 text-blue-700 dark:text-blue-400">
                                {w.icon}
                            </div>

                            <h3 className="my-2 text-lg font-semibold capitalize text-slate-800 dark:text-white">
                                {w.h3}
                            </h3>

                            <p className="text-sm text-gray-500 dark:text-gray-400 leading-7">
                                {w.p}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Work