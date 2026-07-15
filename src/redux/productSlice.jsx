import { createSlice } from "@reduxjs/toolkit"
import { callProduct } from "./callApi"


export const productSlice = createSlice({
    name:'products',
    initialState:{
        products:[],
        loading:true,
        error:null
    },
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(callProduct.pending,(state) => {
            state.loading = true
        })
        builder.addCase(callProduct.fulfilled , (state,action) => {
            state.loading = false
            state.products = action.payload
        })
        builder.addCase(callProduct.rejected,(state , action) =>{
            state.loading = false
            state.error = action.payload || action.error.message
        })
    }
})