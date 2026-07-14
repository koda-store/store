
import React, { useEffect, useState } from "react";
import { api } from "../api/axios";
import { useCart } from "../context/CartContext";
import { ShoppingCart, Check } from "lucide-react";
import { toast } from "react-toastify";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedId, setAddedId] = useState(null); 

  const { addItem, actionLoading } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get("/products");
        const list =
          res.data?.products || res.data?.data || res.data || [];
        setProducts(Array.isArray(list) ? list : []);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError(err.response?.data?.message || "Products could not be loaded");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    const result = await addItem(productId, 1);
    if (result.success) {
    
      setAddedId(productId);
      setTimeout(() => setAddedId(null), 1500);

      toast.success("Added to Cart ");
    } else {
    
      toast.error(result.message || "There was an error while adding to the card");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Products
      </h1>

      {products.length === 0 ? (
        <p className="text-gray-500">There are currently no products.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => {
            const id = product._id || product.id;
            const isAdded = addedId === id;
            return (
              <div
                key={id}
                className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm flex flex-col"
              >
                <img
                  src={product.image || product.images?.[0]}
                  alt={product.name}
                  className="w-full h-44 object-cover bg-gray-100 dark:bg-gray-700"
                />
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-1 truncate">
                    {product.name}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-bold mb-3">
                    {product.price} EGP
                  </p>

                  <button
                    onClick={() => handleAddToCart(id)}
                    disabled={actionLoading}
                    className={`mt-auto flex items-center justify-center gap-2 py-2 rounded-lg font-medium text-sm transition disabled:opacity-50 ${
                      isAdded
                        ? "bg-green-600 text-white"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" /> Add to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4" /> Add to Cart
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Products;