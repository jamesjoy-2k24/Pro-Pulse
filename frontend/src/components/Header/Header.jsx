import { Fragment, useRef, useEffect, useState, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { authContext } from "../../context/authContext.jsx";
import logo from "/logo.png";

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/services",
    display: "Services",
  },
  {
    path: "/contact",
    display: "Contact",
  },
  {
    path: "/players",
    display: "Find Players",
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, role, token } = useContext(authContext);

  const { name, photo } = user || {};

  useEffect(() => {
    const handleStickyHeader = () => {
      const currentHeader = headerRef.current;

      if (!currentHeader) return;

      if (
        document.body.scrollTop > 40 ||
        document.documentElement.scrollTop > 40
      ) {
        currentHeader.classList.add("sticky__header");
      } else {
        currentHeader.classList.remove("sticky__header");
      }
    };

    window.addEventListener("scroll", handleStickyHeader);

    return () => {
      window.removeEventListener("scroll", handleStickyHeader);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const profilePath =
    role === "player"
      ? "/players/profile/me/"
      : role === "admin"
        ? "/admin/dashboard"
        : "/users/profile/me";

  return (
    <Fragment>
      {menuOpen && (
        <button
          type="button"
          aria-label="Close menu overlay"
          className="fixed inset-0 z-40 md:hidden"
          onClick={closeMenu}
        />
      )}

      <header
        className={`flex w-full items-center border-b border-slate-200/80 bg-white/95 backdrop-blur-md transition-all duration-300 ${
          menuOpen
            ? "-translate-y-full opacity-0 pointer-events-none transition-all duration-300"
            : "translate-y-0 opacity-100 transition-all duration-300"
        }`}
        ref={headerRef}
      >
        <div className="container">
          <div className="relative flex min-h-[76px] items-center justify-between gap-4">
            {/* ======Nav Left===== */}
            <div className="logo shrink-0">
              <Link
                to="/home"
                className="flex items-center gap-3 transition-all duration-300 hover:opacity-90"
              >
                <img
                  src={logo}
                  alt="Pro-Pulse Logo"
                  className="h-[42px] w-[42px] rounded-full object-contain ring-1 ring-slate-200"
                />
                <div className="flex flex-col gap-1 leading-none">
                  <span className="text-[22px] text-red-700 font-[800] tracking-tight">
                    Pro-Pulse
                  </span>
                  <span className="hidden text-[10px] font-[700] uppercase tracking-[0.22em] text-slate-400 sm:block">
                    Sports Hiring
                  </span>
                </div>
              </Link>
            </div>

            {/* ======Nav Center===== */}
            <div className="hidden md:block">
              <ul className="flex items-center gap-6 rounded-full border border-slate-200 bg-white/80 px-2 py-3 shadow-sm shadow-slate-200/60">
                {navLinks.map((link, index) => (
                  <li key={index}>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        isActive
                          ? "rounded-full bg-slate-900 px-4 py-2 text-[14px] font-[700] text-white"
                          : "rounded-full px-4 py-2 text-[14px] font-[600] text-slate-600 transition-all duration-300 hover:bg-slate-100 hover:text-slate-900"
                      }
                    >
                      {link.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* ======Nav Right===== */}
            <div className="flex items-center gap-3">
              {token && user ? (
                <Link
                  to={profilePath}
                  className="hidden items-center gap-3 rounded-full border border-slate-200 bg-white px-2 py-1 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md md:flex"
                >
                  <figure className="h-[40px] w-[40px] overflow-hidden rounded-full ring-1 ring-slate-200">
                    <img
                      src={photo || logo}
                      alt="User Avatar"
                      className="h-full w-full object-cover"
                    />
                  </figure>
                  <div className="pr-2">
                    <p className="max-w-[130px] truncate text-[14px] font-[700] text-slate-900">
                      {name}
                    </p>
                    <p className="text-[11px] font-[600] uppercase tracking-[0.14em] text-slate-400">
                      {role}
                    </p>
                  </div>
                </Link>
              ) : (
                <Link to="/login" className="hidden md:block">
                  <button className="rounded-full bg-slate-900 px-5 py-2.5 text-[14px] font-[700] text-white transition-all duration-300 hover:bg-slate-800">
                    Login
                  </button>
                </Link>
              )}

              {token && user && (
                <Link
                  to={profilePath}
                  className="md:hidden"
                  onClick={closeMenu}
                >
                  <figure className="h-[40px] w-[40px] overflow-hidden rounded-full ring-1 ring-slate-200">
                    <img
                      src={photo || logo}
                      alt="User Avatar"
                      className="h-full w-full object-cover"
                    />
                  </figure>
                </Link>
              )}

              <button
                type="button"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-all duration-300 hover:border-slate-300 hover:text-slate-900 md:hidden"
                onClick={toggleMenu}
              >
                {menuOpen ? (
                  <AiOutlineClose className="text-[20px]" />
                ) : (
                  <BiMenu className="text-[24px]" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <aside
        className={`fixed right-0 top-0 z-50 h-screen w-[320px] max-w-[88vw] border-l border-slate-200 bg-white shadow-2xl transition-transform duration-300 md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-5">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="Pro-Pulse Logo"
                className="h-[38px] w-[38px] rounded-full object-contain ring-1 ring-slate-200"
              />
              <div>
                <p className="text-[18px] font-[800] tracking-tight text-slate-900">
                  Pro-Pulse
                </p>
                <p className="text-[10px] font-[700] uppercase tracking-[0.18em] text-slate-400">
                  Navigation
                </p>
              </div>
            </div>

            <button
              type="button"
              aria-label="Close mobile menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition-all duration-300 hover:border-slate-300 hover:text-slate-900"
              onClick={closeMenu}
            >
              <AiOutlineClose className="text-[18px]" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-6">
            {token && user ? (
              <Link
                to={profilePath}
                onClick={closeMenu}
                className="mb-6 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3"
              >
                <figure className="h-[48px] w-[48px] overflow-hidden rounded-full ring-1 ring-slate-200">
                  <img
                    src={photo || logo}
                    alt="User Avatar"
                    className="h-full w-full object-cover"
                  />
                </figure>
                <div className="min-w-0">
                  <p className="truncate text-[15px] font-[700] text-slate-900">
                    {name}
                  </p>
                  <p className="text-[11px] font-[700] uppercase tracking-[0.16em] text-slate-400">
                    {role}
                  </p>
                </div>
              </Link>
            ) : (
              <Link to="/login" onClick={closeMenu} className="mb-6 block">
                <button className="w-full rounded-xl bg-slate-900 px-4 py-3 text-[14px] font-[700] text-white transition-all duration-300 hover:bg-slate-800">
                  Login
                </button>
              </Link>
            )}

            <nav>
              <ul className="space-y-1">
                {navLinks.map((link, index) => (
                  <li key={index}>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center rounded-xl bg-slate-900 px-4 py-3 text-[15px] font-[700] text-white"
                          : "flex items-center rounded-xl px-4 py-3 text-[15px] font-[600] text-slate-600 transition-all duration-300 hover:bg-slate-100 hover:text-slate-900"
                      }
                      onClick={closeMenu}
                    >
                      {link.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </aside>
    </Fragment>
  );
};

export default Header;
