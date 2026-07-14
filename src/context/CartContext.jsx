
import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { api } from "../api/axios";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCart = useCallback(async () => {
    const token = localStorage.getItem("dashboard-token");
    if (!token) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/carts");
      setCart(res.data);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
      setError(err.response?.data?.message || "There was an error in loading the card");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addItem = useCallback(async (productId, quantity = 1) => {
    setActionLoading(true);
    setError(null);
    try {
      const res = await api.post("/carts/items", { productId, quantity });
      setCart(res.data);
      return { success: true };
    } catch (err) {
      console.error("Failed to add item:", err);
      const message = err.response?.data?.message || "Failed to add product to cart";
      setError(message);
      return { success: false, message };
    } finally {
      setActionLoading(false);
    }
  }, []);

  const updateQuantity = useCallback(async (productId, quantity) => {
    if (quantity < 1) return { success: false, message: "Quantity is not valid" };
    setActionLoading(true);
    setError(null);
    try {
      const res = await api.patch("/carts/items", { productId, quantity });
      setCart(res.data);
      return { success: true };
    } catch (err) {
      console.error("Failed to update quantity:", err);
      const message = err.response?.data?.message || "The quantity could not be modified";
      setError(message);
      return { success: false, message };
    } finally {
      setActionLoading(false);
    }
  }, []);

  const removeItem = useCallback(async (productId) => {
    setActionLoading(true);
    setError(null);
    try {
      const res = await api.delete(`/carts/items/${productId}`);
      setCart(res.data);
      return { success: true };
    } catch (err) {
      console.error("Failed to remove item:", err);
      const message = err.response?.data?.message || "The product could not be deleted";
      setError(message);
      return { success: false, message };
    } finally {
      setActionLoading(false);
    }
  }, []);

  const applyCoupon = useCallback(async (code) => {
    setActionLoading(true);
    setError(null);
    try {
      const res = await api.post("/carts/coupon", { code });
      setCart(res.data);
      return { success: true };
    } catch (err) {
      console.error("Failed to apply coupon:", err);
      const message = err.response?.data?.message || "The coupon is invalid";
      setError(message);
      return { success: false, message };
    } finally {
      setActionLoading(false);
    }
  }, []);

  const removeCoupon = useCallback(async () => {
    setActionLoading(true);
    setError(null);
    try {
      const res = await api.delete("/carts/coupon");
      setCart(res.data);
      return { success: true };
    } catch (err) {
      console.error("Failed to remove coupon:", err);
      const message = err.response?.data?.message || "The coupon could not be removed";
      setError(message);
      return { success: false, message };
    } finally {
      setActionLoading(false);
    }
  }, []);

  const clearCart = useCallback(async () => {
    setActionLoading(true);
    setError(null);
    try {
      const res = await api.delete("/carts/clear");
      setCart(res.data);
      return { success: true };
    } catch (err) {
      console.error("Failed to clear cart:", err);
      const message = err.response?.data?.message || "Card unloading failure";
      setError(message);
      return { success: false, message };
    } finally {
      setActionLoading(false);
    }
  }, []);

  const items = cart?.items || [];
  const itemsCount = items.reduce((sum, item) => sum + (item.quantity || 0), 0);

  const value = {
    cart,
    items,
    itemsCount,
    loading,
    actionLoading,
    error,
    fetchCart,
    addItem,
    updateQuantity,
    removeItem,
    applyCoupon,
    removeCoupon,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
