import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AdminProductsPage = () => {
    const { userInfo } = useSelector(state => state.auth)
    const navigate = useNavigate()

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [deleteLoading, setDeleteLoading] = useState(null)

    // Form state
    const [showForm, setShowForm] = useState(false)
    const [editProduct, setEditProduct] = useState(null)
    const [formData, setFormData] = useState({
        name: '', description: '', price: '',
        image: '', category: '', stock: ''
    })
    const [formLoading, setFormLoading] = useState(false)
    const [formError, setFormError] = useState('')
    const [formSuccess, setFormSuccess] = useState('')

    const config = {
        headers: { Authorization: `Bearer ${userInfo.token}` }
    }

    // Products fetch karo
    const fetchProducts = async () => {
        try {
            const { data } = await axios.get('/api/products')
            setProducts(data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    // Delete product
    const deleteHandler = async (id) => {
        if (!window.confirm('Product delete karna chahte ho?')) return
        try {
            setDeleteLoading(id)
            await axios.delete(`/api/products/${id}`, config)
            setProducts(products.filter(p => p._id !== id))
            setDeleteLoading(null)
        } catch (error) {
            setDeleteLoading(null)
        }
    }

    // Edit product — form mein data load karo
    const editHandler = (product) => {
        setEditProduct(product)
        setFormData({
            name: product.name,
            description: product.description,
            price: product.price,
            image: product.image,
            category: product.category,
            stock: product.stock
        })
        setShowForm(true)
        setFormError('')
        setFormSuccess('')
    }

    // Form reset
    const resetForm = () => {
        setShowForm(false)
        setEditProduct(null)
        setFormData({
            name: '', description: '', price: '',
            image: '', category: '', stock: ''
        })
        setFormError('')
        setFormSuccess('')
    }

    // Submit — create ya update
    const submitHandler = async () => {
        setFormError('')
        setFormSuccess('')

        if (!formData.name || !formData.price || !formData.category) {
            setFormError('Name, Price aur Category zaroori hain!')
            return
        }

        try {
            setFormLoading(true)

            if (editProduct) {
                // Update
                await axios.put(`/api/products/${editProduct._id}`, formData, config)
                setFormSuccess('Product update ho gaya! ✅')
            } else {
                // Create
                await axios.post('/api/products', formData, config)
                setFormSuccess('Product ban gaya! ✅')
            }

            fetchProducts()
            setFormLoading(false)
            setTimeout(() => resetForm(), 1000)

        } catch (error) {
            setFormError(error.response?.data?.message || 'Kuch galat hua!')
            setFormLoading(false)
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
                .add-btn { background: #111827; color: white; border: none; padding: 12px 24px; border-radius: 50px; font-size: 0.875rem; font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: 'DM Sans', sans-serif; }
                .add-btn:hover { background: #1f2937; transform: translateY(-1px); }
                .back-btn { background: #f1f5f9; color: #374151; border: none; padding: 12px 24px; border-radius: 50px; font-size: 0.875rem; font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: 'DM Sans', sans-serif; }
                .back-btn:hover { background: #e2e8f0; }
                .form-card { background: white; border: 1px solid #f1f5f9; border-radius: 20px; padding: 32px; margin-bottom: 32px; }
                .form-title { font-family: 'Playfair Display', serif; font-size: 1.5rem; color: #0f172a; margin-bottom: 24px; }
                .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
                @media (max-width: 768px) { .form-grid { grid-template-columns: 1fr; } }
                .input-group { margin-bottom: 4px; }
                .input-label { display: block; font-size: 0.75rem; font-weight: 600; color: #374151; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; }
                .input-field { width: 100%; padding: 12px 16px; border: 1.5px solid #e2e8f0; border-radius: 12px; font-size: 0.9rem; color: #111827; background: #fafafa; outline: none; transition: all 0.2s; font-family: 'DM Sans', sans-serif; }
                .input-field:focus { border-color: #2563eb; background: white; box-shadow: 0 0 0 3px rgba(37,99,235,0.08); }
                .form-actions { display: flex; gap: 12px; margin-top: 20px; }
                .submit-btn { background: #111827; color: white; border: none; padding: 12px 28px; border-radius: 50px; font-size: 0.875rem; font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: 'DM Sans', sans-serif; }
                .submit-btn:hover { background: #1f2937; }
                .submit-btn:disabled { background: #94a3b8; cursor: not-allowed; }
                .cancel-btn { background: #f1f5f9; color: #374151; border: none; padding: 12px 28px; border-radius: 50px; font-size: 0.875rem; font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: 'DM Sans', sans-serif; }
                .cancel-btn:hover { background: #e2e8f0; }
                .success-box { background: #f0fdf4; border: 1px solid #bbf7d0; color: #16a34a; padding: 12px 16px; border-radius: 12px; font-size: 0.875rem; margin-bottom: 16px; }
                .error-box { background: #fef2f2; border: 1px solid #fecaca; color: #dc2626; padding: 12px 16px; border-radius: 12px; font-size: 0.875rem; margin-bottom: 16px; }
                .table-wrap { background: white; border: 1px solid #f1f5f9; border-radius: 20px; overflow: hidden; }
                .table { width: 100%; border-collapse: collapse; }
                .table th { background: #f8fafc; padding: 14px 20px; text-align: left; font-size: 0.75rem; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #f1f5f9; }
                .table td { padding: 16px 20px; border-bottom: 1px solid #f8fafc; font-size: 0.9rem; color: #374151; vertical-align: middle; }
                .table tr:last-child td { border-bottom: none; }
                .table tr:hover td { background: #fafafa; }
                .product-img { width: 48px; height: 48px; object-fit: cover; border-radius: 10px; background: #f1f5f9; }
                .edit-btn { background: #eff6ff; color: #2563eb; border: none; padding: 8px 16px; border-radius: 50px; font-size: 0.8rem; font-weight: 600; cursor: pointer; transition: all 0.2s; margin-right: 8px; }
                .edit-btn:hover { background: #dbeafe; }
                .del-btn { background: #fef2f2; color: #dc2626; border: none; padding: 8px 16px; border-radius: 50px; font-size: 0.8rem; font-weight: 600; cursor: pointer; transition: all 0.2s; }
                .del-btn:hover { background: #fee2e2; }
                .del-btn:disabled { opacity: 0.5; cursor: not-allowed; }
                .stock-badge { display: inline-block; padding: 4px 10px; border-radius: 50px; font-size: 0.75rem; font-weight: 600; }
                .stock-in { background: #f0fdf4; color: #16a34a; }
                .stock-out { background: #fef2f2; color: #dc2626; }
            `}</style>

            {/* Header */}
            <div className='page-header'>
                <div>
                    <h1 className='page-title'>Products</h1>
                    <p style={{color: '#94a3b8', fontSize: '0.875rem', marginTop: '4px'}}>
                        {products.length} products total
                    </p>
                </div>
                <div style={{display: 'flex', gap: '12px'}}>
                    <button className='back-btn' onClick={() => navigate('/admin')}>
                        ← Dashboard
                    </button>
                    <button className='add-btn' onClick={() => { resetForm(); setShowForm(true) }}>
                        + Add Product
                    </button>
                </div>
            </div>

            {/* Form */}
            {showForm && (
                <div className='form-card'>
                    <h2 className='form-title'>
                        {editProduct ? 'Edit Product' : 'Add New Product'}
                    </h2>

                    {formSuccess && <div className='success-box'>{formSuccess}</div>}
                    {formError && <div className='error-box'>{formError}</div>}

                    <div className='form-grid'>
                        <div className='input-group'>
                            <label className='input-label'>Product Name</label>
                            <input className='input-field' placeholder='Nike Air Max'
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})} />
                        </div>
                        <div className='input-group'>
                            <label className='input-label'>Category</label>
                            <input className='input-field' placeholder='Footwear'
                                value={formData.category}
                                onChange={(e) => setFormData({...formData, category: e.target.value})} />
                        </div>
                        <div className='input-group'>
                            <label className='input-label'>Price (Rs.)</label>
                            <input className='input-field' type='number' placeholder='5000'
                                value={formData.price}
                                onChange={(e) => setFormData({...formData, price: e.target.value})} />
                        </div>
                        <div className='input-group'>
                            <label className='input-label'>Stock</label>
                            <input className='input-field' type='number' placeholder='10'
                                value={formData.stock}
                                onChange={(e) => setFormData({...formData, stock: e.target.value})} />
                        </div>
                        <div className='input-group' style={{gridColumn: '1 / -1'}}>
                            <label className='input-label'>Image Path</label>
                            <input className='input-field' placeholder='/images/shoe.jpg'
                                value={formData.image}
                                onChange={(e) => setFormData({...formData, image: e.target.value})} />
                        </div>
                        <div className='input-group' style={{gridColumn: '1 / -1'}}>
                            <label className='input-label'>Description</label>
                            <textarea className='input-field' placeholder='Product description...' rows={3}
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                style={{resize: 'none'}} />
                        </div>
                    </div>

                    <div className='form-actions'>
                        <button className='submit-btn' onClick={submitHandler} disabled={formLoading}>
                            {formLoading ? 'Saving...' : editProduct ? 'Update Product' : 'Add Product'}
                        </button>
                        <button className='cancel-btn' onClick={resetForm}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Products Table */}
            <div className='table-wrap'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td>
                                    <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className='product-img'
                                            onError={(e) => e.target.src = 'https://via.placeholder.com/48'}
                                        />
                                        <div>
                                            <p style={{fontWeight: '600', color: '#111827'}}>{product.name}</p>
                                            <p style={{fontSize: '0.75rem', color: '#94a3b8'}}>
                                                {product._id.slice(-8)}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td>{product.category}</td>
                                <td style={{fontWeight: '600'}}>
                                    Rs. {product.price?.toLocaleString()}
                                </td>
                                <td>
                                    <span className={`stock-badge ${product.stock > 0 ? 'stock-in' : 'stock-out'}`}>
                                        {product.stock > 0 ? `${product.stock} left` : 'Out of Stock'}
                                    </span>
                                </td>
                                <td>
                                    <button className='edit-btn' onClick={() => editHandler(product)}>
                                        Edit
                                    </button>
                                    <button
                                        className='del-btn'
                                        disabled={deleteLoading === product._id}
                                        onClick={() => deleteHandler(product._id)}>
                                        {deleteLoading === product._id ? '...' : 'Delete'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default AdminProductsPage