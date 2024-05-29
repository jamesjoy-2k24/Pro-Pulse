import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaLaptop, FaUsers, FaFutbol, FaArrowUp } from "react-icons/fa";
import offer from "../assets/images/offer.jpg";
import offer1 from "../assets/images/offer1.jpg";
import offer2 from "../assets/images/offer2.jpg";
import faqImg from "../assets/images/profile.jpg";
import Contactimg from "../assets/images/contact.jpg";
import About from "../components/About/About";
import "./Home.css";
import FaqList from "../components/Faq/FaqList";
import UseFetchData from "../hooks/useFetchData";
import { BASE_URL } from "../config";

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  const { data: players } = UseFetchData(`${BASE_URL}/players`);

  // Get sponsor total count
  // const sponsorCount = sponsors ? sponsors.length : 0;
  // console.log("sponsorCount", sponsorCount);

  // Get player total count
  const playerCount = players ? players.length : 0;
  console.log("playerCount", playerCount);

  useEffect(() => {
    const handleScroll = () => {
      const offersSection = document.querySelector(".offers");
      const rect = offersSection.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      {/* ======== hero section ========= */}
      <section className="hero__section 2xl:h-screen flex items-center">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
            {/* ========= hero content ========= */}
            <div>
              <div className="lg:w-[570px] lg:text-justify space-x-2">
                <h1 className="text-[40px] leading-[46px] text-whiteColor font-[900] md:text-[60px] md:leading-[70px]">
                  Revolutionize Sports Player with{" "}
                  <span className="text-red-700 font-[900]">Pro-pulse</span>
                </h1>
                <p className="text__para text-white font-[500]">
                  PRO PULSE is a web app that allows you can hire eligible &
                  verified sports player. You can hire Anywhere from anywhere
                  you can access. A simple and effective way to search and find
                  your desired player.
                </p>
                <Link to="/players">
                  <button className="btn hover:opacity-100 hover:bg-red-700 transition-all duration-100 mt-[2rem] bg-primaryColor text-white">
                    Get Started
                  </button>
                </Link>
              </div>

              {/* ======== hero left ========= */}

              <div className="mt-[30px] lg:mt-[70px] flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-[30px]">
                <div className="flex flex-col items-center gap-3 text-center">
                  <h1 className="text-[36px] leading-[56px] lg:text-[45px] lg:leading-[56px] rounded-[10px] text-black font-[800] border-x-2 bg-white p-1 w-[140px]">
                    {playerCount}+
                  </h1>
                  <p className="text__para text-whiteColor font-[500]">
                    Active Players
                  </p>
                  <p className="">⭐⭐⭐</p>
                </div>

                <div className="flex flex-col items-center gap-3 text-center">
                  <h1 className="text-[36px] leading-[56px] lg:text-[45px] lg:leading-[56px] rounded-[10px] text-black font-[800] border-x-2 bg-white p-1 w-[140px]">
                    100+
                  </h1>
                  <p className="text__para text-whiteColor font-[500]">
                    Active Sponsors
                  </p>
                  <p className="">⭐⭐⭐⭐</p>
                </div>

                <div className="flex flex-col items-center gap-3 text-center">
                  <h1 className="text-[36px] leading-[56px] lg:text-[45px] lg:leading-[56px] rounded-[10px] text-black font-[800] border-x-2 bg-white p-1 w-[140px]">
                    100%
                  </h1>
                  <p className="text__para text-whiteColor font-[500]">
                    User Satisfaction
                  </p>
                  <p className="">⭐⭐⭐⭐⭐</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ======== hero section end ========= */}

      {/* ======== Timeline section ========= */}
      <section className="timeline-section py-30 bg-gray-100">
        <h1 className="text-[3rem] font-bold text-center mb-[4rem]">
          <span className="relative inline-block">
            <span className="inline-block text-[3rem] text-white p-1 relative z-10">
              Our Timeline
            </span>
            <span className="absolute rounded-[10px] inset-0 bg-primaryColor z-0 transform -skew-x-3 -skew-y-3"></span>
          </span>
        </h1>
        <div
          className={`timeline max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row justify-around items-center
        ${isVisible ? "animated-fade-in" : ""}`}>
          <div className="first-circle text-center mb-8 lg:mb-0 max-w-xs bg-white p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
            <div className="circle bg-white p-6 rounded-full shadow-lg inline-block mb-4">
              <FaLaptop className="text-6xl text-blue-500" />
            </div>
            <h1 className="text-2xl font-semibold mb-2">
              Cutting-edge Technology
            </h1>
            <p className="text-gray-700">
              Utilizes latest MERN Stack for superior performance and
              functionality.
            </p>
          </div>
          <div
            className="first-circle text-center mb-8 lg:mb-0 max-w-xs bg-white p-6 
            rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
            <div className="circle bg-white p-6 rounded-full shadow-lg inline-block mb-4">
              <FaUsers className="text-6xl text-green-500" />
            </div>
            <h1 className="text-2xl font-semibold mb-2">
              Focus on efficiency and user experience
            </h1>
            <p className="text-gray-700">
              Creates dynamic websites with high-resolution images and engaging
              landing pages.
            </p>
          </div>
          <div className="first-circle text-center max-w-xs h-[320px] bg-white p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
            <div className="circle bg-white p-6 rounded-full shadow-lg inline-block mb-4 ">
              <FaFutbol className="text-6xl text-red-500" />
            </div>
            <h1 className="text-2xl font-semibold mb-2">
              Specialization in soccer and cricket players
            </h1>
            <p className="text-gray-700">
              Targeted services for sponsors to hire top players in specific
              sports.
            </p>
          </div>
        </div>
      </section>
      {/* ======== Timeline section end ========= */}

      {/* ======== Our Offers ========= */}
      <section className="offer py-30 bg-white">
        <h1 className="text-[3rem] font-bold text-center mb-12">
          <span className="relative inline-block">
            <span className="inline-block text-[3rem] text-white p-1 relative z-10">
              Our Offers
            </span>
            <span className="absolute rounded-[10px] inset-0 bg-primaryColor z-0 transform -skew-x-3 -skew-y-3"></span>
          </span>
        </h1>
        <div
          className={`offers text-center gap-[3rem] max-w-7xl mx-auto  flex flex-col lg:flex-row justify-around items-center ${
            isVisible ? "animate-fade-in" : ""
          }`}>
          <div className="first-offer max-w-[23rem] bg-gray-100 p-6 rounded-lg shadow-lg mb-8 lg:mb-0 transform transition duration-500 hover:scale-105">
            <img
              src={offer1}
              alt="offer"
              className="w-full h-48 object-cover rounded-t-lg mb-4 brightness-[0.8] hover:brightness-100"
            />
            <h1 className="text-xl font-semibold mb-4">
              Player Recruitment Platform
            </h1>
            <p className="text-gray-700">
              An innovative platform for sponsors to easily connect with
              players.
            </p>
          </div>
          <div className="first-offer max-w-[23rem] bg-gray-100 p-6 rounded-lg shadow-lg mb-8 lg:mb-0 transform transition duration-500 hover:scale-105">
            <img
              src={offer}
              alt="offer"
              className="w-full h-48 object-cover rounded-t-lg mb-4 brightness-[0.8] hover:brightness-100"
            />
            <h1 className="text-xl font-semibold mb-4">
              A lot of Players in One Place
            </h1>
            <p className="text-gray-700">
              We have a huge database of players with a lot of players and
              clubs.
            </p>
          </div>
          <div className="first-offer max-w-[23rem] bg-gray-100 p-6 rounded-lg shadow-lg mb-8 lg:mb-0 transform transition duration-500 hover:scale-105 ">
            <img
              src={offer2}
              alt="offer"
              className="w-full h-48 object-cover rounded-t-lg mb-4 brightness-[0.8] hover:brightness-100"
            />
            <h1 className="text-xl font-semibold mb-4">Anytime Anywhere</h1>
            <p className="text-gray-700">
              We are available 24/7 to help you with any problem you may have.
            </p>
          </div>
        </div>
      </section>
      {/* ======== Our Offers end ========= */}

      {/* ======== About ========= */}
      <About />
      {/* ======== About end ========= */}

      {/* ======== FAQs ========= */}
      <section className="faq py-30 ">
        <div className="container">
          <h1 className="text-[3rem] font-bold text-center mb-[5rem]">
            <span className="relative inline-block">
              <span className="inline-block text-[3rem] text-white p-1 relative z-10">
                What We Do !
              </span>
              <span className="rounded-[10px] absolute inset-0 bg-primaryColor z-0 transform -skew-x-3 -skew-y-3"></span>
            </span>
          </h1>
          <div className="flex justify-between gap-[50px] lg:gap-[10rem]">
            <div className="w-full md:w-1/2">
              <h2 className="heading font-[900] text-center lg:text-left md:text-[2rem]">
                We are here to help you with any problem you may have
              </h2>
              <FaqList />
            </div>

            <div className="w-full lg:w-1/2 xl:w-[700px]">
              <img
                src={faqImg}
                alt="faq"
                className="rounded-[10px] h-[700px] object-cover object-top shadow-2xl w-3/4 lg:w-full"
              />
            </div>
          </div>
        </div>
      </section>
      {/* ======== FAQs end ========= */}

      {/* ======== Contact ========= */}
      <section className="contact h-[50vh] flex items-center justify-center relative bg-gray-100">
        <div
          className="absolute inset-0 bg-cover bg-center brightness-[0.3]"
          style={{ backgroundImage: `url(${Contactimg})` }}></div>
        <div className="relative container mx-auto px-4 flex flex-col lg:flex-row items-center justify-center gap-8 z-10">
          <div className="contact-content w-full text-center">
            <h1 className="text-3xl font-bold text-white mb-6">
              Do you have any questions? Get in touch with us!
            </h1>
            <Link to="/contact">
              <button className="btn">
                <span>CONTACT US</span>
              </button>
            </Link>
          </div>
        </div>
      </section>
      {/* ======== Contact end ========= */}

      {/* Scroll-to-Top Button */}
      <div
        className="scroll-to-top fixed bottom-4 right-4 bg-primaryColor text-white p-3 rounded-full shadow-lg cursor-pointer hover:bg-black transition duration-300 z-20"
        onClick={scrollToTop}>
        <FaArrowUp className="text-xl" />
      </div>
    </div>
  );
};

export default Home;
