import { useState } from 'react'

const ContactForm = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const handleAdd = (e) => {
    e.preventDefault()
    const newContact = { name, email, phone }
    const existing = JSON.parse(localStorage.getItem("contacts")) || []
    existing.push(newContact)
    localStorage.setItem("contacts", JSON.stringify(existing))
    setName('')
    setEmail('')
    setPhone('')
    alert("Contact added")
  }

  return (
    <form 
      onSubmit={handleAdd} 
      className="max-w-md mx-auto space-y-4 bg-white p-6 shadow-md rounded-md"
    >
      <h2 className="text-2xl font-semibold mb-2">Add Contact</h2>

      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Full Name" 
        className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-500" 
        required 
      />

      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email Address" 
        className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-500" 
        required 
      />

      <input 
        type="tel" 
        value={phone} 
        onChange={(e) => setPhone(e.target.value)} 
        placeholder="Contact Number" 
        className="w-full border border-gray-300 p-3 rounded focus:ring-2 focus:ring-blue-500" 
        pattern="[0-9]{10}" 
        title="Enter a valid 10-digit number" 
        required 
      />

      <button 
        type="submit" 
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
      >
        Add Contact
      </button>
    </form>
  )
}

export default ContactForm
