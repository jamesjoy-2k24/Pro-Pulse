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

  console.log(bookings);

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
      `LKR ${booking.price}`,
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
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[#1f2833] pb-4 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Bookings Audit</h1>
          <p className="text-sm text-[#8f94a6] mt-1">
            Review sponsorship contracts, transaction pricing, and approval state
          </p>
        </div>
        {bookings.length > 0 && (
          <button
            onClick={exportPDF}
            className="flex items-center justify-center gap-2 bg-[#66fcf1] hover:bg-[#66fcf1]/80 text-[#0b0c10] font-bold px-5 py-2.5 rounded-xl shadow-[0_0_15px_rgba(102,252,241,0.2)] transition-all duration-300 hover:scale-[1.03] active:scale-95">
            <FaFileDownload size={16} />
            <span>Export Report (PDF)</span>
          </button>
        )}
      </div>

      {/* Table Section */}
      <div className="bg-[#1f2833]/20 border border-[#1f2833] rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="border-b border-[#1f2833] bg-[#1f2833]/40 text-[#8f94a6] text-xs font-semibold uppercase tracking-wider">
                <th className="px-6 py-4">Player Name</th>
                <th className="px-6 py-4">Sponsor Name</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Booking Date</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f2833] text-[#c5c6c7]">
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-[#1f2833]/30 transition-all duration-200">
                    <td className="px-6 py-4 font-semibold text-white">{booking.player?.name || "N/A"}</td>
                    <td className="px-6 py-4 text-white">{booking.sponsor?.name || "N/A"}</td>
                    <td className="px-6 py-4 font-mono font-bold text-[#66fcf1]">LKR {booking.price}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                        booking.status === "approved"
                          ? "bg-emerald-950/40 text-emerald-400 border-emerald-900/40"
                          : booking.status === "declined" || booking.status === "cancelled"
                          ? "bg-red-950/40 text-red-400 border-red-900/40"
                          : "bg-amber-950/40 text-amber-400 border-amber-900/40"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          booking.status === "approved"
                            ? "bg-emerald-400"
                            : booking.status === "declined" || booking.status === "cancelled"
                            ? "bg-red-400"
                            : "bg-amber-400"
                        }`} />
                        {booking.status || "Pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs font-mono text-[#8f94a6]">
                      {new Date(booking.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 flex items-center justify-center gap-3">
                      <button
                        onClick={() => handleDelete(booking._id)}
                        className="p-2 bg-red-950/40 hover:bg-red-900/60 border border-red-900/40 text-red-400 hover:text-white rounded-xl transition-all duration-200"
                        title="Delete Booking">
                        <FaTrash size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-[#8f94a6] italic">
                    No active bookings found in the database.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Bookings;
