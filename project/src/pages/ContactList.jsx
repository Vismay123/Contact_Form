import { useState } from 'react'

const ContactList = () => {
  const [contacts, setContacts] = useState(JSON.parse(localStorage.getItem("contacts")) || [])
  const [selectedContacts, setSelectedContacts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false) // ✅ For modal toggle
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const contactsPerPage = 5

  const handleCheckboxChange = (index) => {
    if (selectedContacts.includes(index)) {
      setSelectedContacts(selectedContacts.filter(i => i !== index))
    } else {
      setSelectedContacts([...selectedContacts, index])
    }
  }

  const handleDeleteSelected = () => {
    const updatedContacts = contacts.filter((_, idx) => !selectedContacts.includes(idx))
    setContacts(updatedContacts)
    localStorage.setItem("contacts", JSON.stringify(updatedContacts))
    setSelectedContacts([])
  }

  const handleDeleteSingle = (index) => {
    const updatedContacts = contacts.filter((_, idx) => idx !== index)
    setContacts(updatedContacts)
    localStorage.setItem("contacts", JSON.stringify(updatedContacts))
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  //  for adding new contacts
  const handleAddContact = (e) => {
    e.preventDefault()
    const newContact = { name, email, phone }
    const updatedContacts = [...contacts, newContact]
    setContacts(updatedContacts)
    localStorage.setItem("contacts", JSON.stringify(updatedContacts))
    setName('')
    setEmail('')
    setPhone('')
    setShowModal(false)
  }

  //search filter
  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.phone && c.phone.includes(searchTerm))
  )

  const totalPages = Math.ceil(filteredContacts.length / contactsPerPage)
  const startIndex = (currentPage - 1) * contactsPerPage
  const currentContacts = filteredContacts.slice(startIndex, startIndex + contactsPerPage)

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
        <h2 className="text-2xl font-semibold">Contact List</h2>

        <div className="flex gap-2 w-full md:w-auto">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by name, email, or phone"
            value={searchTerm}
            onChange={handleSearchChange}
            className="border border-gray-300 p-2 rounded w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Add Contact Button */}
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            + Add Contact
          </button>
        </div>

        {selectedContacts.length > 0 && (
          <button
            onClick={handleDeleteSelected}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Delete Selected ({selectedContacts.length})
          </button>
        )}
      </div>

      {filteredContacts.length > 0 ? (
        <div className="flex-1 overflow-x-auto">
          <table className="w-full h-full bg-white rounded-lg shadow-md overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3 text-left">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedContacts(currentContacts.map((_, idx) => startIndex + idx))
                      } else {
                        const filtered = selectedContacts.filter(i => !currentContacts.includes(i))
                        setSelectedContacts(filtered)
                      }
                    }}
                    checked={selectedContacts.length === currentContacts.length && currentContacts.length > 0}
                  />
                </th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentContacts.map((c, idx) => (
                <tr key={startIndex + idx} className="border-b hover:bg-gray-100">
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selectedContacts.includes(startIndex + idx)}
                      onChange={() => handleCheckboxChange(startIndex + idx)}
                    />
                  </td>
                  <td className="p-3">{c.name}</td>
                  <td className="p-3">{c.email}</td>
                  <td className="p-3">{c.phone}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDeleteSingle(startIndex + idx)}
                      className="text-red-600 hover:text-red-800 font-bold"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination implemented */}
          <div className="flex justify-center items-center mt-4 space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No contacts found.</p>
      )}

      {/*  Popup for Adding Contact */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Add New Contact</h3>
            <form onSubmit={handleAddContact} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
              <input
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ContactList
