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
  const token = localStorage.getItem("dashboard-token") || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNWZjYjczNDQzMTFkYzY1YTdkZDU0MiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc4NDczNTQ0NywiZXhwIjoxNzg1MTY3NDQ3fQ.DRKuKNRqqmCEO-PMus55IPVVhwJgxI5huAGwW8FkC8Y";

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