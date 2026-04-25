import React from "react";
import { formateDate } from "../../utils/formateDate";

const DoctorAbout = ({ name, about, qualifications, experiences }) => {
  return (
    <div>
      <div>
        <h3 className="text-[20px] leading-[30px] text-darkColor font-semibold flex items-center gap-2 px-2">
          About of
          <span className="text-blueColor font-bold text-[24px] leading-9">
            {name}
          </span>
        </h3>
        <p className="textPara text-justify">{about}</p>
      </div>

      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-darkColor font-semibold flex items-center gap-2 px-2">
          Educations
        </h3>

        <ul className="pt-4 md:p-5">
          {qualifications?.map((item, index) => (
            <li
              key={index}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]"
            >
              <div className="">
                <span className="text-blueColor text-[15px] leading-6 font-semibold">
                  {formateDate(item.startingDate)} -{" "}
                  {formateDate(item.endingDate)}
                </span>
                <p className="text-[16px] leading-6 font-medium  text-gray-700">
                  {item.degree}
                </p>
              </div>
              <p className="text-[16px] leading-6 font-medium  text-gray-700">
                {item.university}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-darkColor font-semibold flex items-center gap-2 px-1">
          Expirience
        </h3>

        <ul className="grid md:grid-cols-2 sm:grid-col-2 gap-[30px] pt-4 md:p-5">
          {experiences?.map((item, index) => (
            <li key={index} className="px-3 py-4 rounded bg-[#e8d5a9]">
              <span className="text-[#b8ae41] text-[20px] leading-6 font-semibold">
                {formateDate(item.startingDate)} -{" "}
                {formateDate(item.endingDate)}
              </span>
              <p className="text-[16px] leading-6 font-medium  text-gray-700">
                {item.position}
              </p>
              <p className="text-[14px] leading-6 font-medium  text-gray-700">
                {item.hospital}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DoctorAbout;
