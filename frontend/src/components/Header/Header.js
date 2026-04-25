import { useEffect, useRef, useContext } from "react";
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
];
const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const { user, role, token } = useContext(authContext);

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

  const toggleMenu = () => menuRef.current.classList.toggle("show_menu");

  return (
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
          <span className="text-2xl font-extrabold tracking-tight text-darkColor">
            Health<span className="text-primaryColor">Care</span>
          </span>
        </Link>

        <div className="hidden md:block" ref={menuRef} onClick={toggleMenu}>
          <ul className="flex items-center gap-10">
            {navLinks.map((link, index) => (
              <li key={index} className="relative group">
                <NavLink
                  to={link.path}
                  className={(navClass) =>
                    `text-base font-bold transition-all duration-300 ${
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

        <div className="flex items-center gap-6">
          {token && user ? (
            <Link to={`${role === 'doctor' ? '/doctors/profile/me' : '/users/profile/me'}`} className="group">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-primaryColor/20 group-hover:border-primaryColor transition-all duration-300 shadow-sm">
                  <img className="w-full h-full object-cover" src={user?.photo} alt="" />
                </div>
                <div className="hidden lg:block">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Welcome back</p>
                  <p className="text-sm font-bold text-darkColor">{user?.name?.split(' ')[0]}</p>
                </div>
              </div>
            </Link>
          ) : (
            <Link to="/login">
              <button className="btn !mt-0 !py-2.5 !px-8 shadow-md">
                Login
              </button>
            </Link>
          )}

          <span className="md:hidden" onClick={toggleMenu}>
            <BiMenu className="w-8 h-8 text-darkColor cursor-pointer" />
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
