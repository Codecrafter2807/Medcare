import React from "react";
import convertTime from "../../utils/convertTime";
import { BASE_URL, token } from "./../../config";
import { toast } from "react-toastify";

const SidePanal = ({ doctorId, charges, timeSlots }) => {
  const bookingHandler = async () => {
    try {
      const res = await fetch(
        `${BASE_URL}/bookings/checkout-session/${doctorId}`,
        {
          method: "post",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message + ", Please try again");
      }
      if (data.session.url) {
        window.location.href = data.session.url;
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <div className="glass-card p-6 lg:p-8 space-y-8 bg-white/90">
      <div className="flex items-center justify-between border-b border-gray-100 pb-6">
        <p className="text-gray-500 font-bold uppercase tracking-wider text-xs">Visiting Charges</p>
        <span className="text-3xl font-black text-darkColor tracking-tight">
          &#8377;{charges}
        </span>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-6 bg-primaryColor rounded-full"></div>
          <p className="text-lg font-bold text-darkColor tracking-tight">
            Available Time Slots
          </p>
        </div>

        <ul className="space-y-4">
          {timeSlots?.map((item, index) => (
            <li key={index} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50/50 border border-gray-100 hover:border-primaryColor/20 transition-all group">
              <p className="text-[15px] text-gray-600 font-bold group-hover:text-primaryColor transition-colors">
                {item.day.charAt(0).toUpperCase() + item.day.slice(1)}
              </p>
              <p className="text-[14px] text-gray-500 font-bold bg-white px-3 py-1 rounded-lg border border-gray-100 shadow-sm">
                {convertTime(item.startingTime)} - {convertTime(item.endingTime)}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <button 
        onClick={bookingHandler} 
        className="btn w-full !py-4 shadow-xl shadow-primaryColor/20 hover:shadow-2xl hover:shadow-primaryColor/30 transition-all duration-500"
      >
        Book Appointment
      </button>
      
      <p className="text-center text-xs font-medium text-gray-400">
        Secure checkout powered by Stripe
      </p>
    </div>
  );
};

export default SidePanal;
