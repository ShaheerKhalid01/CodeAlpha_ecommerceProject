import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchProductById } from '../store/slices/productSlice'
import { addToCart } from '../store/slices/cartSlice'

const ProductDetailPage = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { product, loading, error } = useSelector(state => state.products)
    const [quantity, setQuantity] = useState(1)
    const [added, setAdded] = useState(false)

    useEffect(() => {
        dispatch(fetchProductById(id))
    }, [dispatch, id])

    const addToCartHandler = () => {
        dispatch(addToCart({
            _id: product._id,
            name: product.name,
            image: product.image,
            price: product.price,
            quantity
        }))
        setAdded(true)
        setTimeout(() => navigate('/cart'), 800)
    }

    if (loading) return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', flexDirection: 'column', gap: '16px'}}>
            <div style={{width: '40px', height: '40px', border: '3px solid #e2e8f0', borderTop: '3px solid #2563eb', borderRadius: '50%', animation: 'spin 0.8s linear infinite'}}></div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    )

    if (error) return (
        <div style={{textAlign: 'center', padding: '80px 0'}}>
            <p style={{color: '#ef4444'}}>Error: {error}</p>
        </div>
    )

    if (!product) return null

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500&display=swap');

                .back-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    color: #64748b;
                    font-size: 0.875rem;
                    font-weight: 500;
                    text-decoration: none;
                    margin-bottom: 40px;
                    transition: color 0.2s;
                    cursor: pointer;
                    background: none;
                    border: none;
                    padding: 0;
                }
                .back-btn:hover { color: #111827; }

                .detail-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 64px;
                    align-items: start;
                }
                @media (max-width: 768px) {
                    .detail-grid { grid-template-columns: 1fr; gap: 32px; }
                }
                .img-container {
                    border-radius: 24px;
                    overflow: hidden;
                    background: #f8fafc;
                    aspect-ratio: 1;
                    position: relative;
                }
                .detail-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .product-tag {
                    display: inline-block;
                    background: #f1f5f9;
                    color: #64748b;
                    font-size: 0.75rem;
                    font-weight: 600;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    padding: 6px 14px;
                    border-radius: 50px;
                    margin-bottom: 16px;
                }
                .detail-title {
                    font-family: 'Playfair Display', serif;
                    font-size: 2.25rem;
                    color: #0f172a;
                    line-height: 1.2;
                    letter-spacing: -0.5px;
                    margin-bottom: 16px;
                }
                .detail-price {
                    font-size: 2rem;
                    font-weight: 700;
                    color: #111827;
                    margin-bottom: 24px;
                }
                .detail-price span {
                    font-size: 1rem;
                    font-weight: 400;
                    color: #94a3b8;
                    margin-right: 4px;
                }
                .detail-desc {
                    font-size: 0.975rem;
                    color: #64748b;
                    line-height: 1.8;
                    font-weight: 300;
                    margin-bottom: 28px;
                    padding-bottom: 28px;
                    border-bottom: 1px solid #f1f5f9;
                }
                .stock-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 0.875rem;
                    font-weight: 500;
                    padding: 6px 14px;
                    border-radius: 50px;
                    margin-bottom: 28px;
                }
                .stock-in {
                    background: #f0fdf4;
                    color: #16a34a;
                    border: 1px solid #bbf7d0;
                }
                .stock-out {
                    background: #fef2f2;
                    color: #dc2626;
                    border: 1px solid #fecaca;
                }
                .qty-label {
                    font-size: 0.875rem;
                    font-weight: 600;
                    color: #374151;
                    margin-bottom: 12px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                .qty-control {
                    display: inline-flex;
                    align-items: center;
                    gap: 0;
                    border: 1px solid #e2e8f0;
                    border-radius: 50px;
                    overflow: hidden;
                    margin-bottom: 28px;
                }
                .qty-btn {
                    width: 44px;
                    height: 44px;
                    background: white;
                    border: none;
                    font-size: 1.25rem;
                    color: #374151;
                    cursor: pointer;
                    transition: background 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .qty-btn:hover { background: #f8fafc; }
                .qty-num {
                    width: 48px;
                    text-align: center;
                    font-size: 1rem;
                    font-weight: 600;
                    color: #111827;
                    border-left: 1px solid #e2e8f0;
                    border-right: 1px solid #e2e8f0;
                }
                .add-cart-btn {
                    width: 100%;
                    padding: 16px;
                    border-radius: 50px;
                    font-size: 1rem;
                    font-weight: 600;
                    border: none;
                    cursor: pointer;
                    transition: all 0.3s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                }
                .add-cart-btn.active {
                    background: #111827;
                    color: white;
                }
                .add-cart-btn.active:hover {
                    background: #1f2937;
                    transform: translateY(-2px);
                    box-shadow: 0 8px 24px rgba(0,0,0,0.15);
                }
                .add-cart-btn.added {
                    background: #16a34a;
                    color: white;
                }
                .add-cart-btn.disabled {
                    background: #f1f5f9;
                    color: #94a3b8;
                    cursor: not-allowed;
                }
            `}</style>

            {/* Back */}
            <button className='back-btn' onClick={() => navigate('/products')}>
                ← Back to Products
            </button>

            <div className='detail-grid'>

                {/* Image */}
                <div className='img-container'>
                    <img
                        src={product.image}
                        alt={product.name}
                        className='detail-img'
                        onError={(e) => e.target.src = 'https://via.placeholder.com/500?text=No+Image'}
                    />
                </div>

                {/* Info */}
                <div>
                    <span className='product-tag'>{product.category}</span>
                    <h1 className='detail-title'>{product.name}</h1>
                    <div className='detail-price'>
                        <span>Rs.</span>{product.price.toLocaleString()}
                    </div>
                    <p className='detail-desc'>{product.description}</p>

                    {/* Stock */}
                    <div className={`stock-badge ${product.stock > 0 ? 'stock-in' : 'stock-out'}`}>
                        {product.stock > 0 ? `✓ In Stock — ${product.stock} left` : '✕ Out of Stock'}
                    </div>

                    {/* Quantity */}
                    {product.stock > 0 && (
                        <>
                            <p className='qty-label'>Quantity</p>
                            <div className='qty-control'>
                                <button className='qty-btn'
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}>
                                    −
                                </button>
                                <span className='qty-num'>{quantity}</span>
                                <button className='qty-btn'
                                    onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}>
                                    +
                                </button>
                            </div>
                        </>
                    )}

                    {/* Add to Cart */}
                    <button
                        onClick={product.stock > 0 ? addToCartHandler : undefined}
                        className={`add-cart-btn ${added ? 'added' : product.stock > 0 ? 'active' : 'disabled'}`}>
                        {added ? '✓ Added to Cart!' : product.stock > 0 ? '🛒 Add to Cart' : 'Out of Stock'}
                    </button>

                </div>
            </div>
        </>
    )
}

export default ProductDetailPage