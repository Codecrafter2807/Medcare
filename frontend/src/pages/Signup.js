import { useState } from "react";
import signupImg from "../assets/images/signup.gif";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import uploadImageToCloudinary from "../utils/uploadCloudinary";

const Signup = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: null,
    gender: "",
    role: "patient",
  });

  const navigate = useNavigate();

  const inputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fileInputChange = async (event) => {
    const file = event.target.files[0];
    setLoading(true);
    try {
      const data = await uploadImageToCloudinary(file);
      setPreviewURL(data.url);
      setSelectedFile(data.url);
      setFormData({ ...formData, photo: data.url });
    } catch (err) {
      toast.error("Failed to upload image");
    } finally {
      setLoading(false);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const { message } = await res.json();

      if (!res.ok) {
        throw new Error(message);
      }

      setLoading(false);
      toast.success(message);
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <section className="bg-gray-50/50 py-16 px-6">
      <div className="max-w-[1000px] mx-auto glass-card bg-white overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="hidden lg:block relative overflow-hidden bg-white flex items-center justify-center p-8">
            <img src={signupImg} alt="Signup" className="w-full h-auto object-contain rounded-2xl" />
          </div>
          
          <div className="p-8 lg:p-16 space-y-10">
            <div>
              <h3 className="text-[28px] font-bold text-darkColor">
                Create an <span className="text-primaryColor">Account</span>
              </h3>
              <p className="text-gray-500 mt-2">Start your journey towards better health today.</p>
            </div>

            <form onSubmit={submitHandler} className="space-y-6">
              <div className="space-y-2">
                <label className="label-field">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={formData.name}
                  onChange={inputChange}
                  className="input-field"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="label-field">Email Address</label>
                <input
                  type="email"
                  placeholder="doctor@example.com"
                  name="email"
                  value={formData.email}
                  onChange={inputChange}
                  className="input-field"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="label-field">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  name="password"
                  value={formData.password}
                  onChange={inputChange}
                  className="input-field"
                  required
                />
              </div>

              <div className="flex flex-wrap gap-8 items-center">
                <div className="space-y-2 flex-1">
                  <label className="label-field">I am a:</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={inputChange}
                    className="input-field cursor-pointer"
                  >
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                  </select>
                </div>

                <div className="space-y-2 flex-1">
                  <label className="label-field">Gender:</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={inputChange}
                    className="input-field cursor-pointer"
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-6">
                {selectedFile ? (
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-primaryColor shadow-lg">
                    <img src={previewURL} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                     </svg>
                  </div>
                )}

                <div className="relative">
                  <input
                    type="file"
                    name="photo"
                    id="customFile"
                    onChange={fileInputChange}
                    accept=".jpg, .png"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <label
                    htmlFor="customFile"
                    className="btn !mt-0 !bg-primaryColor/10 !text-primaryColor !shadow-none hover:!bg-primaryColor hover:!text-white flex items-center gap-2 py-3"
                  >
                    Upload Photo
                  </label>
                </div>
              </div>

              <button
                disabled={loading}
                type="submit"
                className="btn w-full py-4 text-[17px] font-semibold shadow-xl shadow-primaryColor/20"
              >
                {loading ? <HashLoader size={30} color="#ffffff" /> : "Create Account"}
              </button>

              <p className="text-center text-gray-600">
                Already have an account?
                <Link to="/login" className="ml-2 font-semibold text-primaryColor hover:text-blue-600 transition-all">
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
