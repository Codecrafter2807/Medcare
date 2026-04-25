import React from "react";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

const ServicesCard = ({ item, index }) => {
  const { name, desc, bgColor, textColor } = item;

  return (
    <div className="glass-card hover-card p-8 h-full flex flex-col bg-white">
      <div className="flex items-center justify-between mb-6">
        <span 
          className="w-12 h-12 flex items-center justify-center text-lg font-bold rounded-2xl shadow-sm" 
          style={{ background: bgColor, color: textColor }}
        >
          {index + 1}
        </span>
        <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-primaryColor">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
           </svg>
        </div>
      </div>

      <div className="flex-grow">
        <h3 className="text-2xl font-bold text-darkColor mb-4 group-hover:text-primaryColor transition-colors duration-300">
          {name}
        </h3>
        <p className="text-gray-500 leading-relaxed">
          {desc}
        </p>
      </div>

      <div className="mt-10 flex items-center justify-between">
        <Link
          to={`/doctors?query=${encodeURIComponent(name)}`}
          className="flex items-center gap-2 text-primaryColor font-bold text-sm group/link hover:underline"
        >
          Learn More
          <BsArrowRight className="transition-transform duration-300 group-hover/link:translate-x-1" />
        </Link>
        <Link
          to={`/doctors?query=${encodeURIComponent(name)}`}
          className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group/btn hover:bg-primaryColor transition-all duration-300"
        >
          <BsArrowRight className="text-darkColor group-hover/btn:text-white w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default ServicesCard;
