import { BiSmile } from "react-icons/bi";
import { BASE_URL } from "../../config";
import useFetchData from "../../hooks/useFetchData";
import { useState } from "react";
import { Link } from "react-router-dom";

const CheckoutSuccess = () => {
  const [flip, setFlip] = useState(true);

  const handleFlip = () => {
    setFlip(!flip);
  };

  // Get the URL parameters
  const urlParams = new URLSearchParams(window.location.search);

  // Extract the data?Id parameter value and get the details of the data?
  const playerId = urlParams.get("playerId");
  const id = playerId;
  const { data } = useFetchData(`${BASE_URL}/players/${id}`);

  console.log(data);

  return (
    <section className="flex items-center justify-center">
      {/* ====== Payment Div ===== */}
      <div className="flex flex-col items-center justify-center h-screen bg-white p-12">
        <div className="flex flex-col items-center justify-center rounded-lg bg-gray-200 p-8 shadow-lg">
          <BiSmile className="text-[4em] text-green-600 mb-6" />
          <h1 className="text-3xl font-bold mb-6">Payment Successful</h1>
          <p className="text-xl font-medium mb-6">
            Your payment has been processed successfully.
          </p>
          <button
            onClick={handleFlip}
            className="mt-6 bg-green-600 text-white font-extrabold px-6 py-2 rounded-md transition duration-150 hover:bg-green-800">
            Get The Number
          </button>
        </div>
      </div>
      {/* ====== Card Div ===== */}
      <div
        className={`flex flex-col items-center justify-center h-screen bg-white p-12 ${
          flip ? "hidden" : ""
        }`}>
        <div className="flex flex-col items-center justify-center rounded-lg bg-[#1D1D1D] text-white p-8 shadow-lg">
          <img
            src={data?.photo}
            alt="profile"
            className="w-32 h-32 rounded-full mb-4"
          />
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-tl from-cyan-300 to-red-300 bg-clip-text text-transparent">
            {data?.name}
          </h1>
          <p>Your number is</p>
          <h1 className="text-3xl text-white font-bold mb-6">{data?.phone}</h1>
          <Link to="/players">
            <button
              onClick={handleFlip}
              className="mt-2 bg-gradient-to-tr from-cyan-500 to-red-300 text-black font-extrabold px-6 py-2 rounded-md ">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CheckoutSuccess;
