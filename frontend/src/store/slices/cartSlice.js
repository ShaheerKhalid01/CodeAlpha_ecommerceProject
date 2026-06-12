import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
        totalPrice: 0
    },
    reducers: {
        // Cart mein item add karo
        addToCart: (state, action) => {
            const item = action.payload
            const existItem = state.cartItems.find(x => x._id === item._id)

            if (existItem) {
                // Agar item already hai toh quantity badha do
                state.cartItems = state.cartItems.map(x =>
                    x._id === existItem._id ? item : x
                )
            } else {
                // Naya item add karo
                state.cartItems.push(item)
            }

            // Total price calculate karo
            state.totalPrice = state.cartItems.reduce(
                (acc, item) => acc + item.price * item.quantity, 0
            )
        },

        // Cart se item remove karo
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(
                x => x._id !== action.payload
            )

            // Total price recalculate karo
            state.totalPrice = state.cartItems.reduce(
                (acc, item) => acc + item.price * item.quantity, 0
            )
        },

        // Cart clear karo
        clearCart: (state) => {
            state.cartItems = []
            state.totalPrice = 0
        }
    }
})

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions
export default cartSlice.reducer