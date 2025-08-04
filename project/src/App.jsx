import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext'

const App = () => {
  const { user } = useContext(AuthContext)

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard/*" element={user ? <Dashboard /> : <Navigate to="/" />} />
    </Routes>
  )
}

export default App
