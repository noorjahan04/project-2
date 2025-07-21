import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Users, Plus, Calendar, MapPin, Edit } from 'lucide-react'

export default function Groups() {
  const { user } = useAuth()
  const [groups, setGroups] = useState([])
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingGroupId, setEditingGroupId] = useState(null)
  const [newGroup, setNewGroup] = useState({
    name: '',
    description: '',
    category: '',
    location: '',
    date: ''
  })

  useEffect(() => {
    const savedGroups = JSON.parse(localStorage.getItem('volunteerGroups')) || []
    setGroups(savedGroups)
  }, [])

  const saveGroups = (updatedGroups) => {
    localStorage.setItem('volunteerGroups', JSON.stringify(updatedGroups))
    setGroups(updatedGroups)
  }

  const handleCreateGroup = (e) => {
    e.preventDefault()
    const group = {
      id: Date.now(),
      ...newGroup,
      creator: user.username,
      members: [user.username],
      createdAt: new Date().toISOString()
    }

    const updatedGroups = [...groups, group]
    saveGroups(updatedGroups)
    setNewGroup({ name: '', description: '', category: '', location: '', date: '' })
    setShowCreateForm(false)
  }

  const handleJoinGroup = (groupId) => {
    const updatedGroups = groups.map(group => {
      if (group.id === groupId && !group.members.includes(user.username)) {
        return {
          ...group,
          members: [...group.members, user.username]
        }
      }
      return group
    })
    saveGroups(updatedGroups)
  }

  const handleUpdateGroup = (groupId) => {
    const groupToEdit = groups.find(group => group.id === groupId)
    if (groupToEdit) {
      setNewGroup({
        name: groupToEdit.name,
        description: groupToEdit.description,
        category: groupToEdit.category,
        location: groupToEdit.location,
        date: groupToEdit.date
      })
      setEditingGroupId(groupId)
      setShowCreateForm(true)
    }
  }

  const handleSaveUpdate = (e) => {
    e.preventDefault()
    const updatedGroups = groups.map(group => {
      if (group.id === editingGroupId) {
        return {
          ...group,
          ...newGroup
        }
      }
      return group
    })
    saveGroups(updatedGroups)
    setNewGroup({ name: '', description: '', category: '', location: '', date: '' })
    setEditingGroupId(null)
    setShowCreateForm(false)
  }

  return (
    <div className="space-y-6">
     
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Volunteer Groups</h2>
        <button
          onClick={() => {
            setShowCreateForm(!showCreateForm)
            setEditingGroupId(null)
            setNewGroup({ name: '', description: '', category: '', location: '', date: '' })
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-200 flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create Group
        </button>
      </div>

      {showCreateForm && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {editingGroupId ? 'Update Group' : 'Create New Group'}
          </h3>
          <form onSubmit={editingGroupId ? handleSaveUpdate : handleCreateGroup} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Group Name"
                value={newGroup.name}
                onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                required
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <select
                value={newGroup.category}
                onChange={(e) => setNewGroup({ ...newGroup, category: e.target.value })}
                required
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Category</option>
                <option value="Environment">Environment</option>
                <option value="Education">Education</option>
                <option value="Community">Community</option>
                <option value="Health">Health</option>
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Location"
                value={newGroup.location}
                onChange={(e) => setNewGroup({ ...newGroup, location: e.target.value })}
                required
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="datetime-local"
                value={newGroup.date}
                onChange={(e) => setNewGroup({ ...newGroup, date: e.target.value })}
                required
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <textarea
              placeholder="Group Description"
              value={newGroup.description}
              onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
              required
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <div className="flex space-x-3">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200"
              >
                {editingGroupId ? 'Update Group' : 'Create Group'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowCreateForm(false)
                  setEditingGroupId(null)
                  setNewGroup({ name: '', description: '', category: '', location: '', date: '' })
                }}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.length === 0 ? (
          <div className="col-span-full text-center text-gray-600 py-8">
            No groups yet. Create the first one!
          </div>
        ) : (
          groups.map(group => (
            <div key={group.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{group.name}</h3>
                <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
                  {group.category}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{group.description}</p>
              
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  {group.location}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(group.date).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  {group.members.length} members
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <div className="text-xs text-gray-500">
                  Created by {group.creator}
                </div>
                {group.creator === user.username && (
                  <button
                    onClick={() => handleUpdateGroup(group.id)}
                    className="text-indigo-600 hover:text-indigo-800 transition duration-200"
                    title="Edit Group"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                )}
              </div>
              
              {!group.members.includes(user.username) ? (
                <button
                  onClick={() => handleJoinGroup(group.id)}
                  className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
                >
                  Join Group
                </button>
              ) : (
                <div className="w-full bg-green-100 text-green-800 py-2 rounded-lg text-center font-medium">
                  Joined
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}