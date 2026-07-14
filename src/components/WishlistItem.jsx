import { ShoppingCart, Trash2 } from "lucide-react";

function WishlistItem({ product, onRemove, onAddCart }) {
  const image =
    product.images?.[0]?.url ||
    "https://via.placeholder.com/300";

  return (
    <div
      className="
        bg-white
        dark:bg-[#1e293b]
        rounded-2xl
        shadow-sm
        hover:shadow-lg
        transition
        duration-300
        border
        dark:border-slate-700
        p-4
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
          hover:scale-[1.03]
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

      <div className="flex gap-2">
        <button
          onClick={() => onAddCart(product._id)}
          className="
            flex-1
            text-white
            rounded-xl
            py-2
            flex
            items-center
            justify-center
            gap-2
            bg-violet-600
            hover:bg-violet-700
            transition
          "
        >
          <ShoppingCart size={18} />
          Add Cart
        </button>

        <button
          onClick={() => onRemove(product._id)}
          className="
            border
            rounded-xl
            px-3
            hover:bg-red-100
            dark:hover:bg-red-900/30
            transition
          "
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}

export default WishlistItem;