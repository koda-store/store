import { useState } from "react";
import HeadSec from "./HeadSec"
import { Cpu, ShoppingBag, Smartphone } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Category = () => {
    const GoTo = useNavigate();

    const [categories, setCategory] = useState([
        {
            icon: <Cpu className='' size={25} />,
            h3: 'electronics',
            counte: '5'
        }, {
            icon: <ShoppingBag className='' size={25} />,
            h3: 'fashion',
            counte: '5'
        }, {
            icon: <Smartphone className='' size={25} />,
            h3: 'phones',
            counte: '5'
        }, {
            icon: <ShoppingBag className='' size={25} />,
            h3: 'beauty',
            counte: '5'
        }, {
            icon: <ShoppingBag className='' size={25} />,
            h3: 'sports',
            counte: '5'
        }
    ]);

    return (
        <>
            <div className="container py-2.5">
                <HeadSec
                    Header={"Shop by Category"}
                    disc={"Browse our wide range of categories"}
                />

                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {categories.map((category, index) => (
                        <div key={index}>
                            <button
                                onClick={() => GoTo(`shop/${category.h3}`)}
                                className="w-full cursor-pointer rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-lg hover:border-blue-600 transition-all duration-300 flex flex-col items-center py-10 px-8"
                            >
                                <div className="mb-4 rounded-xl bg-blue-100 dark:bg-blue-500/20 p-4 text-blue-700 dark:text-blue-400">
                                    {category.icon}
                                </div>

                                <h3 className="text-lg font-semibold capitalize text-slate-800 dark:text-white">
                                    {category.h3}
                                </h3>

                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    {category.counte} products
                                </p>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Category