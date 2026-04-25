import React from "react";
import DoctorCard from "./DoctorCard";
import { BASE_URL } from "./../../config";
import useFatchData from "./../../hooks/useFatchData";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";

const DoctorList = () => {

  const {data:doctor, loading, error} = useFatchData(`${BASE_URL}/doctors`)

  return (
    <>
    {loading && <Loading/>}
    {error && <Error/>}
      {!loading && !error &&  
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
        {doctor.map((doctor) => (
          <DoctorCard key={doctor._id} doctor={doctor} />
        ))}
      </div>
       } 
    </>
  );
};

export default DoctorList;
