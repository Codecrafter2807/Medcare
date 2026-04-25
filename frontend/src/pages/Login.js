import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../config";
import { authContext } from "../context/AuthContext";
import HashLoader from 'react-spinners/HashLoader';

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useContext(authContext);

  const inputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: result.data,
          token: result.token,
          role: result.role,
        },
      });

      setLoading(false);
      toast.success(result.message);
      navigate("/home");
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-gray-50/50 py-12 px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 glass-card p-10 bg-white">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-darkColor">
            Welcome <span className="text-primaryColor">Back</span>
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Login to access your personalized dashboard
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={submitHandler}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="label-field">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={inputChange}
                className="input-field"
                placeholder="doctor@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" title="password" className="label-field">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={inputChange}
                className="input-field"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link to="#" className="font-semibold text-primaryColor hover:text-blue-600 transition-colors">
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="btn w-full flex justify-center py-4 text-lg shadow-xl shadow-primaryColor/20"
            >
              {loading ? <HashLoader size={25} color='#fff' /> : 'Sign In'}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?
              <Link to="/signup" className="ml-2 font-bold text-primaryColor hover:text-blue-600 transition-all">
                Register Now
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
