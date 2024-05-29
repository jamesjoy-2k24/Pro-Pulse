/* eslint-disable react/prop-types */
import { FaFootballBall } from "react-icons/fa";
import { Link } from "react-router-dom";

const ServiceCard = ({ service }) => {
  return (
    <article className="relative max-w-[400px] mx-auto bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105 duration-300">
      <div className="absolute inset-0 bg-black opacity-0 hover:opacity-75 transition-opacity duration-300"></div>
      <div className="p-5 relative z-10">
        <div className="flex items-center mb-4">
          <div className="h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 bg-primaryColor rounded-full p-4 flex items-center justify-center">
            <FaFootballBall className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 text-white" />
          </div>
          <h2 className="ml-4 text-lg font-bold md:text-xl lg:text-2xl text-black">
            {service.name}
          </h2>
        </div>
        <p className="text-gray-700 text-sm md:text-base lg:text-lg mb-4 h-24 overflow-hidden">
          {service.description}
        </p>
        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-600 text-xs md:text-sm lg:text-base">
            View All {service.name} Players
          </p>
          <Link to={`/players?category=${service.name}`}>
            <button className=" text-black border border-solid border-redColor hover:bg-primaryColor hover:text-white font-bold px-4 py-2 rounded transition-colors duration-300">
              View All
            </button>
          </Link>
        </div>
        <hr className="border-gray-300 mb-4" />
        <div className="flex justify-between">
          <div className="flex flex-col items-center">
            <span className="text-gray-600 text-xs md:text-sm lg:text-base font-bold">
              Overall Rating
            </span>
            <span className="text-red-500 text-xl md:text-2xl lg:text-3xl font-bold">
              {service.overall_rating}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-gray-600 text-xs md:text-sm lg:text-base font-bold">
              Potential Rating
            </span>
            <span className="text-red-500 text-xl md:text-2xl lg:text-3xl font-bold">
              {service.potential_rating}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ServiceCard;
