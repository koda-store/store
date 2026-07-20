import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

function EmptyWishlist() {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        py-20
        text-center
      "
    >
      <Heart
        size={60}
        className="
          text-gray-300
          dark:text-gray-600
        "
      />

      <h2
        className="
          text-2xl
          font-semibold
          mt-5
          text-black
          dark:text-white
        "
      >
        Your wishlist is empty
      </h2>

      <p
        className="
          text-gray-500
          dark:text-gray-400
          mt-2
        "
      >
        Save items you love to your wishlist.
        <br />
        They'll be waiting for you here.
      </p>

      <Link to="/products">
        <button
          className="
            mt-6
            bg-violet-600
            text-white
            px-6
            py-3
            rounded-xl
            transition-all
            duration-300
            hover:bg-violet-700
            hover:scale-105
          "
        >
          Browse Products
        </button>
      </Link>
    </div>
  );
}

export default EmptyWishlist;