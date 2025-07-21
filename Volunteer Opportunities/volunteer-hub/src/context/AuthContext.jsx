import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState('login')

  useEffect(() => {
    const savedUser = localStorage.getItem('volunteerHubUser')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const login = (email, password) => {
    
    const userKey = `userData-${email}`
    const savedUser = JSON.parse(localStorage.getItem(userKey))
    
    if (savedUser && savedUser.password === password) {
      const userData = {
        username: savedUser.username,
        email: savedUser.email,
        skills: savedUser.skills || []
      }
      setUser(userData)
      localStorage.setItem('volunteerHubUser', JSON.stringify(userData))
      return true
    }
    return false
  }

  const signup = (username, email, password, skills) => {
    const userKey = `userData-${email}`
    if (localStorage.getItem(userKey)) {
      return false 
    }

    const userData = {
      username,
      email,
      password,
      skills,
      events: [],
      opportunities: []
    }

    localStorage.setItem(userKey, JSON.stringify(userData))
    setUser({ username, email, skills })
    localStorage.setItem('volunteerHubUser', JSON.stringify({ username, email, skills }))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('volunteerHubUser')
  }

  const openAuthModal = (mode = 'login') => {
    setAuthMode(mode)
    setIsAuthModalOpen(true)
  }

  const closeAuthModal = () => {
    setIsAuthModalOpen(false)
  }

  return (
    <AuthContext.Provider value={{
      user,
      login,
      signup,
      logout,
      isAuthModalOpen,
      authMode,
      openAuthModal,
      closeAuthModal
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)