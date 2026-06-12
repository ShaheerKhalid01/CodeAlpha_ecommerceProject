import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// BASE_URL hata do — main.jsx mein set hai
// const BASE_URL = 'http://localhost:5000'

export const registerUser = createAsyncThunk(
    'auth/register',
    async ({ name, email, password }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post('/api/auth/register', {
                name, email, password
            })
            localStorage.setItem('userInfo', JSON.stringify(data))
            return data
        } catch (error) {
            return rejectWithValue(error.response.data.message)
        }
    }
)

export const loginUser = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            console.log('API call ho rahi hai!')
            const { data } = await axios.post('/api/auth/login', {
                email, password
            })
            console.log('Response:', data)
            localStorage.setItem('userInfo', JSON.stringify(data))
            return data
        } catch (error) {
            console.log('Error:', error.response)
            return rejectWithValue(error.response.data.message)
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userInfo: localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null,
        loading: false,
        error: null
    },
    reducers: {
        logout: (state) => {
            state.userInfo = null
            localStorage.removeItem('userInfo')
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false
                state.userInfo = action.payload
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false
                state.userInfo = action.payload
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export const { logout } = authSlice.actions
export default authSlice.reducer