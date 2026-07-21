import { useEffect, useState } from "react";
import WishlistItem from "../components/WishlistItem";
import EmptyWishlist from "../components/EmptyWishlist";
import {
  getWishlist,
  removeFromWishlist,
  clearWishlist,
  addToCart,
} from "../services/wishlistService";
import usewishLists from "../redux/useWishList";
import { callWishList } from "../redux/callApi";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";

function Wishlist() {
  const { addItem } = useCart()
  const [products, setProducts] = useState([]);
  const productsW = usewishLists();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [load, setLoad] = useState(false)

  const [cartLoading, setCartLoading] = useState(null);
  const [removeLoading, setRemoveLoading] = useState(null);

  useEffect(() => {
    if (!productsW.loading) {
      setProducts(productsW?.wishlist?.wishlist?.products || []);
    }
  }, [productsW.loading, productsW.wishlist]);


  const handleRemove = async (id) => {
    setRemoveLoading(id)
    try {
      const res = await removeFromWishlist(id);

      if (res.success) {
        setProducts((prev) => prev.filter((product) => product._id !== id));
        toast.success("Product removed from wishlist");
        dispatch(callWishList())
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error.response?.data || error);
      toast.error("Something went wrong");
    } finally {
      setRemoveLoading(null)
    }
  };
  const handleAddCart = async (id) => {
    setCartLoading(id)
    try {
      const res = await addItem(id, 1);
      res.success ? toast.success("Product added successfully!") : toast.error("Something went wrong!");
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setCartLoading(null)
    }
  };

  const handleClear = async () => {
    try {
      setLoading(true);

      const res = await clearWishlist();

      if (res.success) {
        setProducts([]);
        toast.success("Wishlist cleared successfully");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error.response?.data || error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-8 bg-gray-50 dark:bg-gray-950 transition">
      <div className="max-w-7xl mx-auto px-5 py-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10 rounded-3xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-6">

          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              My Wishlist
            </h1>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Save your favorite products and access them anytime.
            </p>

            <span className="inline-flex mt-4 items-center rounded-full bg-indigo-100 dark:bg-indigo-500/20 px-3 py-1 text-sm font-medium text-indigo-700 dark:text-indigo-300">
              {products.length} {products.length === 1 ? "Item" : "Items"}
            </span>
          </div>

          {products.length > 0 && (
            <button
              onClick={handleClear}
              disabled={loading}
              className="px-6 py-2 cursor-pointer rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold transition-all duration-200 shadow-lg shadow-red-500/20 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Clearing...
                </>
              ) : (
                "Clear Wishlist"
              )}
            </button>
          )}
        </div>

        {/* Products */}
        {products.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 py-24 shadow-sm">
            <EmptyWishlist />
          </div>
        ) : (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {load ? (
              <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950">
                <div className="h-12 w-12 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin"></div>
              </div>
            ) : (
              products.map((product) => (
                <WishlistItem
                  key={product._id}
                  product={product}
                  onRemove={handleRemove}
                  onAddCart={handleAddCart}
                  cartLoading={cartLoading}
                  removeLoading={removeLoading}
                />
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default Wishlist;