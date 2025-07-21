import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import ReviewCard from './ReviewCard'
import ReviewForm from './ReviewForm'
import { sampleReviews } from '../../data/reviews'

export default function Reviews() {
  const { user } = useAuth()
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    const savedReviews = JSON.parse(localStorage.getItem('reviews')) || []
    setReviews([...savedReviews, ...sampleReviews])
  }, [])

  const handleReviewSubmit = (newReview) => {
    const reviewWithDate = {
      ...newReview,
      user: user.username,
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    }
    
    const updatedReviews = [reviewWithDate, ...reviews]
    setReviews(updatedReviews)
    
    const userReviews = updatedReviews.filter(r => !sampleReviews.includes(r))
    localStorage.setItem('reviews', JSON.stringify(userReviews))
  }

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {user && <ReviewForm onSubmit={handleReviewSubmit} />}
        
        <h2 className="text-center text-2xl font-bold text-gray-900 mb-8">
          What others say about us
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.length === 0 ? (
            <div className="col-span-full text-center text-gray-600 py-8">
              No reviews yet. Be the first to write one!
            </div>
          ) : (
            reviews.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))
          )}
        </div>
      </div>
    </section>
  )
}