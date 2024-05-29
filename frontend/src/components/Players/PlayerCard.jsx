/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { BASE_URL } from "../../config";
import { useEffect, useState } from "react";
import "./PlayerCard.css";

const PlayerCard = ({ player }) => {
  const { photo, name, age, sports = [], _id, isApproved } = player; // Destructure isApproved

  const [review, setReview] = useState(0);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${BASE_URL}/reviews/${_id}/reviews`);
        const data = await response.json();
        setReview(data.reviews);
      } catch (error) {
        console.log(error);
      }
    };
    fetchReviews();
  }, [_id]);

  if (isApproved !== "approved") {
    return null; // Don't render the card if the player is not approved
  }

  return (
    <div className="shadow-lg shadow-black bg-primaryColor rounded-r-md rounded-bl-md hover:scale-105 transition-all duration-500 hover:shadow-xl hover:shadow-black">
      <div className="card w-[18em] h-[25em] bg-[#171717] flex flex-col rounded-r-md rounded-bl-md">
        <div className="w-[7em] h-[7em] rounded-[20px] border-2 border-primaryColor m-auto">
          <img
            src={photo}
            alt={name}
            className="w-full h-full object-cover rounded-[20px]"
          />
        </div>
        <div>
          <span className="text-white font-bold text-center block text-[1.2rem]">
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </span>
          <span className="text-gray-300 font-bold text-center block text-[0.9rem] mb-2">
            Age: {age}
          </span>
        </div>
        <div className="mt-1">
          <p className="info">
            {sports.map((sport, index) => (
              <span
                key={index}
                className="bg-[#363636] rounded-2xl p-[7px] text-white font-bold ml-2 mr-1">
                {index > 0 && " "} {sport}{" "}
              </span>
            ))}
          </p>
        </div>
        {isApproved === "approved" && (
          <div className="text-center text-green-500 font-bold mb-2">
            Approved
          </div>
        )}
        <div>
          <div className="flex justify-center items-center mt-2">
            <FaStar className="text-yellow-400" />
            <span className="text-white font-bold text-center block text-[0.8rem] ml-2">
              {review.averageRating} / 5{" "}
              <span className="ml-2">( {review.length} )</span>
            </span>
          </div>
          <Link to={`/players/${_id}`}>
            <button className="mb-4 mt-4 py-2 px-4 block m-auto rounded-[20px] border-none font-bold text-white shadow-md shadow-white hover:bg-primaryColor transition-all duration-300">
              View Profile
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
