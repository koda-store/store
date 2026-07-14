import { Filter, ListFilter, Search, X } from 'lucide-react'
import React, { useState } from 'react'
import useProducts from '../redux/useProduct';
import Card from '../components/ui/Card';
import SkeletonDemo from '../components/ui/Skeleton';

const Shop = () => {
    const products = useProducts();
    const [category, setCategory] = useState('all');
    const [priceRange, setPriceRange] = useState({ min: null, max: null });
    const [sort, setSort] = useState('')
    const clearFilter = () => {
        setCategory('all');
        setPriceRange({ min: null, max: null });
        setSort('')
    }

    const [openFilter,setOpenFilter] = useState(false)
    return (
        <>
            <section className='pt-30 pb-10 relative'>
                <div className='container'>
                    <div className='flex items-center justify-start gap-2.5'>
                        <div className='md:hidden'>
                            <button onClick={() => setOpenFilter(true)} className='p-2.5 border border-gray-500/20 bg-white text-gray-500 text-sm cursor-pointer hover:border-cyan-500/50 hover:text-cyan-500 gap-2 rounded-md flex items-center justify-center shrink-0'>
                                <ListFilter size={17} /> filter
                            </button>
                        </div>
                        <div className='relative flex-1'>
                            <input type='search' autoComplete='off' name='search' placeholder='Search Product' className='block pl-8 w-full border border-gray-300 outline-0 p-2 rounded-md focus:border-cyan-500/70 transition duration-150 bg-white' />
                            <Search size={15} className='absolute top-2/4 transform -translate-y-2/4 left-3 text-gray-500' />
                        </div>
                    </div>
                    <div className='flex items-start justify-start gap-3'>
                        <div className={`max-w-55 relative max-md:fixed max-md:z-10 max-md:-left-full max-md:bg-white max-md:top-20 max-md:shadow-lg p-4 max-md:h-screen transition-all ${openFilter?'max-md:left-0':'max-md:-left-full'}`}>
                            <button onClick={() => setOpenFilter(false)} className='absolute top-3 right-3 text-gray-500 hover:text-gray-950 cursor-pointer md:hidden'>
                                <X size={19}/>
                            </button>
                            <div className='mt-5'>
                                <h2 className='font-medium mb-2'>Category</h2>
                                <div className='flex flex-col gap-1'>
                                    <label htmlFor="all" className='opacity-80 flex items-center gap-2 cursor-pointer capitalize'>
                                        <input onChange={(e) => setCategory(e.target.value)} checked={category === 'all'} value="all" type="radio" id='all' name="category" className='text-brand-600 focus:ring-brand-500' /> all
                                    </label>
                                    <label htmlFor="home" className='opacity-80 flex items-center gap-2 cursor-pointer capitalize'>
                                        <input onChange={(e) => setCategory(e.target.value)} checked={category === 'home'} value="home" type="radio" id='home' name="category" className='text-brand-600 focus:ring-brand-500' /> home
                                    </label>
                                    <label htmlFor="fashion" className='opacity-80 flex items-center gap-2 cursor-pointer capitalize'>
                                        <input onChange={(e) => setCategory(e.target.value)} checked={category === 'fashion'} value="fashion" type="radio" id='fashion' name="category" className='text-brand-600 focus:ring-brand-500' /> fashion
                                    </label>
                                    <label htmlFor="electronics" className='opacity-80 flex items-center gap-2 cursor-pointer capitalize'>
                                        <input onChange={(e) => setCategory(e.target.value)} checked={category === 'electronics'} value="electronics" type="radio" id='electronics' name="category" className='text-brand-600 focus:ring-brand-500' /> electronics
                                    </label>
                                    <label htmlFor="phones" className='opacity-80 flex items-center gap-2 cursor-pointer capitalize'>
                                        <input onChange={(e) => setCategory(e.target.value)} checked={category === 'phones'} value="phones" type="radio" id='phones' name="category" className='text-brand-600 focus:ring-brand-500' /> phones
                                    </label>
                                    <label htmlFor="sports" className='opacity-80 flex items-center gap-2 cursor-pointer capitalize'>
                                        <input onChange={(e) => setCategory(e.target.value)} checked={category === 'sports'} value="sports" type="radio" id='sports' name="category" className='text-brand-600 focus:ring-brand-500' /> sports
                                    </label>
                                </div>
                            </div>
                            <div className='mt-5'>
                                <h2 className='font-medium mb-2'>Price Range</h2>
                                <div className='flex items-center gap-2.5'>
                                    <input type="number" value={priceRange.min ?? ''} onChange={(e) => setPriceRange((prev) => ({ ...prev, min: e.target.value }))} className='bg-white block w-full rounded-md p-2 py-1.5 border border-gray-300 focus:border-cyan-500/70 outline-0' name='min' placeholder='min' />
                                    <input type="number" value={priceRange.max ?? ''} onChange={(e) => setPriceRange((prev) => ({ ...prev, max: e.target.value }))} className='bg-white block w-full rounded-md p-2 py-1.5 border border-gray-300 focus:border-cyan-500/70 outline-0' name='max' placeholder='max' />
                                </div>
                            </div>
                            <div className='mt-5'>
                                <h2 className='font-medium mb-2'>Sort By</h2>
                                <div className='flex items-center gap-2.5'>
                                    <select name="sort" id="sort" value={sort} onChange={(e) => setSort(e.target.value)} className='bg-white cursor-pointer text-gray-800 block w-full rounded-md p-2 py-1.5 border border-gray-300 focus:border-cyan-500/70 outline-0'>
                                        <option value="">Default</option>
                                        <option value="price from min to max">Price (min : max)</option>
                                        <option value="price from max to min">Price (max : min)</option>
                                        <option value="rating">Rating</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mt-5">
                                <button onClick={clearFilter} className='bg-white shadow border border-gray-800/20 hover:border-cyan-500/50 hover:text-cyan-500 transition-all duration-150 inline-flex items-center justify-center px-3 py-2 text-sm rounded-full cursor-pointer capitalize'>clear all filter</button>
                            </div>
                        </div>
                        <div className="grid flex-1 mt-5 relative grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                            {
                                products.loading || !products.products ? (
                                    <SkeletonDemo />
                                ) : (
                                    Array.from(products?.products?.products).map((product) => (
                                        <div key={product._id}>
                                            <Card product={product} />
                                        </div>
                                    ))
                                )
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Shop