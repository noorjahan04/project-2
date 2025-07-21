import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

const skillOptions = [
  "Teaching",
  "Cooking",
  "Event Management",
  "Animal Care",
  "Gardening",
  "Mentoring",
  "Administrative",
  "Manual Labor",
  "Technology",
  "Healthcare"
]

export default function SignupForm() {
  const { signup, closeAuthModal } = useAuth()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [skills, setSkills] = useState([])
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const success = signup(username, email, password, skills)
    if (success) {
      closeAuthModal()
    } else {
      setError('An account with this email already exists. Please login instead.')
    }
  }

  const handleSkillChange = (e) => {
    const selectedSkills = Array.from(e.target.selectedOptions, option => option.value)
    setSkills(selectedSkills)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-center text-xl font-semibold text-gray-800 mb-6">Sign Up</h3>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>
      
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>
      
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>
      
      <div>
        <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-2">
          Your Skills
        </label>
        <select
          id="skills"
          multiple
          value={skills}
          onChange={handleSkillChange}
          className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        >
          {skillOptions.map(skill => (
            <option key={skill} value={skill} className="py-1">
              {skill}
            </option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple skills</p>
      </div>
      
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-200 font-medium"
      >
        Sign Up
      </button>
    </form>
  )
}