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
    window.location.href = "/";
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  };

  return (
    <section className="p-0 min-h-screen bg-[#0b0c10] text-[#c5c6c7] font-sans antialiased overflow-x-hidden">
      <div className="flex h-screen overflow-hidden">
        {/* ===== Sidebar ===== */}
        <div
          className={`bg-[#1f2833]/90 backdrop-blur-xl border-r border-[#1f2833] h-full fixed top-0 z-50 ${
            sidebarOpen ? "left-0" : "-left-full"
          } transition-all duration-500 ease-out lg:relative lg:left-0 lg:w-[280px] flex flex-col justify-between shadow-2xl`}>
          <div>
            {/* Header/Brand */}
            <div className="flex text-center justify-between items-center p-6 border-b border-[#1f2833] mt-[2rem]">
              <div className="flex flex-col text-left gap-1">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#66fcf1]">Admin Portal</span>
                <h2 className="text-white font-bold text-xl tracking-tight">
                  Welcome, <span className="text-white">{user?.name || "Admin"}</span>
                </h2>
              </div>
              <button
                className="lg:hidden text-[#c5c6c7] hover:text-white transition-colors duration-200"
                onClick={() => setSidebarOpen(false)}>
                <FaTimes size={20} />
              </button>
            </div>

            {/* ===== Sidebar Content / Navigation ===== */}
            <div className="flex flex-col gap-3 p-4 mt-6">
              {[
                { id: "dashboard", label: "Dashboard", icon: <FaDashcube /> },
                { id: "players", label: "Players", icon: <FaUser /> },
                { id: "users", label: "Users", icon: <FaUser /> },
                { id: "notifications", label: "Bookings", icon: <FaBell /> },
              ].map((tab) => (
                <div
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`flex items-center gap-4 px-4 py-3.5 rounded-xl cursor-pointer transition-all duration-300 font-medium text-sm tracking-wide ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-[#66fcf1]/20 to-transparent text-[#66fcf1] border-l-4 border-[#66fcf1] shadow-[0_0_15px_rgba(102,252,241,0.1)]"
                      : "text-[#8f94a6] hover:text-white hover:bg-white/5"
                  }`}>
                  <span className="text-base">{tab.icon}</span>
                  <span>{tab.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Logout button at bottom of sidebar */}
          <div className="p-4 border-t border-[#1f2833] mb-6">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-red-950/40 text-red-400 hover:text-white hover:bg-red-900/60 border border-red-900/40 hover:border-red-700/60 transition-all duration-300 font-semibold text-sm">
              <FaDoorOpen />
              Logout
            </button>
          </div>
        </div>

        {/* ===== Main Content Area ===== */}
        <div className="flex-1 flex flex-col h-full overflow-y-auto">
          {/* Top Bar for Mobile */}
          <div className="lg:hidden p-4 bg-[#0b0c10] border-b border-[#1f2833] flex items-center justify-between sticky top-0 z-40">
            <span className="text-white font-bold tracking-tight">Pro-Pulse</span>
            <button
              className="text-[#66fcf1] bg-[#1f2833] p-2.5 rounded-lg border border-[#1f2833]"
              onClick={() => setSidebarOpen(true)}>
              <FaBars size={18} />
            </button>
          </div>

          {/* Main Workspace */}
          <div className="p-6 md:p-10 max-w-7xl w-full mx-auto">
            {activeTab === "dashboard" && (
              <Overview players={players} sponsors={sponsors} />
            )}
            {activeTab === "players" && <Players players={players} />}
            {activeTab === "users" && (
              <Users sponsors={sponsors} loading={loading} />
            )}
            {activeTab === "notifications" && (
              <Bookings bookings={bookings} />
            )}
            {activeTab === "settings" && <Setting />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
