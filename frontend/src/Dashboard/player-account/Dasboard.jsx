/* eslint-disable no-unused-vars */
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import Tabs from "./Tabs";
import useFetchData from "../../hooks/useFetchData";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { BASE_URL } from "../../config";
import { FaStar, FaInfoCircle } from "react-icons/fa";
import PlayerAbout from "../../pages/Players/PlayerAbout";
import Profile from "./Profile";
import Bookings from "./Bookings.jsx";

const Dashboard = () => {
  const [tab, setTab] = useState("overview");

  const { data: player, loading, error } = useFetchData(`${BASE_URL}/players/profile/me/`);

  if (loading) return <Loader />;
  if (error) return <Error errMessage={error} />;
  
  if (!player) return null;

  return (
    <section className="min-h-screen bg-[#0b0c10] text-[#c5c6c7] py-10 px-4 sm:px-6 lg:px-8 font-sans antialiased">
      <div className="max-w-[1200px] mx-auto space-y-8 animate-fadeIn">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          
          {/* Sidebar / Tabs */}
          <Tabs tab={tab} setTab={setTab} />
          
          {/* Main Display panel */}
          <div className="lg:col-span-2 space-y-6 bg-[#1f2833]/10 border border-[#1f2833] rounded-3xl p-6 sm:p-8 shadow-2xl">
            
            {/* Approval Warning Banner */}
            {player.isApproved === "pending" && (
              <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-950/40 border border-amber-900/40 text-amber-400 text-sm">
                <FaInfoCircle size={20} className="flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block mb-0.5">Profile Under Audit</span>
                  To gain public listing approval, please complete your profile details. Our administration team will manually audit and approve your profile shortly.
                </div>
              </div>
            )}

            <div className="mt-2">
              {tab === "overview" && (
                <div className="space-y-8">
                  {/* Render profile details */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-[#1f2833]">
                    <figure className="w-40 h-40 flex-shrink-0 rounded-2xl overflow-hidden ring-4 ring-[#66fcf1]/20">
                      <img
                        src={player.photo || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </figure>
                    <div className="flex-1 text-center sm:text-left space-y-3">
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#66fcf1]/10 text-[#66fcf1] border border-[#66fcf1]/20">
                          {player.role || "Player"}
                        </span>
                      </div>

                      <h3 className="text-2xl font-extrabold text-white tracking-tight">
                        {player.name}
                      </h3>
                      
                      <div className="flex items-center justify-center sm:justify-start gap-2 text-sm">
                        <span className="flex items-center gap-1 font-semibold text-white">
                          <FaStar className="text-[#ffc518]" />
                          {player.averageRating || "0"}
                        </span>
                        <span className="text-[#8f94a6]">
                          ({player.totalRatings || 0} Reviews)
                        </span>
                      </div>
                      
                      <p className="text-sm leading-relaxed text-zinc-300">
                        {player.bio || "No summary biography provided yet."}
                      </p>
                    </div>
                  </div>
                  
                  {/* About Statement block */}
                  <PlayerAbout player={player} />
                </div>
              )}
              
              {tab === "appointments" && (
                <Bookings />
              )}
              
              {tab === "settings" && (
                <Profile player={player} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
