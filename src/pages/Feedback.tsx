import React, { useEffect, useState } from 'react';
import { submitFeedback, getFeedbacks } from '../services/feedback';
import { Star, MessageSquare, User, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Feedback: React.FC = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form States
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0); // Mouse එක ගෙනියද්දි පෙන්වන්න
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Get Current User
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  // 1. Load Feedbacks
  const fetchReviews = async () => {
    try {
      const data = await getFeedbacks();
      setReviews(data);
    } catch (error) {
      console.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // 2. Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
        alert("Please login to submit feedback.");
        navigate('/login');
        return;
    }
    if (rating === 0) {
        alert("Please select a star rating!");
        return;
    }

    setSubmitting(true);
    try {
      await submitFeedback({
        userId: user._id,
        rating,
        message
      });
      alert("Thank you for your feedback!");
      setMessage('');
      setRating(0);
      fetchReviews(); // Refresh List
    } catch (error) {
      alert("Failed to submit feedback.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* HEADER */}
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-yellow-500 mb-2">User Feedback</h1>
            <p className="text-gray-400">We value your opinion! Tell us about your experience at MKD Cinemas.</p>
        </div>

        {/* FEEDBACK FORM */}
        <div className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700 mb-12">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <MessageSquare className="text-blue-500"/> Write a Review
            </h3>

            <form onSubmit={handleSubmit}>
                {/* Star Rating Input */}
                <div className="mb-6">
                    <label className="block text-sm text-gray-400 mb-2">Rate your experience</label>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                className="transition-transform hover:scale-110 focus:outline-none"
                            >
                                <Star 
                                    size={32} 
                                    className={`${(hoverRating || rating) >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} 
                                />
                            </button>
                        ))}
                    </div>
                    <p className="text-sm text-yellow-500 mt-1 h-5 font-bold">
                        {rating === 1 && "Poor 😞"}
                        {rating === 2 && "Fair 😐"}
                        {rating === 3 && "Good 🙂"}
                        {rating === 4 && "Very Good 😄"}
                        {rating === 5 && "Excellent! 🔥"}
                    </p>
                </div>

                {/* Message Input */}
                <div className="mb-6">
                    <label className="block text-sm text-gray-400 mb-2">Your Comments</label>
                    <textarea 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us what you liked or what we can improve..."
                        className="w-full bg-gray-900 border border-gray-600 rounded-lg p-4 text-white focus:border-yellow-500 outline-none h-32"
                        required
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={submitting}
                    className="bg-yellow-600 hover:bg-yellow-500 text-black font-bold px-8 py-3 rounded-lg flex items-center gap-2 transition"
                >
                    {submitting ? 'Submitting...' : <><Send size={18}/> Submit Review</>}
                </button>
            </form>
        </div>

        {/* REVIEWS LIST */}
        <div>
            <h3 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-2">Recent Reviews</h3>
            
            {loading ? (
                <p className="text-center text-gray-500">Loading reviews...</p>
            ) : reviews.length === 0 ? (
                <p className="text-center text-gray-500 py-10">No reviews yet. Be the first to write one!</p>
            ) : (
                <div className="grid gap-6">
                    {reviews.map((review) => (
                        <div key={review._id} className="bg-gray-800 p-6 rounded-xl border border-gray-700 flex gap-4">
                            {/* Avatar */}
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 rounded-full bg-gray-700 overflow-hidden border border-gray-600 flex items-center justify-center">
                                    {review.user?.profileImage ? (
                                        <img src={review.user.profileImage} alt="user" className="w-full h-full object-cover" />
                                    ) : (
                                        <User className="text-gray-400" />
                                    )}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-grow">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-bold text-white text-lg">{review.user?.username || "Anonymous"}</h4>
                                    <span className="text-xs text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</span>
                                </div>
                                
                                {/* Stars Display */}
                                <div className="flex gap-1 my-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={14} className={`${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} />
                                    ))}
                                </div>

                                <p className="text-gray-300 text-sm leading-relaxed">
                                    "{review.message}"
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>

      </div>
    </div>
  );
};

export default Feedback;