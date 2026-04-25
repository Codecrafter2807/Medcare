import React from "react";
import starIcon from "../../assets/images/star-icon-32.png";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

const DoctorCard = ({ doctor }) => {
  const { name, avgRating, totalRating, photo, specialization, experiences } =
    doctor;

  return (
    <div className="glass-card hover-card p-4 h-full flex flex-col">
      <div className="relative group overflow-hidden rounded-2xl">
        <img src={photo} className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-110" alt={name} />
        <div className="absolute top-4 left-4">
           <span className="bg-white/90 backdrop-blur-sm text-primaryColor py-1.5 px-4 text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm">
            {specialization}
          </span>
        </div>
      </div>

      <div className="flex-grow">
        <div className="mt-6 flex items-center justify-between">
          <h3 className="text-xl font-bold text-darkColor group-hover:text-primaryColor transition-colors duration-300">
            {name}
          </h3>
          <div className="flex items-center gap-1.5 bg-yellow-50 px-2 py-1 rounded-lg">
            <img src={starIcon} className="w-4 h-4" alt="rating" />
            <span className="text-sm font-bold text-yellow-700">{avgRating}</span>
            <span className="text-xs text-yellow-600/60 font-medium">({totalRating})</span>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3">
           <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-primaryColor">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
           </div>
           <p className="text-sm font-medium text-gray-500 line-clamp-1">
             {experiences?.[0]?.hospital || "Punjab Medical Hospital"}
           </p>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
        <Link 
          to={`/doctors/${doctor._id}`}
          className="text-primaryColor font-bold text-sm hover:underline"
        >
          View Profile
        </Link>
        <Link
          to={`/doctors/${doctor._id}`}
          className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group hover:bg-primaryColor transition-all duration-300"
        >
          <BsArrowRight className="text-darkColor group-hover:text-white w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default DoctorCard;
