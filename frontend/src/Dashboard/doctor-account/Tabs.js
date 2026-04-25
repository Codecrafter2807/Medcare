import { useContext } from "react";
import { BiMenu } from "react-icons/bi";
import { authContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { HiOutlineLogout, HiOutlineUserCircle, HiOutlineCalendar, HiOutlineViewGrid } from "react-icons/hi";

const Tabs = ({ tab, setTab }) => {
  const { dispatch } = useContext(authContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  const navItems = [
    { id: "overview", label: "Overview", icon: <HiOutlineViewGrid className="w-5 h-5" /> },
    { id: "appointments", label: "Appointments", icon: <HiOutlineCalendar className="w-5 h-5" /> },
    { id: "settings", label: "Profile", icon: <HiOutlineUserCircle className="w-5 h-5" /> },
  ];

  return (
    <div className="w-full">
      <span className="lg:hidden">
        <BiMenu className="w-6 h-6 cursor-pointer text-darkColor mb-4" />
      </span>
      <div className="hidden lg:flex flex-col p-8 glass-card sticky top-24">
        <div className="space-y-2 w-full">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all duration-300 ${
                tab === item.id
                  ? "bg-primaryColor text-white shadow-lg shadow-primaryColor/20 scale-105"
                  : "bg-transparent text-gray-500 hover:bg-gray-50 hover:text-primaryColor"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 w-full space-y-3">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-darkColor text-white py-4 rounded-2xl font-bold transition-all duration-300 hover:bg-gray-800 hover:shadow-lg"
          >
            <HiOutlineLogout className="w-5 h-5" />
            Logout
          </button>
          <button className="w-full text-red-500 py-3 text-sm font-bold hover:text-red-700 transition-colors">
            Delete account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
