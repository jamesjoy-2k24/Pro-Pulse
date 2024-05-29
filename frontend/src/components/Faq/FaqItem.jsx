/* eslint-disable react/prop-types */
import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const FaqItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div
      className={`faq__item ${
        isOpen && "active__faq bg-primaryColor text-white"
      } p-3 lg:p-5 rounded-[12px] border border-solid border-primaryColor mb-5 cursor-pointer transition-all duration-500`}
    >
      <div
        className="flex items-center justify-between gap-5"
        onClick={toggle}
      >
        <h4 className="text-[20px] leading-7 lg:text-[24px] lg:leading-9 text-black mx-auto font-[700]">
          {item.question}
        </h4>
        <div
          className={`${
            isOpen && "bg-white text-black border-none"
          } w-7 h-7 lg:h-8 border border-solid border-redColor rounded flex items-center justify-center transition-colors duration-300`}
        >
          {isOpen ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </div>
      </div>

      <div
        className={`faq__content mt-4 overflow-hidden transition-max-height duration-500 ease-in-out ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <p className="text-[16px] text-center leading-6 lg:text-[15px] lg:leading-6 font-[500] text-white">
          {item.content}
        </p>
      </div>
    </div>
  );
};

export default FaqItem;
