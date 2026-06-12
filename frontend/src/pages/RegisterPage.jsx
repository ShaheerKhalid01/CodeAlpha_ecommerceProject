import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../store/slices/authSlice'

const RegisterPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { userInfo, loading, error } = useSelector(state => state.auth)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [matchError, setMatchError] = useState('')

    useEffect(() => {
        if (userInfo) navigate('/')
    }, [userInfo, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMatchError('Passwords do not match!')
            return
        }
        setMatchError('')
        dispatch(registerUser({ name, email, password }))
    }

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=DM+Sans:wght@300;400;500&display=swap');
                .auth-wrap { min-height: 80vh; display: flex; align-items: center; justify-content: center; }
                .auth-card { background: white; border: 1px solid #f1f5f9; border-radius: 24px; padding: 48px; width: 100%; max-width: 440px; box-shadow: 0 4px 40px rgba(0,0,0,0.04); }
                .auth-title { font-family: 'Playfair Display', serif; font-size: 2rem; color: #0f172a; margin-bottom: 8px; letter-spacing: -0.5px; }
                .auth-sub { color: #94a3b8; font-size: 0.9rem; font-weight: 300; margin-bottom: 36px; }
                .input-group { margin-bottom: 20px; }
                .input-label { display: block; font-size: 0.8rem; font-weight: 600; color: #374151; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
                .input-field { width: 100%; padding: 14px 18px; border: 1.5px solid #e2e8f0; border-radius: 14px; font-size: 0.95rem; color: #111827; background: #fafafa; transition: all 0.2s; outline: none; font-family: 'DM Sans', sans-serif; }
                .input-field:focus { border-color: #2563eb; background: white; box-shadow: 0 0 0 4px rgba(37,99,235,0.08); }
                .auth-btn { width: 100%; padding: 15px; background: #111827; color: white; border: none; border-radius: 50px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.3s; margin-top: 8px; font-family: 'DM Sans', sans-serif; }
                .auth-btn:hover { background: #1f2937; transform: translateY(-1px); box-shadow: 0 8px 20px rgba(0,0,0,0.12); }
                .auth-btn:disabled { background: #94a3b8; cursor: not-allowed; transform: none; }
                .auth-link { text-align: center; margin-top: 24px; font-size: 0.875rem; color: #64748b; }
                .auth-link a { color: #2563eb; font-weight: 500; text-decoration: none; }
                .error-box { background: #fef2f2; border: 1px solid #fecaca; color: #dc2626; padding: 12px 16px; border-radius: 12px; font-size: 0.875rem; margin-bottom: 20px; }
            `}</style>

            <div className='auth-wrap'>
                <div className='auth-card'>
                    <h1 className='auth-title'>Create account</h1>
                    <p className='auth-sub'>Join ShopNow and start shopping today</p>

                    {error && <div className='error-box'>{error}</div>}
                    {matchError && <div className='error-box'>{matchError}</div>}

                    <div className='input-group'>
                        <label className='input-label'>Full Name</label>
                        <input type='text' className='input-field' placeholder='Shaheer Khalid'
                            value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className='input-group'>
                        <label className='input-label'>Email</label>
                        <input type='email' className='input-field' placeholder='you@example.com'
                            value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='input-group'>
                        <label className='input-label'>Password</label>
                        <input type='password' className='input-field' placeholder='••••••••'
                            value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className='input-group'>
                        <label className='input-label'>Confirm Password</label>
                        <input type='password' className='input-field' placeholder='••••••••'
                            value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>

                    <button className='auth-btn' onClick={submitHandler} disabled={loading}>
                        {loading ? 'Creating account...' : 'Create Account →'}
                    </button>

                    <p className='auth-link'>
                        Already have an account?{' '}
                        <Link to='/login'>Sign in</Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default RegisterPage