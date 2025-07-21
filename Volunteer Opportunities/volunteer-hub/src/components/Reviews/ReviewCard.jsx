export default function ReviewCard({ review }) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <h4 className="text-lg font-medium text-gray-900 mb-2">
        Organization: <span className="text-indigo-600 font-semibold">{review.org}</span>
      </h4>
      
      <div className="mb-3">
        <strong className="text-gray-700">Rating:</strong>{' '}
        <span className="text-yellow-500">
          {Array(parseInt(review.rating)).fill('⭐').join('')}
        </span>
      </div>
      
      <p className="text-gray-600 italic mb-4 leading-relaxed">
        "{review.reviewText}"
      </p>
      
      <div className="text-sm text-gray-500">
        — <strong>{review.user}</strong>, {review.date}
      </div>
    </div>
  )
}