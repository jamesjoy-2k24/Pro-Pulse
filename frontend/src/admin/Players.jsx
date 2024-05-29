/* eslint-disable react/prop-types */
import { FaPlus, FaTrash } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../config";
import "./Players.css"; // Import the CSS file for modal transitions

const Players = ({ players }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // console.log(players); // Debugging line

  // Total pages
  const totalItems = players?.length ?? 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Players list
  const currentPlayers =
    players?.length > 0
      ? players.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )
      : [];

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const [showDetails, setShowDetails] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(null);

  // Delete player
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${currentPlayer?.name ?? "player"}?`
    );
    if (confirmDelete) {
      const response = await fetch(`${BASE_URL}/players/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        toast.success("Player deleted successfully");
        window.location.reload();
      } else {
        toast.error("Failed to delete player");
      }
    }
  };

  const handleToggleDetails = (player) => {
    if (currentPlayer && currentPlayer._id === player._id) {
      setShowDetails(!showDetails);
    } else {
      setCurrentPlayer(player);
      setShowDetails(true);
    }
  };

  const handleAddPlayer = () => {
    window.location.href = "/admin/add-player";
    toast.success("Welcome to Player Adding Page");
  };

  // Approve player
  const handleApprovePlayer = async (_id) => {
    try {
      const response = await fetch(`${BASE_URL}/admin/approve-player/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status: "approved" }),
      });
      if (response.ok) {
        toast.success("Player approved successfully");
      } else {
        toast.error("Failed to approve player");
      }
    } catch (error) {
      console.error("Error approving player:", error);
      toast.error("An error occurred while approving the player");
    }
  };

  // Decline player
  const handleDeclinePlayer = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/admin/decline-player/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status: "declined" }),
      });
      if (response.ok) {
        toast.success("Player declined successfully");
      } else {
        toast.error("Failed to decline player");
      }
    } catch (error) {
      console.error("Error declining player:", error);
      toast.error("An error occurred while declining the player");
    }
  };

  return (
    <section className="py-1">
      <div className="flex max-w-[1200px] mx-auto justify-between flex-wrap gap-[3rem] items-center mb-[50px] border-b-2 border-gray-500 pb-3">
        <h4 className="text-[2rem] text-center leading-[30px] font-bold text-black ">
          Total Players : {totalItems} {totalItems === 1 ? "Player" : "Players"}
        </h4>
        <div>
          <button
            onClick={handleAddPlayer}
            className="bg-green-500 text-white hover:bg-red-900 transition-all duration-300  px-3 py-2 rounded-md mt-5">
            <FaPlus size={20} />
          </button>
        </div>
      </div>

{/* ======== PAGINATION ======== */}
      <nav
        className="mt-5 w-[77%] mb-5 mx-auto flex items-center justify-between  text-sm"
        aria-label="Page navigation example">
        <div>
          <p className="text-center flex gap-2">
            Showing <strong>{(currentPage - 1) * itemsPerPage + 1}</strong> to{" "}
            <strong>{Math.min(currentPage * itemsPerPage, totalItems)}</strong>{" "}
            of <strong>{totalItems}...</strong>
          </p>
        </div>
        <ul className="list-style-none flex gap-3 items-center">
          <li>
            <button
              className="p-2 px-4 hover:bg-black hover:text-white font-semibold bg-blue-100 rounded-md"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}>
              Previous
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index}>
              <button
                className={`relative block rounded px-3 py-1.5 text-sm transition-all duration-300 ${
                  currentPage === index + 1
                    ? "bg-blue-100 text-blue-900 font-bold"
                    : "bg-transparent text-black  hover:text-white  dark:hover:bg-black"
                }`}
                onClick={() => handlePageClick(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
          <li>
            <button
              className="p-2 px-4 hover:bg-black hover:text-white font-semibold bg-blue-100 rounded-md"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}>
              Next
            </button>
          </li>
        </ul>
      </nav>

{/* ======== PLAYERS ======== */}
      <div className="max-w-[1200px] mx-auto">
        <div className="flex  gap-[2rem] justify-center flex-wrap">
          {currentPlayers.map((player) => (
            <div
              key={player._id}
              className="rounded-3xl shadow-inner shadow-black bg-[#000000] p-5 w-[250px] h-[320px] cursor-pointer"
              onClick={() => handleToggleDetails(player)}>
              <div className="flex justify-center flex-col items-center flex-wrap h-[120px]">
                <img
                  src={player.photo ?? ""}
                  alt={player.name ?? "Player"}
                  className="w-[100px] h-[100px] rounded-full object-cover"
                />
              </div>
              <div className="text-center mt-5">
                <h4 className="text-[20px] font-extrabold text-white">
                  {player.name ?? "Player"}
                </h4>
                <p className="text-[16px] text-white font-semibold mt-2">
                  {player.email ?? "Email"}
                </p>
                <p
                  className={`  font-extrabold ${
                    player.isApproved === "approved"
                      ? "text-[#25a325]"
                      : player.isApproved === "declined"
                      ? "text-red-600"
                      : "text-blue-600"
                  }`}>
                  <span className="text-[2rem]">
                    {player.isApproved === "approved" ? "✓ " : ""}
                  </span>{" "}
                  <span className="text-[2rem]">
                    {player.isApproved === "declined" ? " ✕ " : ""}
                  </span>{" "}
                  <span className="text-[2rem]">
                    {player.isApproved === "pending" ? " ⏳ " : ""}
                  </span>{" "}
                  {player.isApproved === "approved"
                    ? ""
                    : player.isApproved === "declined"
                    ? ""
                    : "Pending"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showDetails && currentPlayer && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{currentPlayer.name}</h2>
              <button
                className="text-white font-extrabold border-4 border-solid border-gray-100 w-[40px] h-[40px] rounded-full flex items-center justify-center bg-primaryColor hover:text-primaryColor hover:bg-white duration-300"
                onClick={() => setShowDetails(false)}>
                <span>X</span>
              </button>
            </div>
            <div>
              <img
                src={currentPlayer.photo ?? ""}
                alt={currentPlayer.name}
                className="w-[150px] h-[150px] rounded-full object-cover mx-auto"
              />
              <p className="mt-4">
                <strong>Email:</strong> {currentPlayer.email}
              </p>
              <p >
                <strong>Phone:</strong> {currentPlayer.phone ? currentPlayer.phone : "-"}
              </p>
              <p>
                <strong>Place:</strong>{" "}
                {currentPlayer.place ? currentPlayer.place : "-"}
              </p>
              <p>
                <strong>Bio:</strong>{" "}
                {currentPlayer.bio ? currentPlayer.bio : "-"}
              </p>
              <p>
                <strong>Age:</strong>{" "}
                {currentPlayer.age ? currentPlayer.age : "-"}
              </p>
              <p>
                <strong>Sports:</strong>{" "}
                {currentPlayer.sports ? currentPlayer.sports : "-"}
              </p>
              <p>
                <strong>Price:</strong>{" "}
                {currentPlayer.price ? currentPlayer.price : "-"}
              </p>
              <p>
                <strong>Club:</strong>{" "}
                {currentPlayer.club ? currentPlayer.club : "-"}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {currentPlayer.isApproved ? "No" : "Yes"}
              </p>
              <div>
                <strong>Experiences:</strong>{" "}
                {currentPlayer.experiences?.length > 0
                  ? currentPlayer.experiences.map((experience) => (
                      <div key={experience._id} className="ml-[3rem] mb-2">
                        <li>{experience.startDate} - {experience.endDate}</li>
                        <li>{experience.club}</li>
                        <li>{experience.position}</li>
                      </div>
                      
                    ))
                  : "-"}
              </div>
              <p>
                <strong>About:</strong>{" "}
                {currentPlayer.about ? currentPlayer.about : "-"}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mt-5 mb-3">Actions</h3>

              <div className="flex justify-between items-center gap-4 mt-5">
                <button
                  className="w-[50px] flex items-center justify-center text-lg h-[40px] rounded-md bg-primaryColor text-white hover:bg-white hover:text-primaryColor transition-all duration-300 "
                  onClick={() => handleDelete(currentPlayer._id)}>
                  <FaTrash />
                </button>

                <div className="flex justify-center gap-5">
                  <button
                    className="bg-[#21b621] text-white font-extrabold hover:bg-green-700 transition-all duration-300 w-[100px] h-[40px] rounded-md"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleApprovePlayer(currentPlayer._id);
                    }}>
                    Approve
                  </button>
                  <button
                    className="bg-primaryColor font-extrabold text-white hover:bg-red-500 transition-all duration-300 w-[100px] h-[40px] rounded-md"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeclinePlayer(currentPlayer._id);
                    }}>
                    Decline
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Players;
