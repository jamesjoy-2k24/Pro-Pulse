import Hashloader from "react-spinners/HashLoader";

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-[50vh]">
      <Hashloader color="#800000" size={50} />
    </div>
  );
};

export default Loading;
