import { ShoppingCart, Trash2 } from "lucide-react";

function WishlistItem({ product, onRemove, onAddCart, cartLoading, removeLoading }) {
  const image =
    product.images?.[0]?.url ||
    "https://via.placeholder.com/300";

  return (
    <div
      className="
        bg-white p-3 dark:bg-gray-900 cursor-pointer relative rounded-2xl shadow-md dark:shadow-black/30 overflow-hidden hover:shadow-xl transition-all duration-300 group border border-gray-100 dark:border-gray-800
      "
    >
      <img
        src={image}
        alt={product.name}
        className="
          w-full
          h-56
          object-cover
          rounded-xl
          transition
          duration-300
          p-2
          hover:scale-[1.03]
          mb-3
        "
      />

      <div>
        <h3
          className="
            font-semibold
            text-lg
            text-black
            dark:text-white
          "
        >
          {product.name}
        </h3>

        <p
          className="
            text-gray-500
            dark:text-gray-300
          "
        >
          {product.brand}
        </p>

        <div className="flex items-center gap-2 mt-3">
          {product.discountPrice ? (
            <>
              <span
                className="
                  text-gray-400
                  dark:text-gray-500
                  line-through
                  text-sm
                "
              >
                ${product.discountPrice}
              </span>

              <span
                className="
                  text-gray-400
                  dark:text-gray-500
                "
              >
                ${product.price}
              </span>
            </>
          ) : (
            <span
              className="
                font-bold
                text-black
                dark:text-white
              "
            >
              ${product.price}
            </span>
          )}
        </div>
      </div>

      <div className="flex gap-2 items-center mt-2">
        <button
          onClick={() => onAddCart(product._id)}
          disabled={cartLoading === product._id}
          className="flex-1 rounded-xl py-2 cursor-pointer flex items-center justify-center gap-2 bg-violet-600 text-white hover:bg-violet-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {cartLoading === product._id ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Adding...
            </>
          ) : (
            <>
              <ShoppingCart size={18} />
              Add Cart
            </>
          )}
        </button>
        <button
          onClick={() => onRemove(product._id)}
          disabled={removeLoading === product._id}
          className="border border-red-500/10 text-red-500 cursor-pointer bg-red-500/10 rounded-xl px-3 py-2.5 dark:hover:bg-red-900/30 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {removeLoading === product._id ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
          ) : (
            <Trash2 size={18} />
          )}
        </button>
      </div>
    </div>
  );
}

export default WishlistItem;