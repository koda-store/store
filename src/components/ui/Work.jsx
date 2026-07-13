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
        <div className='py-2.5 container'>
            <HeadSec Header={'How It Works'} />
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
                {
                    works.map((w, index) => (
                        <div key={index} className="relative">
                            <div className="flex flex-col text-center items-center py-10 px-10 w-full">
                                <div className="bg-blue-100 text-blue-800/70 rounded-lg p-3 my-4">{w.icon}</div>
                                <h3 className="font-medium text-md capitalize text-slate-800 my-1.5 text-lg">{w.h3}</h3>
                                <p className="text-sm opacity-50">{w.p} </p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Work