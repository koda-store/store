import { api } from "../api/axios";

// get wishlist
export const getWishlist = async () => {
  const response = await api.get("/wishlists/my");
  return response.data;
};

// remove product
export const removeFromWishlist = async (productId) => {
  const response = await api.delete(
    `/wishlists/remove/${productId}`
  );

  return response.data;
};

// clear wishlist
export const clearWishlist = async () => {
  const response = await api.delete(
    "/wishlists/clear"
  );

  return response.data;
};

export const addToCart = async (productId) => {

  const response = await api.post("/carts/items", {
    productId,
    quantity: 1
  });

  return response.data;

};