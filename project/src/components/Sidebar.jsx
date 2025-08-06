import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Sidebar = () => {
  const { logout } = useContext(AuthContext)

  return (
    <div className="w-full md:w-64 bg-gray-900 text-white p-6 space-y-4 flex-shrink-0">
      {/* Clickable title */}
      <Link to="/dashboard" className="block mb-6">
        <h1 className="text-2xl font-semibold hover:text-blue-400 transition">MyApp</h1>
      </Link>

      <Link to="/dashboard/contacts" className="block px-4 py-2 rounded hover:bg-gray-700">
        📋 Contact List
      </Link>
      <Link to="/dashboard/add-contact" className="block px-4 py-2 rounded hover:bg-gray-700">
        ➕ Add Contact
      </Link>

      <button
        onClick={logout}
        className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white py-2 rounded"
      >
        Logout
      </button>
    </div>
  )
}

export default Sidebar
