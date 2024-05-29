import { token } from "../config";
import { toast } from "react-toastify";
import { BASE_URL } from "../config";
import { FaTrash, FaFileDownload } from "react-icons/fa";
import { useState, useEffect } from "react";

import Loading from "../components/Loader/Loading";
import Error from "../components/Error/Error";
import jsPDF from "jspdf";
import "jspdf-autotable";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/bookings`, {
          headers: {
            Authorization: `Bearer ${token}`, // Ensure token is included if required
            "Content-Type": "application/json", // Include content type
          },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch bookings");
        }
        const data = await res.json();
        setBookings(data.bookings); // Access the bookings array directly
        setLoading(false);
      } catch (error) {
        setError(error.message); // Ensure the error is a string
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const exportPDF = () => {
    const doc = new jsPDF();
    const tableColumn = [
      "Player Name",
      "Sponsor Name",
      "Price",
      "Status",
      "Booking Date",
    ];
    const tableRows = bookings.map((booking) => [
      booking.player.name,
      booking.sponsor.name,
      `${booking.price}`,
      booking.status,
      new Date(booking.date).toLocaleDateString(),
    ]);
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });
    doc.text("Bookings Report", 14, 15);
    doc.save("bookings_report.pdf");

    toast.success("Bookings report has been downloaded to your computer", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  // Function to delete a booking
  const handleDelete = async (bookingId) => {
    try {
      const res = await fetch(`${BASE_URL}/bookings/${bookingId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // Ensure token is included if required
          "Content-Type": "application/json", // Include content type
        },
      });
      if (!res.ok) {
        throw new Error("Failed to delete booking");
      }
      const data = await res.json();
      console.log(data);
      setBookings((prevBookings) =>
        prevBookings.filter((b) => b._id !== bookingId)
      );
      toast.success("Booking deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete booking");
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error errMessage={error} />;

  return (
    <div className="max-w-[1400px] mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Bookings</h1>
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr className="text-left text-l font-bold">
              <th
                scope="col"
                className="px-6 py-3 text-gray-900 uppercase tracking-wider">
                Player Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-gray-900 uppercase tracking-wider">
                Sponsor Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-gray-900 uppercase tracking-wider">
                Price
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-gray-900 uppercase tracking-wider">
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-gray-900 uppercase tracking-wider">
                Booking Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-gray-900 uppercase tracking-wider">
                <span className="px-6">Action</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-100 text-left">
                  <td className="px-6 py-4">{booking.player.name}</td>
                  <td className="px-6 py-4">{booking.sponsor.name}</td>
                  <td className="px-6 py-4">${booking.price}</td>
                  <td className="px-6 py-4">{booking.status}</td>
                  <td className="px-6 py-4">
                    {new Date(booking.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 flex items-center justify-left gap-5">
                    <button
                      type="button"
                      className="flex items-center justify-center px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                      <FaTrash
                        onClick={() => handleDelete(booking._id)}
                        className="w-6 h-6"
                      />
                    </button>
                    <button
                      type="button"
                      className="flex items-center justify-center px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      onClick={exportPDF}>
                      <FaFileDownload className="w-6 h-6" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-700">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Bookings;
