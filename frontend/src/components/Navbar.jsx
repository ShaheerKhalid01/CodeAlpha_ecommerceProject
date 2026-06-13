import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/slices/authSlice'

const Navbar = () => {
    const dispatch = useDispatch()
    const { cartItems } = useSelector(state => state.cart)
    const { userInfo } = useSelector(state => state.auth)
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=DM+Sans:wght@300;400;500&display=swap');

                * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }

                .navbar {
                    background: rgba(255,255,255,0.95);
                    backdrop-filter: blur(12px);
                    border-bottom: 1px solid #f1f5f9;
                    position: sticky;
                    top: 0;
                    z-index: 100;
                }
                .nav-inner {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 24px;
                    height: 64px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                .brand {
                    font-family: 'Playfair Display', serif;
                    font-size: 1.5rem;
                    color: #111827;
                    text-decoration: none;
                    letter-spacing: -0.5px;
                    flex-shrink: 0;
                }

                /* Desktop Links */
                .nav-links {
                    display: flex;
                    align-items: center;
                    gap: 28px;
                }
                .nav-link {
                    position: relative;
                    font-size: 0.875rem;
                    font-weight: 500;
                    color: #374151;
                    text-decoration: none;
                    padding-bottom: 2px;
                    transition: color 0.2s;
                    white-space: nowrap;
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

                .cart-btn {
                    position: relative;
                    background: #f8fafc;
                    border: 1px solid #e2e8f0;
                    border-radius: 50px;
                    padding: 8px 16px;
                    font-size: 0.875rem;
                    font-weight: 500;
                    color: #374151;
                    cursor: pointer;
                    transition: all 0.2s;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    white-space: nowrap;
                }
                .cart-btn:hover { background: #f1f5f9; border-color: #cbd5e1; }
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
                    padding: 9px 20px;
                    font-size: 0.875rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s;
                    text-decoration: none;
                    white-space: nowrap;
                }
                .btn-primary:hover { background: #1f2937; transform: translateY(-1px); }
                .btn-outline {
                    background: transparent;
                    color: #374151;
                    border: 1px solid #d1d5db;
                    border-radius: 50px;
                    padding: 9px 20px;
                    font-size: 0.875rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s;
                    text-decoration: none;
                    white-space: nowrap;
                }
                .btn-outline:hover { border-color: #111827; color: #111827; }
                .user-name {
                    font-size: 0.875rem;
                    font-weight: 500;
                    color: #374151;
                    text-decoration: none;
                    white-space: nowrap;
                }
                .logout-btn {
                    background: #fef2f2;
                    color: #ef4444;
                    border: 1px solid #fecaca;
                    border-radius: 50px;
                    padding: 8px 16px;
                    font-size: 0.875rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s;
                    white-space: nowrap;
                }
                .logout-btn:hover { background: #fee2e2; }

                /* Hamburger Button */
                .hamburger {
                    display: none;
                    flex-direction: column;
                    gap: 5px;
                    background: none;
                    border: none;
                    cursor: pointer;
                    padding: 4px;
                }
                .hamburger span {
                    display: block;
                    width: 24px;
                    height: 2px;
                    background: #111827;
                    border-radius: 2px;
                    transition: all 0.3s;
                }
                .hamburger.open span:nth-child(1) {
                    transform: translateY(7px) rotate(45deg);
                }
                .hamburger.open span:nth-child(2) {
                    opacity: 0;
                }
                .hamburger.open span:nth-child(3) {
                    transform: translateY(-7px) rotate(-45deg);
                }

                /* Mobile Menu */
                .mobile-menu {
                    display: none;
                    flex-direction: column;
                    gap: 4px;
                    padding: 16px 24px 20px;
                    border-top: 1px solid #f1f5f9;
                    background: white;
                }
                .mobile-menu.open { display: flex; }
                .mobile-link {
                    font-size: 0.95rem;
                    font-weight: 500;
                    color: #374151;
                    text-decoration: none;
                    padding: 10px 0;
                    border-bottom: 1px solid #f8fafc;
                    transition: color 0.2s;
                }
                .mobile-link:hover { color: #2563eb; }
                .mobile-link:last-child { border-bottom: none; }
                .mobile-btns {
                    display: flex;
                    gap: 10px;
                    margin-top: 8px;
                }
                .mobile-btn-primary {
                    flex: 1;
                    text-align: center;
                    background: #111827;
                    color: white;
                    border: none;
                    border-radius: 50px;
                    padding: 11px;
                    font-size: 0.875rem;
                    font-weight: 600;
                    cursor: pointer;
                    text-decoration: none;
                    transition: all 0.2s;
                }
                .mobile-btn-outline {
                    flex: 1;
                    text-align: center;
                    background: transparent;
                    color: #374151;
                    border: 1px solid #d1d5db;
                    border-radius: 50px;
                    padding: 11px;
                    font-size: 0.875rem;
                    font-weight: 600;
                    cursor: pointer;
                    text-decoration: none;
                    transition: all 0.2s;
                }
                .mobile-logout {
                    width: 100%;
                    background: #fef2f2;
                    color: #ef4444;
                    border: 1px solid #fecaca;
                    border-radius: 50px;
                    padding: 11px;
                    font-size: 0.875rem;
                    font-weight: 600;
                    cursor: pointer;
                    margin-top: 4px;
                    font-family: 'DM Sans', sans-serif;
                }

                /* Responsive */
                @media (max-width: 768px) {
                    .nav-links { display: none; }
                    .hamburger { display: flex; }
                }
            `}</style>

            <nav className='navbar'>
                <div className='nav-inner'>

                    {/* Brand */}
                    <Link to='/' className='brand'>ShopNow</Link>

                    {/* Desktop Links */}
                    <div className='nav-links'>
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

                        {/* Admin */}
                        {userInfo?.isAdmin && (
                            <Link to='/admin' className='nav-link'
                                style={{color: '#2563eb', fontWeight: '600'}}>
                                👑 Admin
                            </Link>
                        )}

                        {/* Auth */}
                        {userInfo ? (
                            <div style={{display: 'flex', alignItems: 'center', gap: '14px'}}>
                                <Link to='/profile' className='user-name'>
                                    👤 {userInfo.name}
                                </Link>
                                <button className='logout-btn'
                                    onClick={() => dispatch(logout())}>
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                                <Link to='/login' className='btn-outline'>Login</Link>
                                <Link to='/register' className='btn-primary'>Register</Link>
                            </div>
                        )}
                    </div>

                    {/* Hamburger — Mobile only */}
                    <button
                        className={`hamburger ${menuOpen ? 'open' : ''}`}
                        onClick={() => setMenuOpen(!menuOpen)}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                </div>

                {/* Mobile Menu */}
                <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
                    <Link to='/' className='mobile-link'
                        onClick={() => setMenuOpen(false)}>
                        🏠 Home
                    </Link>
                    <Link to='/products' className='mobile-link'
                        onClick={() => setMenuOpen(false)}>
                        📦 Products
                    </Link>
                    <Link to='/cart' className='mobile-link'
                        onClick={() => setMenuOpen(false)}>
                        🛒 Cart {cartItems.length > 0 && `(${cartItems.length})`}
                    </Link>

                    {/* Admin */}
                    {userInfo?.isAdmin && (
                        <Link to='/admin' className='mobile-link'
                            style={{color: '#2563eb', fontWeight: '600'}}
                            onClick={() => setMenuOpen(false)}>
                            👑 Admin Panel
                        </Link>
                    )}

                    {/* Auth */}
                    {userInfo ? (
                        <>
                            <Link to='/profile' className='mobile-link'
                                onClick={() => setMenuOpen(false)}>
                                👤 {userInfo.name}
                            </Link>
                            <button className='mobile-logout'
                                onClick={() => { dispatch(logout()); setMenuOpen(false) }}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <div className='mobile-btns'>
                            <Link to='/login' className='mobile-btn-outline'
                                onClick={() => setMenuOpen(false)}>
                                Login
                            </Link>
                            <Link to='/register' className='mobile-btn-primary'
                                onClick={() => setMenuOpen(false)}>
                                Register
                            </Link>
                        </div>
                    )}
                </div>

            </nav>
        </>
    )
}

export default Navbar