/* eslint-disable react/prop-types */
import Error from "../components/Error/Error.jsx";
import Loader from "../components/Loader/Loading.jsx";
import { useState } from "react";
import { FaHandPointDown } from "react-icons/fa";

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
    <div>
      <div>
        <h3 className="text-2xl font-bold flex items-center gap-2 border-b-2 pb-2 border-black">
          Overview{" "}
          <span>
            <FaHandPointDown />
          </span>
        </h3>
      </div>

      {/* Count section */}
      <div className="grid gap-[2rem] lg:flex lg:justify-around text-center md:grid-cols-3 s:grid-cols-1 items-center pt-10">
        <div className="flex flex-col items-center gap-4 border-r-4 px-10 p-2 border-gray-400">
          <div className="text-5xl font-semibold ">{players.length}</div>
          <div className="text-2xl font-bold text-gray-500">Total Players</div>
        </div>
        <div className="flex flex-col items-center gap-4 border-r-4 px-10 p-2 border-gray-400">
          <div className="text-5xl font-semibold ">{sponsors?.length}</div>
          <div className="text-2xl font-bold text-gray-500">Total Sponsors</div>
        </div>
        <div className="flex flex-col items-center gap-4 border-r-4 px-10 p-2 border-gray-400">
          <div className="text-5xl font-semibold ">{totalItems}</div>
          <div className="text-2xl font-bold text-gray-500">Total Users</div>
        </div>
      </div>

      {/* Pagination */}
      <nav
        className="mt-5 pt-10 px-12 flex items-center justify-between  text-sm"
        aria-label="Page navigation example">
        <p>
          Showing <strong>{(currentPage - 1) * itemsPerPage + 1}</strong> to{" "}
          <strong>{Math.min(currentPage * itemsPerPage, totalItems)}</strong>{" "}
          of... <strong>{totalItems}</strong>
        </p>

        <ul className="list-style-none flex gap-3 items-center mr-[4rem] ">
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

      {/* Table section */}
      <div className="overflow-x-auto mt-5  w-full mx-auto bg-gray-200 rounded-lg shadow shadow-gray-200">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="uppercase text-xl tracking-wider ">
            <tr className=" border-b-4 border-primaryColor">
              <th scope="col" className="px-6 py-5">
                Profile
              </th>
              <th scope="col" className="px-6 py-5">
                Names
              </th>
              <th scope="col" className="px-6 py-5">
                Role
              </th>
              <th scope="col" className="px-6 py-5">
                Status
              </th>
              <th scope="col" className="px-6 py-5">
                Gmail
              </th>
              <th scope="col" className="px-6 py-5">
                Place
              </th>
              <th scope="col" className="px-6 py-5">
                Sports
              </th>
            </tr>
          </thead>

          <tbody className="divide-y bg-white divide-gray-200 hover:gray-300">
            {currentItems?.map((item, index) => (
              <tr
                key={item?._id || index}
                className="hover:bg-gray-200 transition-all duration-200 font-semibold text-lg">
                <td className="px-10 py-3">
                  <img
                    src={item?.photo}
                    alt="profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-6 py-3 ">{item?.name}</td>
                <td className="px-6 py-3">{item?.role}</td>
                <td className="px-6 py-3">
                  <p
                    className={`text-[16px] text-[#2fc42f] font-extrabold mt-2 ${
                      item.isApproved === "approved"
                        ? "text-[#2fc42f]"
                        : item.isApproved === "declined"
                        ? "text-red-600"
                        : "text-blue-600"
                    }`}>
                    <span>{item.isApproved === "approved" ? "✓ " : ""}</span>{" "}
                    <span>{item.isApproved === "declined" ? " ✕ " : ""}</span>{" "}
                    <span>{item.isApproved === "pending" ? " ⏳ " : ""}</span>
                    {item.isApproved === "approved"
                      ? "Approved"
                      : item.isApproved === "declined"
                      ? "Declined"
                      : "Pending"}
                  </p>
                </td>
                <td className="px-6 py-3">{item?.email}</td>
                <td className="px-6 py-3">{item?.place ? item?.place : "-"}</td>
                <td className="px-6 py-3">
                  {item?.sports ? item?.sports[0] : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Overview;
