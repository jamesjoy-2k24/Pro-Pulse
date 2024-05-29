import { FaExclamationTriangle } from "react-icons/fa";

function Oops() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100 text-red-900">
      <FaExclamationTriangle className="text-6xl" />
      <h1 className="text-4xl font-bold my-4">Oops!</h1>
      <p className="text-2xl">Something went wrong. Please try again later.</p>
    </div>
  );
}

export default Oops;
