import { useContext, useState } from "react";
import { authContext } from "../../context/authContext";
import MyBookings from "./MyBookings";
import Profile from "./Profile";
import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";

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
    <section>
      <div className="max-w-[1170px] mx-auto px-5">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="pb-[50px] pc-[30px] p-5 rounded-md">
            <div className="flex items-center justify-center">
              <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor">
                <img
                  src={data?.photo || "https://via.placeholder.com/150"}
                  alt="user"
                  className="w-full h-full rounded-full object-cover"
                  onError={(e) =>
                    (e.target.src = "https://via.placeholder.com/150")
                  }
                />
              </figure>
            </div>

            <div className="text-center mt-4">
              <h3 className="text-[18px] leading-[30px] text-black font-bold">
                {data?.name || "User"}
              </h3>
              <p className="text-gray-800 text-[16px] leading-6 font-medium">
                {data?.email || "user@gmail.com"}
              </p>
              <p className="text-gray-800 text-[16px] leading-6 font-medium">
                {data?.role || "data"}
              </p>

              <p className="text-gray-800 text-[15px] leading-6 font-medium">
                I am live in {data?.place || "N/A"}
              </p>
            </div>

            <div className="mt-[30px] md:mt-[80px]">
              <button
                className="btn hover:text-blue-700 hover:bg-black hover:opacity-100 duration-200 transition-all ease-in bg-black mb-[2rem] w-full p-3 text-[16px] leading-7 rounded-md"
                onClick={handleLogout}>
                Logout
              </button>
              <button className="btn hover:bg-red-700 hover:opacity-100 transition-all duration-200 ease-in w-full p-3 text-[16px] leading-7 rounded-md">
                Delete Account
              </button>
            </div>
          </div>

          <div className="md:col-span-2 md:px-[30px] py-8">
            <div>
              <button
                onClick={() => setTab("bookings")}
                className={`${
                  tab === "bookings" && "bg-primaryColor text-white mr-5"
                } p-2 px-5 mr-5 rounded-md text-black font-semibold text-[16px] leading-7 border border-solid border-primaryColor hover:bg-primaryColor hover:text-white`}>
                My Bookings
              </button>
              <button
                onClick={() => setTab("settings")}
                className={`${
                  tab === "settings" && "bg-primaryColor text-white"
                } p-2 px-5 rounded-md text-black font-semibold text-[16px] leading-7 border border-solid border-primaryColor hover:bg-primaryColor hover:text-white`}>
                Profile Settings
              </button>
            </div>

            {tab === "bookings" && (
              <MyBookings  />
            )}
            {tab === "settings" && <Profile user={data} />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyAccount;
