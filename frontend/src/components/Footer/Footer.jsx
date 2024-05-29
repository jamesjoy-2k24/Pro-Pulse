import { Link } from "react-router-dom";
import {
  MdLocationOn,
  MdOutlinePhone,
  MdOutlineMail,
  MdCopyright,
} from "react-icons/md";
import { FaLaptop, FaUsers, FaFutbol } from "react-icons/fa";
import { RiLinkedinFill, RiFacebookFill, RiTwitterFill, RiInstagramFill } from "react-icons/ri";

const socialLinks = [
  {
    path: "https://www.linkedin.com/",
    icon: <RiLinkedinFill />,
  },
  {
    path: "https://www.facebook.com/",
    icon: <RiFacebookFill />,
  },
  {
    path: "https://twitter.com/",
    icon: <RiTwitterFill />,
  },
  {
    path: "https://www.instagram.com/",
    icon: <RiInstagramFill />,
  },
];

const quickLinks01 = [
  {
    path: "/services",
    display: "Services",
    icon: <FaUsers />,
  },
  {
    path: "/players",
    display: "Find Players",
    icon: <FaFutbol />,
  },
  {
    path: "/contact",
    display: "Contact",
    icon : <FaLaptop />,

  },
];

const quickLinks02 = [
  {
    path: "/home",
    icon: <MdLocationOn />,
    display: "Location",
  },
  {
    path: "/home",
    icon: <MdOutlinePhone />,
    display: "Phone",
  },
  {
    path: "/home",
    icon: <MdOutlineMail />,
    display: "Email",
  },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="pb-16 pt-10 max-w-[1200px] mx-auto bordex">
      <div className="container">
        <div className="flex justify-between items-center flex-col md:flex-row flex-wrap gap-[30px]">

            {/* ======= Footer Quick Links 1 ======= */}
          <div>
            <Link to="/">
              <h2 className="text-[3rem] font-[800] text-center lg:text-left">Pro Pulse</h2>
            </Link>
            <p className="flex items-center text-[18px] text-center lg:text-left  leading-7 font-[600] text-gray mt-4 mb-[1.5rem]">
              <MdCopyright /> Copyright {year} developed by James Joy all right
              reserved.
            </p>

            <div className="flex justify-center lg:justify-start items-center gap-3 mt-4">
              {socialLinks.map((link, index) => (
                <Link
                  to={link.path}
                  key={index}
                  className="w-9 h-9 border border-solid border-primaryColor  rounded-full flex items-center
                                justify-center group hover:bg-primaryColor transition duration-300 hover:border-none hover:text-whiteColor "
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>

              {/* ======= Footer Quick Links 2 ======= */}
          <div>
            <h2 className="text-[22px] leading-[30px] font-[800] mb-6 text-black text-center border-b-2 border-gray-500">
              Quick Links
            </h2>

            <ul className="flex flex-col gap-1 ">
              {quickLinks01.map((link, index) => (
                <li key={index} className="text-[18px]  leading-7 font-[500] text-gray mb-2 hover:text-primaryColor">
                  <Link className="flex items-center gap-5 " to= {link.path}>{link.icon} {link.display}</Link>
                </li>
              ))}
            </ul>
          </div>

              {/* ======= Footer Quick Links 3 ======= */}
              <div>
            <h2 className="text-[22px] leading-[30px] font-[800] mb-6 text-black border-b-2 border-gray-500">
              Stay Tuned
            </h2>

            <ul className="flex flex-col gap-1">
              {quickLinks02.map((link, index) => (
                <li key={index} className="text-[16px] leading-7 font-[400] text-gray mb-2 hover:text-primaryColor">
                  <Link className="flex items-center gap-5" to= {link.path}>{link.icon} {link.display}</Link>
                </li>
              ))}
            </ul>
          </div>


        </div>
      </div>
    </footer>
  );
};

export default Footer;
