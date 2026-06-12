import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchMyOrders } from '../store/slices/orderSlice'

const OrdersPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { orders, loading, error } = useSelector(state => state.order)
    const { userInfo } = useSelector(state => state.auth)

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        } else {
            dispatch(fetchMyOrders())
        }
    }, [dispatch, userInfo, navigate])

    if (loading) return (
        <div className='flex justify-center items-center h-64'>
            <p className='text-xl text-gray-500'>Loading orders...</p>
        </div>
    )

    if (error) return (
        <div className='flex justify-center items-center h-64'>
            <p className='text-xl text-red-500'>Error: {error}</p>
        </div>
    )

    return (
        <div>
            <h1 className='text-3xl font-bold mb-8'>📦 My Orders</h1>

            {orders.length === 0 ? (
                <div className='text-center py-20'>
                    <p className='text-2xl text-gray-400 mb-4'>
                        Koi order nahi hai abhi!
                    </p>
                    <button
                        onClick={() => navigate('/products')}
                        className='bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl transition'>
                        Shop Now
                    </button>
                </div>
            ) : (
                <div className='flex flex-col gap-4'>
                    {orders.map(order => (
                        <div key={order._id}
                            className='bg-white rounded-2xl shadow p-6'>

                            {/* Order Header */}
                            <div className='flex justify-between items-center mb-4'>
                                <div>
                                    <p className='text-gray-500 text-sm'>Order ID</p>
                                    <p className='font-mono text-sm'>{order._id}</p>
                                </div>
                                <div className='text-right'>
                                    <p className='text-gray-500 text-sm'>Date</p>
                                    <p className='text-sm'>
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div className='flex flex-col gap-2 mb-4'>
                                {order.orderItems.map((item, index) => (
                                    <div key={index}
                                        className='flex justify-between items-center bg-gray-50 rounded-xl px-4 py-2'>
                                        <p className='font-medium'>{item.name}</p>
                                        <div className='flex gap-4 text-sm text-gray-500'>
                                            <p>Qty: {item.quantity}</p>
                                            <p>Rs. {item.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Order Footer */}
                            <div className='flex justify-between items-center'>
                                <div className='flex gap-3'>
                                    {/* Paid Status */}
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                        order.isPaid
                                            ? 'bg-green-100 text-green-600'
                                            : 'bg-red-100 text-red-600'
                                    }`}>
                                        {order.isPaid ? '✅ Paid' : '❌ Not Paid'}
                                    </span>

                                    {/* Delivered Status */}
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                        order.isDelivered
                                            ? 'bg-green-100 text-green-600'
                                            : 'bg-yellow-100 text-yellow-600'
                                    }`}>
                                        {order.isDelivered ? '✅ Delivered' : '⏳ Pending'}
                                    </span>
                                </div>

                                {/* Total */}
                                <p className='text-blue-500 font-bold text-xl'>
                                    Rs. {order.totalPrice}
                                </p>
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default OrdersPage