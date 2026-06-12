import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const ProfilePage = () => {
    const navigate = useNavigate()
    const { userInfo } = useSelector(state => state.auth)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    // Agar logged in nahi hai toh login pe bhejo
    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        } else {
            setName(userInfo.name)
            setEmail(userInfo.email)
        }
    }, [userInfo, navigate])

    const submitHandler = async (e) => {
        e.preventDefault()
        setMessage('')
        setError('')

        if (password !== confirmPassword) {
            setError('Passwords match nahi kar rahe!')
            return
        }

        try {
            setLoading(true)
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            }

            const { data } = await axios.put(
                'http://localhost:5000/api/auth/profile',
                { name, email, password },
                config
            )

            // LocalStorage update karo
            localStorage.setItem('userInfo', JSON.stringify(data))
            setMessage('Profile update ho gaya! ✅')
            setLoading(false)

        } catch (err) {
            setError(err.response?.data?.message || 'Kuch galat hua!')
            setLoading(false)
        }
    }

    return (
        <div className='flex justify-center items-center min-h-[70vh]'>
            <div className='bg-white rounded-2xl shadow-lg p-8 w-full max-w-md'>

                <h1 className='text-3xl font-bold mb-6 text-center'>
                    👤 My Profile
                </h1>

                {/* Success Message */}
                {message && (
                    <div className='bg-green-100 text-green-600 px-4 py-3 rounded-xl mb-4'>
                        {message}
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className='bg-red-100 text-red-600 px-4 py-3 rounded-xl mb-4'>
                        {error}
                    </div>
                )}

                <div className='flex flex-col gap-4'>

                    {/* Name */}
                    <div>
                        <label className='block text-gray-600 mb-1 font-medium'>
                            Name
                        </label>
                        <input
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className='w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500'
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className='block text-gray-600 mb-1 font-medium'>
                            Email
                        </label>
                        <input
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500'
                        />
                    </div>

                    {/* New Password */}
                    <div>
                        <label className='block text-gray-600 mb-1 font-medium'>
                            New Password
                        </label>
                        <input
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Leave empty to keep same'
                            className='w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500'
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className='block text-gray-600 mb-1 font-medium'>
                            Confirm Password
                        </label>
                        <input
                            type='password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder='Confirm new password'
                            className='w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500'
                        />
                    </div>

                    {/* Submit */}
                    <button
                        onClick={submitHandler}
                        disabled={loading}
                        className='bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white py-3 rounded-xl font-semibold transition mt-2'>
                        {loading ? 'Updating...' : 'Update Profile'}
                    </button>

                    {/* Orders Button */}
                    <button
                        onClick={() => navigate('/orders')}
                        className='bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold transition'>
                        📦 My Orders
                    </button>

                </div>

            </div>
        </div>
    )
}

export default ProfilePage