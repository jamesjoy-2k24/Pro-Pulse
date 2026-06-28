/* eslint-disable react/prop-types */
import { FaTrash, FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../config";
import Loading from "../components/Loader/Loading";
import "./Players.css"; // Reuse the premium modal styles

const Sponsors = ({ sponsors, loading }) => {
  const [localSponsors, setLocalSponsors] = useState(sponsors || []);

  useEffect(() => {
    setLocalSponsors(sponsors || []);
  }, [sponsors]);

  const [showModal, setShowModal] = useState(false);
  const [sponsorToDelete, setSponsorToDelete] = useState(null);

  const handleDelete = async (id) => {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (response.ok) {
      toast.success("Sponsor deleted successfully");
      setLocalSponsors((prev) => prev.filter((s) => s._id !== id));
    } else {
      toast.error("Failed to delete sponsor");
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#1f2833] pb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Sponsors Directory</h1>
          <p className="text-sm text-[#8f94a6] mt-1">
            Manage sponsor registrations, details, and access control
          </p>
        </div>
      </div>

      {loading ? (
        <div className="h-[40vh] flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        <div className="bg-[#1f2833]/20 border border-[#1f2833] rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead>
                <tr className="border-b border-[#1f2833] bg-[#1f2833]/40 text-[#8f94a6] text-xs font-semibold uppercase tracking-wider">
                  <th className="px-6 py-4 text-center">Profile</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Phone</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1f2833] text-[#c5c6c7]">
                {localSponsors.map((sponsor) => (
                  <tr
                    key={sponsor._id}
                    className="hover:bg-[#1f2833]/30 transition-all duration-200">
                    <td className="px-6 py-4 flex justify-center">
                      <img
                        src={sponsor.photo || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"}
                        alt={sponsor.name}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-[#66fcf1]/20"
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-white">{sponsor.name}</td>
                    <td className="px-6 py-4 text-sm font-mono text-[#8f94a6]">{sponsor.email}</td>
                    <td className="px-6 py-4">{sponsor.phone || "-"}</td>
                    <td className="px-6 py-4 text-center">
                      <button
                        className="p-2 bg-red-950/40 hover:bg-red-900/60 border border-red-900/40 text-red-400 hover:text-white rounded-xl transition-all duration-200"
                        onClick={() => {
                          setSponsorToDelete(sponsor);
                          setShowModal(true);
                        }}>
                        <FaTrash size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content max-w-[450px]" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start border-b border-[#1f2833] pb-4 mb-4">
              <h2 className="text-xl font-bold text-white">Confirm Removal</h2>
              <button
                className="text-[#8f94a6] hover:text-white transition-colors duration-200"
                onClick={() => setShowModal(false)}>
                <FaTimes size={16} />
              </button>
            </div>
            <p className="text-sm text-[#c5c6c7] mb-6">
              Are you sure you want to permanently delete the sponsor{" "}
              <strong className="text-white">{sponsorToDelete?.name}</strong>? This action is irreversible.
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded-xl bg-[#1f2833] border border-zinc-700 text-[#c5c6c7] hover:text-white transition-all text-xs font-semibold"
                onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white transition-all text-xs font-semibold"
                onClick={() => {
                  handleDelete(sponsorToDelete?._id);
                  setShowModal(false);
                }}>
                Delete Sponsor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sponsors;
