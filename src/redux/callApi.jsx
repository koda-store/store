import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { getWishlist } from "../services/wishlistService"


export const callProduct = createAsyncThunk('products/callProducts', async () => {
    try {
        const req = await axios.get('https://e-commerce-api-3wara.vercel.app/products?page=1&limit=10')
        return req.data
    } catch (error) {
        return error.response
    }
})

export const callWishList = createAsyncThunk('wishlist/callWishList', async () => {
    try {
        const req = await getWishlist()
        return req
    } catch (error) {
        return error.response
    }
})
