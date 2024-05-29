/* eslint-disable no-unused-vars */
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import Tabs from "./Tabs";
import useFetchData from "../../hooks/useFetchData";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { BASE_URL } from "../../config";
import { FaStar } from "react-icons/fa";
import PlayerAbout from "../../pages/Players/PlayerAbout";
import Profile from "./Profile";
import Bookings from "./Bookings.jsx";

const Dashboard = () => {
  const [tab, setTab] = useState("overview");

  const { data: player, loading, error } = useFetchData(`${BASE_URL}/players/profile/me/`);

  if (loading) return <Loader />;
  if (error) return <Error errMessage={error} />;
  
  // console.log(player);
  if (!player) return null;


  return (
    <section>
      <div className="max-w-[1200px] px-5 mx-auto">
        <div className="grid lg:grid-cols-3 gap-[30px] lg:gap-[60px]">
          <Tabs tab={tab} setTab={setTab} />
          <div className="lg:col-span-2">
            {player && (
              <div>
                {player.isApproved === "pending" && (
                  <div className="flex items-center p-4 mb-4 text-yellow-700 bg-yellow-50 rounded-lg">
                    <svg
                      aria-hidden="true"
                      className="flex-shrink-0 w-7 h-7 text-[#ffa011]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="sr-only">Info</span>
                    <div className="ml-3 text-sm font-medium">
                      To get approval please complete your profile. We&apos;ll
                      review manually and get back to you as soon as possible.
                    </div>
                  </div>
                )}
              </div>
            )}
            <div className="mt-2">
              {tab === "overview" && (
                <div>
                  {/* Render profile details */}
                  <div className="flex items-center gap-4 mb-10">
                    <figure className="max-w-[200px] max-h-[200px]">
                      <img
                        src={player.photo}
                        alt="Profile"
                        className="w-[200px] h-[200px] object-cover rounded-lg"
                      />
                    </figure>
                    <div>
                      <span className="bg-[#CCF0F3] text-blue-700 py-1 px-4 lg:py-2 lg:px-6 rounded text-[10px] md:text-[12px] leading-4 lg:text-[16px] lg:leading-6 font-semibold">
                        {player.role}
                      </span>

                      <h3 className="text-[22px] leading-9 font-bold text-black mt-3">
                        Mr.{player.name}
                      </h3>
                      <div className="flex items-center gap-[6px]">
                        <span className="flex items-center gap-[6px] text-black text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold">
                          <FaStar className="text-[#ffc518]" />
                          {player.averageRating}
                        </span>
                        <span className="text-gray-700 text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold">
                          ({player.totalRatings}) Ratings
                        </span>
                      </div>
                      <p className="text__para font-[15px] lg:max-w-[398px] leading-6">
                        {player.bio}
                      </p>
                    </div>
                  </div>
                  {/* Make sure to pass `player` to child components */}
                  <PlayerAbout player={player} />
                </div>
              )}
              {tab === "appointments" && (
                <Bookings />
              )}
              {tab === "settings" && <Profile player={player} />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
