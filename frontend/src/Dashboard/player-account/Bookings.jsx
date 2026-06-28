// Bookings.js
import { useState, useEffect } from "react";
import { BASE_URL, token } from "../../config";

const Bookings = () => {
  const [playerId, setPlayerId] = useState(localStorage.getItem("user"));
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (token) {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      setPlayerId(decoded.id);
    }
  }, [token]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/players/bookings/player-bookings/${playerId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch bookings");
        }
        setBookings(data.bookings);
      } catch (error) {
        console.log(error);
      }
    };
    if (playerId) fetchBookings();
  }, [playerId]);

  return (
    <div className="space-y-4">
      <div className="border-b border-[#1f2833] pb-3 mb-4">
        <h4 className="text-lg font-bold text-white">Your Sponsorship Bookings</h4>
        <p className="text-xs text-[#8f94a6] mt-0.5">List of contracts and active bookings initiated by sponsors</p>
      </div>

      <div className="bg-[#1f2833]/20 border border-[#1f2833] rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="border-b border-[#1f2833] bg-[#1f2833]/40 text-[#8f94a6] text-xs font-semibold uppercase tracking-wider">
                <th className="px-6 py-4 text-center">Profile</th>
                <th className="px-6 py-4">Sponsor Name</th>
                <th className="px-6 py-4">Sponsorship Price</th>
                <th className="px-6 py-4">Booking Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f2833] text-[#c5c6c7]">
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-[#1f2833]/30 transition-all duration-200">
                    <td className="px-6 py-4 flex justify-center">
                      <img
                        src={booking.sponsor?.photo || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"}
                        alt="sponsor"
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-[#66fcf1]/20"
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-white">
                      {booking.sponsor?.name || "N/A"}
                    </td>
                    <td className="px-6 py-4 font-mono font-bold text-[#66fcf1]">
                      LKR {booking.price}
                    </td>
                    <td className="px-6 py-4 text-xs font-mono text-[#8f94a6]">
                      {new Date(booking.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-12 text-center text-[#8f94a6] italic"
                  >
                    No bookings found for your profile.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
