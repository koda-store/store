import { createSlice } from "@reduxjs/toolkit"
import { callWishList } from "./callApi"


export const wishlistSlide = createSlice({
    name:'wishlist',
    initialState:{
        wishlist:[],
        loading:true,
        error:null
    },
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(callWishList.pending,(state) => {
            state.loading = true
        })
        builder.addCase(callWishList.fulfilled , (state,action) => {
            state.loading = false
            state.wishlist = action.payload
        })
        builder.addCase(callWishList.rejected,(state , action) =>{
            state.loading = false
            state.error = action.payload || action.error.message
        })
    }
})