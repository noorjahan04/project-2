import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useVolunteer } from '../../context/VolunteerContext'
import OpportunityCard from './OpportunityCard'
import SearchFilters from './SearchFilters'
import { opportunities } from '../../data/opportunities'

export default function OpportunityGrid() {
  const { user, openAuthModal } = useAuth()
  const { appliedOpportunities, applyForOpportunity } = useVolunteer()
  const [filteredOpportunities, setFilteredOpportunities] = useState(opportunities)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSkill, setSelectedSkill] = useState('')

  useEffect(() => {
    filterOpportunities()
  }, [searchTerm, selectedCategory, selectedSkill])

  const filterOpportunities = () => {
    const filtered = opportunities.filter((op) => {
      const matchesKeyword = 
        op.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        op.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        op.description.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = selectedCategory === '' || op.category === selectedCategory
      const matchesSkill = selectedSkill === '' || (op.skills && op.skills.includes(selectedSkill))

      return matchesKeyword && matchesCategory && matchesSkill
    })

    setFilteredOpportunities(filtered)
  }

  const handleApply = (opportunityId) => {
    if (!user) {
      openAuthModal('login')
      return
    }

    const opportunity = opportunities.find(op => op.id === opportunityId)
    if (opportunity) {
      applyForOpportunity(opportunityId)
    }
  }

  return (
    <section className="py-8 px-4 md:px-8 lg:px-16 bg-gray-50">
      <h2 className="text-center text-2xl font-bold text-gray-900 mb-8 uppercase tracking-wide">
        Volunteer Opportunities
      </h2>
      
      <SearchFilters 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedSkill={selectedSkill}
        setSelectedSkill={setSelectedSkill}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOpportunities.length === 0 ? (
          <div className="col-span-full text-center text-gray-600 py-8">
            No opportunities found matching your criteria.
          </div>
        ) : (
          filteredOpportunities.map(opportunity => (
            <OpportunityCard 
              key={opportunity.id}
              opportunity={opportunity}
              isApplied={appliedOpportunities.has(opportunity.id)}
              onApply={handleApply}
            />
          ))
        )}
      </div>
    </section>
  )
}