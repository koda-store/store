import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useProducts from '../redux/useProduct'
import { Heart, LoaderCircle, Minus, Plus, ShoppingCart, Star, Trash, Trash2Icon, UserRound } from 'lucide-react'
import { toast } from 'react-toastify'
import axios from 'axios'
import Skeleton from 'react-loading-skeleton'

const Product = () => {
    const [amount, setAmount] = useState(1);
    const { id } = useParams()
    const { products, loading } = useProducts()
    const currentProduct = !loading ? products?.products.find((product) => product._id === id) : []
    const [activeImage, setActiveImage] = useState(0);
    const [rate, setRate] = useState(0)
    const [Review, setReview] = useState('')
    const [loadingReview, setLoadingReview] = useState(false);
    const [loadingReviewDelete, setLoadingReviewDelete] = useState(false);
    const [user_reviews, set_User_Review] = useState([]);

    useEffect(() => {
        set_User_Review(currentProduct.reviews)
    }, [currentProduct, id])

    const sendReview = async (e) => {
        e.preventDefault();
        if (rate !== 0 && Review.trim() !== "") {
            try {
                const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNDNjYmQ0MzMwYTZjN2ZkYWZlOTc1ZiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc4MzY5MjUyMSwiZXhwIjoxNzg0MTI0NTIxfQ.R_56JGHqS45xRPLbH-y_wqCIfGtBnbVGQ42PY2jBjos';
                setLoadingReview(true)
                const res = await axios.post(
                    `https://e-commerce-api-3wara.vercel.app/products/${currentProduct._id}/reviews`,
                    {
                        rating: rate,
                        comment: Review,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                toast.success("Success send review");
                setReview('')
                setRate(0)

            } catch (error) {
                toast.error(error.response.data.message);
            } finally {
                setLoadingReview(false)
            }
        } else {
            toast.error("All fields are required");
        }
    };

    const deleteReview = async (productId, reviewId) => {
        try {
            setLoadingReviewDelete(true)
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNDNjYmQ0MzMwYTZjN2ZkYWZlOTc1ZiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc4MzY5MjUyMSwiZXhwIjoxNzg0MTI0NTIxfQ.R_56JGHqS45xRPLbH-y_wqCIfGtBnbVGQ42PY2jBjos';

            const res = await axios.delete(`https://e-commerce-api-3wara.vercel.app/products/${productId}/reviews/${reviewId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            toast.success("Success Deleted");
            set_User_Review(review => review.filter(r => r._id !== reviewId))
        } catch (error) {
            toast.error(error.response.message);
        } finally {
            setLoadingReviewDelete(false)
        }
    }
    return (
        <>
            <section className='pt-30 pb-10 relative'>
                <div className='container'>
                    {loading ? (
                        <div className='grid lg:grid-cols-2 gap-5'>
                            <Skeleton height={350} />
                            <Skeleton height={350} />
                        </div>
                    ) : (
                        <div className='grid lg:grid-cols-2 gap-5'>
                            <div>
                                <div className='relative'>
                                    <span
                                        className={`inline-flex absolute top-2/4 left-2/4 -translate-1/2 w-fit rounded-lg px-3 py-1 text-sm ${currentProduct.stock > 0
                                            ? "bg-green-500 text-white"
                                            : "bg-white text-red-600"
                                            }`}
                                    >
                                        {currentProduct.stock > 0
                                            ? `${currentProduct.stock} In Stock`
                                            : "Out Of Stock"}
                                    </span>
                                    <img src={currentProduct.images[activeImage].url} alt={currentProduct.name} className='w-full h-80 sm:h-90 md:h-96 lg:h-[450px] object-cover rounded-md p-3.5 bg-white shadow' />
                                </div>
                                <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-6 md:gap-3">
                                    {currentProduct.images.map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setActiveImage(index)}
                                            className={`overflow-hidden cursor-pointer rounded-lg border-2 transition ${activeImage === index
                                                ? "border-cyan-500"
                                                : "border-white hover:border-gray-300"
                                                }`}
                                        >
                                            <img
                                                src={image.url}
                                                alt={`${currentProduct?.name} ${index + 1}`}
                                                className="h-16 w-full object-cover sm:h-20"
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col gap-5 relative">
                                <button className="rounded-lg absolute top-0 right-3 bg-gray-900/5 cursor-pointer p-2.5 transition opacity-55 hover:opacity-85">
                                    <Heart size={20} />
                                </button>
                                <h1 className="text-3xl font-semiBold text-gray-900">
                                    {currentProduct.name}
                                </h1>

                                <div className='flex items-center justify-start gap-5'>
                                    <span className='bg-gray-400/20 text-sm px-3 inline-flex items-center justify-center py-1 rounded-full'>
                                        {currentProduct.category}
                                    </span>
                                    <span className='bg-gray-400/20 text-sm px-3 inline-flex items-center justify-center py-1 rounded-full'>
                                        {currentProduct.subcategory}
                                    </span>
                                </div>
                                <div className="mt-3 flex items-center gap-2">
                                    <div className="flex">
                                        {[...Array(5)].map((_, index) => (
                                            <Star
                                                key={index}
                                                size={18}
                                                className={`${index < Math.round(currentProduct.averageRating)
                                                    ? "fill-yellow-400 text-yellow-400"
                                                    : "fill-gray-300 text-gray-300"
                                                    }`}
                                            />
                                        ))}
                                    </div>

                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                        {currentProduct.averageRating.toFixed(1)}
                                    </span>

                                    <span className="text-sm text-gray-500">
                                        ({currentProduct.numReviews} reviews)
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl font-bold text-blue-600">
                                        ${currentProduct.discountPrice}
                                    </span>

                                    <del className="text-lg text-gray-400">
                                        ${currentProduct.price}
                                    </del>
                                </div>

                                <div className="">
                                    <div className="flex w-fit items-center overflow-hidden rounded-lg bg-gray-900/10">
                                        <button
                                            onClick={() => setAmount((prev) => Math.max(1, prev - 1))}
                                            className="p-3 transition cursor-pointer hover:bg-gray-800/15"
                                        >
                                            <Minus size={18} />
                                        </button>

                                        <span className="min-w-14 text-center font-semibold">
                                            {amount}
                                        </span>

                                        <button
                                            onClick={() => setAmount((prev) => prev + 1)}
                                            className="p-3 transition cursor-pointer hover:bg-gray-800/15"
                                        >
                                            <Plus size={18} />
                                        </button>
                                    </div>

                                    <div className='flex items-center mt-5 gap-3'>
                                        <button className="flex items-center cursor-pointer gap-2 rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700">
                                            <ShoppingCart size={18} />
                                            Add To Cart
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="mb-2 text-lg font-semibold">
                                        Description
                                    </h2>

                                    <p className="leading-8 text-gray-600">
                                        {currentProduct.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="container mt-16">
                    <div className="max-w-2xl rounded-2xl">
                        <h2 className="text-xl font-semibold">
                            Reviews ({currentProduct.numReviews})
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Share your experience with this product.
                        </p>

                        <div className="mt-6">
                            <h3 className="mb-3 text-lg font-semibold">
                                Write a Review
                            </h3>

                            <div className="flex items-center gap-2">
                                {[1, 2, 3, 4, 5].map((star, index) => (
                                    <button
                                        key={star}
                                        onClick={() => setRate(index + 1)}
                                        className="transition hover:scale-110 cursor-pointer"
                                    >
                                        <Star
                                            size={20}
                                            className={`${index < rate ? 'fill-yellow-300 text-yellow-300' : 'fill-gray-300 text-gray-300'}`}
                                        />
                                    </button>
                                ))}
                            </div>

                            {/* Comment */}
                            <textarea
                                value={Review}
                                onChange={(e) => setReview(e.target.value)}
                                placeholder="Write your review..."
                                className="mt-5 h-36 w-full resize-none rounded-xl border border-gray-300 bg-transparent p-4 outline-none focus:border-cyan-500"
                            />

                            <button
                                onClick={sendReview}
                                disabled={loadingReview}
                                className={`mt-5 flex items-center justify-center gap-2 rounded-md px-6 py-2 font-medium text-white transition
                                ${loadingReview
                                        ? "bg-blue-600/20 cursor-not-allowed"
                                        : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                                    }`}
                            >
                                {loadingReview ? (
                                    <>
                                        <LoaderCircle size={18} className="animate-spin" size={18} />
                                        Submitting...
                                    </>
                                ) : (
                                    "Submit Review"
                                )}
                            </button>
                        </div>

                        <div>
                            {user_reviews?.map((review) => (
                                <div key={review._id} className='mt-5 relative shadow p-3 border border-black/10 rounded-lg '>
                                    <div className='flex items-start gap-2.5 border-b border-gray-300 pb-3'>
                                        <UserRound size={15} className='w-11 h-11 text-blue-700 shrink-0 p-3 bg-blue-700/10 rounded-full' />
                                        <div>
                                            <h2>{review.username}</h2>
                                            <p className='text-xs text-gray-500'>{
                                                new Date(review.createdAt).toLocaleDateString("en-US", {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                })
                                            }</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-1 mt-3">
                                        {[1, 2, 3, 4, 5].map((star, index) => (
                                            <Star
                                                key={index}
                                                size={15}
                                                className={`${index < review.rating ? 'fill-yellow-300 text-yellow-300' : 'fill-gray-300 text-gray-300'}`}
                                            />
                                        ))}
                                    </div>

                                    <p className='mt-3 text-gray-500'>{review.comment}</p>
                                    <button onClick={() => deleteReview(currentProduct._id, review._id)} className={`w-7 h-7 border hover:opacity-100 transition-all absolute top-3 right-3 rounded-md  flex justify-center items-center bg-white 
                                        ${loadingReviewDelete
                                            ? "border-red-500 text-red-500 opacity-20 cursor-not-allowed"
                                            : "border-red-500 text-red-500 opacity-50 cursor-pointer"
                                        }`}>
                                        {loadingReviewDelete? <LoaderCircle size={18} className="animate-spin" size={18} />: <Trash2Icon size={18} />}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Product