import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setIsLoadingGlobal } from "./isLoading.slice";

const productsSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
        setProductsGlobal: (state, action) => action.payload,
        ascendingProducts: state => {
            state.sort((a,b) => +a.price - +b.price)
        },
        descendingProducts: state => {
            state.sort((a,b) => +b.price - +a.price)
        }
    }
})

export const { setProductsGlobal, ascendingProducts, descendingProducts } = productsSlice.actions
export default productsSlice.reducer

export const getAllProducts = () => (dispatch) => {
    dispatch(setIsLoadingGlobal(true))
    const URL =  'https://e-commerce-api.academlo.tech/api/v1/products'
    return axios.get(URL)
        .then(res => dispatch(setProductsGlobal(res.data.data.products)))
        .catch(err => console.log(err))
        .finally(()=> dispatch(setIsLoadingGlobal(false)))
}

export const getProductsByCategory = id => (dispatch) => {
    const URL = `https://e-commerce-api.academlo.tech/api/v1/products?category=${id}`
    return axios.get(URL)
        .then(res => dispatch(setProductsGlobal(res.data.data.products)))
        .catch(err => console.log(err))
}