import { useContext, useState } from "react";
import { authContext } from "../../context/AuthContext";
import MyBooking from "./MyBooking";
import Profile from "./Profile";
import useGetProfile from "../../hooks/useFatchData";
import { BASE_URL } from "../../config";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
import { HiOutlineLogout, HiOutlineUserCircle, HiOutlineShoppingBag } from "react-icons/hi";

const MyAccount = () => {
  const { dispatch } = useContext(authContext);
  const [tab, setTab] = useState("bookings");
  const {
    data: userData,
    loading,
    error,
  } = useGetProfile(`${BASE_URL}/users/profile/me`);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <section className="bg-gray-50/50 min-h-screen py-16">
      <div className="container">
        {loading && <Loading />}
        {error && <Error errMessage={error} />}

        {!loading && !error && (
          <div className="grid lg:grid-cols-4 gap-12">
            <div className="lg:col-span-1">
              <div className="glass-card p-8 sticky top-24 space-y-8">
                <div className="flex flex-col items-center text-center space-y-4">
                   <div className="relative group">
                    <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 border-white shadow-xl">
                      <img
                        className="w-full h-full object-cover"
                        src={userData.photo}
                        alt={userData.name}
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-darkColor tracking-tight">
                      {userData.name}
                    </h3>
                    <p className="text-gray-500 text-sm font-medium">
                      {userData.email}
                    </p>
                  </div>
                  <div className="w-full pt-4 border-t border-gray-100">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Blood Type</p>
                    <span className="text-xl font-bold text-primaryColor">
                      {userData.bloodType || "N/A"}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 bg-darkColor text-white py-3.5 rounded-2xl font-semibold transition-all duration-300 hover:bg-[#1a202c] hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
                  >
                    <HiOutlineLogout className="w-5 h-5" />
                    Logout
                  </button>
                  <button className="w-full text-red-500 py-2 text-sm font-medium hover:text-red-700 transition-colors tracking-wide">
                    Delete Account
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 space-y-8">
              <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-gray-100 w-fit">
                <button
                  onClick={() => setTab("bookings")}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
                    tab === "bookings"
                      ? "bg-primaryColor text-white shadow-lg shadow-primaryColor/20"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <HiOutlineShoppingBag className="w-5 h-5" />
                  My Bookings
                </button>
                <button
                  onClick={() => setTab("settings")}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
                    tab === "settings"
                      ? "bg-primaryColor text-white shadow-lg shadow-primaryColor/20"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <HiOutlineUserCircle className="w-5 h-5" />
                  Profile Settings
                </button>
              </div>

              <div className="animate-fade-in">
                {tab === "bookings" && (
                   <div className="glass-card p-8 lg:p-12 bg-white">
                      <h3 className="text-[22px] font-bold text-darkColor mb-8 flex items-center gap-3 tracking-tight">
                        <span className="w-1.5 h-6 bg-primaryColor rounded-full"></span>
                        Your Appointments
                      </h3>
                      <MyBooking />
                   </div>
                )}
                {tab === "settings" && (
                  <div className="glass-card p-8 lg:p-12 bg-white">
                    <h3 className="text-[22px] font-bold text-darkColor mb-8 flex items-center gap-3 tracking-tight">
                      <span className="w-1.5 h-6 bg-primaryColor rounded-full"></span>
                      Update Profile
                    </h3>
                    <Profile user={userData} />
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

export default MyAccount;
