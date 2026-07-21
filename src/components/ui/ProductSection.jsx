import { Link } from "react-router-dom"
import Card from "./Card"
import HeadSec from "./HeadSec"
import SkeletonDemo from "./Skeleton"
import { CircleArrowRight } from "lucide-react"


const ProductSection = ({ products }) => {
    return (
        <div className="container py-2.5">
            <HeadSec
                Header={"Featured Products"}
                disc={"Handpicked just for you"}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {products.loading || !products.products ? (
                    <SkeletonDemo />
                ) : (
                    Array.from(products.products.products)
                        .slice(0, 4)
                        .map((product) => (
                            <div key={product._id}>
                                <Card product={product} />
                            </div>
                        ))
                )}
            </div>

            <div className="flex justify-end items-center mt-5">
                <Link
                    to="/shop"
                    className="group inline-flex items-center gap-2 mt-5 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2 shadow-sm hover:shadow-md text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-all duration-200"
                >
                    View All

                    <CircleArrowRight
                        size={18}
                        className="transition group-hover:translate-x-1"
                    />
                </Link>
            </div>
        </div>
    )
}

export default ProductSection