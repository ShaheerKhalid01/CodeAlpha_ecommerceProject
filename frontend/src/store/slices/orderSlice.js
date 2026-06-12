import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Order place karo
export const createOrder = createAsyncThunk(
    'order/create',
    async (orderData, { getState, rejectWithValue }) => {
        try {
            const { auth: { userInfo } } = getState()

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            }

            const { data } = await axios.post('/api/orders', orderData, config)
            return data
        } catch (error) {
            return rejectWithValue(error.response.data.message)
        }
    }
)

// My orders fetch karo
export const fetchMyOrders = createAsyncThunk(
    'order/myOrders',
    async (_, { getState, rejectWithValue }) => {
        try {
            const { auth: { userInfo } } = getState()

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            }

            const { data } = await axios.get('/api/orders/myorders', config)
            return data
        } catch (error) {
            return rejectWithValue(error.response.data.message)
        }
    }
)

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orders: [],
        order: null,
        loading: false,
        error: null,
        success: false
    },
    reducers: {
        resetOrder: (state) => {
            state.success = false
            state.error = null
            state.order = null
        }
    },
    extraReducers: (builder) => {
        builder
            // Create order
            .addCase(createOrder.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.order = action.payload
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            // My orders
            .addCase(fetchMyOrders.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchMyOrders.fulfilled, (state, action) => {
                state.loading = false
                state.orders = action.payload
            })
            .addCase(fetchMyOrders.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export const { resetOrder } = orderSlice.actions
export default orderSlice.reducer