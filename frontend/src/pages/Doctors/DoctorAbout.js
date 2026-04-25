import React from "react";
import { formateDate } from "../../utils/formateDate";

const DoctorAbout = ({ name, about, qualifications, experiences }) => {
  return (
    <div>
      <div>
        <h3 className="text-[22px] leading-[32px] text-darkColor font-bold flex items-center gap-2 mb-4">
          About
          <span className="text-primaryColor">
            {name}
          </span>
        </h3>
        <p className="textPara text-justify leading-7 text-gray-500">{about}</p>
      </div>

      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-darkColor font-bold mb-6">
          Education
        </h3>

        <ul className="grid gap-6">
          {qualifications?.map((item, index) => (
            <li
              key={index}
              className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                <div>
                  <span className="text-primaryColor text-[14px] font-bold bg-blue-50 px-3 py-1 rounded-full">
                    {formateDate(item.startingDate)} -{" "}
                    {formateDate(item.endingDate)}
                  </span>
                  <h4 className="text-[18px] font-bold text-darkColor mt-3">
                    {item.degree}
                  </h4>
                </div>
                <p className="text-[15px] font-medium text-gray-500 sm:text-right">
                  {item.university}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-darkColor font-bold mb-6">
          Experience
        </h3>

        <ul className="grid md:grid-cols-2 gap-6">
          {experiences?.map((item, index) => (
            <li key={index} className="p-6 rounded-2xl bg-[#f8faff] border border-blue-50 hover:border-primaryColor/20 transition-colors">
              <span className="text-primaryColor text-[14px] font-bold">
                {formateDate(item.startingDate)} -{" "}
                {formateDate(item.endingDate)}
              </span>
              <h4 className="text-[17px] font-bold text-darkColor mt-2">
                {item.position}
              </h4>
              <p className="text-[15px] font-medium text-gray-500 mt-1">
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
