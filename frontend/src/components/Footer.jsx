import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=DM+Sans:wght@300;400;500&display=swap');
                .footer { background: #0f172a; margin-top: 80px; }
                .footer-main { max-width: 1200px; margin: 0 auto; padding: 64px 24px 48px; display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; }
                @media (max-width: 768px) { .footer-main { grid-template-columns: 1fr 1fr; gap: 32px; } }
                .footer-brand { font-family: 'Playfair Display', serif; font-size: 1.75rem; color: white; margin-bottom: 16px; }
                .footer-desc { color: #64748b; font-size: 0.875rem; line-height: 1.7; font-weight: 300; max-width: 260px; }
                .footer-col-title { font-size: 0.75rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 20px; }
                .footer-link { display: block; color: #64748b; font-size: 0.875rem; text-decoration: none; margin-bottom: 12px; transition: color 0.2s; font-weight: 300; }
                .footer-link:hover { color: white; }
                .footer-bottom { border-top: 1px solid #1e293b; }
                .footer-bottom-inner { max-width: 1200px; margin: 0 auto; padding: 20px 24px; display: flex; justify-content: space-between; align-items: center; }
                .footer-copy { color: #475569; font-size: 0.8rem; }
                .footer-made { color: #475569; font-size: 0.8rem; }
                .footer-made span { color: #2563eb; }
            `}</style>

            <footer className='footer'>
                <div className='footer-main'>
                    <div>
                        <div className='footer-brand'>ShopNow</div>
                        <p className='footer-desc'>
                            Your destination for premium products. 
                            Quality, convenience, and exceptional service — every order.
                        </p>
                    </div>
                    <div>
                        <p className='footer-col-title'>Shop</p>
                        <Link to='/products' className='footer-link'>All Products</Link>
                        <Link to='/cart' className='footer-link'>Cart</Link>
                        <Link to='/orders' className='footer-link'>My Orders</Link>
                    </div>
                    <div>
                        <p className='footer-col-title'>Account</p>
                        <Link to='/login' className='footer-link'>Sign In</Link>
                        <Link to='/register' className='footer-link'>Register</Link>
                        <Link to='/profile' className='footer-link'>Profile</Link>
                    </div>
                    <div>
                        <p className='footer-col-title'>Contact</p>
                        <p className='footer-link'>📧 support@shopnow.com</p>
                        <p className='footer-link'>📞 +92 300 0000000</p>
                        <p className='footer-link'>📍 Gujrat, Punjab</p>
                    </div>
                </div>
                <div className='footer-bottom'>
                    <div className='footer-bottom-inner'>
                        <p className='footer-copy'>© 2026 ShopNow. All rights reserved.</p>
                        <p className='footer-made'>Made with <span>♥</span> by Shaheer Khalid</p>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer