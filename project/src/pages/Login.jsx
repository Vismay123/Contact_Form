import { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const storedUser = JSON.parse(localStorage.getItem(email))
    if (storedUser?.password === password) {
      login({ email })
      navigate('/dashboard')
    } else {
      alert('Invalid credentials')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
    <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 shadow-xl rounded-md space-y-6">
    <h2 className="text-2xl font-bold text-center">Login to Your Account</h2>
    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required />
    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" required />
    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition">Login</button>
    <p className="text-center text-sm">Don't have an account? <Link to="/register" className="text-blue-600 underline">Register</Link></p>
    </form>
    </div>

  )
}

export default Login
