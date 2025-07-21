import { useState } from 'react'
import { Calendar, MessageCircle, Users, BarChart3, Heart, Clock, MapPin, Building2, Home, ArrowLeft, LogOut, Menu, X } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useVolunteer } from '../../context/VolunteerContext'
import OpportunityGrid from '../Opportunities/OpportunityGrid'
import CalendarComponent from '../Calendar/Calendar'
import Messaging from '../Messaging/Messaging'
import Groups from '../Groups/Groups'
import Charts from '../Charts/Charts'
import Reviews from '../Reviews/Reviews'

export default function Dashboard({ onBackToHome }) {
  const { user, logout } = useAuth()
  const { totalHours, totalEvents, totalOrganizations, userEvents } = useVolunteer()
  const [activeTab, setActiveTab] = useState('overview')
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'opportunities', label: 'Opportunities', icon: Heart },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'messaging', label: 'Messages', icon: MessageCircle },
    { id: 'groups', label: 'Groups', icon: Users },
    { id: 'charts', label: 'Analytics', icon: BarChart3 },
    { id: 'reviews', label: 'Reviews', icon: Heart },
  ]

  const mobileTabs = tabs.filter(tab => 
    ['overview', 'opportunities', 'calendar', 'messaging'].includes(tab.id)
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-4 lg:space-y-6">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-4 lg:p-8 rounded-xl lg:rounded-2xl shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl lg:text-3xl font-bold mb-1 lg:mb-2">Welcome back, {user.username}! 👋</h1>
                  <p className="text-indigo-100 text-sm lg:text-lg">Ready to make a difference today?</p>
                </div>
                <div className="hidden md:block">
                  <div className="w-12 h-12 lg:w-20 lg:h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <Heart className="h-5 w-5 lg:h-10 lg:w-10 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6">
              <div className="bg-white rounded-xl lg:rounded-2xl shadow-md lg:shadow-lg border border-slate-200 p-3 lg:p-6 hover:shadow-lg lg:hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 lg:hover:-translate-y-1">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-8 h-8 lg:w-12 lg:h-12 rounded-lg lg:rounded-xl flex items-center justify-center mb-2 lg:mb-4">
                  <Clock className="h-4 w-4 lg:h-6 lg:w-6 text-white" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs lg:text-sm font-semibold text-slate-600 uppercase tracking-wide">Total Hours</p>
                    <p className="text-xl lg:text-3xl font-bold text-slate-900">{totalHours}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl lg:rounded-2xl shadow-md lg:shadow-lg border border-slate-200 p-3 lg:p-6 hover:shadow-lg lg:hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 lg:hover:-translate-y-1">
                <div className="bg-gradient-to-br from-green-500 to-green-600 w-8 h-8 lg:w-12 lg:h-12 rounded-lg lg:rounded-xl flex items-center justify-center mb-2 lg:mb-4">
                  <Calendar className="h-4 w-4 lg:h-6 lg:w-6 text-white" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs lg:text-sm font-semibold text-slate-600 uppercase tracking-wide">Events Joined</p>
                    <p className="text-xl lg:text-3xl font-bold text-slate-900">{totalEvents}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl lg:rounded-2xl shadow-md lg:shadow-lg border border-slate-200 p-3 lg:p-6 hover:shadow-lg lg:hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 lg:hover:-translate-y-1">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-8 h-8 lg:w-12 lg:h-12 rounded-lg lg:rounded-xl flex items-center justify-center mb-2 lg:mb-4">
                  <Building2 className="h-4 w-4 lg:h-6 lg:w-6 text-white" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs lg:text-sm font-semibold text-slate-600 uppercase tracking-wide">Organizations</p>
                    <p className="text-xl lg:text-3xl font-bold text-slate-900">{totalOrganizations}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl lg:rounded-2xl shadow-md lg:shadow-lg border border-slate-200 p-4 lg:p-8">
              <div className="flex items-center mb-4 lg:mb-6">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-500 w-8 h-8 lg:w-10 lg:h-10 rounded-lg lg:rounded-xl flex items-center justify-center mr-2 lg:mr-3">
                  <Heart className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-slate-900">Recent Activity</h3>
              </div>
              <div className="space-y-3 lg:space-y-4">
                {userEvents.length === 0 ? (
                  <div className="text-center text-slate-500 py-6 lg:py-12">
                    <div className="w-12 h-12 lg:w-16 lg:h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 lg:mb-4">
                      <Heart className="h-5 w-5 lg:h-8 lg:w-8 text-slate-400" />
                    </div>
                    <p className="text-base lg:text-lg font-medium">No recent activity</p>
                    <p className="text-xs lg:text-sm">Start volunteering to see your impact!</p>
                  </div>
                ) : (
                  userEvents.slice(0, 3).map((event, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 lg:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg lg:rounded-xl border border-blue-100">
                      <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                        <Heart className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
                      </div>
                      <span className="text-xs lg:text-sm font-medium text-slate-700">
                        Applied to {event.title} at {event.organization}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl lg:rounded-2xl shadow-md lg:shadow-lg border border-slate-200 p-4 lg:p-8">
              <h3 className="text-lg lg:text-xl font-bold text-slate-900 mb-4 lg:mb-6">Quick Actions</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4">
                <button
                  onClick={() => setActiveTab('opportunities')}
                  className="p-3 lg:p-6 text-center bg-gradient-to-br from-indigo-50 to-indigo-100 hover:from-indigo-100 hover:to-indigo-200 rounded-xl lg:rounded-2xl transition-all duration-300 transform hover:-translate-y-0.5 lg:hover:-translate-y-1 hover:shadow-md lg:hover:shadow-lg group"
                >
                  <Heart className="h-6 w-6 lg:h-8 lg:w-8 text-indigo-600 mx-auto mb-2 lg:mb-3 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-xs lg:text-sm font-semibold text-slate-700">Find Opportunities</span>
                </button>
                <button
                  onClick={() => setActiveTab('calendar')}
                  className="p-3 lg:p-6 text-center bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-xl lg:rounded-2xl transition-all duration-300 transform hover:-translate-y-0.5 lg:hover:-translate-y-1 hover:shadow-md lg:hover:shadow-lg group"
                >
                  <Calendar className="h-6 w-6 lg:h-8 lg:w-8 text-green-600 mx-auto mb-2 lg:mb-3 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-xs lg:text-sm font-semibold text-slate-700">View Calendar</span>
                </button>
                <button
                  onClick={() => setActiveTab('groups')}
                  className="p-3 lg:p-6 text-center bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 rounded-xl lg:rounded-2xl transition-all duration-300 transform hover:-translate-y-0.5 lg:hover:-translate-y-1 hover:shadow-md lg:hover:shadow-lg group"
                >
                  <Users className="h-6 w-6 lg:h-8 lg:w-8 text-purple-600 mx-auto mb-2 lg:mb-3 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-xs lg:text-sm font-semibold text-slate-700">Join Groups</span>
                </button>
                <button
                  onClick={() => setActiveTab('charts')}
                  className="p-3 lg:p-6 text-center bg-gradient-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 rounded-xl lg:rounded-2xl transition-all duration-300 transform hover:-translate-y-0.5 lg:hover:-translate-y-1 hover:shadow-md lg:hover:shadow-lg group"
                >
                  <BarChart3 className="h-6 w-6 lg:h-8 lg:w-8 text-orange-600 mx-auto mb-2 lg:mb-3 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-xs lg:text-sm font-semibold text-slate-700">View Analytics</span>
                </button>
              </div>
            </div>
          </div>
        )
      case 'opportunities':
        return <OpportunityGrid />
      case 'calendar':
        return <CalendarComponent />
      case 'messaging':
        return <Messaging />
      case 'groups':
        return <Groups />
      case 'charts':
        return <Charts />
      case 'reviews':
        return <Reviews />
      default:
        return null
    }
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Mobile Header */}
      <header className="lg:hidden bg-white shadow-lg border-b border-slate-200 flex-shrink-0 z-30">
        <div className="px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
                className="text-slate-700"
              >
                {isMobileNavOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
              <h1 className="text-lg font-bold text-slate-900">Volunteer Hub</h1>
            </div>
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">{user.username.charAt(0).toUpperCase()}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Desktop Header */}
      <header className="hidden lg:block bg-white shadow-lg border-b border-slate-200 flex-shrink-0 z-30">
        <div className="px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-xl font-bold text-slate-900">Volunteer Hub</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={onBackToHome}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Home</span>
              </button>
              <div className="flex items-center space-x-2 bg-slate-100 px-4 py-2 rounded-xl">
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">{user.username.charAt(0).toUpperCase()}</span>
                </div>
                <span className="text-sm font-medium text-slate-700">Welcome, {user.username}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={`${isMobileNavOpen ? 'block' : 'hidden'} lg:block w-64 lg:w-80 bg-gradient-to-b from-slate-50 to-slate-100 shadow-lg border-r border-slate-200 flex-shrink-0 overflow-y-auto flex flex-col`}>
          <div className="p-4 lg:p-6 flex-1">
            <div className="mb-4 lg:mb-6">
              <h2 className="text-lg font-bold text-slate-800 mb-2">Dashboard</h2>
              <div className="h-1 w-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
            </div>
            <nav className="space-y-1">
              {tabs.map(tab => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id)
                      setIsMobileNavOpen(false)
                    }}
                    className={`w-full flex items-center px-3 py-2 lg:px-4 lg:py-3 text-sm font-medium rounded-lg lg:rounded-xl transition-all duration-200 group ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg transform scale-105'
                        : 'text-slate-600 hover:bg-white hover:shadow-md hover:text-slate-800'
                    }`}
                  >
                    <Icon className={`h-5 w-5 mr-3 lg:mr-4 transition-transform duration-200 ${
                      activeTab === tab.id ? 'text-white' : 'group-hover:scale-110'
                    }`} />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>
          
          <div className="p-4 lg:p-6 border-t border-slate-200 bg-slate-50">
            <button
              onClick={logout}
              className="w-full flex items-center px-3 py-2 lg:px-4 lg:py-3 text-sm font-medium rounded-lg lg:rounded-xl transition-all duration-200 bg-red-50 text-red-600 hover:bg-red-500 hover:text-white hover:shadow-lg group"
            >
              <LogOut className="h-5 w-5 mr-3 lg:mr-4 transition-transform duration-200 group-hover:scale-110" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-50 to-slate-100 pb-16 lg:pb-0">
          <div className="p-4 lg:p-8">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-slate-200 z-40">
        <div className="flex justify-around">
          {mobileTabs.map(tab => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center p-2 text-xs ${activeTab === tab.id ? 'text-indigo-600' : 'text-slate-600'}`}
              >
                <Icon className="h-5 w-5 mb-1" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      <footer className="hidden lg:block bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white py-4 px-8 flex-shrink-0 shadow-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Heart className="h-5 w-5 text-yellow-300 animate-pulse" />
            <span className="font-semibold text-lg">Volunteer Hub</span>
          </div>
          <div className="text-sm text-indigo-100 font-medium">
            Made with <span className="text-red-300">❤️</span> for the community
          </div>
        </div>
      </footer>
    </div>
  )
}