// usewishLists.js
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { callWishList } from "./callApi";

export default function usewishLists() {
    const dispatch = useDispatch();
    const wishLists = useSelector((state) => state.wishlist);

    useEffect(() => {
        if (wishLists.loading) dispatch(callWishList());
    }, [dispatch]);

    return wishLists;
}