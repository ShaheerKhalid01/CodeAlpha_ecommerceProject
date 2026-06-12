import { Link } from 'react-router-dom'

const HomePage = () => {
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@300;400;500&display=swap');

                .hero {
                    min-height: 88vh;
                    display: flex;
                    align-items: center;
                    background: linear-gradient(135deg, #f8fafc 0%, #eff6ff 50%, #f0f9ff 100%);
                    border-radius: 24px;
                    padding: 80px 64px;
                    margin-bottom: 80px;
                    position: relative;
                    overflow: hidden;
                }
                .hero::before {
                    content: '';
                    position: absolute;
                    top: -100px;
                    right: -100px;
                    width: 500px;
                    height: 500px;
                    background: radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%);
                    border-radius: 50%;
                }
                .hero::after {
                    content: '';
                    position: absolute;
                    bottom: -80px;
                    left: -80px;
                    width: 350px;
                    height: 350px;
                    background: radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%);
                    border-radius: 50%;
                }
                .hero-tag {
                    display: inline-block;
                    background: #dbeafe;
                    color: #1d4ed8;
                    font-size: 0.75rem;
                    font-weight: 600;
                    letter-spacing: 1.5px;
                    text-transform: uppercase;
                    padding: 6px 16px;
                    border-radius: 50px;
                    margin-bottom: 24px;
                }
                .hero-title {
                    font-family: 'Playfair Display', serif;
                    font-size: clamp(3rem, 6vw, 5rem);
                    line-height: 1.1;
                    color: #0f172a;
                    margin-bottom: 24px;
                    letter-spacing: -1px;
                }
                .hero-title em {
                    font-style: italic;
                    color: #2563eb;
                }
                .hero-desc {
                    font-size: 1.125rem;
                    color: #64748b;
                    line-height: 1.7;
                    max-width: 480px;
                    margin-bottom: 40px;
                    font-weight: 300;
                }
                .hero-btns {
                    display: flex;
                    gap: 16px;
                    flex-wrap: wrap;
                }
                .btn-hero-primary {
                    background: #111827;
                    color: white;
                    padding: 16px 36px;
                    border-radius: 50px;
                    font-size: 1rem;
                    font-weight: 500;
                    text-decoration: none;
                    transition: all 0.3s;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                }
                .btn-hero-primary:hover {
                    background: #1f2937;
                    transform: translateY(-2px);
                    box-shadow: 0 12px 24px rgba(0,0,0,0.15);
                }
                .btn-hero-secondary {
                    background: white;
                    color: #374151;
                    padding: 16px 36px;
                    border-radius: 50px;
                    font-size: 1rem;
                    font-weight: 500;
                    text-decoration: none;
                    border: 1px solid #e2e8f0;
                    transition: all 0.3s;
                }
                .btn-hero-secondary:hover {
                    border-color: #111827;
                    color: #111827;
                    transform: translateY(-2px);
                }
                .hero-stats {
                    display: flex;
                    gap: 48px;
                    margin-top: 56px;
                    padding-top: 40px;
                    border-top: 1px solid #e2e8f0;
                }
                .stat-num {
                    font-family: 'Playfair Display', serif;
                    font-size: 2rem;
                    font-weight: 700;
                    color: #111827;
                }
                .stat-label {
                    font-size: 0.8rem;
                    color: #94a3b8;
                    font-weight: 400;
                    margin-top: 2px;
                }
                .section-title {
                    font-family: 'Playfair Display', serif;
                    font-size: 2.25rem;
                    color: #0f172a;
                    letter-spacing: -0.5px;
                    margin-bottom: 8px;
                }
                .section-sub {
                    color: #94a3b8;
                    font-size: 1rem;
                    font-weight: 300;
                    margin-bottom: 40px;
                }
                .features-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 24px;
                    margin-bottom: 80px;
                }
                .feature-card {
                    background: white;
                    border: 1px solid #f1f5f9;
                    border-radius: 20px;
                    padding: 36px 32px;
                    transition: all 0.3s;
                }
                .feature-card:hover {
                    border-color: #dbeafe;
                    box-shadow: 0 8px 32px rgba(37,99,235,0.08);
                    transform: translateY(-4px);
                }
                .feature-icon {
                    width: 52px;
                    height: 52px;
                    background: #eff6ff;
                    border-radius: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                    margin-bottom: 20px;
                }
                .feature-title {
                    font-size: 1.1rem;
                    font-weight: 600;
                    color: #111827;
                    margin-bottom: 8px;
                }
                .feature-desc {
                    font-size: 0.9rem;
                    color: #94a3b8;
                    line-height: 1.6;
                    font-weight: 300;
                }
                .categories-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 16px;
                    margin-bottom: 80px;
                }
                .cat-card {
                    background: white;
                    border: 1px solid #f1f5f9;
                    border-radius: 20px;
                    padding: 32px 24px;
                    text-align: center;
                    text-decoration: none;
                    transition: all 0.3s;
                    display: block;
                }
                .cat-card:hover {
                    border-color: #111827;
                    transform: translateY(-4px);
                    box-shadow: 0 8px 32px rgba(0,0,0,0.08);
                }
                .cat-icon { font-size: 2.5rem; margin-bottom: 12px; }
                .cat-name {
                    font-size: 0.95rem;
                    font-weight: 600;
                    color: #111827;
                }
                .cta-section {
                    background: #0f172a;
                    border-radius: 24px;
                    padding: 80px 64px;
                    text-align: center;
                    position: relative;
                    overflow: hidden;
                    margin-bottom: 40px;
                }
                .cta-section::before {
                    content: '';
                    position: absolute;
                    top: -50px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 600px;
                    height: 300px;
                    background: radial-gradient(ellipse, rgba(37,99,235,0.3) 0%, transparent 70%);
                }
                .cta-title {
                    font-family: 'Playfair Display', serif;
                    font-size: 2.75rem;
                    color: white;
                    margin-bottom: 16px;
                    position: relative;
                }
                .cta-desc {
                    color: #94a3b8;
                    font-size: 1.1rem;
                    margin-bottom: 36px;
                    font-weight: 300;
                    position: relative;
                }
                .btn-cta {
                    background: white;
                    color: #111827;
                    padding: 16px 40px;
                    border-radius: 50px;
                    font-size: 1rem;
                    font-weight: 600;
                    text-decoration: none;
                    transition: all 0.3s;
                    display: inline-block;
                    position: relative;
                }
                .btn-cta:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 12px 32px rgba(255,255,255,0.2);
                }
            `}</style>

            {/* Hero */}
            <section className='hero'>
                <div style={{position: 'relative', zIndex: 1}}>
                    <span className='hero-tag'>✦ New Collection 2026</span>
                    <h1 className='hero-title'>
                        Shop the <em>finest</em><br />
                        products online
                    </h1>
                    <p className='hero-desc'>
                        Discover curated collections of premium products 
                        delivered straight to your door. Quality guaranteed.
                    </p>
                    <div className='hero-btns'>
                        <Link to='/products' className='btn-hero-primary'>
                            Browse Products →
                        </Link>
                        <Link to='/register' className='btn-hero-secondary'>
                            Join for Free
                        </Link>
                    </div>
                    <div className='hero-stats'>
                        <div>
                            <div className='stat-num'>2.4k+</div>
                            <div className='stat-label'>Happy Customers</div>
                        </div>
                        <div>
                            <div className='stat-num'>500+</div>
                            <div className='stat-label'>Products</div>
                        </div>
                        <div>
                            <div className='stat-num'>4.9★</div>
                            <div className='stat-label'>Average Rating</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section style={{marginBottom: '48px'}}>
                <div style={{textAlign: 'center', marginBottom: '48px'}}>
                    <h2 className='section-title'>Why Shop With Us?</h2>
                    <p className='section-sub'>Everything you need, nothing you don't</p>
                </div>
                <div className='features-grid'>
                    <div className='feature-card'>
                        <div className='feature-icon'>🚚</div>
                        <div className='feature-title'>Fast Delivery</div>
                        <p className='feature-desc'>
                            Get your orders delivered within 2-3 business days anywhere in Pakistan
                        </p>
                    </div>
                    <div className='feature-card'>
                        <div className='feature-icon'>🔒</div>
                        <div className='feature-title'>Secure Payment</div>
                        <p className='feature-desc'>
                            Your payment information is encrypted and always kept safe with us
                        </p>
                    </div>
                    <div className='feature-card'>
                        <div className='feature-icon'>↩️</div>
                        <div className='feature-title'>Easy Returns</div>
                        <p className='feature-desc'>
                            Not satisfied? Return within 30 days, completely hassle free
                        </p>
                    </div>
                    <div className='feature-card'>
                        <div className='feature-icon'>💎</div>
                        <div className='feature-title'>Premium Quality</div>
                        <p className='feature-desc'>
                            Every product is carefully curated and quality checked before listing
                        </p>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section style={{marginBottom: '80px'}}>
                <div style={{textAlign: 'center', marginBottom: '48px'}}>
                    <h2 className='section-title'>Shop by Category</h2>
                    <p className='section-sub'>Find exactly what you're looking for</p>
                </div>
                <div className='categories-grid'>
                    <Link to='/products' className='cat-card'>
                        <div className='cat-icon'>👟</div>
                        <div className='cat-name'>Footwear</div>
                    </Link>
                    <Link to='/products' className='cat-card'>
                        <div className='cat-icon'>👕</div>
                        <div className='cat-name'>Clothing</div>
                    </Link>
                    <Link to='/products' className='cat-card'>
                        <div className='cat-icon'>📱</div>
                        <div className='cat-name'>Electronics</div>
                    </Link>
                    <Link to='/products' className='cat-card'>
                        <div className='cat-icon'>🏠</div>
                        <div className='cat-name'>Home & Living</div>
                    </Link>
                    <Link to='/products' className='cat-card'>
                        <div className='cat-icon'>💄</div>
                        <div className='cat-name'>Beauty</div>
                    </Link>
                </div>
            </section>

            {/* CTA */}
            <section className='cta-section'>
                <h2 className='cta-title'>Ready to start shopping?</h2>
                <p className='cta-desc'>
                    Join thousands of happy customers today
                </p>
                <Link to='/register' className='btn-cta'>
                    Create Free Account →
                </Link>
            </section>
        </>
    )
}

export default HomePage