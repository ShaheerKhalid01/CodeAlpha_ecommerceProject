import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const AdminDashboard = () => {
    const navigate = useNavigate()
    const { userInfo } = useSelector(state => state.auth)

    const [stats, setStats] = useState({
        users: 0,
        products: 0,
        orders: 0,
        revenue: 0
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${userInfo.token}` }
                }

                const [usersRes, productsRes, ordersRes] = await Promise.all([
                    axios.get('/api/auth/users', config),
                    axios.get('/api/products'),
                    axios.get('/api/orders', config)
                ])

                const revenue = ordersRes.data.reduce(
                    (acc, order) => acc + order.totalPrice, 0
                )

                setStats({
                    users: usersRes.data.length,
                    products: productsRes.data.length,
                    orders: ordersRes.data.length,
                    revenue
                })
                setLoading(false)
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }

        fetchStats()
    }, [userInfo])

    if (loading) return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', flexDirection: 'column', gap: '16px'}}>
            <div style={{width: '40px', height: '40px', border: '3px solid #e2e8f0', borderTop: '3px solid #2563eb', borderRadius: '50%', animation: 'spin 0.8s linear infinite'}}></div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    )

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=DM+Sans:wght@300;400;500&display=swap');
                .admin-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; padding-bottom: 24px; border-bottom: 1px solid #f1f5f9; }
                .admin-title { font-family: 'Playfair Display', serif; font-size: 2rem; color: #0f172a; }
                .admin-badge { background: #dbeafe; color: #1d4ed8; font-size: 0.75rem; font-weight: 600; padding: 4px 12px; border-radius: 50px; }
                .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; margin-bottom: 48px; }
                .stat-card { background: white; border: 1px solid #f1f5f9; border-radius: 20px; padding: 28px; transition: all 0.3s; }
                .stat-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.08); transform: translateY(-4px); }
                .stat-icon { width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; margin-bottom: 16px; }
                .stat-num { font-family: 'Playfair Display', serif; font-size: 2.25rem; color: #0f172a; margin-bottom: 4px; }
                .stat-label { font-size: 0.875rem; color: #94a3b8; font-weight: 300; }
                .quick-links { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
                .quick-card { background: white; border: 1px solid #f1f5f9; border-radius: 20px; padding: 32px; text-decoration: none; transition: all 0.3s; display: block; }
                .quick-card:hover { border-color: #111827; box-shadow: 0 8px 32px rgba(0,0,0,0.08); transform: translateY(-4px); }
                .quick-title { font-size: 1.1rem; font-weight: 600; color: #111827; margin-bottom: 8px; }
                .quick-desc { font-size: 0.875rem; color: #94a3b8; font-weight: 300; }
                .quick-arrow { font-size: 1.25rem; margin-bottom: 16px; }
            `}</style>

            {/* Header */}
            <div className='admin-header'>
                <div>
                    <h1 className='admin-title'>Admin Dashboard</h1>
                    <p style={{color: '#94a3b8', fontSize: '0.875rem', marginTop: '4px'}}>
                        Welcome back, {userInfo?.name}
                    </p>
                </div>
                <span className='admin-badge'>👑 Admin</span>
            </div>

            {/* Stats */}
            <div className='stats-grid'>
                <div className='stat-card'>
                    <div className='stat-icon' style={{background: '#eff6ff'}}>👥</div>
                    <div className='stat-num'>{stats.users}</div>
                    <div className='stat-label'>Total Users</div>
                </div>
                <div className='stat-card'>
                    <div className='stat-icon' style={{background: '#f0fdf4'}}>📦</div>
                    <div className='stat-num'>{stats.products}</div>
                    <div className='stat-label'>Total Products</div>
                </div>
                <div className='stat-card'>
                    <div className='stat-icon' style={{background: '#fefce8'}}>🛒</div>
                    <div className='stat-num'>{stats.orders}</div>
                    <div className='stat-label'>Total Orders</div>
                </div>
                <div className='stat-card'>
                    <div className='stat-icon' style={{background: '#fdf4ff'}}>💰</div>
                    <div className='stat-num'>
                        Rs. {stats.revenue.toLocaleString()}
                    </div>
                    <div className='stat-label'>Total Revenue</div>
                </div>
            </div>

            {/* Quick Links */}
            <h2 style={{fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', color: '#0f172a', marginBottom: '20px'}}>
                Quick Actions
            </h2>
            <div className='quick-links'>
                <Link to='/admin/products' className='quick-card'>
                    <div className='quick-arrow'>📦</div>
                    <div className='quick-title'>Manage Products</div>
                    <div className='quick-desc'>Add, edit, or delete products</div>
                </Link>
                <Link to='/admin/orders' className='quick-card'>
                    <div className='quick-arrow'>🛒</div>
                    <div className='quick-title'>Manage Orders</div>
                    <div className='quick-desc'>View and update order status</div>
                </Link>
            </div>
        </>
    )
}

export default AdminDashboard