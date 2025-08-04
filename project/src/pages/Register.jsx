import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleRegister = (e) => {
    e.preventDefault()
    if (localStorage.getItem(email)) {
      alert('User already exists')
    } else {
      localStorage.setItem(email, JSON.stringify({ email, password }))
      alert('Registered successfully')
      navigate('/')
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-8 shadow-md rounded space-y-4">
        <h2 className="text-2xl font-bold text-center">Create an Account</h2>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border p-2" required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border p-2" required />
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition">Register</button>
        <p>Already have an account? <Link to="/" className="text-blue-600">Login</Link></p>
      </form>
    </div>
  )
}

export default Register
