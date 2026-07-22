import { ChevronDown, Filter, ListFilter, Search, X } from 'lucide-react'
import React, { useMemo, useState } from 'react'
import useProducts from '../redux/useProduct';
import Card from '../components/ui/Card';
import SkeletonDemo from '../components/ui/Skeleton';
import { useParams } from 'react-router-dom';
import usewishLists from '../redux/useWishList';

const Shop = () => {
    const products = useProducts();
    const wishlists = usewishLists();

    const par = useParams();

    const [category, setCategory] = useState(par.category? par.category: 'all');
    const [priceRange, setPriceRange] = useState({ min: null, max: null });
    const [sort, setSort] = useState('');

    // filter
    // ==== Search ====
    const [search, setSearch] = useState('')
    const filteredProducts = useMemo(() => {
        if (!products?.products?.products) return [];

        let result = [...products.products.products];

        // Search
        if (search.trim()) {
            result = result.filter((product) =>
                product.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Category
        if (category !== "all") {
            result = result.filter(
                (product) =>
                    product.category.toLowerCase() === category.toLowerCase()
            );
        }

        // Min Price & Max Price
        if (priceRange.min !== null && priceRange.min !== "") {
            result = result.filter(
                (product) => product.price >= Number(priceRange.min)
            );
        }

        if (priceRange.max !== null && priceRange.max !== "") {
            result = result.filter(
                (product) => product.price <= Number(priceRange.max)
            );
        }

        // Sort
        if (sort === "price from min to max") {
            result.sort((a, b) => a.price - b.price);
        }

        if (sort === "price from max to min") {
            result.sort((a, b) => b.price - a.price);
        }

        if (sort === "rating") {
            result.sort((a, b) => {
                const ratingA = a.averageRating ?? 0;
                const ratingB = b.averageRating ?? 0;

                return ratingB - ratingA;
            });
        }
        return result;
    }, [products, search, category, priceRange, sort]);
    const clearFilter = () => {
        setCategory('all');
        setPriceRange({ min: null, max: null });
        setSort('')
        setSearch('')
    }

    const [openFilter, setOpenFilter] = useState(false)
    return (
        <>
            <section className="pt-15 pb-10 relative bg-gray-50 dark:bg-gray-950">
                <div className='container'>
                    <div className='flex items-center justify-start gap-2.5'>
                        <div className='md:hidden'>
                            <button onClick={() => setOpenFilter(true)} className="p-2.5 border border-gray-500/20 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-300 text-sm cursor-pointer hover:border-cyan-500/50 hover:text-cyan-500 gap-2 rounded-md flex items-center justify-center shrink-0">
                                <ListFilter size={17} /> filter
                            </button>
                        </div>
                        <div className='relative flex-1'>
                            <input type='search' value={search} onChange={(e) => setSearch(e.target.value)} autoComplete='off' name='search' placeholder='Search Product' className="block pl-8 w-full border border-gray-300 dark:border-gray-700 outline-0 p-2 rounded-md focus:border-cyan-500/70 transition duration-150 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500" />
                            <Search size={15} className="absolute top-2/4 -translate-y-2/4 left-3 text-gray-500 dark:text-gray-400" />
                        </div>
                    </div>
                    <div className='flex items-start justify-start gap-3'>
                        <div className={`max-w-55 relative
max-md:fixed max-md:z-10
max-md:bg-white dark:max-md:bg-gray-900
max-md:top-17
max-md:shadow-lg dark:max-md:shadow-black/40
p-4
max-md:h-screen
text-gray-900 dark:text-white
transition-all
${openFilter ? "max-md:left-0" : "max-md:-left-full"}`}>
                            <button onClick={() => setOpenFilter(false)} className='absolute top-3 right-3 text-gray-500 hover:text-gray-950 cursor-pointer md:hidden'>
                                <X size={19} />
                            </button>
                            <div className='mt-5'>
                                <h2 className='font-medium mb-2'>Category</h2>
                                <div className='flex flex-col gap-1'>
                                    <label htmlFor="all" className="opacity-80 dark:text-gray-300 flex items-center gap-2 cursor-pointer capitalize">
                                        <input onChange={(e) => setCategory(e.target.value)} checked={category === 'all'} value="all" type="radio" id='all' name="category" className='text-brand-600 focus:ring-brand-500' /> all
                                    </label>
                                    <label htmlFor="home" className="opacity-80 dark:text-gray-300 flex items-center gap-2 cursor-pointer capitalize">
                                        <input onChange={(e) => setCategory(e.target.value)} checked={category === 'home'} value="home" type="radio" id='home' name="category" className='text-brand-600 focus:ring-brand-500' /> home
                                    </label>
                                    <label htmlFor="fashion" className="opacity-80 dark:text-gray-300 flex items-center gap-2 cursor-pointer capitalize">
                                        <input onChange={(e) => setCategory(e.target.value)} checked={category === 'fashion'} value="fashion" type="radio" id='fashion' name="category" className='text-brand-600 focus:ring-brand-500' /> fashion
                                    </label>
                                    <label htmlFor="electronics" className="opacity-80 dark:text-gray-300 flex items-center gap-2 cursor-pointer capitalize">
                                        <input onChange={(e) => setCategory(e.target.value)} checked={category === 'electronics'} value="electronics" type="radio" id='electronics' name="category" className='text-brand-600 focus:ring-brand-500' /> electronics
                                    </label>
                                    <label htmlFor="phones" className="opacity-80 dark:text-gray-300 flex items-center gap-2 cursor-pointer capitalize">
                                        <input onChange={(e) => setCategory(e.target.value)} checked={category === 'phones'} value="phones" type="radio" id='phones' name="category" className='text-brand-600 focus:ring-brand-500' /> phones
                                    </label>
                                    <label htmlFor="sports" className="opacity-80 dark:text-gray-300 flex items-center gap-2 cursor-pointer capitalize">
                                        <input onChange={(e) => setCategory(e.target.value)} checked={category === 'sports'} value="sports" type="radio" id='sports' name="category" className='text-brand-600 focus:ring-brand-500' /> sports
                                    </label>
                                </div>
                            </div>
                            <div className='mt-5'>
                                <h2 className='font-medium mb-2'>Price Range</h2>
                                <div className='flex items-center gap-2.5'>
                                    <input type="number" value={priceRange.min ?? ''} onChange={(e) => setPriceRange((prev) => ({ ...prev, min: e.target.value }))} className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white block w-full rounded-md p-2 py-1.5 border border-gray-300 dark:border-gray-700 focus:border-cyan-500/70 outline-0" name='min' placeholder='min' />
                                    <input type="number" value={priceRange.max ?? ''} onChange={(e) => setPriceRange((prev) => ({ ...prev, max: e.target.value }))} className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white block w-full rounded-md p-2 py-1.5 border border-gray-300 dark:border-gray-700 focus:border-cyan-500/70 outline-0" name='max' placeholder='max' />
                                </div>
                            </div>
                            <div className='mt-5'>
                                <h2 className='font-medium mb-2'>Sort By</h2>
                                <div className="relative">
                                    <select
                                        name="sort"
                                        id="sort"
                                        value={sort}
                                        onChange={(e) => setSort(e.target.value)}
                                        className="w-full appearance-none rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2 pr-10 text-gray-800 dark:text-gray-100 shadow-sm outline-none transition-all focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 cursor-pointer"
                                    >
                                        <option value="">Default</option>
                                        <option value="price from min to max">Price (Low → High)</option>
                                        <option value="price from max to min">Price (High → Low)</option>
                                        <option value="rating">Rating</option>
                                    </select>

                                    <ChevronDown
                                        size={18}
                                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
                                    />
                                </div>
                            </div>
                            <div className="mt-5">
                                <button onClick={clearFilter} className="bg-white dark:bg-gray-900 shadow border border-gray-800/20 dark:border-gray-700 hover:border-cyan-500/50 hover:text-cyan-500 transition-all duration-150 inline-flex items-center justify-center px-3 py-2 text-sm rounded-full cursor-pointer capitalize dark:text-gray-200">clear all filter</button>
                            </div>
                        </div>
                        <div className="grid flex-1 mt-5 relative grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                            {
                                products.loading || !products.products ? (
                                    <SkeletonDemo />
                                ) : (
                                    filteredProducts.length !== 0 ? (
                                        Array.from(filteredProducts).map((product) => (
                                            <div key={product._id}>
                                                <Card product={product} wishlist={wishlists} />
                                            </div>
                                        ))
                                    ) : (
                                        <div className="col-span-full flex flex-col items-center justify-center py-20 px-6 text-center">

                                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cyan-100 dark:bg-cyan-900/30">
                                                <Search className="h-10 w-10 text-cyan-600 dark:text-cyan-400" />
                                            </div>

                                            <h2 className="mt-6 text-2xl font-semibold text-gray-800 dark:text-white">
                                                No Products Found
                                            </h2>

                                            <p className="mt-2 max-w-md text-gray-500 dark:text-gray-400">
                                                We couldn't find any products matching your search or filters.
                                                Try changing the category, price range, or search keyword.
                                            </p>

                                        </div>
                                    )
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