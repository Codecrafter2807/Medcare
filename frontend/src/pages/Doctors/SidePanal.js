import React, { useState } from "react";
import convertTime from "../../utils/convertTime";
import { BASE_URL, token } from "./../../config";
import { toast } from "react-toastify";

const SidePanal = ({ doctorId, charges, timeSlots }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);

  const bookingHandler = async () => {
    if (selectedSlot === null) {
      toast.error("Please select an appointment slot");
      return;
    }

    try {
      const slot = timeSlots[selectedSlot];
      const res = await fetch(
        `${BASE_URL}/bookings/checkout-session/${doctorId}`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            appointmentDate: slot.day.charAt(0).toUpperCase() + slot.day.slice(1),
            appointmentTime: `${convertTime(slot.startingTime)} - ${convertTime(slot.endingTime)}`
          })
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
        <p className="text-gray-500 font-semibold uppercase tracking-wider text-xs">Visiting Charges</p>
        <span className="text-2xl font-bold text-darkColor tracking-tight">
          &#8377;{charges}
        </span>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-6 bg-primaryColor rounded-full"></div>
          <p className="text-lg font-semibold text-darkColor tracking-tight">
            Available Time Slots
          </p>
        </div>

        <ul className="space-y-4">
          {timeSlots?.map((item, index) => (
            <li 
              key={index} 
              onClick={() => setSelectedSlot(index)}
              className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer group ${
                selectedSlot === index 
                ? "bg-primaryColor/5 border-primaryColor shadow-md" 
                : "bg-gray-50/50 border-gray-100 hover:border-primaryColor/30 hover:bg-white"
              }`}
            >
              <p className={`text-[15px] font-semibold transition-colors ${selectedSlot === index ? "text-primaryColor" : "text-gray-600 group-hover:text-primaryColor"}`}>
                {item.day.charAt(0).toUpperCase() + item.day.slice(1)}
              </p>
              <p className={`text-[14px] font-semibold px-3 py-1 rounded-lg border shadow-sm transition-colors ${
                selectedSlot === index ? "bg-primaryColor text-white border-primaryColor" : "bg-white text-gray-500 border-gray-100"
              }`}>
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
