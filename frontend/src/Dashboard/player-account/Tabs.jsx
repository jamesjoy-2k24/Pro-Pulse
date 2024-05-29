/* eslint-disable react/prop-types */
import { useContext } from "react";
import { toast } from "react-toastify";
import { BiMenu } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../context/authContext.jsx";

const Tabs = ({ tab, setTab }) => {
  const { dispatch } = useContext(authContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    sessionStorage.clear();
    // Clear state
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    // Force reload to ensure all cached data is cleared
    window.location.reload(true);
    navigate("/home");
    toast.success("Logged out successfully");
  };

  return (
    <div>
      <span className="lg:hidden">
        <BiMenu className="w-6 h-6 cursor-pointer" />
      </span>
      <div
        className="hidden w-[110%] lg:flex flex-col p-[30px] bg-white shadow-panelShadow items-center h-max
      rounded-md">
        <button
          onClick={() => setTab("overview")}
          className={`${
            tab === "overview" ? " text-[#0400ff] bg-[#cfdfff]" : "text-black"
          }
          w-full border border-solid border-gray-200 p-4 rounded-lg mb-8 hover:bg-[#cfdfff] hover:text-[#0400ff] font-semibold transition-all duration-200 ease-in
        }`}>
          Overview
        </button>

        <button
          onClick={() => setTab("appointments")}
          className={`${
            tab === "appointments"
              ? "text-[#0400ff] bg-[#cfdfff]"
              : "text-black"
          }
          w-full border border-solid border-gray-200 p-4 rounded-lg mb-8 hover:bg-[#cfdfff] hover:text-[#0400ff] font-semibold transition-all duration-200 ease-in
        }`}>
          Bookings
        </button>

        <button
          onClick={() => setTab("settings")}
          className={`${
            tab === "settings" ? " text-[#0400ff] bg-[#cfdfff]" : "text-black"
          }
          w-full border border-solid border-gray-200 p-4 rounded-lg mb-8 hover:bg-[#cfdfff] hover:text-[#0400ff] font-semibold transition-all duration-200 ease-in
        }`}>
          Settings
        </button>

        <div className="mt-[80px] w-full">
          <button
            onClick={handleLogout}
            className=" hover:text-blue-700 hover:opacity-100 transition-all duration-100 ease-in bg-black mb-[2rem] w-full p-3 text-white font-[700] text-[16px] leading-7 rounded-md">
            Logout
          </button>
          <button className="btn hover:bg-red-700 hover:opacity-100 transition-all duration-100 ease-in w-full p-3 text-[16px] leading-7 rounded-md">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
