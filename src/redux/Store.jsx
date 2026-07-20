import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./productSlice";
import { wishlistSlide } from "./wishLisatSlide";

export const Store = configureStore({
    reducer:{
        products:productSlice.reducer,
        wishlist:wishlistSlide.reducer
    }
})