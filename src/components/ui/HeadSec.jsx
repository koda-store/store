const HeadSec = ({ Header, disc, style }) => {
    return (
        <div className="text-center mb-10">
            <h2
                className={`font-semibold max-sm:text-2xl max-md:text-3xl text-4xl ${style ?? "text-slate-800 dark:text-white"
                    }`}
            >
                {Header}
            </h2>

            <p
                className={`text-base max-md:text-sm ${style
                        ? `${style} opacity-75`
                        : "text-gray-500 dark:text-gray-400"
                    }`}
            >
                {disc}
            </p>
        </div>
    )
}

export default HeadSec