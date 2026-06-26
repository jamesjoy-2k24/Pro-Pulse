/* eslint-disable react/prop-types */
import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const FaqItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border transition-all duration-500 mb-6 cursor-pointer ${
        isOpen 
          ? "border-primaryColor/30 bg-white/10 backdrop-blur-xl shadow-2xl" 
          : "border-white/5 bg-white/5 hover:border-white/20"
      }`}
      onClick={toggle}
    >
      <div className="p-6 lg:p-8">
        <div className="flex items-center justify-between gap-6">
          <h4 className={`text-lg lg:text-xl font-bold transition-colors duration-300 ${
            isOpen ? "text-white" : "text-slate-400 group-hover:text-white"
          }`}>
            {item.question}
          </h4>
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl transition-all duration-500 ${
              isOpen 
                ? "bg-primaryColor text-white rotate-180" 
                : "bg-white/5 text-slate-500 border border-white/10 group-hover:bg-white/10"
            }`}
          >
            {isOpen ? <AiOutlineMinus className="text-xl" /> : <AiOutlinePlus className="text-xl" />}
          </div>
        </div>

        <div
          className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            isOpen ? "mt-6 max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="h-[1px] w-full bg-gradient-to-r from-primaryColor/40 to-transparent mb-6" />
          <p className="text-[15px] leading-relaxed text-slate-400 font-medium">
            {item.content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FaqItem;
