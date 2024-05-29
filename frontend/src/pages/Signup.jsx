import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser, FaPhone } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { BASE_URL } from "../config";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SignpImg from "../assets/images/signup.png";
import HashLoader from "react-spinners/HashLoader.js";
import uploadImage from "../utils/uploadCloudinary";

const Signup = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [loading, setLoading] = useState(false);

  // Form Data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    showPassword: false,
    confirmPassword: "",
    photo: selectedFile,
    gender: "",
    role: "player",
  });
  const navigate = useNavigate();

  // Validate form
  const validateFormData = () => {
    // Clear previous errors
    toast.dismiss();
    const errors = {};

    // Validate Name
    if (
      formData.name.trim().charAt(0).toUpperCase() !==
        formData.name.trim().charAt(0) ||
      formData.name.trim() === ""
    ) {
      errors.name = "Name should start with capital letter and is required";
    }
    toast.error(errors.name);

    // Validate Phone
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      errors.phone = "Invalid phone number";
    }
    toast.error(errors.phone);

    // Validate Email
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(formData.email.toLowerCase())) {
      errors.email = "Invalid email address";
    }
    toast.error(errors.email);

    // Validate Password
    if (formData.password.length < 4) {
      errors.password = "Password must be at least 4 characters long";
    }
    toast.error(errors.password);

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      errors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
    }
    toast.error(errors.password);

    // Validate Confirm Password
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    toast.error(errors.confirmPassword);

    return errors;
  };

  // Toggle Password Visibility
  const togglePasswordVisibility = () => {
    setFormData((prevState) => ({
      ...prevState,
      showPassword: !prevState.showPassword,
    }));
  };

  // Toggle Confirm Password Visibility
  const toggleConfirmPasswordVisibility = () => {
    setFormData((prevState) => ({
      ...prevState,
      showConfirmPassword: !prevState.showConfirmPassword,
    }));
  };

  // Handle Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle File Input Change
  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];

    const data = await uploadImage(file);

    console.log(data, data.url);

    setPreviewURL(data.url);
    setSelectedFile(data.url);
    setFormData({
      ...formData,
      photo: data.url,
    });
  };

  // Handle Submit
  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    const errors = validateFormData();

    if (Object.keys(errors).length > 0) {
      toast.error("Please fill the form correctly !");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
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
      toast.success("Successfully registered!");
      navigate("/login");
    } catch (error) {
      setLoading(false);
      toast.error(error.message, "Some thing went wrong");
    }
  };

  return (
    <section className="px-5 xl:px-0 p-3">
      <div className="max-w-[1170px] mx-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* =========Signup Image======== */}
          <div className="hidden lg:flex items-center rounded-l-lg">
            <figure className="rounded-l-lg">
              <img
                src={SignpImg}
                alt="signup"
                className="w-full h-full rounded-l-lg"
              />
            </figure>
          </div>

          {/* =========Signup Form======== */}
          <div className="rounded-l-lg lg:pl-16 py-10">
            <h3 className="text-black text-[22px] leading-9 font-bold mb-10 flex items-center">
              Create an{" "}
              <span className="text-primaryColor ml-2"> account </span>
            </h3>

            <form onSubmit={submitHandler}>
              <div className="mb-[2rem] flex items-center gap-5">
                <FaUser className="text-primaryColor text-[20px]" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  className="w-full py-3 px-5 border-b border-solid border-gray-500 bg-[#FFFCC8] focus:outline-none focus:border-b-primaryColor text-[18px] leading-7 text-black placeholder:text-grayColor rounded-md"
                  required
                />
              </div>
              <div className="mb-[2rem] flex items-center gap-5">
                <FaEnvelope className="text-primaryColor text-[20px]" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter Your Email"
                  className="w-full py-3 px-5 border-b border-solid border-gray-500 bg-[#FFFCC8] focus:outline-none focus:border-b-primaryColor text-[18px] leading-7 text-black placeholder:text-grayColor rounded-md"
                  required
                />
              </div>
              <div className="mb-[2rem] flex items-center gap-5">
                <FaPhone className="text-primaryColor text-[20px] rotate-90" />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter Your Phone Number"
                  className="w-full py-3 px-5 border-b border-solid border-gray-500 bg-[#FFFCC8] focus:outline-none focus:border-b-primaryColor text-[18px] leading-7 text-black placeholder:text-grayColor rounded-md"
                  required
                />
              </div>

              {/* ==== Password input ==== */}
              <div className="mb-[2rem] flex items-center gap-5">
                <FaLock className="text-primaryColor text-[20px]" />
                <label className="w-full flex items-center justify-between py-3 px-5 border-b border-solid border-gray-500 bg-[#FFFCC8] focus:outline-none focus:border-b-primaryColor text-[18px] leading-7 text-black placeholder:text-grayColor rounded-md">
                  <input
                    type={formData.showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter Your Password"
                    className="focus:outline-none focus:bg-transparent bg-transparent"
                    required
                  />
                  <button type="button" onClick={togglePasswordVisibility}>
                    {formData.showPassword ? (
                      <FaEyeSlash className="text-primaryColor text-[22px]" />
                    ) : (
                      <FaEye className="text-primaryColor text-[22px]" />
                    )}
                  </button>
                </label>
              </div>

              {/* ==== Confirm password input ==== */}
              <div className="mb-[2rem] flex items-center gap-5">
                <FaLock className="text-primaryColor text-[20px]" />
                <label className="w-full flex items-center justify-between py-3 px-5 border-b border-solid border-gray-500 bg-[#FFFCC8] focus:outline-none focus:border-b-primaryColor text-[18px] leading-7 text-black placeholder:text-grayColor rounded-md">
                  <input
                    type={formData.showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm Your Password"
                    className="focus:outline-none focus:bg-transparent bg-transparent"
                    required
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}>
                    {formData.showConfirmPassword ? (
                      <FaEyeSlash className="text-primaryColor text-[22px]" />
                    ) : (
                      <FaEye className="text-primaryColor text-[22px]" />
                    )}
                  </button>
                </label>
              </div>
              <div className="mb-5 flex items-center justify-between">
                <label className="text-primaryColor font-bold text-[16px] leading-7">
                  Are you a :
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="ml-3 text-gray-500 bg-gray-50 font-semibold text-[15px] leading-7 px-4
                py-2 rounded-md focus:outline-none">
                    <option value="sponsor">Sponsor</option>
                    <option value="coach">Coach</option>
                    <option value="player">Player</option>
                  </select>
                </label>

                <label className="text-primaryColor font-bold text-[16px] leading-7">
                  Gender :
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="ml-3 text-gray-500 bg-gray-50 font-semibold text-[15px] leading-7 p-4
                py-2 rounded-md focus:outline-none">
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </label>
              </div>

              <div className="mb-5 flex items-center gap-3">
                {selectedFile && (
                  <figure
                    className="w-[70px] h-[70px] rounded-full border-2 border-solid border-primaryColor
                    flex items-center justify-center">
                    <img
                      src={previewURL}
                      alt="profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </figure>
                )}

                <div className="relative w-[130px] h-[50px]">
                  <input
                    type="file"
                    name="photo"
                    id="customFile"
                    onChange={handleFileInputChange}
                    accept="image/*"
                    className="w-full h-full cursor-pointer opacity-0 left-0 right-0 absolute"
                  />

                  <label
                    htmlFor="customFile"
                    className="absolute top-0 w-full h-full
                flex items-center px-[0.7rem] py-[0.3rem] text-[16px] leading-6 overflow-hidden
                bg-gray-200  text-black font-semibold rounded-lg truncate cursor-pointer">
                    Upload photo
                  </label>
                </div>
              </div>

              <div className="mt-7">
                <button
                  disabled={loading && true}
                  type="submit"
                  className="w-full bg-primaryColor text-white px-4 py-3 text-[22px] font-semibold rounded-lg">
                  {loading ? <HashLoader color="white" /> : " Sign Up"}
                </button>
              </div>

              <p className="mt-5 text-gray-500 text-center">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primaryColor font-medium ml-1">
                  Login
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
