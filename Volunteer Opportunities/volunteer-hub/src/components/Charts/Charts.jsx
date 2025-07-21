import { useVolunteer } from '../../context/VolunteerContext'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1', '#d084d0']

export default function Charts() {
  const { userEvents, totalHours, totalEvents, totalOrganizations } = useVolunteer()

  const organizationData = userEvents.reduce((acc, event) => {
    const existing = acc.find(item => item.name === event.organization)
    if (existing) {
      existing.hours += event.duration || 0
      existing.events += 1
    } else {
      acc.push({
        name: event.organization,
        hours: event.duration || 0,
        events: 1
      })
    }
    return acc
  }, [])

  const monthlyData = userEvents.reduce((acc, event) => {
    const month = new Date(event.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    const existing = acc.find(item => item.month === month)
    if (existing) {
      existing.hours += event.duration || 0
    } else {
      acc.push({
        month,
        hours: event.duration || 0
      })
    }
    return acc
  }, [])

  const categoryData = userEvents.reduce((acc, event) => {
    
    const categoryMap = {
      'Community Food Bank': 'Hunger Relief',
      'Happy Paws Shelter': 'Animal Welfare',
      'Youth Development Center': 'Education',
      'Golden Years Care': 'Elder Care',
      'Green Earth Initiative': 'Environment',
      'Literacy Foundation': 'Education',
      'Urban Harvest Project': 'Environment',
      'Safe Haven Outreach': 'Social Services'
    }
    
    const category = categoryMap[event.organization] || 'Other'
    const existing = acc.find(item => item.name === category)
    if (existing) {
      existing.value += event.duration || 0
    } else {
      acc.push({
        name: category,
        value: event.duration || 0
      })
    }
    return acc
  }, [])

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Volunteer Analytics</h2>
      
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
          <div className="text-3xl font-bold text-indigo-600">{totalHours}</div>
          <div className="text-gray-600">Total Hours</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
          <div className="text-3xl font-bold text-green-600">{totalEvents}</div>
          <div className="text-gray-600">Events Joined</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
          <div className="text-3xl font-bold text-purple-600">{totalOrganizations}</div>
          <div className="text-gray-600">Organizations</div>
        </div>
      </div>

      {userEvents.length === 0 ? (
        <div className="text-center text-gray-600 py-12">
          No volunteer data yet. Start volunteering to see your analytics!
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Hours by Organization */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Hours by Organization</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={organizationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="hours" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Hours by Category */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Hours by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Monthly Progress */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 lg:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Volunteer Hours</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="hours" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  )
}