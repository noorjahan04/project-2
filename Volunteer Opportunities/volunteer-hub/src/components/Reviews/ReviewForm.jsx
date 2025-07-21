import { useState } from 'react'

const organizations = [
  "Community Food Bank",
  "Happy Paws Shelter",
  "Youth Development Center",
  "Golden Years Care",
  "Green Earth Initiative",
  "Literacy Foundation",
  "Urban Harvest Project",
  "Safe Haven Outreach"
]

export default function ReviewForm({ onSubmit }) {
  const [org, setOrg] = useState('')
  const [rating, setRating] = useState('')
  const [reviewText, setReviewText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ org, rating, reviewText })
    setOrg('')
    setRating('')
    setReviewText('')
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 text-center mb-6">
        Leave a Review
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="orgSelect" className="block text-sm font-medium text-gray-700 mb-2">
            Organization:
          </label>
          <select
            id="orgSelect"
            value={org}
            onChange={(e) => setOrg(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="" disabled>Select an organization</option>
            {organizations.map(org => (
              <option key={org} value={org}>{org}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
            Rating:
          </label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="" disabled>Rate from 1 to 5</option>
            <option value="1">1 - Poor</option>
            <option value="2">2 - Fair</option>
            <option value="3">3 - Good</option>
            <option value="4">4 - Very Good</option>
            <option value="5">5 - Excellent</option>
          </select>
        </div>

        <div>
          <label htmlFor="reviewText" className="block text-sm font-medium text-gray-700 mb-2">
            Review:
          </label>
          <textarea
            id="reviewText"
            placeholder="Write your review here..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            required
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-vertical"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
          >
            Submit Review
          </button>
        </div>
      </form>
    </div>
  )
}