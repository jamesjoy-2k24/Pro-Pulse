import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaLaptop,
  FaUsers,
  FaFutbol,
  FaArrowUp,
  FaChevronRight,
  FaPlay,
  FaCheckCircle,
  FaStar,
} from "react-icons/fa";
import offer from "../assets/images/offer.jpeg";
import offer1 from "../assets/images/offer1.jpg";
import offer2 from "../assets/images/offer2.jpg";
import faqImg from "../assets/images/faq.jpeg";
import Contactimg from "../assets/images/contact.jpg";
import LandingImg from "../assets/images/landingpage.jpg";
import About from "../components/About/About";
import FaqList from "../components/Faq/FaqList";
import UseFetchData from "../hooks/useFetchData";
import { BASE_URL } from "../config";

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { data: players } = UseFetchData(`${BASE_URL}/players`);
  const { data: sponsors } = UseFetchData(`${BASE_URL}/users`);

  const playerCount = players ? players.length : 0;
  const sponsorCount = sponsors ? sponsors.length : 0;

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 200) {
        setIsVisible(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="overflow-hidden bg-white">
      {/* ======== Hero Section: Cinematic & Futuristic ======== */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-32 overflow-hidden bg-slate-900">
        {/* Animated Background Mesh */}
        <div className="absolute -left-20 -top-20 h-[600px] w-[600px] rounded-full bg-primaryColor/20 blur-[150px] animate-pulse" />
        <div
          className="absolute -right-20 bottom-0 h-[600px] w-[600px] rounded-full bg-primaryColor/10 blur-[150px] animate-pulse"
          style={{ animationDelay: "2s" }}
        />

        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />

        <div className="container relative z-10 mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
            {/* Hero Content */}
            <div className="flex-1 text-center lg:text-left">
              <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-[11px] font-black uppercase tracking-[0.3em] text-primaryColor backdrop-blur-xl border border-white/10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primaryColor opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primaryColor"></span>
                </span>
                Next-Gen Recruitment
              </span>

              <h1 className="text-5xl font-[1000] tracking-tight text-white md:text-7xl lg:text-8xl leading-[0.95]">
                Unlock Your <br />
                <span className="text-primaryColor italic">
                  Full Potential.
                </span>
              </h1>

              <p className="mt-8 max-w-xl text-lg font-medium leading-relaxed text-slate-400">
                The world's most advanced platform for professional athlete
                scouting. Connecting elite talent with global sponsors through
                data-driven insights.
              </p>

              <div className="mt-12 flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
                <Link to="/players" className="group/btn relative">
                  <div className="flex h-16 items-center justify-center rounded-full bg-primaryColor px-10 text-white shadow-2xl shadow-primaryColor/40 transition-all duration-500 hover:scale-105 hover:bg-red-700">
                    <span className="text-sm font-black uppercase tracking-widest">
                      Get Started
                    </span>
                    <FaChevronRight className="ml-3 text-xs transition-transform group-hover/btn:translate-x-1" />
                  </div>
                </Link>

                <button className="flex items-center gap-4 text-white hover:text-primaryColor transition-colors">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-md">
                    <FaPlay className="text-xs ml-1" />
                  </div>
                  <span className="text-sm font-bold uppercase tracking-widest">
                    Watch Trailer
                  </span>
                </button>
              </div>

              {/* Stats Grid */}
              <div className="mt-20 flex flex-wrap items-center gap-12 justify-center lg:justify-start border-t border-white/5 pt-10">
                <div className="group">
                  <h3 className="text-4xl font-black text-white">
                    {playerCount}+
                  </h3>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 group-hover:text-primaryColor transition-colors">
                      Elite Players
                    </span>
                    <div className="flex gap-0.5 text-[8px] text-yellow-500">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </div>
                  </div>
                </div>
                <div className="h-10 w-[1px] bg-white/10 hidden sm:block" />
                <div className="group">
                  <h3 className="text-4xl font-black text-white">
                    {sponsorCount}+
                  </h3>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 group-hover:text-primaryColor transition-colors">
                      Active Sponsors
                    </span>
                    <div className="flex gap-0.5 text-[8px] text-primaryColor">
                      <FaCheckCircle />
                      <FaCheckCircle />
                      <FaCheckCircle />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Visual Element (Cinematic Athlete) */}
            <div className="relative flex-1 hidden lg:block">
              <div className="relative z-10 animate-float">
                <div className="absolute -inset-10 rounded-[4rem] bg-gradient-to-tr from-primaryColor/30 to-transparent blur-3xl" />
                <div className="relative overflow-hidden rounded-[3.5rem] border border-white/10 bg-white/5 p-3 backdrop-blur-2xl shadow-2xl">
                  <div className="aspect-[4/5] rounded-[2.8rem] bg-slate-800 overflow-hidden relative group">
                    <img
                      src={LandingImg}
                      alt="Elite Athlete"
                      className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />

                    {/* Floating Data HUD overlay */}
                    <div className="absolute bottom-8 left-8 right-8">
                      <div className="rounded-2xl bg-black/40 p-5 backdrop-blur-md border border-white/10">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] font-black uppercase tracking-widest text-primaryColor">
                            Pro Profile
                          </span>
                          <div className="flex gap-1">
                            <div className="h-1 w-4 bg-primaryColor rounded-full" />
                            <div className="h-1 w-2 bg-white/20 rounded-full" />
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primaryColor to-red-800 flex items-center justify-center text-white text-xs font-black">
                            PR
                          </div>
                          <div className="flex-1">
                            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                              <div className="h-full w-[85%] bg-primaryColor animate-pulse" />
                            </div>
                            <p className="mt-2 text-[10px] font-bold text-white/60 uppercase tracking-tighter">
                              Peak Performance Analysis
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======== Modern Ecosystem (Process) ======== */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="mb-20 text-center">
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-primaryColor">
              The Ecosystem
            </span>
            <h2 className="mt-4 text-4xl font-[1000] tracking-tight text-slate-900 md:text-5xl">
              Engineered for{" "}
              <span className="text-primaryColor">Excellence.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaLaptop />,
                color: "blue",
                title: "Precision Analytics",
                desc: "Every metric tracked. Every performance quantified using our proprietary data engine.",
              },
              {
                icon: <FaUsers />,
                color: "green",
                title: "Unified Network",
                desc: "Seamless communication between athletes, agents, and sponsors in real-time.",
              },
              {
                icon: <FaFutbol />,
                color: "red",
                title: "Global Reach",
                desc: "Specialized recruitment for soccer and cricket across all major international leagues.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group relative rounded-[2.5rem] border border-slate-200 bg-white p-10 transition-all duration-500 hover:-translate-y-2 hover:border-primaryColor/20 hover:shadow-2xl"
              >
                <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-900 text-white shadow-xl transition-all duration-500 group-hover:bg-primaryColor group-hover:scale-110">
                  <span className="text-3xl">{item.icon}</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 leading-tight">
                  {item.title}
                </h3>
                <p className="mt-4 text-slate-500 font-medium leading-relaxed">
                  {item.desc}
                </p>
                <div className="mt-8 flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-400 group-hover:text-primaryColor transition-colors">
                  Read Protocol <FaChevronRight className="text-[8px]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== Featured Opportunities (Offers) ======== */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-primaryColor">
                Global Access
              </span>
              <h2 className="mt-4 text-4xl font-[1000] tracking-tight text-slate-900 md:text-5xl">
                Tailored Scouting{" "}
                <span className="text-primaryColor">Modules.</span>
              </h2>
            </div>
            <Link
              to="/services"
              className="text-sm font-black uppercase tracking-widest text-slate-400 hover:text-primaryColor transition-colors flex items-center gap-2"
            >
              View All Modules <FaChevronRight className="text-[10px]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                img: offer1,
                title: "Elite Recruitment",
                desc: "Access the top 1% of emerging global talent.",
              },
              {
                img: offer,
                title: "Data Dashboard",
                desc: "Real-time statistics and historical performance tracking.",
              },
              {
                img: offer2,
                title: "24/7 Priority",
                desc: "Global support and immediate contract facilitation.",
              },
            ].map((offer, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-[3rem] bg-slate-900 h-[450px]"
              >
                <img
                  src={offer.img}
                  alt={offer.title}
                  className="h-full w-full object-cover opacity-50 transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-10 left-10 right-10">
                  <h3 className="text-2xl font-black text-white">
                    {offer.title}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-slate-400 leading-relaxed">
                    {offer.desc}
                  </p>
                  <div className="mt-6 flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-900 transition-all duration-500 group-hover:w-32 group-hover:bg-primaryColor group-hover:text-white">
                    <span className="hidden group-hover:block text-[11px] font-black uppercase tracking-widest ml-4">
                      Explore
                    </span>
                    <FaChevronRight className="text-[10px] ml-auto mr-5 group-hover:mr-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== About Section Redesigned ======== */}
      <About />

      {/* ======== Insights & FAQs ======== */}
      <section className="py-32 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-primaryColor/5 blur-[120px]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row gap-20">
            <div className="flex-1">
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-primaryColor">
                Support Protocol
              </span>
              <h2 className="mt-6 text-4xl font-[1000] tracking-tight text-white md:text-5xl leading-tight">
                Frequently Asked <br />
                <span className="text-primaryColor italic">Questions.</span>
              </h2>
              <div className="mt-12">
                <FaqList />
              </div>
            </div>

            <div className="flex-1 hidden lg:block">
              <div className="relative h-full min-h-[600px] rounded-[3rem] overflow-hidden border border-white/10">
                <img
                  src={faqImg}
                  alt="FAQ"
                  className="h-full w-full object-cover opacity-40 mix-blend-luminosity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                <div className="absolute bottom-12 left-12 right-12 p-8 rounded-[2rem] bg-white/5 backdrop-blur-xl border border-white/10">
                  <p className="text-xl font-bold text-white leading-relaxed">
                    "Pro-Pulse transformed how we scout talent. The data
                    precision is unmatched in the industry."
                  </p>
                  <div className="mt-6 flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primaryColor" />
                    <div>
                      <p className="text-sm font-black text-white">
                        James Wilson
                      </p>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        Global Scout, FIFA
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======== Final CTA: High Impact ======== */}
      <section className="relative py-40 overflow-hidden bg-slate-900">
        <div className="absolute inset-0">
          <img
            src={Contactimg}
            alt="CTA"
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-transparent to-slate-900" />
        </div>

        <div className="container relative z-10 mx-auto px-4 text-center">
          <h2 className="text-5xl font-[1000] tracking-tight text-white md:text-7xl">
            Ready to <span className="text-primaryColor">Ascend?</span>
          </h2>
          <p className="mt-8 text-xl font-medium text-slate-400 max-w-2xl mx-auto">
            Join the elite network of players and sponsors today. The future of
            sports recruitment starts here.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/contact">
              <button className="h-16 px-12 rounded-full bg-white text-slate-900 text-sm font-black uppercase tracking-widest transition-all hover:bg-primaryColor hover:text-white hover:scale-105">
                Contact Strategy Team
              </button>
            </Link>
            <Link to="/signup">
              <button className="h-16 px-12 rounded-full border border-white/20 bg-white/5 text-white text-sm font-black uppercase tracking-widest backdrop-blur-md transition-all hover:bg-white/10">
                Create Account
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Scroll-to-Top Button */}
      {isVisible && (
        <div
          className="fixed bottom-8 right-8 h-14 w-14 flex items-center justify-center bg-primaryColor text-white rounded-full shadow-2xl cursor-pointer hover:bg-red-700 transition-all duration-300 z-50 animate-bounce"
          onClick={scrollToTop}
        >
          <FaArrowUp className="text-lg" />
        </div>
      )}
    </div>
  );
};

export default Home;
