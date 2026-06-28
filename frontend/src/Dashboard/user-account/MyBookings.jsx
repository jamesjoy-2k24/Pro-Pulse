import React, { useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { BASE_URL, token } from "../../config";
import { toast } from "react-toastify";
import {
  HiOutlineCalendar,
  HiOutlineCash,
  HiOutlineTrash,
  HiOutlineEye,
  HiOutlineInformationCircle,
  HiOutlineStar,
  HiOutlineBookOpen,
  HiOutlineUser,
} from "react-icons/hi";

const SponsorBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const user = localStorage.getItem("user");
  const userData = user ? JSON.parse(user) : null;
  const sponsorId = userData ? userData._id : null;

  useEffect(() => {
    const fetchBookings = async () => {
      if (!sponsorId) return;
      try {
        const response = await fetch(
          `${BASE_URL}/users/bookings/sponsor-bookings/${sponsorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch bookings");
        }
        setBookings(data.bookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings();
  }, [sponsorId]);

  const openModal = (player) => {
    setSelectedPlayer(player);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedPlayer(null);
    setRating(0);
    setComment("");
  };

  const deleteBooking = async (bookingId) => {
    try {
      const response = await fetch(`${BASE_URL}/bookings/${bookingId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to delete booking");
      }
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking._id !== bookingId),
      );
      toast.success("Booking deleted successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const submitFeedback = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/reviews/feedback/${selectedPlayer._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ rating, comment }),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to submit feedback");
      }
      toast.success("Feedback submitted successfully");
      closeModal();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <HiOutlineInformationCircle className="text-primaryColor" />
          Booking History
        </h2>
        <span className="px-4 py-1 bg-primaryColor/10 border border-primaryColor/20 rounded-full text-primaryColor text-xs font-bold uppercase tracking-widest">
          {bookings.length} Total
        </span>
      </div>

      {bookings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-5 hover:bg-white/10 transition-all duration-500 relative overflow-hidden"
            >
              {/* Card Glow Effect */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-primaryColor/10 rounded-full blur-[60px] group-hover:bg-primaryColor/20 transition-all duration-500" />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <figure className="w-16 h-16 rounded-2xl border border-white/10 p-0.5 overflow-hidden">
                    <img
                      src={booking.player?.photo || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"}
                      alt={booking.player?.name || "Deleted Player"}
                      className="w-full h-full object-cover rounded-[14px]"
                    />
                  </figure>
                  <div>
                    <h3 className="text-white font-bold text-lg group-hover:text-primaryColor transition-colors">
                      {booking.player?.name || "Deleted Player"}
                    </h3>
                    <p className="text-gray-500 text-xs font-medium uppercase tracking-tighter">
                      Professional Player
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-400">
                      <HiOutlineCash className="text-primaryColor" />
                      <span>Contract Value</span>
                    </div>
                    <span className="text-white font-bold">
                      ${booking.price}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-400">
                      <HiOutlineCalendar className="text-primaryColor" />
                      <span>Booking Date</span>
                    </div>
                    <span className="text-white font-medium">
                      {new Date(booking.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    disabled={!booking.player}
                    onClick={() => openModal(booking.player)}
                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-semibold transition-all group/btn disabled:opacity-30 disabled:pointer-events-none"
                  >
                    <HiOutlineEye className="text-lg group-hover/btn:scale-110 transition-transform" />
                    Details
                  </button>
                  <button
                    onClick={() => deleteBooking(booking._id)}
                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/10 text-red-500 text-sm font-semibold transition-all"
                  >
                    <HiOutlineTrash className="text-lg" />
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-white/5 border border-dashed border-white/10 rounded-3xl text-center">
          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
            <HiOutlineBookOpen className="text-4xl text-gray-600" />
          </div>
          <h3 className="text-white font-bold text-xl mb-2">No Bookings Yet</h3>
          <p className="text-gray-500 max-w-xs mx-auto">
            You haven't hired any players yet. Explore our player roster to find
            the perfect match.
          </p>
        </div>
      )}

      {/* Details & Feedback Modal */}
      <Transition show={isOpen} as={React.Fragment}>
        <Dialog onClose={closeModal} className="relative z-50">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-[#0a0a0a]/80 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="mx-auto max-w-lg w-full bg-[#111] border border-white/10 rounded-[40px] p-8 shadow-2xl relative overflow-hidden">
                {/* Modal Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primaryColor/10 rounded-full blur-[80px]" />

                {selectedPlayer && (
                  <div className="relative z-10">
                    <div className="flex items-start gap-6 mb-8">
                      <figure className="w-24 h-24 rounded-3xl border-2 border-primaryColor/30 p-1">
                        <img
                          src={selectedPlayer.photo}
                          alt={selectedPlayer.name}
                          className="w-full h-full object-cover rounded-2xl shadow-xl shadow-primaryColor/10"
                        />
                      </figure>
                      <div className="flex-1">
                        <Dialog.Title className="text-2xl font-bold text-white mb-1">
                          {selectedPlayer.name}
                        </Dialog.Title>
                        <p className="text-primaryColor font-semibold text-sm mb-3">
                          {selectedPlayer.position} • {selectedPlayer.team}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] text-gray-400 font-bold uppercase tracking-widest border border-white/5">
                            {selectedPlayer.club}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6 mb-8">
                      <div>
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                          Player Bio
                        </h4>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          {selectedPlayer.bio ||
                            "No biography provided for this player."}
                        </p>
                      </div>

                      <div className="pt-6 border-t border-white/5">
                        <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                          <HiOutlineStar className="text-primaryColor" />
                          Rate Performance
                        </h4>

                        <div className="space-y-4">
                          <div className="grid grid-cols-5 gap-2">
                            {[1, 2, 3, 4, 5].map((num) => (
                              <button
                                key={num}
                                onClick={() => setRating(num)}
                                className={`py-3 rounded-2xl border transition-all duration-300 ${
                                  rating >= num
                                    ? "bg-primaryColor border-primaryColor text-white shadow-lg shadow-primaryColor/20"
                                    : "bg-white/5 border-white/10 text-gray-500 hover:border-white/20"
                                }`}
                              >
                                {num}
                              </button>
                            ))}
                          </div>
                          <textarea
                            rows="3"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Share your thoughts on the player's performance..."
                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-primaryColor/50 focus:bg-white/10 transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={submitFeedback}
                        className="flex-1 bg-primaryColor hover:bg-primaryColor/90 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-primaryColor/20"
                      >
                        Submit Feedback
                      </button>
                      <button
                        onClick={closeModal}
                        className="px-8 bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-2xl border border-white/10 transition-all"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default SponsorBookings;
