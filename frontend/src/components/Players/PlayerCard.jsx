/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { FaStar, FaArrowRight, FaCalendarAlt, FaShieldAlt } from "react-icons/fa";
import { BASE_URL } from "../../config";
import { useEffect, useState } from "react";

const PlayerCard = ({ player }) => {
  const { photo, name, age, sports = [], _id, isApproved } = player;

  const [review, setReview] = useState({ averageRating: 0, length: 0 });

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${BASE_URL}/reviews/${_id}/reviews`);
        const data = await response.json();
        if (data.reviews) {
          setReview(data.reviews);
        }
      } catch (error) {
        console.log("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [_id]);

  if (isApproved !== "approved") {
    return null;
  }

  return (
    <article className="group relative mx-auto w-full max-w-[360px] transition-all duration-500 hover:-translate-y-2">
      {/* Glow Effect Background */}
      <div className="absolute -inset-0.5 rounded-[2.5rem] bg-gradient-to-br from-primaryColor/20 via-transparent to-slate-900/10 opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-100" />
      
      <div className="relative flex h-full flex-col overflow-hidden rounded-[2.5rem] border border-slate-200/60 bg-white/90 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 group-hover:border-primaryColor/30 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
        
        {/* Profile Image Section */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={photo}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Image Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
          
          {/* Status Badge */}
          <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 backdrop-blur-md shadow-lg">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Verified Pro</span>
          </div>

          {/* Floating Rating Badge */}
          <div className="absolute bottom-4 right-6 flex items-center gap-1.5 rounded-2xl bg-slate-900/90 px-4 py-2 text-white backdrop-blur-md shadow-xl">
            <FaStar className="text-yellow-400" />
            <span className="text-sm font-black">{review.averageRating || "5.0"}</span>
          </div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex flex-1 flex-col p-8 pt-2">
          {/* Header Section */}
          <div className="mb-6">
            <h2 className="text-2xl font-[900] tracking-tight text-slate-900">
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </h2>
            <div className="mt-1 flex items-center gap-4 text-slate-400">
              <div className="flex items-center gap-1.5">
                <FaCalendarAlt className="text-xs" />
                <span className="text-xs font-bold uppercase tracking-wider">{age} Years</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FaShieldAlt className="text-xs" />
                <span className="text-xs font-bold uppercase tracking-wider">{sports[0] || "Athlete"}</span>
              </div>
            </div>
          </div>

          {/* Sports Tags */}
          <div className="mb-8 flex flex-wrap gap-2">
            {sports.map((sport, index) => (
              <span
                key={index}
                className="rounded-full border border-slate-100 bg-slate-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 transition-all duration-300 group-hover:border-primaryColor/10 group-hover:bg-primaryColor/5 group-hover:text-primaryColor"
              >
                {sport}
              </span>
            ))}
          </div>

          {/* Action Area */}
          <div className="mt-auto flex items-center justify-between border-t border-slate-50 pt-6">
            <div className="flex flex-col">
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Total Reviews</span>
              <span className="text-lg font-black text-slate-900">{review.length || 0}</span>
            </div>

            <Link
              to={`/players/${_id}`}
              className="group/btn relative inline-flex items-center justify-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white shadow-xl shadow-slate-900/20 transition-all duration-500 hover:w-36 group-hover:bg-primaryColor group-hover:shadow-primaryColor/40">
                <div className="absolute flex items-center gap-2 overflow-hidden whitespace-nowrap px-6 opacity-0 transition-all duration-300 group-hover/btn:opacity-100">
                  <span className="text-[11px] font-black uppercase tracking-widest">Profile</span>
                  <FaArrowRight className="text-xs" />
                </div>
                <FaArrowRight className="text-base transition-all duration-300 group-hover/btn:opacity-0" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PlayerCard;
