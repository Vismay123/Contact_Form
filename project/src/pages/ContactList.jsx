import { useState } from 'react'

const ContactList = () => {
  const [contacts, setContacts] = useState(JSON.parse(localStorage.getItem("contacts")) || [])
  const [selectedContacts, setSelectedContacts] = useState([])

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

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Contact List</h2>
        {selectedContacts.length > 0 && (
          <button
            onClick={handleDeleteSelected}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Delete Selected ({selectedContacts.length})
          </button>
        )}
      </div>

      {contacts.length > 0 ? (
        <div className="flex-1 overflow-x-auto">
          <table className="w-full h-full bg-white rounded-lg shadow-md overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3 text-left">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedContacts(contacts.map((_, idx) => idx))
                      } else {
                        setSelectedContacts([])
                      }
                    }}
                    checked={selectedContacts.length === contacts.length}
                  />
                </th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-100">
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selectedContacts.includes(idx)}
                      onChange={() => handleCheckboxChange(idx)}
                    />
                  </td>
                  <td className="p-3">{c.name}</td>
                  <td className="p-3">{c.email}</td>
                  <td className="p-3">{c.phone}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDeleteSingle(idx)}
                      className="text-red-600 hover:text-red-800 font-bold"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No contacts found.</p>
      )}
    </div>
  )
}

export default ContactList
