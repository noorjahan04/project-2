import { useVolunteer } from '../../context/VolunteerContext'
import { format } from 'date-fns'

export default function Calendar() {
  const { userEvents } = useVolunteer()

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-2xl font-bold text-gray-900 mb-8">
          Calendar - Upcoming Volunteer Events
        </h2>
        
        <div className="space-y-6">
          {userEvents.length === 0 ? (
            <div className="text-center text-gray-600 py-12">
              No upcoming events. Apply for opportunities to see them here!
            </div>
          ) : (
            userEvents
              .sort((a, b) => new Date(a.date) - new Date(b.date))
              .map((event, index) => (
                <div 
                  key={`${event.id}-${index}`}
                  className="bg-white p-6 rounded-lg border-l-4 border-indigo-500 shadow-sm"
                >
                  <div className="text-indigo-600 font-semibold mb-2">
                    {format(new Date(event.date), 'EEEE, MMMM d, yyyy')}
                  </div>
                  <div className="text-lg font-medium text-gray-900 mb-2">
                    {event.title}
                  </div>
                  <div className="text-gray-600 text-sm mb-1">
                    {format(new Date(event.date), 'h:mm a')} | {event.location}
                  </div>
                  <div className="text-gray-500 text-sm">
                    {event.organization}
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </section>
  )
}