import React from "react";
// import {Pagination} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import patientAvtar from "../../assets/images/patient-avatar.png";
import { HiStar } from "react-icons/hi";

const Testomonial = () => {
  return (
    <div className="mt-[30px] lg:mt-[55px]">
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      >
        <SwiperSlide>
          <div className="py-[20px] px-4 rounded-3 ">
            <div className="flex items-center gap-[4px]">
              <img className="h-12 w-12 rounded-full" src={patientAvtar} alt="" />
              <div>
                <h4 className="text-[18px] leading-[30px] font-semibold text-darkColor">
                  Sarah Johnson
                </h4>
                <div className="flex items-center gap-[2px]">
                  <HiStar className="text-yellowColor w-[18px] h-5 " />
                  <HiStar className="text-yellowColor w-[18px] h-5 " />
                  <HiStar className="text-yellowColor w-[18px] h-5 " />
                  <HiStar className="text-yellowColor w-[18px] h-5 " />
                  <HiStar className="text-yellowColor w-[18px] h-5 " />
                </div>
              </div>
            </div>
            <p className="text-[16px] leading-7 mt-1 text-gray-600 font-[500]">
              "The doctors here are incredibly attentive. They took the time to listen to all my concerns and provided an excellent treatment plan."
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="py-[20px] px-4 rounded-3 ">
            <div className="flex items-center gap-[4px]">
              <img className="h-12 w-12 rounded-full" src={patientAvtar} alt="" />
              <div>
                <h4 className="text-[18px] leading-[30px] font-semibold text-darkColor">
                  Michael Chen
                </h4>
                <div className="flex items-center gap-[2px]">
                  <HiStar className="text-yellowColor w-[18px] h-5 " />
                  <HiStar className="text-yellowColor w-[18px] h-5 " />
                  <HiStar className="text-yellowColor w-[18px] h-5 " />
                  <HiStar className="text-yellowColor w-[18px] h-5 " />
                  <HiStar className="text-yellowColor w-[18px] h-5 " />
                </div>
              </div>
            </div>
            <p className="text-[16px] leading-7 mt-1 text-gray-600 font-[500]">
              "Booking an appointment was so easy, and the consultation was very professional. Highly recommend this platform for anyone needing quick medical advice."
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="py-[20px] px-4 rounded-3 ">
            <div className="flex items-center gap-[4px]">
              <img className="h-12 w-12 rounded-full" src={patientAvtar} alt="" />
              <div>
                <h4 className="text-[18px] leading-[30px] font-semibold text-darkColor">
                  Emily Davis
                </h4>
                <div className="flex items-center gap-[2px]">
                  <HiStar className="text-yellowColor w-[18px] h-5 " />
                  <HiStar className="text-yellowColor w-[18px] h-5 " />
                  <HiStar className="text-yellowColor w-[18px] h-5 " />
                  <HiStar className="text-yellowColor w-[18px] h-5 " />
                  <HiStar className="text-yellowColor w-[18px] h-5 " />
                </div>
              </div>
            </div>
            <p className="text-[16px] leading-7 mt-1 text-gray-600 font-[500]">
              "I have been using Medcare for my family's routine checkups. The specialists are top-notch and always provide the best care possible."
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="py-[20px] px-4 rounded-3 ">
            <div className="flex items-center gap-[4px]">
              <img className="h-12 w-12 rounded-full" src={patientAvtar} alt="" />
              <div>
                <h4 className="text-[18px] leading-[30px] font-semibold text-darkColor">
                  James Wilson
                </h4>
                <div className="flex items-center gap-[2px]">
                  <HiStar className="text-yellowColor w-[18px] h-5 " />
                  <HiStar className="text-yellowColor w-[18px] h-5 " />
                  <HiStar className="text-yellowColor w-[18px] h-5 " />
                  <HiStar className="text-yellowColor w-[18px] h-5 " />
                  <HiStar className="text-gray-300 w-[18px] h-5 " />
                </div>
              </div>
            </div>
            <p className="text-[16px] leading-7 mt-1 text-gray-600 font-[500]">
              "Very smooth experience overall. The doctor was knowledgeable and prescribed exactly what I needed to recover quickly."
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Testomonial;
