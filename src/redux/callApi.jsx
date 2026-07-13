import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"


export const callProduct = createAsyncThunk('products/callProducts',async() => {
    try {
            const req = await axios.get('https://e-commerce-api-3wara.vercel.app/products?page=1&limit=0')
            return req.data
    } catch (error) {
        return error.response
    }
})