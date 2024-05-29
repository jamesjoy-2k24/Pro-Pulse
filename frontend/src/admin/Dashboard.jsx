import { useState } from "react";
import {
  FaUser,
  FaDashcube,
  FaBell,
  FaDoorOpen,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import Users from "./Users.jsx";
import Players from "./Players.jsx";
import Setting from "./Settings.jsx";
import Overview from "./Overview.jsx";
import Bookings from "./Bookings.jsx";
import { useContext } from "react";
import { authContext } from "../context/authContext.jsx";
import UseFetchData from "../hooks/useFetchData";
import { BASE_URL } from "../config.js";

import Loader from "../components/Loader/Loading";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useContext(authContext);

  const { data: sponsors } = UseFetchData(`${BASE_URL}/users`);
  const { data: players, loading } = UseFetchData(`${BASE_URL}/players`);
  const { data: bookings } = UseFetchData(`${BASE_URL}/bookings`);

  if (loading) return <Loader />;

  // Null statement debug
  if (!sponsors || !players) {
    return null;
  }


  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  };

  return (
    <section className="p-0 h-screen">
      <div className="flex h-full bg-gray-50">
        <div
          className={`bg-[#550e0e] h-full fixed top-0 z-50 ${
            sidebarOpen ? "left-0" : "-left-full"
          } transition-all duration-300 lg:relative lg:left-0 lg:w-[300px] z-5`}>
          <div className="flex text-center justify-center items-center pt-[5rem]">
            <h2 className="text-white font-bold text-xl flex flex-col gap-2">
              Welcome! <br />
              <span className="text-3xl">{user?.name} </span>
            </h2>
            <button
              className="lg:hidden text-white ml-8"
              onClick={() => setSidebarOpen(false)}>
              <FaTimes />
            </button>
          </div>

          {/* ===== sidebar content ===== */}
          <div className="flex flex-col gap-6 p-5 pt-12">
            <div
              onClick={() => handleTabClick("dashboard")}
              className={`flex justify-center p-3 px-8 shadow shadow-white text-black font-bold text-[19px] hover:bg-white hover:text-black transition-all duration-50 ease-in rounded-md cursor-pointer ${
                activeTab === "dashboard"
                  ? "bg-white bg-opacity-100"
                  : "bg-white bg-opacity-5 text-white"
              }`}>
              <h3 className="flex items-center w-full gap-8">
                <FaDashcube className="inline" /> Dashboard
              </h3>
            </div>

            <div
              onClick={() => handleTabClick("players")}
              className={`flex justify-center p-3 px-8 shadow shadow-white text-black font-bold text-[19px] hover:bg-white hover:text-black transition-all duration-50 ease-in rounded-md cursor-pointer ${
                activeTab === "players"
                  ? "bg-white bg-opacity-100"
                  : "bg-white bg-opacity-5 text-white"
              }`}>
              <h3 className="flex items-center w-full gap-8">
                <FaUser className="inline" /> Players
              </h3>
            </div>

            <div
              onClick={() => handleTabClick("users")}
              className={`flex justify-center p-3 px-8 shadow shadow-white text-black font-bold text-[19px] hover:bg-white hover:text-black transition-all duration-50 ease-in rounded-md cursor-pointer ${
                activeTab === "users"
                  ? "bg-white bg-opacity-100"
                  : "bg-white bg-opacity-5 text-white"
              }`}>
              <h3 className="flex items-center w-full gap-8">
                <FaUser className="inline" /> Users
              </h3>
            </div>

            <div
              onClick={() => handleTabClick("notifications")}
              className={`flex justify-center p-3 px-8 shadow shadow-white text-black font-bold text-[19px] hover:bg-white hover:text-black transition-all duration-50 ease-in rounded-md cursor-pointer ${
                activeTab === "notifications"
                  ? "bg-white bg-opacity-100"
                  : "bg-white bg-opacity-5 text-white"
              }`}>
              <h3 className="flex items-center w-full gap-8">
                <FaBell className="inline" /> Bookings
              </h3>
            </div>

            <div className="flex justify-center p-3 mt-[5rem] bg-black text-white shadow-sm shadow-white rounded-md font-bold text-xl hover:bg-white hover:text-black transition-all duration-50 ease-in">
              <button
                onClick={handleLogout}
                className="flex items-center gap-5">
                <FaDoorOpen className="inline" /> Logout
              </button>
            </div>
          </div>
          {/* ===== end sidebar content ===== */}
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className="flex-1 transition-all duration-300">
            <div className="lg:hidden p-4 fixed ">
              <button
                className="text-white bg-primaryColor rounded-full p-2"
                onClick={() => setSidebarOpen(true)}>
                <FaBars />
              </button>
            </div>

            {/* ===== Pass data to child components ===== */}
            <div className="p-5 ml-10">
              {activeTab === "dashboard" && (
                <Overview players={players} sponsors={sponsors} />
              )}
              {activeTab === "players" && <Players players={players} />}
              {activeTab === "users" && <Users sponsors={sponsors} loading = {loading} />}
              {activeTab === "notifications" && <Bookings bookings={bookings} />}
              {activeTab === "settings" && <Setting />}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
