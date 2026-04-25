import { useEffect, useRef, useContext, useState } from "react";
// import userImg from "../../assets/images/images.png";
import { NavLink, Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { authContext } from "../../context/AuthContext";

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/doctors",
    display: "Consult a Doctor",
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
    path: "/symptom-checker",
    display: "Symptom Checker",
  },
];
const Header = () => {
  const headerRef = useRef(null);
  const { user, role, token } = useContext(authContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const stickyHeader = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky_header");
      } else {
        headerRef.current.classList.remove("sticky_header");
      }
    });
  };

  useEffect(() => {
    stickyHeader();
    return () => window.removeEventListener("scroll", stickyHeader);
  });

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      {/* Placeholder to prevent layout shift when header becomes fixed */}
      <div style={{ height: '80px' }}>
        <header
          className="w-full header flex items-center bg-white/50 backdrop-blur-sm z-[999] transition-all duration-300 border-b border-gray-100"
          ref={headerRef}
          style={{ height: '80px' }}
        >
          <div className="container flex items-center justify-between">
            <Link to="/home" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primaryColor rounded-xl flex items-center justify-center shadow-lg shadow-primaryColor/20 text-white font-black text-xl">
                +
              </div>
              <span className="text-[22px] font-bold tracking-tight text-darkColor">
                Health<span className="text-primaryColor">Care</span>
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <ul className="flex items-center gap-10">
                {navLinks.map((link, index) => (
                  <li key={index} className="relative group">
                    <NavLink
                      to={link.path}
                      className={(navClass) =>
                        `text-[15px] font-semibold transition-all duration-300 ${
                          navClass.isActive
                            ? "text-primaryColor"
                            : "text-gray-500 hover:text-primaryColor"
                        }`
                      }
                    >
                      {link.display}
                      <span className={`absolute -bottom-1 left-0 h-0.5 bg-primaryColor transition-all duration-300 rounded-full w-0 group-hover:w-full`}></span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-4 md:gap-6">
              {token && user ? (
                <Link to={`${role === 'doctor' ? '/doctors/profile/me' : '/users/profile/me'}`} className="group block">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl overflow-hidden border-2 border-primaryColor/20 group-hover:border-primaryColor transition-all duration-300 shadow-sm">
                      <img className="w-full h-full object-cover" src={user?.photo} alt="" />
                    </div>
                    <div className="hidden lg:block">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Welcome back</p>
                      <p className="text-sm font-semibold text-darkColor">{user?.name?.split(' ')[0]}</p>
                    </div>
                  </div>
                </Link>
              ) : (
                <Link to="/login" className="flex items-center">
                  <button className="btn !m-0 !py-2 !px-6 md:!py-2.5 md:!px-8 shadow-md text-sm md:text-base">
                    Login
                  </button>
                </Link>
              )}

              <span className="md:hidden flex items-center justify-center p-1" onClick={toggleMenu}>
                <BiMenu className="w-8 h-8 text-darkColor cursor-pointer" />
              </span>
            </div>
          </div>
        </header>
      </div>

      {/* Mobile Menu Overlay - Outside Header to prevent backdrop-filter trap */}
      <div 
        className={`fixed inset-0 bg-black/50 z-[1000] md:hidden transition-opacity duration-300 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={toggleMenu}
      >
        <ul 
          className={`absolute right-0 top-0 w-64 h-full bg-white flex flex-col items-center pt-24 gap-8 shadow-2xl transform transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button for mobile menu */}
          <li className="absolute top-6 right-6 cursor-pointer" onClick={toggleMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500 hover:text-primaryColor" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </li>
          
          {navLinks.map((link, index) => (
            <li key={index}>
              <NavLink
                to={link.path}
                onClick={toggleMenu}
                className={(navClass) =>
                  `text-lg font-bold transition-all duration-300 ${
                    navClass.isActive
                      ? "text-primaryColor"
                      : "text-gray-700 hover:text-primaryColor"
                  }`
                }
              >
                {link.display}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Header;
