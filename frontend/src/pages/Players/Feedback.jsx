import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { formateDate } from "../../utils/formateDate";
import FeedbackForm from "./FeedbackForm";
import { BASE_URL } from "../../config";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";

const Feedback = () => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const { id: playerId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/reviews/${playerId}/reviews`);
        const data = await response.json();
        setReviews(data.reviews);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
        console.log(error);
      }
    };
    fetchReviews();
  }, [playerId]);

  console.log(reviews);

  if (error) {
    return <Error message={error.message} />;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="mb-[50px]">
        <h4 className="text-[20px] leading-[30px] font-bold text-black mb-[30px]">
          All Reviews ({reviews.length} {reviews.length === 1 ? "Review" : ""})
        </h4>

        {reviews.map((review) => (
          <div
            key={review._id}
            className="mb-4 flex items-center justify-between">
            <div className="flex gap-3 items-center mb-2 mt-2">
              <img
                src={review.sponsor.photo}
                alt={review.sponsor.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h5 className="text-[16px] leading-6 text-primaryColor font-bold">
                  {review.sponsor.name}
                </h5>
                <p className="text-[14px] leading-6 text-black">
                <p className="text-[14px] leading-6 text-black">
                  {formateDate(review.createdAt)}
                </p>
                </p>
              </div>
            </div>

            <div className="flex items-end flex-col">
              <div className="flex gap-1 mb-2">
                {[...Array(review.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-500" />
                ))}
              </div>
              <p className="font-medium text-[15px]">{review.comment}</p>
            </div>
          </div>
        ))}
      </div>

      {!showFeedbackForm && (
        <div className="text-center">
          <button
            className="btn rounded-[30px]"
            onClick={() => setShowFeedbackForm(true)}>
            Give Feedback
          </button>
        </div>
      )}

      {showFeedbackForm && <FeedbackForm />}
    </div>
  );
};

export default Feedback;
