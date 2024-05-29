/* eslint-disable react/prop-types */
import { BASE_URL, token } from "../../config";
import { toast } from "react-toastify";
import { FaDotCircle } from "react-icons/fa";
import { FaSmile } from "react-icons/fa";

const SidePanel = ({ playerId, price, available }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const sponsorId = user?._id;

  const bookingHandler = async () => {
    // Debugging: Log the sponsorId
    console.log("sponsorId", sponsorId);

    // Ensure sponsorId is a valid string
    if (!sponsorId) {
      console.error("Sponsor ID is invalid.");
      toast.error("PLease login or sign up as a Sponsor");
      return;
    }

    // Create a Stripe checkout session
    try {
      const response = await fetch(
        `${BASE_URL}/bookings/checkout-session/${playerId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ sponsorId }), // Ensure sponsorId is correctly included in the body
        }
      );

      const data = await response.json();

      // Debugging: Log the response data
      console.log("Response Data:", data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to create checkout session");
      }

      if (data.session && data.session.url) {
        window.location.href = data.session.url;
      } else {
        throw new Error("Checkout session URL not found in response");
      }
    } catch (error) {
      console.error("Error during booking:", error);
      toast.error("Please login to book");
      // window.location.href = "/oops";
    }
  };

  return (
    <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text__para mt-0 font-semibold">Price</p>
        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-black font-bold">
          LKR {price}
        </span>
      </div>

      <div className="flex items-center justify-between mt-5">
        <p className="text__para mt-0 font-semibold">
          {available ? "Available" : "Not Available"}
        </p>
        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-black font-bold">
          <FaDotCircle
            className={available ? "text-green-600" : "text-red-600"}
          />
        </span>
      </div>

      <button
        onClick={bookingHandler}
        className="flex items-center justify-center gap-3 mt-5 w-full bg-primaryColor py-3 text-white font-semibold rounded-md">
        <FaSmile className="inline-block mr-2" />
        Pay for player booking
      </button>
    </div>
  );
};

export default SidePanel;
