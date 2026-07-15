import { Sparkles } from 'lucide-react'
import React from 'react'

const Hero = () => {
    return (
        <div className='container py-2.5 flex flex-col'>
            <div className='max-w-3xl'>
                <div className='flex items-center max-sm:justify-center justify-start gap-2.5 opacity-85'>
                    <Sparkles size={20} className='shrink-0' /> Premium Shopping Experience
                </div>
                <div>
                    <h1 className='text-4xl max-sm:text-center sm:text-5xl md:text-6xl lg:text-7xl font-semibold mt-4'>Shop the future, delivered today</h1>
                </div>
                <div className='max-w-lg max-sm:mx-auto mt-4'>
                    <p className='opacity-75 max-sm:text-base max-sm:text-center'>Discover premium products at unbeatable prices. Fast delivery, easy returns, and exceptional quality.</p>
                </div>
                <div className='flex items-center justify-start max-sm:justify-center gap-2.5 mt-5'>
                    <button className='shadow-md rounded-md cursor-pointer max-sm:px-3 max-sm:py-2 mt-3 max-sm:text-sm font-semibold bg-white text-purple-700 inline-flex px-5 py-2.5 border border-white hover:bg-gray-100 transition-all duration-150'>Shop Now</button>
                    <button className='shadow-md rounded-md cursor-pointer max-sm:px-3 max-sm:py-2 mt-3 max-sm:text-sm font-semibold inline-flex px-5 py-2.5 border border-white/30 hover:bg-white/15 transition-all duration-150 bg-white/10 backdrop-blur-md'>View Categories</button>
                </div>
            </div>
        </div>
    )
}

export default Hero