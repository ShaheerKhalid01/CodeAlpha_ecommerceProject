import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import HomePage from './pages/HomePage'
import ProductListPage from './pages/ProductListPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import OrdersPage from './pages/OrdersPage'
import AdminRoute from './components/AdminRoute'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminProductsPage from './pages/admin/AdminProductsPage'
import AdminOrdersPage from './pages/admin/AdminOrdersPage'

const App = () => {
    return (
        <Router>
            <Navbar />
            <main style={{maxWidth: '1200px', margin: '0 auto', padding: '0 24px', paddingTop: '32px', paddingBottom: '64px'}}>
                <Routes>
                    {/* Public Routes */}
                    <Route path='/' element={<HomePage />} />
                    <Route path='/products' element={<ProductListPage />} />
                    <Route path='/products/:id' element={<ProductDetailPage />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/register' element={<RegisterPage />} />

                    {/* Protected Routes */}
                    <Route path='/cart' element={
                        <ProtectedRoute>
                            <CartPage />
                        </ProtectedRoute>
                    } />
                    <Route path='/checkout' element={
                        <ProtectedRoute>
                            <CheckoutPage />
                        </ProtectedRoute>
                    } />
                    <Route path='/profile' element={
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    } />
                    <Route path='/orders' element={
                        <ProtectedRoute>
                            <OrdersPage />
                        </ProtectedRoute>
                    } />
                    // Routes mein add karo
<Route path='/admin' element={
    <AdminRoute>
        <AdminDashboard />
    </AdminRoute>
} />
<Route path='/admin/products' element={
    <AdminRoute>
        <AdminProductsPage />
    </AdminRoute>
} />
<Route path='/admin/orders' element={
    <AdminRoute>
        <AdminOrdersPage />
    </AdminRoute>
} />
                </Routes>
            </main>
            {/* Footer saare pages pe dikhega */}
            <Footer />
        </Router>
    )
}

export default App