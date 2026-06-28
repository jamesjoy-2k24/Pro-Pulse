/* eslint-disable react/prop-types */
import { FaPlus, FaTrash, FaCheck, FaTimes, FaHourglassHalf, FaExternalLinkAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../config";
import "./Players.css"; // Import the CSS file for modal transitions

const Players = ({ players }) => {
  const [localPlayers, setLocalPlayers] = useState(players || []);

  useEffect(() => {
    setLocalPlayers(players || []);
  }, [players]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Total pages
  const totalItems = localPlayers?.length ?? 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Players list
  const currentPlayers =
    localPlayers?.length > 0
      ? localPlayers.slice(
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
  
  // Custom confirmation modal state
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: null,
    confirmText: "Confirm",
    confirmColor: "bg-[#66fcf1] text-[#0b0c10] hover:bg-[#66fcf1]/80",
  });

  // Approve player
  const handleApprovePlayer = (_id) => {
    setConfirmModal({
      isOpen: true,
      title: "Approve Player Profile",
      message: `Are you sure you want to approve ${currentPlayer?.name || "this player"}'s registration?`,
      confirmText: "Approve Profile",
      confirmColor: "bg-emerald-600 hover:bg-emerald-700 text-white",
      onConfirm: async () => {
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
            setLocalPlayers((prev) =>
              prev.map((p) => (p._id === _id ? { ...p, isApproved: "approved" } : p))
            );
            setCurrentPlayer((prev) =>
              prev && prev._id === _id ? { ...prev, isApproved: "approved" } : prev
            );
          } else {
            toast.error("Failed to approve player");
          }
        } catch (error) {
          console.error("Error approving player:", error);
          toast.error("An error occurred while approving the player");
        }
      },
    });
  };

  // Decline player
  const handleDeclinePlayer = (id) => {
    setConfirmModal({
      isOpen: true,
      title: "Decline Player Profile",
      message: `Are you sure you want to decline ${currentPlayer?.name || "this player"}'s registration?`,
      confirmText: "Decline Profile",
      confirmColor: "bg-red-600 hover:bg-red-700 text-white",
      onConfirm: async () => {
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
            setLocalPlayers((prev) =>
              prev.map((p) => (p._id === id ? { ...p, isApproved: "declined" } : p))
            );
            setCurrentPlayer((prev) =>
              prev && prev._id === id ? { ...prev, isApproved: "declined" } : prev
            );
          } else {
            toast.error("Failed to decline player");
          }
        } catch (error) {
          console.error("Error declining player:", error);
          toast.error("An error occurred while declining the player");
        }
      },
    });
  };

  // Delete player
  const handleDelete = (id) => {
    setConfirmModal({
      isOpen: true,
      title: "Delete Player Profile",
      message: `Are you sure you want to permanently delete the profile of ${currentPlayer?.name || "this player"}? This is irreversible.`,
      confirmText: "Delete Profile",
      confirmColor: "bg-red-600 hover:bg-red-700 text-white",
      onConfirm: async () => {
        try {
          const response = await fetch(`${BASE_URL}/players/${id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          if (response.ok) {
            toast.success("Player deleted successfully");
            setLocalPlayers((prev) => prev.filter((p) => p._id !== id));
            setShowDetails(false);
          } else {
            toast.error("Failed to delete player");
          }
        } catch (error) {
          console.error("Error deleting player:", error);
          toast.error("An error occurred while deleting the player");
        }
      },
    });
  };

  // Pending Player
  const handlePendingPlayer = (id) => {
    setConfirmModal({
      isOpen: true,
      title: "Set Status to Pending",
      message: `Are you sure you want to change the status of ${currentPlayer?.name || "this player"} back to pending?`,
      confirmText: "Set Pending",
      confirmColor: "bg-amber-600 hover:bg-amber-700 text-white",
      onConfirm: async () => {
        try {
          const response = await fetch(`${BASE_URL}/admin/pending-player/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ status: "pending" }),
          });
          if (response.ok) {
            toast.success("Player set to pending successfully");
            setLocalPlayers((prev) =>
              prev.map((p) => (p._id === id ? { ...p, isApproved: "pending" } : p))
            );
            setCurrentPlayer((prev) =>
              prev && prev._id === id ? { ...prev, isApproved: "pending" } : prev
            );
          } else {
            toast.error("Failed to set player to pending");
          }
        } catch (error) {
          console.error("Error setting player status:", error);
          toast.error("An error occurred while updating the status");
        }
      },
    });
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

  return (
    <section className="py-2 space-y-6 animate-fadeIn">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[#1f2833] pb-4 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Players Catalog</h1>
          <p className="text-sm text-[#8f94a6] mt-1">
            Manage, approve, and audit players ({totalItems} registered)
          </p>
        </div>
        <button
          onClick={handleAddPlayer}
          className="flex items-center justify-center gap-2 bg-[#66fcf1] hover:bg-[#66fcf1]/80 text-[#0b0c10] font-bold px-5 py-2.5 rounded-xl shadow-[0_0_15px_rgba(102,252,241,0.2)] transition-all duration-300 hover:scale-[1.03] active:scale-95">
          <FaPlus size={16} />
          <span>Add New Player</span>
        </button>
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center bg-[#1f2833]/20 border border-[#1f2833] p-4 rounded-2xl gap-4 text-xs">
          <p className="text-[#8f94a6]">
            Showing <span className="font-semibold text-white">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
            <span className="font-semibold text-white">{Math.min(currentPage * itemsPerPage, totalItems)}</span> of{" "}
            <span className="font-semibold text-white">{totalItems}</span> players
          </p>
          <div className="flex gap-2 items-center">
            <button
              className="px-3 py-1.5 rounded-lg border border-[#1f2833] bg-[#1f2833]/40 text-[#c5c6c7] hover:bg-[#1f2833] disabled:opacity-40 transition-all"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}>
              Previous
            </button>
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  className={`w-8 h-8 rounded-lg border text-xs font-semibold transition-all ${
                    currentPage === index + 1
                      ? "border-[#66fcf1] bg-[#66fcf1]/10 text-[#66fcf1]"
                      : "border-[#1f2833] bg-transparent text-[#8f94a6] hover:bg-[#1f2833]/40 hover:text-white"
                  }`}
                  onClick={() => handlePageClick(index + 1)}>
                  {index + 1}
                </button>
              ))}
            </div>
            <button
              className="px-3 py-1.5 rounded-lg border border-[#1f2833] bg-[#1f2833]/40 text-[#c5c6c7] hover:bg-[#1f2833] disabled:opacity-40 transition-all"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </div>
      )}

      {/* Grid listing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentPlayers.map((player) => (
          <div
            key={player._id}
            onClick={() => handleToggleDetails(player)}
            className="group relative flex flex-col justify-between rounded-2xl bg-[#1f2833]/30 border border-[#1f2833] p-5 cursor-pointer hover:border-[#66fcf1]/40 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-2xl overflow-hidden">
            
            {/* Hover card accent line */}
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#66fcf1]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="flex flex-col items-center text-center mt-3">
              <div className="relative">
                <img
                  src={player.photo || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"}
                  alt={player.name}
                  className="w-20 h-20 rounded-full object-cover ring-4 ring-[#1f2833] group-hover:ring-[#66fcf1]/30 transition-all duration-300"
                />
                {/* Micro badge indicator */}
                <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-[#0b0c10] ${
                  player.isApproved === "approved"
                    ? "bg-emerald-500"
                    : player.isApproved === "declined"
                    ? "bg-red-500"
                    : "bg-amber-500"
                }`} />
              </div>

              <h4 className="text-lg font-bold text-white mt-4 group-hover:text-[#66fcf1] transition-colors duration-250">
                {player.name}
              </h4>
              <p className="text-xs text-[#8f94a6] font-mono mt-1 w-full truncate px-2">
                {player.email}
              </p>
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#1f2833]/60 text-xs">
              <span className="text-[#8f94a6] font-medium uppercase tracking-wider text-[10px]">
                {player.sports?.[0] || "General"}
              </span>
              <span className="text-[#66fcf1]/80 group-hover:text-[#66fcf1] flex items-center gap-1 font-semibold">
                Details <FaExternalLinkAlt size={10} />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal Overlay */}
      {showDetails && currentPlayer && (
        <div className="modal-overlay" onClick={() => setShowDetails(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="flex justify-between items-start border-b border-[#1f2833] pb-4 mb-6">
              <div>
                <span className="text-xs text-[#66fcf1] font-semibold uppercase tracking-wider">Player Profile Detail</span>
                <h2 className="text-2xl font-extrabold text-white mt-1">{currentPlayer.name}</h2>
              </div>
              <button
                className="w-8 h-8 rounded-full flex items-center justify-center bg-[#1f2833] hover:bg-[#66fcf1]/20 border border-zinc-700 text-[#8f94a6] hover:text-white transition-all duration-200"
                onClick={() => setShowDetails(false)}>
                <FaTimes size={16} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-6">
              {/* Picture & High Level Meta */}
              <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl bg-[#0b0c10]/40 border border-[#1f2833]">
                <img
                  src={currentPlayer.photo || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"}
                  alt={currentPlayer.name}
                  className="w-24 h-24 rounded-full object-cover ring-4 ring-[#66fcf1]/20"
                />
                <div className="flex-1 space-y-2 text-center sm:text-left">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#66fcf1]/10 text-[#66fcf1] border border-[#66fcf1]/20">
                      {currentPlayer.sports?.[0] || "General"}
                    </span>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                      currentPlayer.isApproved === "approved"
                        ? "bg-emerald-950/40 text-emerald-400 border-emerald-900/40"
                        : currentPlayer.isApproved === "declined"
                        ? "bg-red-950/40 text-red-400 border-red-900/40"
                        : "bg-amber-950/40 text-amber-400 border-amber-900/40"
                    }`}>
                      {currentPlayer.isApproved === "approved" ? "Approved" : currentPlayer.isApproved === "declined" ? "Declined" : "Pending"}
                    </span>
                  </div>
                  <p className="text-sm font-mono text-[#8f94a6]">{currentPlayer.email}</p>
                  <p className="text-sm text-zinc-300">
                    <strong className="text-white">Bio:</strong> {currentPlayer.bio || "No biography provided."}
                  </p>
                </div>
              </div>

              {/* Grid Specifications */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="p-3 bg-[#0b0c10]/20 rounded-xl border border-[#1f2833]/60 text-center">
                  <span className="block text-[10px] uppercase text-[#8f94a6]">Phone</span>
                  <span className="text-sm font-semibold text-white mt-1 block">{currentPlayer.phone || "-"}</span>
                </div>
                <div className="p-3 bg-[#0b0c10]/20 rounded-xl border border-[#1f2833]/60 text-center">
                  <span className="block text-[10px] uppercase text-[#8f94a6]">Place</span>
                  <span className="text-sm font-semibold text-white mt-1 block">{currentPlayer.place || "-"}</span>
                </div>
                <div className="p-3 bg-[#0b0c10]/20 rounded-xl border border-[#1f2833]/60 text-center">
                  <span className="block text-[10px] uppercase text-[#8f94a6]">Age</span>
                  <span className="text-sm font-semibold text-white mt-1 block">{currentPlayer.age || "-"}</span>
                </div>
                <div className="p-3 bg-[#0b0c10]/20 rounded-xl border border-[#1f2833]/60 text-center">
                  <span className="block text-[10px] uppercase text-[#8f94a6]">Base Price</span>
                  <span className="text-sm font-semibold text-white mt-1 block">LKR {currentPlayer.price || "0"}</span>
                </div>
                <div className="p-3 bg-[#0b0c10]/20 rounded-xl border border-[#1f2833]/60 text-center">
                  <span className="block text-[10px] uppercase text-[#8f94a6]">Current Club</span>
                  <span className="text-sm font-semibold text-white mt-1 block">{currentPlayer.club || "-"}</span>
                </div>
                <div className="p-3 bg-[#0b0c10]/20 rounded-xl border border-[#1f2833]/60 text-center">
                  <span className="block text-[10px] uppercase text-[#8f94a6]">Audited</span>
                  <span className="text-sm font-semibold text-white mt-1 block">{currentPlayer.isApproved ? "No" : "Yes"}</span>
                </div>
              </div>

              {/* Experiences Section */}
              <div className="space-y-3">
                <h3 className="text-md font-bold text-white uppercase tracking-wider text-xs">Professional Experiences</h3>
                {currentPlayer.experiences?.length > 0 ? (
                  <div className="space-y-2">
                    {currentPlayer.experiences.map((experience) => (
                      <div key={experience._id} className="p-3 bg-[#0b0c10]/20 border border-[#1f2833] rounded-xl flex items-center justify-between text-xs">
                        <div>
                          <p className="font-semibold text-white">{experience.club}</p>
                          <p className="text-[#8f94a6] mt-0.5">{experience.position}</p>
                        </div>
                        <span className="text-[#66fcf1] font-mono font-medium">
                          {experience.startDate} - {experience.endDate}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-[#8f94a6] italic p-3 bg-[#0b0c10]/10 rounded-xl border border-dashed border-[#1f2833] text-center">
                    No career timeline experience recorded.
                  </p>
                )}
              </div>

              {/* About section */}
              {currentPlayer.about && (
                <div className="space-y-1">
                  <h3 className="text-md font-bold text-white uppercase tracking-wider text-xs">About Statement</h3>
                  <p className="text-xs leading-relaxed text-zinc-300 bg-[#0b0c10]/10 p-3 rounded-xl border border-[#1f2833]">
                    {currentPlayer.about}
                  </p>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-5 border-t border-[#1f2833]">
              <button
                className="flex items-center gap-2 px-4 py-2 bg-red-950/40 hover:bg-red-900/60 border border-red-900/40 text-red-400 hover:text-white rounded-xl transition-all duration-300 font-semibold text-xs"
                onClick={() => handleDelete(currentPlayer._id)}>
                <FaTrash size={12} />
                Delete Profile
              </button>

              <div className="flex items-center gap-3">
                <button
                  className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl transition-all duration-300 text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleApprovePlayer(currentPlayer._id);
                  }}>
                  <FaCheck size={12} /> Approve
                </button>
                <button
                  className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-xl transition-all duration-300 text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeclinePlayer(currentPlayer._id);
                  }}>
                  <FaTimes size={12} /> Decline
                </button>
                <button
                  className="flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold px-4 py-2 rounded-xl transition-all duration-300 text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePendingPlayer(currentPlayer._id);
                  }}>
                  <FaHourglassHalf size={12} /> Pending
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmModal.isOpen && (
        <div className="modal-overlay" onClick={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}>
          <div className="modal-content max-w-[450px]" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start border-b border-[#1f2833] pb-4 mb-4">
              <h2 className="text-xl font-bold text-white">{confirmModal.title}</h2>
              <button
                className="text-[#8f94a6] hover:text-white transition-colors duration-200"
                onClick={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}>
                <FaTimes size={16} />
              </button>
            </div>
            <p className="text-sm text-[#c5c6c7] mb-6">
              {confirmModal.message}
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded-xl bg-[#1f2833] border border-zinc-700 text-[#c5c6c7] hover:text-white transition-all text-xs font-semibold"
                onClick={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}>
                Cancel
              </button>
              <button
                className={`px-4 py-2 rounded-xl transition-all text-xs font-semibold ${confirmModal.confirmColor}`}
                onClick={async () => {
                  if (confirmModal.onConfirm) {
                    await confirmModal.onConfirm();
                  }
                  setConfirmModal(prev => ({ ...prev, isOpen: false }));
                }}>
                {confirmModal.confirmText}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Players;
