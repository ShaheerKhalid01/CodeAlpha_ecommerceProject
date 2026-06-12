import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const BASE_URL = 'http://localhost:5000'

// Saare products fetch karo
export const fetchProducts = createAsyncThunk(
    'products/fetchAll',
    async () => {
        const { data } = await axios.get(`${BASE_URL}/api/products`)
        return data
    }
)

// Ek product fetch karo
export const fetchProductById = createAsyncThunk(
    'products/fetchOne',
    async (id) => {
        const { data } = await axios.get(`${BASE_URL}/api/products/${id}`)
        return data
    }
)

const productSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        product: null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Saare products
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false
                state.products = action.payload
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            // Ek product
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true
                state.error = null
                state.product = null
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false
                state.product = action.payload
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    }
})

export default productSlice.reducer