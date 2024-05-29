import aboutImg from "../../assets/images/about.jpg";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section className="py-12 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-[3rem]">
          {/* ======= About Image ======= */}
          <div className="relative w-full lg:w-1/2 xl:w-[700px] z-10 order-2 lg:order-1 flex justify-center lg:justify-end">
            <img src={aboutImg} alt="about" className="rounded-[10px] shadow-xl w-3/4 lg:w-full" />
          </div>

          {/* ======= About Content ======= */}
          <div className="w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2">
            <h2 className="text-[2.3rem] font-bold text-gray-800 mb-6 mt-[3rem]">Proud to be one of the best partners.</h2>
            <p className="text-[18px] text-gray-800 mb-4 text-justify max-w-[800px] mx-auto">
              Pro Pulse is a web platform that connects players with opportunities and helps teams achieve success on and off the field. We provide comprehensive player profiles, advanced player search and filtering options, and an intuitive interface that makes it easy for players to assess their skills, stats, and performance history. Our mission is to revolutionize the way teams recruit and scout players, providing a seamless and efficient platform that connects players with opportunities and helps teams achieve success on and off the field.
            </p>
            <p className="text-[18px] text-gray-800 text-justify  max-w-[800px] mx-auto mt-5">
              We are committed to helping players and teams achieve success. Join us today and start exploring our platform. We look forward to connecting with you!
            </p>

            <Link to="/services">
              <button className="btn mt-10 hover:bg-red-700 transition duration-300">Learn More</button>
            </Link>
          </div>
        </div>
      </div>
    </section>


  );
};

export default About;
