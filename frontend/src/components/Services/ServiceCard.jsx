/* eslint-disable react/prop-types */
import { FaFootballBall, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const ServiceCard = ({ service }) => {
  return (
    <article className="group relative mx-auto w-full max-w-[420px] transition-all duration-500 hover:-translate-y-2">
      {/* Background Decorative Elements */}
      <div className="absolute -inset-0.5 rounded-[2.5rem] bg-gradient-to-br from-primaryColor/20 via-transparent to-slate-900/10 opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative flex h-full flex-col overflow-hidden rounded-[2.5rem] border border-slate-200/60 bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 group-hover:border-primaryColor/30 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
        {/* Animated Background Mesh */}
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-primaryColor/[0.03] blur-[100px] transition-all duration-700 group-hover:bg-primaryColor/[0.08]" />
        <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-slate-900/[0.02] blur-[100px] transition-all duration-700 group-hover:bg-primaryColor/[0.05]" />

        {/* Content Container */}
        <div className="relative z-10 flex flex-1 flex-col p-8 md:p-10">
          {/* Top Section: Icon & Badge */}
          <div className="flex items-start justify-between">
            <div className="relative flex h-16 w-16 items-center justify-center">
              {/* Outer ring animation */}
              <div className="absolute inset-0 animate-spin-slow rounded-2xl border border-dashed border-primaryColor/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 shadow-2xl shadow-slate-900/20 transition-all duration-500 group-hover:scale-110 group-hover:bg-primaryColor group-hover:shadow-primaryColor/30">
                <FaFootballBall className="h-7 w-7 text-white transition-transform duration-700 group-hover:rotate-[360deg]" />
              </div>
            </div>

            <div className="flex flex-col items-end">
              <span className="mb-1 rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 transition-colors duration-300 group-hover:bg-primaryColor/10 group-hover:text-primaryColor">
                Active Tier
              </span>
              <h2 className="text-2xl font-[900] tracking-tight text-slate-900">
                {service.name}
              </h2>
            </div>
          </div>

          {/* Description */}
          <div className="mt-8">
            <p className="line-clamp-3 text-[15px] leading-relaxed text-slate-500 transition-colors duration-300 group-hover:text-slate-700">
              {service.description}
            </p>
          </div>

          {/* Futuristic Data HUD */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            {/* Overall Rating */}
            <div className="relative overflow-hidden rounded-3xl border border-slate-100 bg-slate-50/50 p-5 transition-all duration-500 group-hover:border-primaryColor/10 group-hover:bg-white">
              <div className="relative z-10">
                <span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                  Performance
                </span>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-[1000] text-slate-900 tabular-nums">
                    {service.overall_rating}
                  </span>
                  <span className="text-[11px] font-black text-slate-300">
                    %
                  </span>
                </div>
                {/* Progress Mini-Bar */}
                <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full bg-slate-900 transition-all duration-1000 ease-out group-hover:bg-primaryColor"
                    style={{ width: `${service.overall_rating}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Potential Rating */}
            <div className="relative overflow-hidden rounded-3xl border border-slate-100 bg-slate-50/50 p-5 transition-all duration-500 group-hover:border-primaryColor/10 group-hover:bg-white">
              <div className="relative z-10">
                <span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                  Potential
                </span>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-[1000] text-primaryColor tabular-nums">
                    {service.potential_rating}
                  </span>
                  <span className="text-[11px] font-black text-primaryColor/30">
                    %
                  </span>
                </div>
                {/* Progress Mini-Bar */}
                <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full bg-primaryColor transition-all duration-1000 ease-out"
                    style={{ width: `${service.potential_rating}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer Action Area */}
          <div className="mt-auto pt-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-9 w-9 rounded-full border-[3px] border-white bg-slate-100 shadow-sm transition-transform duration-300 group-hover:scale-110"
                    style={{ zIndex: 4 - i }}
                  />
                ))}
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-slate-900">
                  120+ Active
                </span>
                <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                  Recruits
                </span>
              </div>
            </div>

            <Link
              to={`/players?category=${service.name}`}
              className="group/btn relative inline-flex items-center justify-center"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-white shadow-xl shadow-slate-900/20 transition-all duration-500 hover:w-36 group-hover:bg-primaryColor group-hover:shadow-primaryColor/40">
                <div className="absolute flex items-center gap-2 overflow-hidden whitespace-nowrap px-6 opacity-0 transition-all duration-300 group-hover/btn:opacity-100">
                  <span className="text-[13px] font-black uppercase tracking-widest">
                    Explore
                  </span>
                  <FaArrowRight className="text-xs" />
                </div>
                <FaArrowRight className="text-lg transition-all duration-300 group-hover/btn:opacity-0" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ServiceCard;
