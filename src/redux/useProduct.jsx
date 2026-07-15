// useProducts.js
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { callProduct } from "./callApi";

export default function useProducts() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    if(products.loading) dispatch(callProduct());
  }, [dispatch]);

  return products;
}