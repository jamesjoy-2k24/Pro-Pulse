import { useContext, useState } from "react";
import { authContext } from "../../context/authContext";
import MyBookings from "./MyBookings";
import Profile from "./Profile";
import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import {
  HiOutlineLogout,
  HiOutlineUserCircle,
  HiOutlineBookOpen,
  HiOutlineTrash,
  HiOutlineLocationMarker,
  HiOutlineMail,
  HiOutlineBadgeCheck,
} from "react-icons/hi";

const MyAccount = () => {
  const { dispatch } = useContext(authContext);
  const [tab, setTab] = useState("bookings");
  const {
    data: data,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/users/profile/me`);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  if (loading) return <Loading />;
  if (error) return <Error errMessage={error} />;
  if (!data) return null;

  return (
    <section className="min-h-screen bg-[#0a0a0a] py-12 relative overflow-hidden">
      {/* Futuristic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primaryColor/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primaryColor/5 rounded-full blur-[120px] animate-pulse delay-700" />
      </div>

      <div className="max-w-[1280px] mx-auto px-5 relative z-10">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Profile Card */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-primaryColor/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-primaryColor blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-full" />
                    <figure className="w-28 h-28 rounded-full border-2 border-primaryColor/50 p-1 relative z-10">
                      <img
                        src={data?.photo || "https://via.placeholder.com/150"}
                        alt="user"
                        className="w-full h-full rounded-full object-cover shadow-2xl shadow-primaryColor/20"
                        onError={(e) =>
                          (e.target.src = "https://via.placeholder.com/150")
                        }
                      />
                    </figure>
                    <div className="absolute -bottom-1 -right-1 bg-primaryColor text-white p-1.5 rounded-full shadow-lg border-2 border-[#0a0a0a]">
                      <HiOutlineBadgeCheck className="text-sm" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-1 tracking-tight">
                    {data?.name || "User"}
                  </h3>
                  <div className="flex items-center justify-center gap-1.5 text-gray-400 text-sm mb-4">
                    <HiOutlineMail className="text-primaryColor" />
                    <span>{data?.email}</span>
                  </div>

                  <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-6" />

                  {/* Profile Details List */}
                  <div className="w-full space-y-4 text-left">
                    <div className="flex items-center gap-3 text-gray-300">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                        <HiOutlineLocationMarker className="text-primaryColor" />
                      </div>
                      <div className="text-sm">
                        <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">
                          Location
                        </p>
                        <p className="font-medium text-white">
                          {data?.place || "Not specified"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                        <HiOutlineUserCircle className="text-primaryColor" />
                      </div>
                      <div className="text-sm">
                        <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">
                          Role
                        </p>
                        <p className="font-medium text-white capitalize">
                          {data?.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-3">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold transition-all duration-300 group/btn"
                  >
                    <HiOutlineLogout className="text-xl group-hover/btn:translate-x-1 transition-transform" />
                    Logout
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-500 font-semibold transition-all duration-300">
                    <HiOutlineTrash className="text-xl" />
                    Delete Account
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Mini HUD */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-center">
                <p className="text-primaryColor text-xl font-bold">12</p>
                <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold mt-1">
                  Total Hires
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-center">
                <p className="text-primaryColor text-xl font-bold">3</p>
                <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold mt-1">
                  Active
                </p>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-4 lg:p-8 shadow-2xl min-h-[600px]">
              {/* Navigation Tabs */}
              <div className="flex items-center gap-2 p-1.5 bg-black/40 rounded-2xl border border-white/5 mb-8 w-fit">
                <button
                  onClick={() => setTab("bookings")}
                  className={`${
                    tab === "bookings"
                      ? "bg-primaryColor text-white shadow-lg shadow-primaryColor/20"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  } flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300`}
                >
                  <HiOutlineBookOpen className="text-lg" />
                  My Bookings
                </button>
                <button
                  onClick={() => setTab("settings")}
                  className={`${
                    tab === "settings"
                      ? "bg-primaryColor text-white shadow-lg shadow-primaryColor/20"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  } flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300`}
                >
                  <HiOutlineUserCircle className="text-lg" />
                  Profile Settings
                </button>
              </div>

              {/* Tab Content */}
              <div className="transition-all duration-500 ease-in-out">
                {tab === "bookings" && <MyBookings />}
                {tab === "settings" && <Profile user={data} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyAccount;
