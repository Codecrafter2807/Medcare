import React, { useState } from "react";
import starIcon from "../../assets/images/star-icon-32.png";
import DoctorAbout from "./DoctorAbout";
import Feedback from "./Feedback";
import SidePanal from "./SidePanal";
import { BASE_URL } from "./../../config";
import useFatchData from "./../../hooks/useFatchData";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
import { useParams } from "react-router-dom";

const DoctorsDetails = () => {
  const [tab, setTab] = useState("about");
  const { id } = useParams();
  const {
    data: doctor,
    loading,
    error,
  } = useFatchData(`${BASE_URL}/doctors/${id}`);

  const {
    name,
    qualifications,
    experiences,
    timeSlots,
    reviews,
    bio,
    about,
    averageRating,
    totalRating,
    specialization,
    charges,
    photo,
  } = doctor;

  return (
    <section className="bg-gray-50/50 py-16">
      <div className="container">
        {loading && <Loading />}
        {error && <Error />}

        {!loading && !error && (
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-10">
              <div className="glass-card p-8 flex flex-col md:flex-row items-center gap-10">
                <div className="relative group">
                  <div className="w-56 h-64 rounded-3xl overflow-hidden border-4 border-white shadow-xl">
                    <img src={photo} className="w-full h-full object-cover" alt={name} />
                  </div>
                </div>

                <div className="flex-1 space-y-4 text-center md:text-left">
                  <span className="bg-primaryColor/10 text-primaryColor py-2 px-6 rounded-xl text-sm font-bold uppercase tracking-wider">
                    {specialization}
                  </span>
                  <h2 className="text-3xl font-bold text-darkColor tracking-tight">
                    {name}
                  </h2>
                  <div className="flex items-center justify-center md:justify-start gap-6">
                    <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-xl">
                      <img src={starIcon} className="w-4 h-4" alt="rating" />
                      <span className="text-lg font-bold text-yellow-700">{averageRating}</span>
                      <span className="text-sm text-yellow-600/60 font-medium">({totalRating})</span>
                    </div>
                  </div>
                  <p className="text-gray-500 text-lg leading-relaxed max-w-xl">
                    {bio || "Dedicated healthcare professional providing expert medical services."}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-gray-100 w-fit">
                <button
                  onClick={() => setTab("about")}
                  className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
                    tab === "about"
                      ? "bg-primaryColor text-white shadow-xl shadow-primaryColor/20"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  About
                </button>
                <button
                  onClick={() => setTab("feedback")}
                  className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
                    tab === "feedback"
                      ? "bg-primaryColor text-white shadow-xl shadow-primaryColor/20"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  Feedback
                </button>
              </div>

              <div className="animate-fade-in glass-card p-8 lg:p-12 bg-white">
                {tab === "about" && (
                  <DoctorAbout
                    name={name}
                    about={about}
                    qualifications={qualifications}
                    experiences={experiences}
                  />
                )}
                {tab === "feedback" && (
                  <Feedback reviews={reviews} totalRating={totalRating} />
                )}
              </div>
            </div>

            <div className="md:col-span-1">
              <div className="sticky top-24">
                <SidePanal
                  doctorId={doctor._id}
                  charges={charges}
                  timeSlots={timeSlots}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DoctorsDetails;
