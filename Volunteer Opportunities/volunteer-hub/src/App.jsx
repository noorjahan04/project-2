import { useState } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import { VolunteerProvider } from './context/VolunteerContext'
import Header from './components/Layout/Header'
import Hero from './components/Layout/Hero'
import OpportunityGrid from './components/Opportunities/OpportunityGrid'
import Calendar from './components/Calendar/Calendar'
import Reviews from './components/Reviews/Reviews'
import Resources from './components/Layout/Resources'
import Footer from './components/Layout/Footer'
import AuthModal from './components/Auth/AuthModal'
import Dashboard from './components/Dashboard/Dashboard'

function AppContent() {
  const { user } = useAuth()
  const [showDashboard, setShowDashboard] = useState(false)

  if (user && showDashboard) {
    return <Dashboard onBackToHome={() => setShowDashboard(false)} />
  }

  return (
    <div className="min-h-screen">
      <Header onShowDashboard={() => setShowDashboard(true)} />
      <Hero />
      <div id="opportunities">
        <OpportunityGrid />
      </div>
      <div id="calendar">
        <Calendar />
      </div>
      <div id="reviews">
        <Reviews />
      </div>
      <div id="resources">
        <Resources />
      </div>
      <Footer />
      <AuthModal />
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <VolunteerProvider>
        <AppContent />
      </VolunteerProvider>
    </AuthProvider>
  )
}

export default App