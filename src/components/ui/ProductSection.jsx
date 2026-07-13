import { Link } from "react-router-dom"
import Card from "./Card"
import HeadSec from "./HeadSec"
import SkeletonDemo from "./Skeleton"
import { CircleArrowRight } from "lucide-react"


const ProductSection = ({ products }) => {
    //console.log(products.products.products[0].images[0])
    return (
        <div className="container py-2.5">
            <HeadSec Header={'Featured Products'} disc={'Handpicked just for you'} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {
                    products.loading ? (
                        <SkeletonDemo />
                    ) : (
                        Array.from(products.products.products).slice(0, 4).map((product) => (
                            <div key={product._id}>
                                <Card product={product} />
                            </div>
                        ))
                    )
                }
            </div>
            <div className="flex justify-end items-center mt-5">
                <Link
                    to="/all-product"
                    className="inline-flex mt-5 lowercase bg-white py-1.5 px-3 rounded-full shadow items-center gap-2 text-indigo-600 hover:text-indigo-700 transition-colors duration-200 group"
                >
                    View All
                    <CircleArrowRight
                        size={18}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                </Link>
            </div>
        </div>
    )
}

export default ProductSection