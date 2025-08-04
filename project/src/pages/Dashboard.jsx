import { Routes, Route } from 'react-router-dom'
import ContactForm from './ContactForm'
import ContactList from './ContactList'
import Sidebar from '../components/Sidebar'

const Dashboard = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
      <Routes>
        <Route path="contacts" element={<ContactList />} />
        <Route path="add-contact" element={<ContactForm />} />
      </Routes>
      </main>
    </div>

  )
}

export default Dashboard
