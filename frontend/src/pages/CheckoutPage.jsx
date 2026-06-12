import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createOrder, resetOrder } from '../store/slices/orderSlice'
import { clearCart } from '../store/slices/cartSlice'

const CheckoutPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { cartItems, totalPrice } = useSelector(state => state.cart)
    const { userInfo } = useSelector(state => state.auth)
    const { loading, error, success, order } = useSelector(state => state.order)

    // Order successfully place ho gaya
    useEffect(() => {
        if (success && order) {
            dispatch(clearCart())
            dispatch(resetOrder())
            navigate('/orders')
        }
    }, [success, order, dispatch, navigate])

    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cartItems.map(item => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                product: item._id
            })),
            totalPrice
        }))
    }

    return (
        <div>
            <h1 className='text-3xl font-bold mb-8'>Checkout</h1>

            {cartItems.length === 0 ? (
                <div className='text-center py-20'>
                    <p className='text-2xl text-gray-400 mb-4'>
                        Cart khali hai!
                    </p>
                    <button
                        onClick={() => navigate('/products')}
                        className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl transition'>
                        Shop Now
                    </button>
                </div>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>

                    {/* Order Items */}
                    <div className='md:col-span-2'>
                        <div className='bg-white rounded-2xl shadow p-6 mb-6'>
                            <h2 className='text-xl font-bold mb-4'>
                                📦 Order Items
                            </h2>
                            <div className='flex flex-col gap-3'>
                                {cartItems.map(item => (
                                    <div key={item._id}
                                        className='flex items-center gap-4 bg-gray-50 rounded-xl p-3'>

                                        {/* Image */}
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className='w-16 h-16 object-cover rounded-xl'
                                            onError={(e) => e.target.src = 'https://via.placeholder.com/100'}
                                        />

                                        {/* Info */}
                                        <div className='flex-1'>
                                            <p className='font-semibold'>{item.name}</p>
                                            <p className='text-gray-500 text-sm'>
                                                {item.quantity} x Rs. {item.price}
                                            </p>
                                        </div>

                                        {/* Subtotal */}
                                        <p className='font-bold text-blue-500'>
                                            Rs. {item.quantity * item.price}
                                        </p>

                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* User Info */}
                        <div className='bg-white rounded-2xl shadow p-6'>
                            <h2 className='text-xl font-bold mb-4'>
                                👤 Customer Info
                            </h2>
                            <div className='flex flex-col gap-2'>
                                <div className='flex justify-between'>
                                    <p className='text-gray-500'>Name</p>
                                    <p className='font-medium'>{userInfo?.name}</p>
                                </div>
                                <div className='flex justify-between'>
                                    <p className='text-gray-500'>Email</p>
                                    <p className='font-medium'>{userInfo?.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className='bg-white rounded-2xl shadow p-6 h-fit'>
                        <h2 className='text-2xl font-bold mb-4'>
                            Order Summary
                        </h2>

                        <div className='flex flex-col gap-3 mb-6'>
                            <div className='flex justify-between'>
                                <p className='text-gray-500'>Items</p>
                                <p>{cartItems.length}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p className='text-gray-500'>Subtotal</p>
                                <p>Rs. {totalPrice}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p className='text-gray-500'>Shipping</p>
                                <p className='text-green-500'>Free</p>
                            </div>
                            <hr />
                            <div className='flex justify-between'>
                                <p className='font-bold text-lg'>Total</p>
                                <p className='text-blue-500 font-bold text-xl'>
                                    Rs. {totalPrice}
                                </p>
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <div className='bg-red-100 text-red-600 px-4 py-3 rounded-xl mb-4'>
                                {error}
                            </div>
                        )}

                        {/* Place Order Button */}
                        <button
                            onClick={placeOrderHandler}
                            disabled={loading}
                            className='w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white py-3 rounded-xl font-semibold transition'>
                            {loading ? 'Placing Order...' : '✅ Place Order'}
                        </button>

                        {/* Back to Cart */}
                        <button
                            onClick={() => navigate('/cart')}
                            className='w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold transition mt-3'>
                            ← Back to Cart
                        </button>

                    </div>
                </div>
            )}
        </div>
    )
}

export default CheckoutPage