import { useEffect, useState } from "react";
import WishlistItem from "../components/WishlistItem";
import EmptyWishlist from "../components/EmptyWishlist";
import {
  getWishlist,
  removeFromWishlist,
  clearWishlist,
  addToCart,
} from "../services/wishlistService";

function Wishlist() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    try {
      const data = await getWishlist();

      setProducts(data.wishlist?.products || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleRemove = async (id) => {
    try {
      await removeFromWishlist(id);

      setProducts((prev) =>
        prev.filter((product) => product._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddCart = async (id) => {
    try {
      await addToCart(id);

      // ممكن نعرض toast هنا
    } catch (error) {
      console.log(error);
    }
  };

  const handleClear = async () => {
  try {
    await clearWishlist();

    setProducts([]);
  } catch (error) {
    console.log(error);
  }
};

  if (loading) {
    return (
      <div
        className="
          flex
          justify-center
          py-20
        "
      >
        <div
          className="
            animate-spin
            rounded-full
            h-10
            w-10
            border-b-2
            border-black
            dark:border-white
          "
        />
      </div>
    );
  }

  return (
    <div
      className="
        min-h-screen
        max-w-7xl
        mx-auto
        px-6
        py-10
        bg-white
        dark:bg-[#0f172a]
        transition-colors
        duration-300
      "
    >
      <div
        className="
          flex
          justify-between
          items-center
          mb-8
        "
      >
        <h1
          className="
            text-3xl
            font-bold
            text-black
            dark:text-white
          "
        >
          My Wishlist
        </h1>

        {products.length > 0 && (
          <button
            onClick={handleClear}
            className="
              text-red-500
              hover:text-red-600
              transition
            "
          >
            Clear All
          </button>
        )}
      </div>

      {products.length === 0 ? (
        <EmptyWishlist />
      ) : (
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-6
          "
        >
          {products.map((product) => (
            <WishlistItem
              key={product._id}
              product={product}
              onRemove={handleRemove}
              onAddCart={handleAddCart}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;