import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Menu, Send } from 'lucide-react'

export default function Messaging() {
  const { user } = useAuth()
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [selectedContact, setSelectedContact] = useState('Maria')
  const [showContacts, setShowContacts] = useState(false)

  const contacts = [
    { name: 'Maria', role: 'Volunteer', status: 'Online' },
    { name: 'Sofia', role: 'Coordinator', status: 'Offline' }
  ]

  useEffect(() => {
    
    const savedMessages = JSON.parse(localStorage.getItem('volunteerMessages')) || []
    setMessages(savedMessages)
  }, [])

  const saveMessages = (updatedMessages) => {
    localStorage.setItem('volunteerMessages', JSON.stringify(updatedMessages))
    setMessages(updatedMessages)
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message = {
      id: Date.now(),
      sender: user.username,
      content: newMessage,
      timestamp: new Date().toISOString(),
      recipient: selectedContact
    }

    const updatedMessages = [...messages, message]
    saveMessages(updatedMessages)
    setNewMessage('')
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const filteredMessages = messages.filter(msg => 
    msg.recipient === selectedContact || msg.sender === selectedContact
  )

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-[80vh] flex flex-col md:flex-row">
     
      <div className="md:hidden p-3 border-b border-gray-200 flex items-center justify-between">
        <button 
          onClick={() => setShowContacts(!showContacts)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="text-center">
          <h3 className="font-semibold">{selectedContact}</h3>
          <div className="text-xs text-gray-500">
            {contacts.find(c => c.name === selectedContact)?.role}
          </div>
        </div>
        <div className="w-10"></div>
      </div>

      <div className={`${showContacts ? 'block' : 'hidden'} md:block w-full md:w-1/3 border-r border-gray-200 flex flex-col`}>
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold">Welcome, {user.username}</h3>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="p-2 text-gray-500 text-sm">Chats</div>
          <div className="space-y-1 px-2">
            {contacts.map(contact => (
              <button
                key={contact.name}
                onClick={() => {
                  setSelectedContact(contact.name)
                  setShowContacts(false)
                }}
                className={`w-full text-left p-3 rounded-lg transition duration-200 ${
                  selectedContact === contact.name
                    ? 'bg-gray-100'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{contact.name}</div>
                    <div className="text-sm text-gray-500">{contact.role}</div>
                  </div>
                  <div className={`text-xs ${
                    contact.status === 'Online' ? 'text-green-500' : 'text-gray-400'
                  }`}>
                    {contact.status}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={`${!showContacts ? 'flex' : 'hidden'} md:flex flex-1 flex-col`}>
       
        <div className="hidden md:flex p-3 border-b border-gray-200 items-center">
          <div>
            <h3 className="font-semibold">{selectedContact}</h3>
            <div className="text-xs text-gray-500">
              {contacts.find(c => c.name === selectedContact)?.role}
            </div>
          </div>
          <div className="ml-auto text-xs text-gray-400">
            {contacts.find(c => c.name === selectedContact)?.status}
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50">
          {filteredMessages.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              No messages yet. Start the conversation!
            </div>
          ) : (
            filteredMessages.map(message => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === user.username ? 'justify-end' : 'justify-start'
                }`}
              >
                <div className="flex flex-col max-w-xs">
                  <div
                    className={`px-4 py-2 rounded-lg ${
                      message.sender === user.username
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-gray-900 border border-gray-200'
                    }`}
                  >
                    <div className="text-sm">{message.content}</div>
                  </div>
                  <div className={`text-xs text-gray-500 mt-1 ${
                    message.sender === user.username ? 'text-right' : 'text-left'
                  }`}>
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}