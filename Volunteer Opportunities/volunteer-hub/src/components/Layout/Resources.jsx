import { Book, Users, Phone, Star, GraduationCap, Network } from 'lucide-react'

export default function Resources() {
  return (
    <section id="resources" className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-2xl font-bold text-gray-900 mb-12">
          Resources
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-lg transition duration-300 hover:-translate-y-1">
            <Book className="h-12 w-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Volunteer Handbook</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Essential guidelines and best practices for effective volunteering in your community.
            </p>
            <a 
              href="https://www.unitedway.org/get-involved/volunteer" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Learn More →
            </a>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-lg transition duration-300 hover:-translate-y-1">
            <Users className="h-12 w-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Training Materials</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Access training resources and certification programs to enhance your volunteer skills.
            </p>
            <a 
              href="https://www.coursera.org/courses?query=volunteer%20management" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Browse Courses →
            </a>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-lg transition duration-300 hover:-translate-y-1">
            <Phone className="h-12 w-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Support</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Get help and support from our volunteer coordination team whenever you need assistance.
            </p>
            <a 
              href="mailto:support@volunteerhub.org"
              className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Email Support →
            </a>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-lg transition duration-300 hover:-translate-y-1">
            <Star className="h-12 w-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Recognition Program</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Learn about volunteer awards, certificates, and recognition opportunities.
            </p>
            <a 
              href="https://www.pointsoflight.org/awards-recognition/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
            >
              View Programs →
            </a>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-lg transition duration-300 hover:-translate-y-1">
            <GraduationCap className="h-12 w-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Online Learning</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Free courses on volunteer management, leadership, and community service skills.
            </p>
            <a 
              href="https://www.edx.org/learn/volunteering" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Start Learning →
            </a>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-lg transition duration-300 hover:-translate-y-1">
            <Network className="h-12 w-12 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Volunteer Networks</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Connect with other volunteers and share experiences in our community forums.
            </p>
            <a 
              href="https://www.volunteermatch.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Join Network →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}