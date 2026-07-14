import { Heart, ShoppingCart, Star } from "lucide-react"
import { Link } from "react-router-dom"

const Card = ({ product }) => {
    console.log(product)
    return (
        <>
            <div className="bg-white cursor-pointer relative rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group">
                {/* Image */}
                <div className="relative p-3">
                    <div className=" overflow-hidden rounded-t-xl">
                        <img
                            src={product.images[0].url}
                            alt={product.name}
                            className="w-full h-44 rounded-t-xl object-cover group-hover:scale-105 transition-transform duration-300"
                        />

                    </div>
                    {/* Category */}
                    <span className="absolute top-3 left-3 bg-white/90 text-gray-700 text-xs font-medium px-3 py-1 rounded-full shadow">
                        {product.category}
                    </span>

                    {/* Favorite */}
                    <button className="absolute cursor-pointer top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow hover:bg-red-50 transition">
                        <Heart size={20} className="text-gray-600 hover:text-red-500" />
                    </button>


                    <span
                        className={`absolute bottom-5 left-5 text-white text-xs font-semibold px-3 py-1 rounded-full ${product.stock === 0
                            ? "bg-red-500"
                            : "bg-green-500"
                            }`}
                    >
                        {product.stock === 0
                            ? "Out of Stock"
                            : `${product.stock} in stock`}
                    </span>

                </div>

                {/* Body */}
                <div className="px-4 pb-4 relative">
                    <div className="relative">
                        <Link to={`product/${product._id}`} className="absolute top-0 left-0 w-full h-full"></Link>
                        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                            {product.name}
                        </h3>

                        <div className="mt-3 flex items-center gap-2">
                            <div className="flex">
                                {[...Array(5)].map((_, index) => (
                                    <Star
                                        key={index}
                                        size={16}
                                        className={`${index < Math.round(product.averageRating)
                                                ? "fill-yellow-400 text-yellow-400"
                                                : "fill-gray-300 text-gray-300"
                                            }`}
                                    />
                                ))}
                            </div>

                            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                {product.averageRating.toFixed(1)}
                            </span>

                            <span className="text-sm text-gray-500">
                                ({product.numReviews} reviews)
                            </span>
                        </div>

                        <div className="flex items-center gap-3 mt-3">
                            <span className="text-xl font-bold text-indigo-600">
                                ${product.discountPrice}
                            </span>

                            {product.price !== product.discountPrice && (
                                <span className="text-sm text-gray-400 line-through">
                                    ${product.price}
                                </span>
                            )}
                        </div>
                    </div>

                    <button className={`${product.stock === 0 ? 'pointer-events-none opacity-30' : ''} w-full cursor-pointer flex justify-center items-center gap-3 mt-5 bg-indigo-600 text-white py-2 rounded-xl font-medium hover:bg-indigo-700 transition`}>
                        <ShoppingCart size={18} /> Add to Cart
                    </button>
                </div>
            </div>
        </>
    )
}

export default Card