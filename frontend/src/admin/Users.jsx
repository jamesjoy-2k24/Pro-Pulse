/* eslint-disable react/prop-types */
import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../config";
import Loading from "../components/Loader/Loading";

const Sponsors = ({ sponsors, loading }) => {
  const [showModal, setShowModal] = useState(false);
  const [sponsorToDelete, setSponsorToDelete] = useState(null);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${sponsorToDelete?.name ?? "sponsor"}?`
    );
    if (confirmDelete) {
      const response = await fetch(`${BASE_URL}/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        toast.success("Sponsor deleted successfully");
        window.location.reload();
      } else {
        toast.error("Failed to delete sponsor");
      }
    }
  };

  return (
    <div className="sponsors">
      <h1 className="text-2xl font-bold text-gray-900">Sponsors</h1>
      {loading ? (
        <div className="h-screen flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-auto w-full">
            <thead className="text-xs font-semibold uppercase tracking-wide text-gray-900 bg-gray-200">
              <tr className="hover:bg-gray-200">
                <th className="px-4 py-2">Profiles</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {sponsors.map((sponsor) => (
                <tr
                  key={sponsor._id}
                  className="hover:bg-gray-200 border-t border-gray-200 text-center">
                  <td className="px-4 py-2">
                    <img
                      src={sponsor.photo}
                      alt={sponsor.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-4 py-2">{sponsor.name}</td>
                  <td className="px-4 py-2">{sponsor.email}</td>
                  <td className="px-4 py-2">{sponsor.phone}</td>
                  <td className="px-4 py-2">
                    <button
                      className="delete-btn text-red-500 hover:text-red-600"
                      onClick={() => {
                        setSponsorToDelete(sponsor);
                        setShowModal(true);
                      }}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2 className="text-2xl font-bold text-gray-900">Confirm Delete</h2>
            <p className="mb-4">
              Are you sure you want to delete{" "}
              {sponsorToDelete?.name ?? "sponsor"}?
            </p>
            <button
              className="confirm-btn bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                handleDelete(sponsorToDelete?._id);
                setShowModal(false);
              }}>
              Yes
            </button>
            <button
              className="cancel-btn bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                setShowModal(false);
              }}>
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sponsors;
