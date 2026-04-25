import React, { useState } from "react";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
import useGetProfile from "../../hooks/useFatchData";
import { BASE_URL } from "../../config";
import Tabs from "./Tabs";
import starIcon from "../../assets/images/star-icon-32.png";
import DoctorAbout from "../../pages/Doctors/DoctorAbout";
import Profile from "./Profile";
import Appointments from "./Appointments";

const Dashboard = () => {
  const [tab, setTab] = useState("overview");
  const {
    data: docData,
    loading,
    error,
  } = useGetProfile(`${BASE_URL}/doctors/profile/me`);

  return (
    <section className="bg-gray-50/50 min-h-screen py-16">
      <div className="container">
        {loading && <Loading />}
        {error && <Error />}

        {!loading && !error && (
          <div className="grid lg:grid-cols-4 gap-12">
            <div className="lg:col-span-1">
              <Tabs tab={tab} setTab={setTab} />
            </div>

            <div className="lg:col-span-3">
              <div className="space-y-8">
                {tab === "overview" && (
                  <div className="space-y-10 animate-fade-in">
                    <div className="glass-card p-8 flex flex-col md:flex-row items-center gap-10">
                      <div className="relative group">
                        <div className="w-48 h-48 rounded-3xl overflow-hidden border-4 border-white shadow-xl">
                          <img src={docData.photo} className="w-full h-full object-cover" alt={docData.name} />
                        </div>
                        <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-green-500 rounded-2xl border-4 border-white flex items-center justify-center text-white shadow-lg">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                           </svg>
                        </div>
                      </div>

                      <div className="flex-1 space-y-4 text-center md:text-left">
                        <span className="bg-primaryColor/10 text-primaryColor py-2 px-6 rounded-xl text-sm font-bold uppercase tracking-wider">
                          {docData.specialization}
                        </span>
                        <h2 className="text-4xl font-extrabold text-darkColor tracking-tight">
                          {docData.name}
                        </h2>
                        <div className="flex items-center justify-center md:justify-start gap-6">
                          <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-xl">
                            <img src={starIcon} className="w-4 h-4" alt="rating" />
                            <span className="text-lg font-bold text-yellow-700">{docData.averageRating}</span>
                            <span className="text-sm text-yellow-600/60 font-medium">({docData.totalRating})</span>
                          </div>
                        </div>
                        <p className="text-gray-500 text-lg leading-relaxed max-w-xl italic">
                          "{docData?.bio || "Dedicated healthcare professional providing expert medical services."}"
                        </p>
                      </div>
                    </div>

                    <div className="glass-card p-10 bg-white">
                      <DoctorAbout
                        name={docData.name}
                        about={docData.about}
                        qualifications={docData.qualifications}
                        experiences={docData.experiences}
                      />
                    </div>
                  </div>
                )}

                {tab === "appointments" && (
                  <div className="glass-card p-8 bg-white animate-fade-in">
                    <h3 className="text-2xl font-bold text-darkColor mb-8 flex items-center gap-3">
                      <span className="w-2 h-8 bg-primaryColor rounded-full"></span>
                      Recent Appointments
                    </h3>
                    <Appointments appointments={docData.appointments} />
                  </div>
                )}

                {tab === "settings" && (
                  <div className="glass-card p-8 bg-white animate-fade-in">
                    <h3 className="text-2xl font-bold text-darkColor mb-8 flex items-center gap-3">
                      <span className="w-2 h-8 bg-primaryColor rounded-full"></span>
                      Profile Settings
                    </h3>
                    <Profile doctorData={docData} />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
