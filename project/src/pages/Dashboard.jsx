import { Routes, Route, Navigate } from 'react-router-dom'
import ContactForm from './ContactForm'
import ContactList from './ContactList'
import Sidebar from '../components/Sidebar'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Dashboard = () => {
  const { user } = useContext(AuthContext)
  const contacts = JSON.parse(localStorage.getItem("contacts")) || []

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
        <Routes>
          {/* Default Route - Dashboard Home */}
          <Route
            index
            element={
              <div>
                <h1 className="text-3xl font-bold mb-6">Welcome, {user?.name || user?.email} 👋</h1>
                <p className="text-gray-600 mb-8">
                  Manage your contacts easily. Use the sidebar to add or view contacts.
                </p>

                {/* Quick Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                    <h2 className="text-lg font-semibold mb-2">Total Contacts</h2>
                    <p className="text-3xl font-bold text-blue-600">{contacts.length}</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                    <h2 className="text-lg font-semibold mb-2">Recent Contact</h2>
                    <p className="text-gray-700">
                      {contacts.length > 0 ? contacts[contacts.length - 1].name : "No contacts yet"}
                    </p>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <a
                    href="/dashboard/add-contact"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                  >
                    ➕ Add Contact
                  </a>
                  <a
                    href="/dashboard/contacts"
                    className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
                  >
                    📋 View Contacts
                  </a>
                </div>
              </div>
            }
          />
          <Route path="contacts" element={<ContactList />} />
          <Route path="add-contact" element={<ContactForm />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </main>
    </div>
  )
}

export default Dashboard
