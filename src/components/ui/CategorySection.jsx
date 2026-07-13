import { useState } from "react";
import HeadSec from "./HeadSec"
import { Cpu, ShoppingBag, Smartphone } from "lucide-react";

const Category = () => {
    const [categories, setCategory] = useState([
        {
            icon: <Cpu  className='' size={25}/>,
            h3: 'electronics',
            counte: '5'
        }, {
            icon: <ShoppingBag className='' size={25} />,
            h3:'fashion',
            counte: '5'
        }, {
            icon: <Smartphone className='' size={25} />,
            h3:'phones',
            counte: '5'
        }, {
            icon: <ShoppingBag className='' size={25} />,
            h3:'beauty',
            counte: '5'
        }, {
            icon: <ShoppingBag className='' size={25} />,
            h3:'sports',
            counte: '5'
        }
    ]);

    return (
        <>
            <div className="container py-2.5">
                <HeadSec Header={'Shop by Category'} disc={'Browse our wide range of categories'} />
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {
                        categories.map((category,index) => (
                            <div key={index} className="relative">
                                <button className="cursor-pointer border border-gray-900/10 hover:border-blue-600 transition-all duration-150 rounded-lg flex flex-col items-center py-10 px-15 w-full bg-white">
                                    <div className="bg-blue-100 text-blue-800/70 rounded-lg p-3 mb-3">{category.icon}</div>
                                    <h3 className="font-medium text-md capitalize text-slate-800">{category.h3}</h3>
                                    <p className="text-sm opacity-50">{category.counte} products</p>
                                </button>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Category