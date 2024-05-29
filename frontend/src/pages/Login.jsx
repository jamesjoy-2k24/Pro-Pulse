import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSmileWink } from "react-icons/fa";
import { toast } from "react-toastify";
import { authContext } from "../context/authContext.jsx";
import { BASE_URL } from "../config";
import HashLoader from "react-spinners/HashLoader.js";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useContext(authContext);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }
      toast.success("Welcome Back!");

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: result.user,
          role: result.role,
          token: result.token,
        },
      });

      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("role", result.role);
      localStorage.setItem("token", result.token);
      // console.log(result, 'login data');

      setFormData({ email: "", password: "" });
      setLoading(false);

      if (result.role === "admin") {
        navigate("/admin/dashboard");
        window.location.reload(true);
      } else if (result.role === "player") {
        navigate("/players/profile/me/");
        window.location.reload(true);
      } else if (result.role === "sponsor") {
        navigate("/players");
        window.location.reload(true);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message, "Some thing went wrong");
    }
  };

  return (
    <section className="px-5 lg:px-0">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
        <h3 className="text-black justify-center text-[24px] leading-9 font-bold mb-10 flex items-center gap-2">
          Hello! <span className="text-primaryColor">Welcome</span> Back
          <FaSmileWink className="h-6 w-6 ml-2 text-primaryColor" />
        </h3>

        <form className="py-4 md:py-0" onSubmit={submitHandler}>
          <div className="mb-[2rem]">
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              placeholder="Enter Your Email"
              className="w-full text-center py-3 bg-[#FFFCC5] border-b border-solid border-gray-500 focus:outline-none focus:border-b-primaryColor text-[18px] leading-7 text-black placeholder:text-grayColor rounded-lg cursor-pointer"
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-[2rem]">
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="Enter Your Password"
              onChange={handleInputChange}
              className="w-full text-center py-3 bg-[#FFFCC5] border-b border-solid border-gray-500 focus:outline-none focus:border-b-primaryColor text-[18px] leading-7 text-black placeholder:text-grayColor  rounded-lg cursor-pointer"
              required
            />
          </div>

          <div className="mt-7">
            <button
              type="submit"
              className="w-full bg-primaryColor text-white px-4 py-3 text-[22px] font-semibold rounded-lg">
              {loading ? <HashLoader size={25} color="white" /> : "Login"}
            </button>
          </div>

          <p className="mt-5 text-gray-500 text-center">
            Don&apos;t have an account?{" "}
            <Link to="/Signup" className="text-primaryColor font-medium ml-1">
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
