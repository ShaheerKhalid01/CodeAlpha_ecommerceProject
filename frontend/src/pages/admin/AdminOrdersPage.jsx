import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AdminOrdersPage = () => {
    const { userInfo } = useSelector(state => state.auth)
    const navigate = useNavigate()

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [updateLoading, setUpdateLoading] = useState(null)

    const config = {
        headers: { Authorization: `Bearer ${userInfo.token}` }
    }

    const fetchOrders = async () => {
        try {
            const { data } = await axios.get('/api/orders', config)
            setOrders(data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    const deliverHandler = async (id) => {
        try {
            setUpdateLoading(id)
            await axios.put(`/api/orders/${id}/deliver`, {}, config)
            fetchOrders()
            setUpdateLoading(null)
        } catch (error) {
            setUpdateLoading(null)
        }
    }

    if (loading) return (
        <div style={{display: 'flex', justifyContent: 'center', minHeight: '60vh', alignItems: 'center'}}>
            <div style={{width: '40px', height: '40px', border: '3px solid #e2e8f0', borderTop: '3px solid #2563eb', borderRadius: '50%', animation: 'spin 0.8s linear infinite'}}></div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    )

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=DM+Sans:wght@300;400;500&display=swap');
                .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; padding-bottom: 24px; border-bottom: 1px solid #f1f5f9; }
                .page-title { font-family: 'Playfair Display', serif; font-size: 2rem; color: #0f172a; }
                .back-btn { background: #f1f5f9; color: #374151; border: none; padding: 12px 24px; border-radius: 50px; font-size: 0.875rem; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; }
                .back-btn:hover { background: #e2e8f0; }
                .table-wrap { background: white; border: 1px solid #f1f5f9; border-radius: 20px; overflow: hidden; }
                .table { width: 100%; border-collapse: collapse; }
                .table th { background: #f8fafc; padding: 14px 20px; text-align: left; font-size: 0.75rem; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #f1f5f9; }
                .table td { padding: 16px 20px; border-bottom: 1px solid #f8fafc; font-size: 0.9rem; color: #374151; vertical-align: middle; }
                .table tr:last-child td { border-bottom: none; }
                .table tr:hover td { background: #fafafa; }
                .status-badge { display: inline-block; padding: 4px 12px; border-radius: 50px; font-size: 0.75rem; font-weight: 600; }
                .badge-green { background: #f0fdf4; color: #16a34a; }
                .badge-red { background: #fef2f2; color: #dc2626; }
                .badge-yellow { background: #fefce8; color: #ca8a04; }
                .deliver-btn { background: #111827; color: white; border: none; padding: 8px 16px; border-radius: 50px; font-size: 0.8rem; font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: 'DM Sans', sans-serif; }
                .deliver-btn:hover { background: #1f2937; }
                .deliver-btn:disabled { background: #94a3b8; cursor: not-allowed; }
            `}</style>

            {/* Header */}
            <div className='page-header'>
                <div>
                    <h1 className='page-title'>Orders</h1>
                    <p style={{color: '#94a3b8', fontSize: '0.875rem', marginTop: '4px'}}>
                        {orders.length} orders total
                    </p>
                </div>
                <button className='back-btn' onClick={() => navigate('/admin')}>
                    ← Dashboard
                </button>
            </div>

            {/* Orders Table */}
            <div className='table-wrap'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Paid</th>
                            <th>Delivered</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>
                                    <span style={{fontFamily: 'monospace', fontSize: '0.8rem', color: '#64748b'}}>
                                        #{order._id.slice(-8)}
                                    </span>
                                </td>
                                <td>
                                    <p style={{fontWeight: '600', color: '#111827'}}>
                                        {order.user?.name}
                                    </p>
                                    <p style={{fontSize: '0.75rem', color: '#94a3b8'}}>
                                        {order.user?.email}
                                    </p>
                                </td>
                                <td style={{color: '#64748b'}}>
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </td>
                                <td style={{fontWeight: '700', color: '#111827'}}>
                                    Rs. {order.totalPrice?.toLocaleString()}
                                </td>
                                <td>
                                    <span className={`status-badge ${order.isPaid ? 'badge-green' : 'badge-red'}`}>
                                        {order.isPaid ? '✓ Paid' : '✕ Unpaid'}
                                    </span>
                                </td>
                                <td>
                                    <span className={`status-badge ${order.isDelivered ? 'badge-green' : 'badge-yellow'}`}>
                                        {order.isDelivered ? '✓ Delivered' : '⏳ Pending'}
                                    </span>
                                </td>
                                <td>
                                    {!order.isDelivered && (
                                        <button
                                            className='deliver-btn'
                                            disabled={updateLoading === order._id}
                                            onClick={() => deliverHandler(order._id)}>
                                            {updateLoading === order._id ? '...' : 'Mark Delivered'}
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default AdminOrdersPage