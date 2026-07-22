import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useProducts from '../redux/useProduct'
import { Heart, LoaderCircle, Minus, Plus, ShoppingCart, Star, Trash, Trash2Icon, UserRound } from 'lucide-react'
import { toast } from 'react-toastify'
import axios from 'axios'
import Skeleton ,{SkeletonTheme} from 'react-loading-skeleton'
import { useCart } from '../context/CartContext'
import {
    getWishlist,
    removeFromWishlist,
    clearWishlist,
    addToCart,
    add_To_WishList,
} from "../services/wishlistService";
import usewishLists from '../redux/useWishList'
import { callWishList } from '../redux/callApi'
import { useDispatch } from 'react-redux'

const Product = () => {
    const [isDark,] = useState(localStorage.getItem('themes') === 'dark' || false)
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
                const token = localStorage.getItem("dashboard-token") ||
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNWZjYjczNDQzMTFkYzY1YTdkZDU0MiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc4NDczNTQ0NywiZXhwIjoxNzg1MTY3NDQ3fQ.DRKuKNRqqmCEO-PMus55IPVVhwJgxI5huAGwW8FkC8Y";
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

            const token = localStorage.getItem("dashboard-token") ||
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNTc5Zjg1YmFmOTJiNzU2ZDBiZmFmZiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc4NDIxMjU3MywiZXhwIjoxNzg0NjQ0NTczfQ.6BukOZHxtSuRxbCubJwkVayLEvesQSgQjRmKOKJKh_s";
            const res = await axios.delete(`https://e-commerce-api-3wara.vercel.app/products/${productId}/reviews/${reviewId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            toast.success("Success Deleted");
            set_User_Review(review => review.filter(r => r._id !== reviewId))
        } catch (error) {
            toast.error(error.response.data.message);

        } finally {
            setLoadingReviewDelete(false)
        }
    }
    // add to cart
    const { addItem, actionLoading } = useCart();
    const addToCart = async (e) => {
        const res = await addItem(e._id, amount);
        res.success ? toast.success("Product added successfully!") : toast.error("Something went wrong!");
    }

    // Wishlist
    const wishlist = usewishLists();
    const [Wloading, setLoading] = useState(false);
    const [isWishlist, setIsWishList] = useState(false)

    useEffect(() => {
        if (!wishlist.loading) {
            const exists = wishlist?.wishlist?.wishlist?.products?.some(
                (item) => item._id === currentProduct._id
            );

            setIsWishList(exists);
        }
    }, [wishlist, currentProduct]);

    const dispatch = useDispatch()
    const add_To_wishList = async (product) => {
        try {
            setLoading(true);

            const res = await add_To_WishList(product._id);

            if (res.success) {
                toast.success("Added to wishlist");
                await dispatch(callWishList());
            } else {
                toast.error(res.message || "Something went wrong");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <section className="pt-15 pb-10 relative bg-white dark:bg-gray-950 transition">
                <div className='container'>
                    {loading ? (
                            <SkeletonTheme
                                baseColor={isDark ? "#1f2937" : "#ebebeb"}
                                highlightColor={isDark ? "#374151" : "#f5f5f5"}
                            >
                                <div className="grid lg:grid-cols-2 gap-8">
                                    {/* Images */}
                                    <div>
                                        <Skeleton height={420} borderRadius={16} />

                                        <div className="flex gap-3 mt-4">
                                            {[...Array(4)].map((_, index) => (
                                                <Skeleton
                                                    key={index}
                                                    width={80}
                                                    height={80}
                                                    borderRadius={12}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Details */}
                                    <div>
                                        <Skeleton height={36} width="70%" />

                                        <div className="flex gap-2 mt-4">
                                            {[...Array(5)].map((_, index) => (
                                                <Skeleton key={index} circle width={18} height={18} />
                                            ))}
                                        </div>

                                        <Skeleton width={120} height={28} className="mt-5" />

                                        <Skeleton count={3} className="mt-5" />

                                        <Skeleton height={45} width={170} className="mt-8" />
                                    </div>
                                </div>
                            </SkeletonTheme>
                    ) : (
                        <div className="grid lg:grid-cols-2 gap-5">
                            <div>
                                <div className="relative">
                                    <span
                                        className={`inline-flex absolute top-2/4 left-2/4 -translate-1/2 w-fit rounded-lg px-3 py-1 text-sm ${currentProduct.stock > 0
                                            ? "bg-green-500 text-white"
                                            : "bg-white dark:bg-gray-800 text-red-600 dark:text-red-400"
                                            }`}
                                    >
                                        {currentProduct.stock > 0
                                            ? `${currentProduct.stock} In Stock`
                                            : "Out Of Stock"}
                                    </span>

                                    <img
                                        src={currentProduct.images[activeImage].url}
                                        alt={currentProduct.name}
                                        className="w-full h-80 sm:h-90 md:h-96 lg:h-[450px] object-cover rounded-md p-3.5 bg-white dark:bg-gray-900 shadow border border-gray-100 dark:border-gray-800"
                                    />
                                </div>

                                <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-6 md:gap-3">
                                    {currentProduct.images.map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setActiveImage(index)}
                                            className={`overflow-hidden cursor-pointer rounded-lg border-2 transition ${activeImage === index
                                                ? "border-cyan-500"
                                                : "border-white dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600"
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
                                <button
                                    onClick={() => add_To_wishList(currentProduct)}
                                    disabled={Wloading || isWishlist}
                                    className="group cursor-pointer rounded-lg absolute top-0 right-3 bg-gray-900/5 dark:bg-white/10 p-2.5 transition  hover:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {Wloading ? (
                                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
                                    ) : (
                                        <Heart
                                            size={20}
                                            className={`${isWishlist
                                                ? "fill-red-500 text-red-500"
                                                : "text-gray-700 dark:text-gray-300"
                                                }`}
                                        />
                                    )}
                                </button>

                                <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
                                    {currentProduct.name}
                                </h1>

                                <div className="flex items-center justify-start gap-5">
                                    <span className="bg-gray-400/20 dark:bg-gray-700 text-sm px-3 inline-flex items-center justify-center py-1 rounded-full text-gray-700 dark:text-gray-200">
                                        {currentProduct.category}
                                    </span>

                                    <span className="bg-gray-400/20 dark:bg-gray-700 text-sm px-3 inline-flex items-center justify-center py-1 rounded-full text-gray-700 dark:text-gray-200">
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
                                                    : "fill-gray-300 dark:fill-gray-600 text-gray-300 dark:text-gray-600"
                                                    }`}
                                            />
                                        ))}
                                    </div>

                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                        {currentProduct.averageRating.toFixed(1)}
                                    </span>

                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        ({currentProduct.numReviews} reviews)
                                    </span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                                        ${currentProduct.discountPrice}
                                    </span>

                                    <del className="text-lg text-gray-400 dark:text-gray-500">
                                        ${currentProduct.price}
                                    </del>
                                </div>

                                <div>
                                    <div className="flex w-fit items-center overflow-hidden rounded-lg bg-gray-900/10 dark:bg-gray-800">
                                        <button
                                            onClick={() => setAmount((prev) => Math.max(1, prev - 1))}
                                            className="p-3 transition cursor-pointer hover:bg-gray-800/15 dark:hover:bg-gray-700"
                                        >
                                            <Minus size={18} className="dark:text-white" />
                                        </button>

                                        <span className="min-w-14 text-center font-semibold dark:text-white">
                                            {amount}
                                        </span>

                                        <button
                                            onClick={() => setAmount((prev) => prev + 1)}
                                            className="p-3 transition cursor-pointer hover:bg-gray-800/15 dark:hover:bg-gray-700"
                                        >
                                            <Plus size={18} className="dark:text-white" />
                                        </button>
                                    </div>

                                    <div className="flex items-center mt-5 gap-3">
                                        <button
                                            onClick={() => addToCart(currentProduct)}
                                            disabled={actionLoading}
                                            className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                                        >
                                            {actionLoading ? (
                                                <>
                                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                                    Adding...
                                                </>
                                            ) : (
                                                <>
                                                    <ShoppingCart size={18} />
                                                    Add To Cart
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                                        Description
                                    </h2>

                                    <p className="leading-8 text-gray-600 dark:text-gray-300">
                                        {currentProduct.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="container mt-16">
                    <div className="max-w-2xl rounded-2xl transition bg-white dark:bg-gray-900 p-6 shadow border border-gray-100 dark:border-gray-800">

                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Reviews ({currentProduct.numReviews})
                        </h2>

                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Share your experience with this product.
                        </p>

                        <div className="mt-6">
                            <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
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
                                            className={
                                                index < rate
                                                    ? "fill-yellow-300 text-yellow-300"
                                                    : "fill-gray-300 dark:fill-gray-600 text-gray-300 dark:text-gray-600"
                                            }
                                        />
                                    </button>
                                ))}
                            </div>

                            <textarea
                                value={Review}
                                onChange={(e) => setReview(e.target.value)}
                                placeholder="Write your review..."
                                className="mt-5 h-36 w-full resize-none rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 outline-none focus:border-cyan-500 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
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
                                        <LoaderCircle size={18} className="animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    "Submit Review"
                                )}
                            </button>
                        </div>



                        <div className="mt-8">
                            {user_reviews?.map((review) => (
                                <div
                                    key={review._id}
                                    className="mt-5 relative rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow p-4"
                                >
                                    <div className="flex items-start gap-3 border-b border-gray-200 dark:border-gray-700 pb-3">
                                        <UserRound
                                            size={15}
                                            className="w-11 h-11 text-blue-700 dark:text-blue-400 shrink-0 p-3 bg-blue-700/10 dark:bg-blue-500/20 rounded-full"
                                        />

                                        <div>
                                            <h2 className="font-medium text-gray-900 dark:text-white">
                                                {review.username}
                                            </h2>

                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                {new Date(review.createdAt).toLocaleDateString(
                                                    "en-US",
                                                    {
                                                        day: "numeric",
                                                        month: "long",
                                                        year: "numeric",
                                                    }
                                                )}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-1 mt-3">
                                        {[1, 2, 3, 4, 5].map((star, index) => (
                                            <Star
                                                key={index}
                                                size={15}
                                                className={
                                                    index < review.rating
                                                        ? "fill-yellow-300 text-yellow-300"
                                                        : "fill-gray-300 dark:fill-gray-600 text-gray-300 dark:text-gray-600"
                                                }
                                            />
                                        ))}
                                    </div>

                                    <p className="mt-3 text-gray-600 dark:text-gray-300 leading-7">
                                        {review.comment}
                                    </p>

                                    <button
                                        onClick={() =>
                                            deleteReview(currentProduct._id, review._id)
                                        }
                                        className={`absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-lg border transition
                        ${loadingReviewDelete
                                                ? "border-red-500 text-red-500 opacity-20 cursor-not-allowed"
                                                : "border-red-500 text-red-500 hover:bg-red-500 hover:text-white cursor-pointer"
                                            }`}
                                    >
                                        {loadingReviewDelete ? (
                                            <LoaderCircle size={18} className="animate-spin" />
                                        ) : (
                                            <Trash2Icon size={18} />
                                        )}
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