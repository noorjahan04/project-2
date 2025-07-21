import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Menu, X } from 'lucide-react'

export default function Header({ onShowDashboard }) {
  const { user, logout, openAuthModal } = useAuth()
  const [showMenu, setShowMenu] = useState(false)

  const handleClickOutside = (e) => {
    if (!e.target.closest('.navbar-content')) {
      setShowMenu(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setShowMenu(false)
  }

  return (
    <nav className="navbar-content fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-indigo-600 to-purple-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-xl font-bold">🤝 VOLUNTEER HUB</div>
          
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="md:hidden p-2"
          >
            {showMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          <div className={`${showMenu ? 'block' : 'hidden'} md:block absolute md:relative top-16 md:top-0 left-0 right-0 bg-gradient-to-r from-indigo-600 to-purple-700 md:bg-transparent p-4 md:p-0`}>
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <button onClick={() => scrollToSection('home')} className="hover:text-indigo-200 transition duration-200">
                Home
              </button>
              <button onClick={() => scrollToSection('opportunities')} className="hover:text-indigo-200 transition duration-200">
                Opportunities
              </button>
              <button onClick={() => scrollToSection('calendar')} className="hover:text-indigo-200 transition duration-200">
                Calendar
              </button>
              <button onClick={() => scrollToSection('reviews')} className="hover:text-indigo-200 transition duration-200">
                Reviews
              </button>
              <button onClick={() => scrollToSection('resources')} className="hover:text-indigo-200 transition duration-200">
                Resources
              </button>
              
              {user && (
                <button 
                  onClick={onShowDashboard}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-200 font-medium"
                >
                  Dashboard
                </button>
              )}
              
              {!user ? (
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                  <button
                    onClick={() => openAuthModal('login')}
                    className="bg-white text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 transition duration-200 font-medium"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => openAuthModal('signup')}
                    className="bg-white text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 transition duration-200 font-medium"
                  >
                    Signup
                  </button>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-2">
                  <span className="text-yellow-300">Welcome, {user.username}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}