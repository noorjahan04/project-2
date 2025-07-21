import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import { X } from 'lucide-react'

export default function AuthModal() {
  const { isAuthModalOpen, authMode, closeAuthModal } = useAuth()
  const [showSignup, setShowSignup] = useState(authMode === 'signup')

  const handleSwitch = () => {
    setShowSignup(!showSignup)
  }

  if (!isAuthModalOpen) return null

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
      onClick={closeAuthModal}
    >
      <div 
        className="bg-white p-8 rounded-lg w-full max-w-md relative"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>
        
        {showSignup ? (
          <>
            <SignupForm />
            <p className="mt-4 text-center text-sm">
              Already have an account?{' '}
              <button 
                onClick={handleSwitch}
                className="text-indigo-600 hover:underline font-medium"
              >
                Login
              </button>
            </p>
          </>
        ) : (
          <>
            <LoginForm />
            <p className="mt-4 text-center text-sm">
              Don't have an account?{' '}
              <button 
                onClick={handleSwitch}
                className="text-indigo-600 hover:underline font-medium"
              >
                Sign Up
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  )
}