import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiCpu } from "react-icons/fi";
import { authContext } from "../../context/AuthContext";

const FloatingChatIcon = () => {
  const { token } = useContext(authContext);
  const location = useLocation();

  // Don't show on login and register pages
  const hidePaths = ["/login", "/signup"];
  const shouldHide = hidePaths.includes(location.pathname);

  // Only show if user is logged in and not on restricted pages
  if (!token || shouldHide) return null;

  return (
    <Link
      to="/symptom-checker"
      className="fixed bottom-8 right-8 z-[999] group"
    >
      <div className="relative">
        {/* Tooltip */}
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-darkColor text-white text-sm font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap shadow-xl">
          Try AI Symptom Checker
          <div className="absolute top-1/2 -right-1 -translate-y-1/2 border-8 border-transparent border-l-darkColor"></div>
        </div>

        {/* Pulse effect */}
        <div className="absolute inset-0 rounded-full bg-primaryColor animate-ping opacity-25"></div>
        
        {/* Main Icon */}
        <div className="relative w-16 h-16 rounded-full bg-primaryColor text-white flex items-center justify-center shadow-2xl shadow-primaryColor/40 hover:scale-110 transition-all duration-300">
          <FiCpu className="w-8 h-8" />
          
          {/* Notification dot */}
          <div className="absolute top-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
        </div>
      </div>
    </Link>
  );
};

export default FloatingChatIcon;
