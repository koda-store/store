
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Minus, Plus, Trash2, Tag, X, ArrowLeft } from "lucide-react";
import { useCart } from "../context/CartContext";

function Cart() {
  const [id, setId] = useState(null)
  const {
    items,
    cart,
    loading,
    actionLoading,
    error,
    updateQuantity,
    removeItem,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    setCouponError("");
    const result = await applyCoupon(couponCode.trim());
    if (result.success) {
      setCouponCode("");
    } else {
      setCouponError(result.message);
    }
  };

  if (loading && !error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[45vh] mt-17 text-center px-4 max-w-md mx-auto">
        <div className="mb-3">
          <ShoppingCart className="w-12 h-12 text-blue-600" strokeWidth={1.2} />
        </div>
        <h2 className="text-xl font-bold text-gray-650 dark:text-gray-200 mb-2">
          Your cart is empty
        </h2>
        <p className="text-[13px] text-gray-400 dark:text-gray-400 mb-8 leading-relaxed max-w-[320px] pb-4">
          Looks like you haven't added anything to your cart yet. Start shopping and find something you love!
        </p>
        <Link
          to="/shop"
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-6 py-2.5 rounded-md shadow-sm transition-colors tracking-wide"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  const subtotal = cart?.subtotal ?? cart?.total ?? 0;
  const shipping = subtotal > 1000 ? 0 : 50;
  const tax = subtotal * 0.14;
  const discount = cart?.discount ?? 0;
  const finalTotal = (subtotal + shipping + tax - discount).toFixed(0);

  return (
    <div className="max-w-6xl mx-auto px-4 pt-6 pb-12 mt-17">

      <h1 className="text-base md:text-lg font-bold text-gray-800 dark:text-gray-100 mb-5 tracking-tight text-left">
        Shopping Cart
      </h1>

      {error && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300 text-sm flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => window.location.reload()} className="text-red-400 hover:text-red-600 font-bold px-2">
            ✕
          </button>
        </div>
      )}

      <div className="flex flex-col lg:flex-row items-start gap-8">

        <div className="flex-1 w-full flex flex-col gap-6">

          <div className="flex flex-col gap-4">
            {items.map((item) => {
              const targetProductId = item.product;

              return (
                <div
                  key={item._id || targetProductId}
                  className="flex items-center gap-4 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-4 shadow-sm relative group"
                >
                  <img
                    src={item.image}
                    alt={item.name || "Product"}
                    className="w-20 h-20 object-cover rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600"
                  />

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-gray-800 dark:text-gray-100 truncate">
                      {item.name}
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400 text-xs font-bold mt-1">
                      EGP {item.price}
                    </p>

                    <div className="flex items-center border border-gray-200 dark:border-gray-600 rounded-lg w-fit mt-3 bg-gray-50/50">
                      <button
                        onClick={() => {
                          if (item.quantity > 1) {
                            updateQuantity(targetProductId, item.quantity - 1);
                          }
                        }}
                        disabled={actionLoading || item.quantity <= 1}
                        className="px-2.5 py-1 disabled:opacity-30 text-gray-500 hover:bg-gray-100 rounded-l-lg transition"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 text-xs font-bold text-gray-700 dark:text-gray-100">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => {
                          setId(targetProductId)
                          updateQuantity(targetProductId, item.quantity + 1)
                        }}
                        disabled={actionLoading}
                        className="px-2.5 py-1 disabled:opacity-30 text-gray-500 hover:bg-gray-100 rounded-r-lg transition"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <div className="text-right flex flex-col items-end gap-4 min-w-[80px]">
                    <button
                      onClick={() => {
                        setId(targetProductId)
                        removeItem(targetProductId)
                      }}
                      disabled={actionLoading}
                      className="text-gray-400 cursor-pointer hover:text-red-500 p-1 rounded-md hover:bg-gray-50 transition opacity-80 group-hover:opacity-100"
                      aria-label="Remove item"
                    >
                      {actionLoading && id === targetProductId ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                    <span className="font-bold text-sm text-gray-800 dark:text-gray-100">
                      EGP {item.price * item.quantity}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5 shadow-sm">
            <span className="flex items-center gap-2 text-xs font-bold text-gray-700 dark:text-gray-300 mb-3">
              <Tag className="w-4 h-4 text-gray-400" />
              Coupon Code
            </span>

            {cart?.coupon ? (
              <div className="flex items-center justify-between bg-blue-50/60 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-4 py-2.5 rounded-lg text-xs font-semibold">
                <span className="flex items-center gap-1.5">
                  Code: <strong className="text-blue-800 dark:text-blue-200">{cart.coupon.code || cart.coupon}</strong>
                </span>
                <button onClick={() => removeCoupon()} className="hover:text-red-500 transition">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-3">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                  className="flex-1 px-4 py-2 text-xs border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  disabled={actionLoading || !couponCode.trim()}
                  className="px-6 py-2 text-xs font-bold text-blue-600 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition disabled:opacity-40"
                >
                  Apply
                </button>
              </form>
            )}
            {couponError && (
              <p className="text-red-500 text-xs mt-2 pl-1">{couponError}</p>
            )}
          </div>

          <Link to="/shop" className="flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700 transition w-fit pl-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            Continue Shopping
          </Link>
        </div>

        <div className="w-full lg:w-80 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-5 shadow-sm">
          <h2 className="font-extrabold text-sm text-gray-800 dark:text-gray-100 mb-5 tracking-tight">
            Order Summary
          </h2>

          <div className="flex flex-col gap-3.5 text-xs border-b border-gray-100 dark:border-gray-700 pb-4">
            <div className="flex justify-between text-gray-500 dark:text-gray-400 font-medium">
              <span>Subtotal</span>
              <span className="font-bold text-gray-700 dark:text-gray-200">EGP {subtotal}</span>
            </div>

            <div className="flex justify-between text-gray-500 dark:text-gray-400 font-medium">
              <span>Shipping</span>
              <span className="font-bold text-gray-700 dark:text-gray-200">EGP {shipping}</span>
            </div>

            <p className="text-[10px] text-gray-400 dark:text-gray-500 -mt-2 leading-tight">
              Free shipping on orders over EGP 1,000
            </p>

            <div className="flex justify-between text-gray-500 dark:text-gray-400 font-medium">
              <span>Tax (14%)</span>
              <span className="font-bold text-gray-700 dark:text-gray-200">EGP {tax.toFixed(0)}</span>
            </div>

            {cart?.discount ? (
              <div className="flex justify-between text-green-600 font-semibold">
                <span>Discount</span>
                <span>-EGP {discount}</span>
              </div>
            ) : null}
          </div>

          <div className="flex justify-between font-extrabold text-gray-900 dark:text-gray-100 text-sm py-4">
            <span>Total</span>
            <span className="text-blue-600 dark:text-blue-400 font-black text-base">EGP {finalTotal}</span>
          </div>

          <div className="flex flex-col gap-3 mt-2">
            <Link
              to="/checkout"
              className="w-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold py-3 rounded-lg transition-all duration-200 text-center text-xs tracking-wide shadow-sm block"
            >
              Proceed to Checkout
            </Link>

            <Link
              to="/shop"
              className="w-full text-center text-xs font-bold text-blue-600 hover:text-blue-700 transition py-1.5"
            >
              Continue Shopping
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Cart;

