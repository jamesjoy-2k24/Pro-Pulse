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

    navigate("/home");
    toast.success("Logged out successfully");
  };

  return (
    <div className="w-full">
      <span className="lg:hidden flex justify-end mb-4">
        <button className="p-2.5 rounded-lg bg-[#1f2833] border border-[#1f2833] text-[#66fcf1]">
          <BiMenu className="w-6 h-6 cursor-pointer" />
        </button>
      </span>
      
      <div className="hidden lg:flex flex-col p-6 bg-[#1f2833]/90 backdrop-blur-xl border border-[#1f2833] rounded-3xl items-center h-max shadow-2xl space-y-3 w-full">
        {[
          { id: "overview", label: "Overview" },
          { id: "appointments", label: "Bookings" },
          { id: "settings", label: "Settings" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setTab(item.id)}
            className={`w-full px-4 py-3 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 ${
              tab === item.id
                ? "bg-gradient-to-r from-[#66fcf1]/20 to-transparent text-[#66fcf1] border border-[#66fcf1]/30 shadow-[0_0_15px_rgba(102,252,241,0.1)]"
                : "text-[#8f94a6] hover:text-white hover:bg-white/5 border border-transparent"
            }`}>
            {item.label}
          </button>
        ))}

        <div className="pt-6 border-t border-[#1f2833] w-full space-y-3">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-950/40 text-red-400 hover:text-white hover:bg-red-900/60 border border-red-900/40 hover:border-red-700/60 transition-all duration-300 font-bold text-sm">
            Logout
          </button>
          <button className="w-full px-4 py-3 rounded-xl bg-[#0b0c10]/40 border border-zinc-800 text-zinc-500 hover:text-red-400 hover:border-red-900/60 hover:bg-red-950/20 transition-all duration-300 font-semibold text-xs">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
