import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/slices/authSlice'

const Navbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { cartItems } = useSelector(state => state.cart)
    const { userInfo } = useSelector(state => state.auth)

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=DM+Sans:wght@300;400;500&display=swap');
                
                * { font-family: 'DM Sans', sans-serif; }
                
                .nav-link {
                    position: relative;
                    font-size: 0.875rem;
                    font-weight: 500;
                    color: #374151;
                    text-decoration: none;
                    padding-bottom: 2px;
                    transition: color 0.2s;
                }
                .nav-link::after {
                    content: '';
                    position: absolute;
                    bottom: -2px;
                    left: 0;
                    width: 0;
                    height: 1.5px;
                    background: #2563eb;
                    transition: width 0.3s ease;
                }
                .nav-link:hover { color: #2563eb; }
                .nav-link:hover::after { width: 100%; }

                .navbar {
                    background: rgba(255,255,255,0.95);
                    backdrop-filter: blur(12px);
                    border-bottom: 1px solid #f1f5f9;
                    position: sticky;
                    top: 0;
                    z-index: 100;
                }
                .brand {
                    font-family: 'Playfair Display', serif;
                    font-size: 1.5rem;
                    color: #111827;
                    text-decoration: none;
                    letter-spacing: -0.5px;
                }
                .cart-btn {
                    position: relative;
                    background: #f8fafc;
                    border: 1px solid #e2e8f0;
                    border-radius: 50px;
                    padding: 8px 18px;
                    font-size: 0.875rem;
                    font-weight: 500;
                    color: #374151;
                    cursor: pointer;
                    transition: all 0.2s;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }
                .cart-btn:hover {
                    background: #f1f5f9;
                    border-color: #cbd5e1;
                }
                .cart-badge {
                    position: absolute;
                    top: -6px;
                    right: -6px;
                    background: #2563eb;
                    color: white;
                    font-size: 0.65rem;
                    font-weight: 700;
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .btn-primary {
                    background: #111827;
                    color: white;
                    border: none;
                    border-radius: 50px;
                    padding: 9px 22px;
                    font-size: 0.875rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s;
                    text-decoration: none;
                }
                .btn-primary:hover { background: #1f2937; transform: translateY(-1px); }
                .btn-outline {
                    background: transparent;
                    color: #374151;
                    border: 1px solid #d1d5db;
                    border-radius: 50px;
                    padding: 9px 22px;
                    font-size: 0.875rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s;
                    text-decoration: none;
                }
                .btn-outline:hover { border-color: #111827; color: #111827; }
                .user-name {
                    font-size: 0.875rem;
                    font-weight: 500;
                    color: #374151;
                    text-decoration: none;
                }
                .logout-btn {
                    background: #fef2f2;
                    color: #ef4444;
                    border: 1px solid #fecaca;
                    border-radius: 50px;
                    padding: 8px 18px;
                    font-size: 0.875rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .logout-btn:hover { background: #fee2e2; }
            `}</style>

            <nav className='navbar'>
                <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 24px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    
                    {/* Brand */}
                    <Link to='/' className='brand'>ShopNow</Link>

                    {/* Links */}
                    <div style={{display: 'flex', alignItems: 'center', gap: '32px'}}>
                        <Link to='/' className='nav-link'>Home</Link>
                        <Link to='/products' className='nav-link'>Products</Link>

                        {/* Cart */}
                        <Link to='/cart' className='cart-btn'>
                            <span>🛒</span>
                            <span>Cart</span>
                            {cartItems.length > 0 && (
                                <span className='cart-badge'>{cartItems.length}</span>
                            )}
                        </Link>

                        {/* Auth */}
                        {userInfo ? (
                            <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                                <Link to='/profile' className='user-name'>
                                    👤 {userInfo.name}
                                </Link>
                                <button
                                    className='logout-btn'
                                    onClick={() => dispatch(logout())}>
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                                <Link to='/login' className='btn-outline'>Login</Link>
                                <Link to='/register' className='btn-primary'>Register</Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar