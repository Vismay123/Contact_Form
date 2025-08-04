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
    <div>
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
        <ul className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
          {contacts.map((c, idx) => (
            <li key={idx} className="border bg-white p-4 rounded shadow-sm relative">
              <div className="flex items-start justify-between">
                <input
                  type="checkbox"
                  checked={selectedContacts.includes(idx)}
                  onChange={() => handleCheckboxChange(idx)}
                  className="mr-2 mt-1 w-4 h-4"
                />
                <div className="flex-1">
                  <p className="font-semibold">{c.name}</p>
                  <p className="text-gray-600">{c.email}</p>
                  <p className="text-gray-500">{c.phone}</p>
                </div>
                <button
                  onClick={() => handleDeleteSingle(idx)}
                  className="text-red-600 hover:text-red-800 font-bold ml-2"
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No contacts found.</p>
      )}
    </div>
  )
}

export default ContactList
