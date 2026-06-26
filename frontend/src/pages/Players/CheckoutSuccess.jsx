import { BiSmile } from "react-icons/bi";
import { BASE_URL } from "../../config";
import useFetchData from "../../hooks/useFetchData";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const CheckoutSuccess = () => {
  const [flip, setFlip] = useState(true);
  const handleFlip = () => {
    setFlip(!flip);
  };
  const location = useLocation();
  const [paymentProcessed, setPaymentProcessed] = useState(false);

  // Get the URL parameters
  const urlParams = new URLSearchParams(location.search);

  // Extract the data?Id parameter value and get the details of the data?
  const playerId = urlParams.get("playerId");
  const sessionId = urlParams.get("session_id");

  const id = playerId;
  const { data } = useFetchData(`${BASE_URL}/players/${id}`);

  useEffect(() => {
    console.log("CheckoutSuccess useEffect running.");
    console.log("Full URL query string:", location.search); // Added this line
    console.log("Player ID from URL:", playerId);
    console.log("Session ID from URL:", sessionId);

    const processPayment = async () => {
      if (sessionId && !paymentProcessed) {
        console.log("Attempting to process payment with sessionId:", sessionId);
        const token = localStorage.getItem("token");
        console.log("Token being sent:", token);

        try {
          const res = await fetch(
            `${BASE_URL}/bookings/payment-success?playerId=${playerId}&session_id=${sessionId}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          const result = await res.json();
          console.log("Backend response for payment-success:", result);

          if (!res.ok) {
            throw new Error(result.message || "Failed to process payment");
          }

          toast.success("Payment successfully processed and player notified!");
          setPaymentProcessed(true);
        } catch (error) {
          toast.error(
            error.message || "Something went wrong processing payment",
          );
          console.error("Error processing payment:", error);
        }
      } else if (!sessionId) {
        console.log("No sessionId found in URL. Payment processing skipped.");
      } else if (paymentProcessed) {
        console.log("Payment already processed for this session.");
      }
    };

    processPayment();
  }, [sessionId, paymentProcessed, playerId]); // Added playerId to dependencies

  return (
    <section className="flex items-center justify-center">
      {/* ====== Payment Div ===== */}
      <div className="flex flex-col items-center justify-center h-screen bg-white p-12">
        <div className="flex flex-col items-center justify-center rounded-lg bg-gray-200 p-8 shadow-lg">
          <BiSmile className="text-[4em] text-green-600 mb-6" />
          <h1 className="text-3xl font-bold mb-6">Payment Successful</h1>
          <p className="text-xl font-medium mb-6">
            Your payment has been processed successfully. An email with the
            details has been sent to the player.
          </p>
          <button
            onClick={handleFlip}
            className="mt-6 bg-green-600 text-white font-extrabold px-6 py-2 rounded-md transition duration-150 hover:bg-green-800"
          >
            Get The Number
          </button>
        </div>
      </div>
      {/* ====== Card Div ===== */}
      <div
        className={`flex flex-col items-center justify-center h-screen bg-white p-12 ${
          flip ? "hidden" : ""
        }`}
      >
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
              className="mt-2 bg-gradient-to-tr from-cyan-500 to-red-300 text-black font-extrabold px-6 py-2 rounded-md "
            >
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CheckoutSuccess;
