import React, { useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { BASE_URL, token } from "../../config";
import { toast } from "react-toastify";
import {useParams} from "react-router-dom"

const SponsorBookings = () => {
  const [sponsorId, setSponsorId] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // useEffect(() => {
  //   if (token) {
  //     const decoded = JSON.parse(atob(token.split(".")[1]));
  //     setSponsorId(decoded.id);
  //   }
  // }, [token]);

  const { id } = useParams();
  useEffect(() => {
    setSponsorId(id);
  }, [id]);

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
          }
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
        prevBookings.filter((booking) => booking._id !== bookingId)
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
        }
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
    <div className="flex flex-col p-4">
      <p>Total - {bookings.length}</p>
      {bookings.length > 0 ? (
        <div className="flex flex-wrap lg:grid lg:grid-cols-3">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white p-4 shadow shadow-black rounded-lg m-4 text-center cursor-pointer">
              <h2 className="text-lg text-center font-semibold">
                Booked - {booking.player.name}
              </h2>
              <img
                src={booking.player.photo}
                alt={booking.player.name}
                className="w-[10em] h-[10em] mx-auto rounded-full mb-5"
              />
              <p className="text-gray-600 text-sm">Price: ${booking.price}</p>
              <p className="text-gray-600 text-sm">
                Date: {new Date(booking.date).toLocaleDateString()}
              </p>
              <button
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md"
                onClick={() => deleteBooking(booking._id)}>
                Delete Booking
              </button>
              <button
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                onClick={() => openModal(booking.player)}>
                View Details
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No bookings found.</p>
      )}

      <Transition show={isOpen} as={React.Fragment}>
        <Dialog onClose={closeModal} className="relative z-50">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-30" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="mx-auto max-w-md bg-white rounded-lg p-6 shadow-lg">
                {selectedPlayer && (
                  <>
                    <Dialog.Title className="text-lg font-semibold">
                      {selectedPlayer.name}
                    </Dialog.Title>
                    <img
                      src={selectedPlayer.photo}
                      alt={selectedPlayer.name}
                      className="w-full h-[200px] object-cover rounded-md mt-4"
                    />
                    <p className="text-gray-600 mt-4">{selectedPlayer.bio}</p>
                    <p className="text-gray-600 mt-2">
                      Email: {selectedPlayer.email}
                    </p>
                    <p className="text-gray-600 mt-2">
                      Club: {selectedPlayer.club}
                    </p>
                    <p className="text-gray-600 mt-2">
                      Team: {selectedPlayer.team}
                    </p>
                    <p className="text-gray-600 mt-2">
                      Position: {selectedPlayer.position}
                    </p>
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold">Give Feedback</h3>
                      <label className="block text-gray-700 mt-2">
                        Rating:
                      </label>
                      <select
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="block w-full mt-1 p-2 border border-gray-300 rounded-md">
                        <option value={0}>Select Rating</option>
                        {[1, 2, 3, 4, 5].map((r) => (
                          <option key={r} value={r}>
                            {r} Star{r > 1 && "s"}
                          </option>
                        ))}
                      </select>
                      <label className="block text-gray-700 mt-2">
                        Comment:
                      </label>
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="block w-full mt-1 p-2 border border-gray-300 rounded-md"
                      />
                      <button
                        className="mt-4 px-4 py-2 bg-primaryColor text-white rounded-md"
                        onClick={submitFeedback}>
                        Submit Feedback
                      </button>
                    </div>
                    <button
                      className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-md"
                      onClick={closeModal}>
                      Close
                    </button>
                  </>
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
