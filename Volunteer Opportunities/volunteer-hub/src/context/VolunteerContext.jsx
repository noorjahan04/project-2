import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { opportunities } from '../data/opportunities'

const VolunteerContext = createContext()

export const VolunteerProvider = ({ children }) => {
  const { user } = useAuth()
  const [appliedOpportunities, setAppliedOpportunities] = useState(new Set())
  const [userEvents, setUserEvents] = useState([])

  useEffect(() => {
    if (user) {
      loadUserData()
    } else {
      setAppliedOpportunities(new Set())
      setUserEvents([])
    }
  }, [user])

  const loadUserData = () => {
    const userKey = `userData-${user.email}`
    const saved = JSON.parse(localStorage.getItem(userKey))
    
    if (saved) {
      setUserEvents(saved.events || [])
      setAppliedOpportunities(new Set(saved.opportunities || []))
    } else {
      setUserEvents([])
      setAppliedOpportunities(new Set())
    }
  }

  const saveUserData = () => {
    if (!user) return

    const userKey = `userData-${user.email}`
    const existing = JSON.parse(localStorage.getItem(userKey)) || {}
    const userInfo = {
      ...existing,
      username: user.username,
      email: user.email,
      events: userEvents,
      opportunities: [...appliedOpportunities],
    }
    localStorage.setItem(userKey, JSON.stringify(userInfo))
  }

  const applyForOpportunity = (opportunityId) => {
    const opportunity = opportunities.find(op => op.id === opportunityId)
    if (!opportunity) return

    const newApplied = new Set(appliedOpportunities)
    newApplied.add(opportunityId)
    setAppliedOpportunities(newApplied)

    const newEvent = {
      id: opportunity.id,
      title: opportunity.title,
      date: new Date(opportunity.nextDate),
      location: opportunity.location,
      organization: opportunity.organization,
      duration: opportunity.duration,
    }

    const updatedEvents = [...userEvents, newEvent]
    setUserEvents(updatedEvents)
    
    setTimeout(() => saveUserData(), 100)
  }

  const totalHours = userEvents.reduce((sum, event) => sum + (event.duration || 0), 0)
  const uniqueOrganizations = new Set(userEvents.map(event => event.organization)).size

  return (
    <VolunteerContext.Provider value={{
      appliedOpportunities,
      userEvents,
      applyForOpportunity,
      totalHours,
      totalEvents: userEvents.length,
      totalOrganizations: uniqueOrganizations
    }}>
      {children}
    </VolunteerContext.Provider>
  )
}

export const useVolunteer = () => useContext(VolunteerContext)