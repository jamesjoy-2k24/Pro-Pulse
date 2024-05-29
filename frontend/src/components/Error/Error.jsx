/* eslint-disable react/prop-types */
// import warning icon
import { MdWarning } from "react-icons/md";

const Error = ({ message }) => {
  return (
    <div className="text-center h-[30vh] flex flex-col items-center justify-center gap-5">
      <MdWarning className="text-5xl text-primaryColor" />
      <h2 className="text-5xl font-bold text-primaryColor">{message}</h2>
    </div>
  );
};

export default Error;
