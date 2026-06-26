import aboutImg from "../../assets/images/about.jpg";
import { Link } from "react-router-dom";
import { FaShieldAlt, FaRocket, FaHandshake, FaChevronRight } from "react-icons/fa";

const About = () => {
  return (
    <section className="py-32 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          
          {/* ======= Visual Side ======= */}
          <div className="relative w-full lg:w-1/2 group">
            <div className="absolute -inset-4 rounded-[3rem] bg-gradient-to-tr from-primaryColor/20 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative overflow-hidden rounded-[3rem] border border-slate-200 bg-white p-4 shadow-2xl transition-all duration-700 group-hover:border-primaryColor/20 group-hover:shadow-primaryColor/10">
              <img 
                src={aboutImg} 
                alt="Elite Partnership" 
                className="rounded-[2.5rem] w-full object-cover transition-transform duration-1000 group-hover:scale-105" 
              />
              
              {/* Floating Achievement Badge */}
              <div className="absolute bottom-10 right-10 rounded-2xl bg-slate-900/90 p-6 text-white backdrop-blur-xl border border-white/10 shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primaryColor">
                    <FaShieldAlt className="text-xl" />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400">Industry Status</p>
                    <p className="text-lg font-black">Verified Elite</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ======= Content Side ======= */}
          <div className="w-full lg:w-1/2">
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-primaryColor">Our Philosophy</span>
            <h2 className="mt-6 text-4xl font-[1000] tracking-tight text-slate-900 md:text-6xl leading-[1.1]">
              Pioneering the <br />
              <span className="text-primaryColor italic">Next Frontier.</span>
            </h2>
            
            <p className="mt-8 text-lg font-medium leading-relaxed text-slate-500">
              Pro-Pulse is more than a platform—it's an elite ecosystem engineered to bridge the gap 
              between untapped athletic potential and global sponsorship opportunities.
            </p>

            <div className="mt-12 space-y-8">
              {[
                {
                  icon: <FaRocket />,
                  title: "Acceleration Engine",
                  desc: "Propelling athletes into the global spotlight through data-driven performance metrics."
                },
                {
                  icon: <FaHandshake />,
                  title: "Elite Synergy",
                  desc: "Facilitating high-value partnerships between world-class sponsors and rising champions."
                }
              ].map((item, index) => (
                <div key={index} className="flex gap-6 group">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-900 transition-all duration-500 group-hover:bg-primaryColor group-hover:text-white">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900">{item.title}</h3>
                    <p className="mt-1 text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16">
              <Link to="/services" className="group/btn relative inline-flex items-center justify-center">
                <div className="flex h-16 items-center justify-center rounded-full bg-slate-900 px-10 text-white shadow-xl shadow-slate-900/20 transition-all duration-500 hover:w-56 group-hover:bg-primaryColor group-hover:shadow-primaryColor/40">
                  <div className="absolute flex items-center gap-3 overflow-hidden whitespace-nowrap px-8 opacity-0 transition-all duration-300 group-hover/btn:opacity-100">
                    <span className="text-sm font-black uppercase tracking-widest">Our Protocols</span>
                    <FaChevronRight className="text-xs" />
                  </div>
                  <span className="text-sm font-black uppercase tracking-widest transition-all duration-300 group-hover/btn:opacity-0">Learn More</span>
                </div>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
