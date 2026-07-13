const HeadSec = ({ Header, disc , style }) => {
    return (
        <div className="text-center mb-10">
            <h2 className={`font-semiBold max-sm:text-2xl mas-md:text-3xl text-4xl ${style??"text-slate-800"}`}>{Header}</h2>
            <p className={`text-base max-md:text-sm ${style? `${style} opacity-75`:'text-gray-500'}`}>{disc}</p>
        </div>
    )
}

export default HeadSec