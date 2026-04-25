import React, { useEffect, useState } from "react";
import DoctorCard from "../../components/Doctors/DoctorCard";
import Testomonial from "../../components/Testomonial/Testomonial";
// import { doctors } from "./../../assets/data/doctors";
import { BASE_URL } from "./../../config";
import useFatchData from "./../../hooks/useFatchData";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";

const Doctors = () => {
  const [query, setQuery] = useState("");
  const [debounceQuery, setDebounceQuery] = useState('')

  const handleSearch = () => {
    setQuery(query.trim());
    console.log("handle search");
  };

  useEffect(()=>{


    const timeout = setTimeout(()=>{
      setDebounceQuery(query)
    },700)

    return ()=> clearTimeout(timeout)

  },[query])

  const {
    data: doctor,
    loading,
    error,
  } = useFatchData(`${BASE_URL}/doctors?query=${debounceQuery}`);

  return (
    <>
      <section className="bg-[#ffeec3]">
        <div className="container text-center">
          <h2 className="heading">Find a Doctor</h2>
          <form>
            <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
              <input
                type="search"
                className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-gray-600 "
                placeholder="Search doctor by name or specification"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button
                className="btn mt-0 rounded-[0px] rounded-r-md"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      <section>
        <div className="container">
          {loading && <Loading />}
          {error && <Error />}
          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5  mt-[30px] lg:mt-[40px] lg:grid-cols-4">
              {doctor.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section>
        <div className="container">
          <div className="lg:w-[480px] mx-auto">
            <h2 className="heading text-center">What our patient say</h2>
          </div>
          <Testomonial />
        </div>
      </section>
    </>
  );
};

export default Doctors;
