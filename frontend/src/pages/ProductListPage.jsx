import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchProducts } from '../store/slices/productSlice'

const ProductListPage = () => {
    const dispatch = useDispatch()
    const { products, loading, error } = useSelector(state => state.products)

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    if (loading) return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', flexDirection: 'column', gap: '16px'}}>
            <div style={{width: '40px', height: '40px', border: '3px solid #e2e8f0', borderTop: '3px solid #2563eb', borderRadius: '50%', animation: 'spin 0.8s linear infinite'}}></div>
            <p style={{color: '#94a3b8', fontSize: '0.95rem'}}>Loading products...</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    )

    if (error) return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh'}}>
            <p style={{color: '#ef4444'}}>Error: {error}</p>
        </div>
    )

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=DM+Sans:wght@300;400;500&display=swap');

                .page-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    margin-bottom: 40px;
                    padding-bottom: 24px;
                    border-bottom: 1px solid #f1f5f9;
                }
                .page-title {
                    font-family: 'Playfair Display', serif;
                    font-size: 2.25rem;
                    color: #0f172a;
                    letter-spacing: -0.5px;
                }
                .product-count {
                    font-size: 0.875rem;
                    color: #94a3b8;
                    font-weight: 300;
                }
                .products-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
                    gap: 24px;
                }
                .product-card {
                    background: white;
                    border: 1px solid #f1f5f9;
                    border-radius: 20px;
                    overflow: hidden;
                    transition: all 0.3s ease;
                    cursor: pointer;
                }
                .product-card:hover {
                    border-color: #e2e8f0;
                    box-shadow: 0 12px 40px rgba(0,0,0,0.08);
                    transform: translateY(-6px);
                }
                .product-img-wrap {
                    position: relative;
                    overflow: hidden;
                    background: #f8fafc;
                    height: 220px;
                }
                .product-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.5s ease;
                }
                .product-card:hover .product-img {
                    transform: scale(1.05);
                }
                .product-badge {
                    position: absolute;
                    top: 12px;
                    left: 12px;
                    background: white;
                    color: #374151;
                    font-size: 0.7rem;
                    font-weight: 600;
                    padding: 4px 10px;
                    border-radius: 50px;
                    letter-spacing: 0.5px;
                    text-transform: uppercase;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                }
                .product-info {
                    padding: 20px 22px 22px;
                }
                .product-category {
                    font-size: 0.75rem;
                    color: #94a3b8;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    font-weight: 500;
                    margin-bottom: 6px;
                }
                .product-name {
                    font-size: 1rem;
                    font-weight: 600;
                    color: #111827;
                    margin-bottom: 16px;
                    line-height: 1.4;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                .product-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .product-price {
                    font-size: 1.25rem;
                    font-weight: 700;
                    color: #111827;
                }
                .product-price span {
                    font-size: 0.75rem;
                    font-weight: 400;
                    color: #94a3b8;
                    margin-right: 2px;
                }
                .view-btn {
                    background: #111827;
                    color: white;
                    padding: 9px 20px;
                    border-radius: 50px;
                    font-size: 0.8rem;
                    font-weight: 500;
                    text-decoration: none;
                    transition: all 0.2s;
                    display: inline-block;
                }
                .view-btn:hover {
                    background: #1f2937;
                    transform: translateY(-1px);
                }
                .empty-state {
                    text-align: center;
                    padding: 100px 0;
                }
                .empty-icon {
                    font-size: 4rem;
                    margin-bottom: 16px;
                }
                .empty-title {
                    font-family: 'Playfair Display', serif;
                    font-size: 1.5rem;
                    color: #374151;
                    margin-bottom: 8px;
                }
                .empty-desc {
                    color: #94a3b8;
                    font-size: 0.95rem;
                }
            `}</style>

            {/* Header */}
            <div className='page-header'>
                <div>
                    <h1 className='page-title'>All Products</h1>
                    <p style={{color: '#94a3b8', fontSize: '0.875rem', marginTop: '4px', fontWeight: '300'}}>
                        Discover our curated collection
                    </p>
                </div>
                <p className='product-count'>{products.length} items found</p>
            </div>

            {/* Products */}
            {products.length === 0 ? (
                <div className='empty-state'>
                    <div className='empty-icon'>📦</div>
                    <h2 className='empty-title'>No products yet</h2>
                    <p className='empty-desc'>Check back soon for new arrivals</p>
                </div>
            ) : (
                <div className='products-grid'>
                    {products.map(product => (
                        <div key={product._id} className='product-card'>
                            <div className='product-img-wrap'>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className='product-img'
                                    onError={(e) => e.target.src = 'https://via.placeholder.com/300x220?text=No+Image'}
                                />
                                <span className='product-badge'>{product.category}</span>
                            </div>
                            <div className='product-info'>
                                <p className='product-category'>{product.category}</p>
                                <h3 className='product-name'>{product.name}</h3>
                                <div className='product-footer'>
                                    <div className='product-price'>
                                        <span>Rs.</span>{product.price.toLocaleString()}
                                    </div>
                                    <Link to={`/products/${product._id}`} className='view-btn'>
                                        View →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

export default ProductListPage