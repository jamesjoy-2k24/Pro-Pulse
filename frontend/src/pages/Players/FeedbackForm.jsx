import { toast } from "react-toastify";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL, token } from "../../config";
import { FaStar, FaSmile } from "react-icons/fa";
import HashLoader from "react-spinners/HashLoader";

const FeedbackForm = () => {
  const [hover, setHover] = useState(0);
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const { id: playerId } = useParams();
  const [comment, setComment] = useState("");

  // Get sponsorId from token or local storage
  const user = localStorage.getItem("user");
  const userData = user ? JSON.parse(user) : null;
  const sponsorId = userData ? userData._id : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!rating || !comment) {
        setLoading(false);
        return toast.error("Please select a rating and provide a review");
      }

      const res = await fetch(`${BASE_URL}/reviews/${playerId}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          rating,
          comment,
          sponsorId, // Pass sponsorId to the backend
        }),
      });

      if (res.ok) {
        toast.success("Feedback submitted successfully");
        setRating(0);
        setComment("");
        setLoading(false);
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to add feedback");
        setLoading(false);
      }
    } catch (error) {
      if (error.message === "Unauthorized") {
        toast.error("Please login to submit feedback");
      }
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h3 className="text-black text-[16px] leading-6 font-[600] mb-4 mt-0">
          How was your experience?
        </h3>

        <div className="flex items-center">
          {[...Array(5)].map((star, index) => {
            index += 1;
            return (
              <button
                type="button"
                key={index}
                onClick={() => setRating(index)}
                onMouseOver={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
                className={
                  index <= (hover || rating)
                    ? "text-yellow-500"
                    : "text-gray-300"
                }>
                <FaStar className="text-[20px]" />
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-[30px]">
        <h3 className="text-black text-[16px] leading-6 font-[600] mb-4 mt-0">
          Share your thoughts & Suggestions!
        </h3>

        <textarea
          rows="5"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border border-solid border-black w-full focus:outline outline-primaryColor px-4 py-3 rounded-md"
          placeholder="Enter your comment"></textarea>
      </div>

      <button type="submit" className="btn mt-[30px] flex items-center">
        {loading ? <HashLoader color="#fff" size={25} /> : "Submit Feedback"}
        <FaSmile className="text-white ml-2 text-[20px]" />
      </button>
    </form>
  );
};

export default FeedbackForm;
