import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { removeFromCart } from '../store/slices/cartSlice'

const CartPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { cartItems, totalPrice } = useSelector(state => state.cart)

    const checkoutHandler = () => {
        navigate('/checkout')
    }

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=DM+Sans:wght@300;400;500&display=swap');
                .page-title { font-family: 'Playfair Display', serif; font-size: 2.25rem; color: #0f172a; letter-spacing: -0.5px; margin-bottom: 40px; padding-bottom: 24px; border-bottom: 1px solid #f1f5f9; }
                .cart-grid { display: grid; grid-template-columns: 1fr 360px; gap: 32px; align-items: start; }
                @media (max-width: 768px) { .cart-grid { grid-template-columns: 1fr; } }
                .cart-item { background: white; border: 1px solid #f1f5f9; border-radius: 20px; padding: 20px 24px; display: flex; align-items: center; gap: 20px; margin-bottom: 16px; transition: all 0.2s; }
                .cart-item:hover { border-color: #e2e8f0; box-shadow: 0 4px 16px rgba(0,0,0,0.04); }
                .cart-img { width: 80px; height: 80px; object-fit: cover; border-radius: 12px; background: #f8fafc; flex-shrink: 0; }
                .cart-name { font-size: 1rem; font-weight: 600; color: #111827; margin-bottom: 4px; }
                .cart-price { font-size: 0.875rem; color: #2563eb; font-weight: 500; }
                .cart-qty { font-size: 0.8rem; color: #94a3b8; margin-top: 2px; }
                .cart-subtotal { font-size: 1.1rem; font-weight: 700; color: #111827; margin-left: auto; flex-shrink: 0; }
                .remove-btn { background: #fef2f2; border: none; color: #ef4444; width: 36px; height: 36px; border-radius: 50%; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: center; font-size: 1rem; flex-shrink: 0; }
                .remove-btn:hover { background: #fee2e2; transform: scale(1.1); }
                .summary-card { background: white; border: 1px solid #f1f5f9; border-radius: 20px; padding: 32px; position: sticky; top: 80px; }
                .summary-title { font-family: 'Playfair Display', serif; font-size: 1.5rem; color: #0f172a; margin-bottom: 24px; }
                .summary-row { display: flex; justify-content: space-between; align-items: center; font-size: 0.9rem; color: #64748b; margin-bottom: 12px; }
                .summary-total { display: flex; justify-content: space-between; align-items: center; padding-top: 16px; margin-top: 4px; border-top: 1px solid #f1f5f9; }
                .total-label { font-size: 1rem; font-weight: 600; color: #111827; }
                .total-price { font-size: 1.5rem; font-weight: 700; color: #111827; }
                .checkout-btn { width: 100%; padding: 16px; background: #111827; color: white; border: none; border-radius: 50px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.3s; margin-top: 20px; font-family: 'DM Sans', sans-serif; }
                .checkout-btn:hover { background: #1f2937; transform: translateY(-1px); box-shadow: 0 8px 20px rgba(0,0,0,0.12); }
                .continue-link { display: block; text-align: center; margin-top: 12px; color: #64748b; font-size: 0.875rem; text-decoration: none; transition: color 0.2s; }
                .continue-link:hover { color: #111827; }
                .empty-state { text-align: center; padding: 100px 0; }
                .empty-icon { font-size: 4rem; margin-bottom: 20px; }
                .empty-title { font-family: 'Playfair Display', serif; font-size: 1.75rem; color: #374151; margin-bottom: 8px; }
                .empty-desc { color: #94a3b8; margin-bottom: 32px; font-weight: 300; }
                .shop-btn { background: #111827; color: white; padding: 14px 32px; border-radius: 50px; text-decoration: none; font-weight: 500; transition: all 0.2s; display: inline-block; }
                .shop-btn:hover { background: #1f2937; transform: translateY(-1px); }
            `}</style>

            <h1 className='page-title'>Your Cart</h1>

            {cartItems.length === 0 ? (
                <div className='empty-state'>
                    <div className='empty-icon'>🛒</div>
                    <h2 className='empty-title'>Your cart is empty</h2>
                    <p className='empty-desc'>Looks like you haven't added anything yet</p>
                    <Link to='/products' className='shop-btn'>Browse Products →</Link>
                </div>
            ) : (
                <div className='cart-grid'>
                    {/* Items */}
                    <div>
                        {cartItems.map(item => (
                            <div key={item._id} className='cart-item'>
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className='cart-img'
                                    onError={(e) => e.target.src = 'https://via.placeholder.com/80'}
                                />
                                <div style={{flex: 1}}>
                                    <p className='cart-name'>{item.name}</p>
                                    <p className='cart-price'>Rs. {item.price.toLocaleString()}</p>
                                    <p className='cart-qty'>Qty: {item.quantity}</p>
                                </div>
                                <p className='cart-subtotal'>
                                    Rs. {(item.price * item.quantity).toLocaleString()}
                                </p>
                                <button
                                    className='remove-btn'
                                    onClick={() => dispatch(removeFromCart(item._id))}>
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className='summary-card'>
                        <h2 className='summary-title'>Order Summary</h2>
                        <div className='summary-row'>
                            <span>Items ({cartItems.length})</span>
                            <span>Rs. {totalPrice.toLocaleString()}</span>
                        </div>
                        <div className='summary-row'>
                            <span>Shipping</span>
                            <span style={{color: '#16a34a', fontWeight: '500'}}>Free</span>
                        </div>
                        <div className='summary-total'>
                            <span className='total-label'>Total</span>
                            <span className='total-price'>Rs. {totalPrice.toLocaleString()}</span>
                        </div>
                        <button className='checkout-btn' onClick={checkoutHandler}>
                            Proceed to Checkout →
                        </button>
                        <Link to='/products' className='continue-link'>
                            ← Continue Shopping
                        </Link>
                    </div>
                </div>
            )}
        </>
    )
}

export default CartPage