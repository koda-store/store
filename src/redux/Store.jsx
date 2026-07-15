import { configureStore } from "@reduxjs/toolkit";
import { productSlice } from "./productSlice";

export const Store = configureStore({
    reducer:{
        products:productSlice.reducer
    }
})