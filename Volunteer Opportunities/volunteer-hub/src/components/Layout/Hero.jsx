import React from 'react'
import { useAuth } from '../../context/AuthContext'

export default function Hero() {
  const { openAuthModal } = useAuth()

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center text-center text-white relative overflow-hidden"
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        animation: 'slideShow 12s infinite'
      }}
    >
      <style>{`
        @keyframes slideShow {
          0%, 33.33% {
            background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
              url("https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80");
          }
          33.34%, 66.66% {
            background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
              url("https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80");
          }
          66.67%, 100% {
            background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
              url("https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80");
          }
        }
      `}</style>
      
      <div className="max-w-4xl mx-auto px-4 pt-16 z-10 relative">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Welcome to Volunteer Hub
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
          Connect with meaningful volunteer opportunities in your community. Make a real difference by giving
          your time and skills to causes that matter.
        </p>
        <button
          onClick={() => openAuthModal('login')}
          className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
        >
          Get Started
        </button>
      </div>
    </section>
  )
}