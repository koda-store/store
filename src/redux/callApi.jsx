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
        const token = localStorage.getItem("dashboard-token") ||  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNWZjYjczNDQzMTFkYzY1YTdkZDU0MiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc4NDczNTQ0NywiZXhwIjoxNzg1MTY3NDQ3fQ.DRKuKNRqqmCEO-PMus55IPVVhwJgxI5huAGwW8FkC8Y"
        const req = await axios.get('https://e-commerce-api-3wara.vercel.app/wishlists/my' , {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        return req.data
    } catch (error) {
        return error.response
    }
})
