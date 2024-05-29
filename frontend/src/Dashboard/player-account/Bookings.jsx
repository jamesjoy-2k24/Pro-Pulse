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
    <div className="flex flex-col p-4">
      <table className="table-auto">
        <thead>
          <tr>
            <th className="border border-gray-500 text-center py-2 px-4">Profile</th>
            <th className="border border-gray-500 text-center py-2 px-4">
              Sponsor
            </th>
            <th className="border border-gray-500 text-center py-2 px-4">
              Price
            </th>
            <th className="border border-gray-500 text-center py-2 px-4">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <tr key={booking._id}>
                <td className="border border-gray-500 text-center py-2 px-4">
                  <img src={booking.sponsor.photo} alt="sponsor"className="w-10 h-10 rounded-full mx-auto object-cover" />
                </td>
                <td className="border border-gray-500 text-center py-2 px-4">
                  {booking.sponsor.name}
                </td>
                <td className="border border-gray-500 text-center py-2 px-4">
                  ${booking.price}
                </td>
                <td className="border border-gray-500 text-center py-2 px-4">
                  {new Date(booking.date).toLocaleDateString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="4"
                className="border border-gray-500 text-center py-2 px-4"
              >
                No bookings found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Bookings;
