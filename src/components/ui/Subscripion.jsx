import React, { useState } from 'react'
import HeadSec from './HeadSec'
import { ShoppingCart, ShoppingBag, Van, Mail, ArrowRight } from 'lucide-react';

const Subscription = () => {
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
        <div className='py-2.5 pb-10 container bg-[#493fd7] rounded-xl text-white'>
            <div className='flex justify-center items-center mt-15 mb-3'>
                <Mail size={35} />
            </div>
            <HeadSec Header={'Stay Updated'} style={'text-white'} disc={'Subscribe to our newsletter and get exclusive deals and new arrivals first.'} />
            <div className='sm:flex justify-center items-center max-w-2xl mx-auto gap-3'>
                <input
                    type="email"
                    name='personal-email'
                    autoComplete='off'
                    placeholder="Enter your email"
                    className="w-full rounded-xl bg-white/10 py-2.5 pl-5 pr-4 outline-none border border-white/50 focus:border-white/80 transition-all duration-150"
                />

                <button
                    type="submit"
                    className="max-sm:mt-3 cursor-pointer sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-2.5 font-medium text-indigo-600 hover:bg-indigo-50 transition"
                >
                    Subscribe
                    <ArrowRight size={18} />
                </button>
            </div>
        </div>
    )
}

export default Subscription