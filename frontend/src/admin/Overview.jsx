/* eslint-disable react/prop-types */
import Error from "../components/Error/Error.jsx";
import Loader from "../components/Loader/Loading.jsx";
import { useState } from "react";
import { FaHandPointDown, FaUsers, FaUserCheck, FaBriefcase } from "react-icons/fa";

const Overview = ({ players, sponsors, loading, error }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Combine players and sponsors into a single list
  const combinedItems = [...players, ...sponsors];
  const totalItems = combinedItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const currentItems = combinedItems
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    .filter((item) => item !== null);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  if (loading) return <Loader />;
  if (error) return <Error />;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#1f2833] pb-4">
        <h3 className="text-2xl font-bold text-white flex items-center gap-3">
          System Overview{" "}
          <span className="text-[#66fcf1] animate-bounce">
            <FaHandPointDown />
          </span>
        </h3>
        <span className="text-xs text-[#8f94a6] tracking-wider uppercase">Realtime Analytics</span>
      </div>

      {/* Count Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Players Card */}
        <div className="relative group overflow-hidden rounded-2xl bg-[#1f2833]/40 border border-[#1f2833] p-6 hover:border-[#66fcf1]/40 transition-all duration-300 shadow-xl hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#66fcf1]/5 rounded-bl-full pointer-events-none transition-all group-hover:bg-[#66fcf1]/10" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-[#8f94a6] uppercase tracking-wider">Total Players</p>
              <h4 className="text-4xl font-extrabold text-white mt-2 tracking-tight">{players.length}</h4>
            </div>
            <div className="p-4 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <FaUserCheck size={24} />
            </div>
          </div>
        </div>

        {/* Total Sponsors Card */}
        <div className="relative group overflow-hidden rounded-2xl bg-[#1f2833]/40 border border-[#1f2833] p-6 hover:border-[#66fcf1]/40 transition-all duration-300 shadow-xl hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#66fcf1]/5 rounded-bl-full pointer-events-none transition-all group-hover:bg-[#66fcf1]/10" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-[#8f94a6] uppercase tracking-wider">Total Sponsors</p>
              <h4 className="text-4xl font-extrabold text-white mt-2 tracking-tight">{sponsors?.length || 0}</h4>
            </div>
            <div className="p-4 rounded-xl bg-[#66fcf1]/10 text-[#66fcf1] border border-[#66fcf1]/20">
              <FaBriefcase size={24} />
            </div>
          </div>
        </div>

        {/* Total Users Card */}
        <div className="relative group overflow-hidden rounded-2xl bg-[#1f2833]/40 border border-[#1f2833] p-6 hover:border-[#66fcf1]/40 transition-all duration-300 shadow-xl hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#66fcf1]/5 rounded-bl-full pointer-events-none transition-all group-hover:bg-[#66fcf1]/10" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-[#8f94a6] uppercase tracking-wider">Total Users</p>
              <h4 className="text-4xl font-extrabold text-white mt-2 tracking-tight">{totalItems}</h4>
            </div>
            <div className="p-4 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <FaUsers size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-[#1f2833]/20 border border-[#1f2833] rounded-2xl overflow-hidden shadow-2xl">
        <div className="px-6 py-5 border-b border-[#1f2833] flex justify-between items-center">
          <h4 className="text-lg font-bold text-white">All Users Profile List</h4>
          <span className="text-xs text-[#8f94a6]">Page {currentPage} of {totalPages}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="border-b border-[#1f2833] bg-[#1f2833]/40 text-[#8f94a6] text-xs font-semibold uppercase tracking-wider">
                <th className="px-6 py-4">Profile</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Place</th>
                <th className="px-6 py-4">Sports</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#1f2833] text-[#c5c6c7]">
              {currentItems?.map((item, index) => (
                <tr
                  key={item?._id || index}
                  className="hover:bg-[#1f2833]/30 transition-all duration-200">
                  <td className="px-6 py-4">
                    <img
                      src={item?.photo}
                      alt="profile"
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-[#66fcf1]/20"
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-white">{item?.name}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                      item?.role === "admin"
                        ? "bg-purple-950/40 text-purple-400 border-purple-900/40"
                        : item?.role === "player"
                        ? "bg-blue-950/40 text-blue-400 border-blue-900/40"
                        : "bg-emerald-950/40 text-emerald-400 border-emerald-900/40"
                    }`}>
                      {item?.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                      item.isApproved === "approved"
                        ? "bg-emerald-950/40 text-emerald-400 border-emerald-900/40"
                        : item.isApproved === "declined"
                        ? "bg-red-950/40 text-red-400 border-red-900/40"
                        : "bg-amber-950/40 text-amber-400 border-amber-900/40"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        item.isApproved === "approved"
                          ? "bg-emerald-400"
                          : item.isApproved === "declined"
                          ? "bg-red-400"
                          : "bg-amber-400"
                      }`} />
                      {item.isApproved === "approved"
                        ? "Approved"
                        : item.isApproved === "declined"
                        ? "Declined"
                        : "Pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-mono text-[#8f94a6]">{item?.email}</td>
                  <td className="px-6 py-4">{item?.place || "-"}</td>
                  <td className="px-6 py-4">
                    {item?.sports && item.sports.length > 0 ? (
                      <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 text-xs border border-zinc-700">
                        {item.sports[0]}
                      </span>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-[#1f2833] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-[#8f94a6]">
            Showing <span className="font-semibold text-white">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
            <span className="font-semibold text-white">{Math.min(currentPage * itemsPerPage, totalItems)}</span> of{" "}
            <span className="font-semibold text-white">{totalItems}</span> items
          </p>

          <div className="flex gap-2 items-center">
            <button
              className="px-3 py-1.5 rounded-lg border border-[#1f2833] bg-[#1f2833]/40 text-[#c5c6c7] hover:bg-[#1f2833] hover:text-white disabled:opacity-40 disabled:hover:bg-[#1f2833]/40 disabled:hover:text-[#c5c6c7] transition-all font-medium"
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
              className="px-3 py-1.5 rounded-lg border border-[#1f2833] bg-[#1f2833]/40 text-[#c5c6c7] hover:bg-[#1f2833] hover:text-white disabled:opacity-40 disabled:hover:bg-[#1f2833]/40 disabled:hover:text-[#c5c6c7] transition-all font-medium"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
