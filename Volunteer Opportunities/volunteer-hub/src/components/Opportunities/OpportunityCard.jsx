import { Clock, MapPin, Building2 } from 'lucide-react'

export default function OpportunityCard({ opportunity, isApplied, onApply }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <img 
        src={opportunity.image} 
        alt={opportunity.title}
        className="w-full h-45 object-cover rounded-lg mb-4"
      />
      
      <h3 className="text-lg font-semibold text-indigo-700 mb-3">
        {opportunity.title}
      </h3>
      
      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
        {opportunity.description}
      </p>
      
      <div className="text-sm font-medium text-purple-600 mb-4">
        {opportunity.category}
      </div>
      
      <div className="space-y-2 text-sm text-gray-600 mb-4">
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-2 text-purple-600" />
          {opportunity.hours}
        </div>
        <div className="flex items-center">
          <MapPin className="h-4 w-4 mr-2 text-purple-600" />
          {opportunity.location}
        </div>
        <div className="flex items-center">
          <Building2 className="h-4 w-4 mr-2 text-purple-600" />
          {opportunity.organization}
        </div>
      </div>
      
      {opportunity.skills && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {opportunity.skills.map(skill => (
              <span 
                key={skill}
                className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full border border-purple-200 font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
      
      <button
        onClick={() => !isApplied && onApply(opportunity.id)}
        disabled={isApplied}
        className={`w-full py-3 px-4 rounded-lg font-medium transition duration-200 ${
          isApplied
            ? 'bg-green-500 text-white cursor-default'
            : 'bg-red-500 hover:bg-indigo-600 text-white'
        }`}
      >
        {isApplied ? 'Applied' : 'Apply Now'}
      </button>
    </div>
  )
}