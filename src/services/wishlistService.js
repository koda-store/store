import axios from "axios";
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
export const add_To_WishList = async (productId) => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNDNjYmQ0MzMwYTZjN2ZkYWZlOTc1ZiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc4NDIwODA5NSwiZXhwIjoxNzg0NjQwMDk1fQ.SVGnyiX8pl0TRavW6B5D8V4T8bJhyFY9zLV_0tt1t7o";

    const res = await axios.post(
      `https://e-commerce-api-3wara.vercel.app/wishlists/add/${productId}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data
}