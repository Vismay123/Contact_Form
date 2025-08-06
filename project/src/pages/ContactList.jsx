import { useState } from 'react'

const ContactList = () => {
  const [contacts, setContacts] = useState(JSON.parse(localStorage.getItem("contacts")) || [])
  const [selectedContacts, setSelectedContacts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('') // ✅ Search state
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

  // ✅ Filter contacts based on search term
  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.phone && c.phone.includes(searchTerm))
  )

  // ✅ Pagination logic (on filtered list)
  const totalPages = Math.ceil(filteredContacts.length / contactsPerPage)
  const startIndex = (currentPage - 1) * contactsPerPage
  const currentContacts = filteredContacts.slice(startIndex, startIndex + contactsPerPage)

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1) // Reset to first page when searching
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
        <h2 className="text-2xl font-semibold">Contact List</h2>

        {/* ✅ Search Input */}
        <input
          type="text"
          placeholder="Search by name, email, or phone"
          value={searchTerm}
          onChange={handleSearchChange}
          className="border border-gray-300 p-2 rounded w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

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

          {/* ✅ Pagination */}
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
    </div>
  )
}

export default ContactList
