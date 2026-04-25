import React from "react";
import { Link } from "react-router-dom";
import { RiLinkedinFill } from "react-icons/ri";
import { AiFillYoutube, AiFillGithub, AiFillInstagram } from "react-icons/ai";

const socialLinks = [
  {
    path: "#",
    icon: <AiFillYoutube className="w-5 h-5" />,
  },
  {
    path: "#",
    icon: <AiFillGithub className="w-5 h-5" />,
  },
  {
    path: "https://www.instagram.com/_harshjain_786/",
    icon: <AiFillInstagram className="w-5 h-5" />,
  },
  {
    path: "#",
    icon: <RiLinkedinFill className="w-5 h-5" />,
  },
];

const quickLinks01 = [
  { path: "/home", display: "Home" },
  { path: "/services", display: "About us" },
  { path: "/services", display: "Services" },
  { path: "/", display: "Blog" },
];

const quickLinks02 = [
  { path: "/doctors", display: "Find a Doctor" },
  { path: "/", display: "Request Appointment" },
  { path: "/", display: "Find a Location" },
  { path: "/", display: "Get an Opinion" },
];

const quickLinks03 = [
  { path: "/", display: "Donate" },
  { path: "/contact", display: "Contact us" },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-darkColor text-white pt-24 pb-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-8">
            <Link to="/home" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primaryColor rounded-xl flex items-center justify-center shadow-lg shadow-primaryColor/20 text-white font-black text-xl">
                +
              </div>
              <span className="text-2xl font-extrabold tracking-tight">
                Health<span className="text-primaryColor">Care</span>
              </span>
            </Link>
            <p className="text-gray-400 text-base leading-relaxed">
              Transforming healthcare with AI-powered solutions. Making quality medical care accessible, affordable, and dependable across the nation.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((link, index) => (
                <Link
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 hover:bg-primaryColor hover:border-primaryColor hover:-translate-y-1 group"
                  to={link.path}
                  key={index}
                >
                  <span className="group-hover:text-white text-gray-400 transition-colors">
                    {link.icon}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-8 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-primaryColor rounded-full"></span>
            </h3>
            <ul className="space-y-4">
              {quickLinks01.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-primaryColor transition-all"></span>
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-8 relative inline-block">
              I want to:
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-primaryColor rounded-full"></span>
            </h3>
            <ul className="space-y-4">
              {quickLinks02.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-primaryColor transition-all"></span>
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-8 relative inline-block">
              Support
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-primaryColor rounded-full"></span>
            </h3>
            <ul className="space-y-4">
              {quickLinks03.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-primaryColor transition-all"></span>
                    {item.display}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {year} HealthCare. All rights reserved.</p>
          <p>Developed with ❤️ by Harsh Jain</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
