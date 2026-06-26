/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from "react";
import { authContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import uploadCloudinary from "../../utils/uploadCloudinary";
import { BASE_URL } from "../../config";
import Loading from "../../components/Loader/Loading";

const Profile = ({ user }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    place: user?.place || "",
    company: user?.company || "",
    photo: user?.photo || "",
    gender: user?.gender || "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const { dispatch } = useContext(authContext);

  useEffect(() => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      place: user?.place || "",
      company: user?.company || "",
      photo: user?.photo || "",
      gender: user?.gender || "",
    });
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    setUploadLoading(true);
    try {
      const uploadedFile = await uploadCloudinary(file);

      setSelectedFile(uploadedFile.url);
      setFormData({
        ...formData,
        photo: uploadedFile.url,
      });
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      setUploadLoading(false);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const errors = validateFormData();
    if (Object.keys(errors).length > 0) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/users/profile/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to update profile");
      }

      toast.success("Successfully updated!");
      setSuccess(true);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: result.data,
          role: result.data.role,
          token: localStorage.getItem("token"),
        },
      });
      navigate(`/users/profile/me`);
    } catch (error) {
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const validateFormData = () => {
    const errors = {};

    if (formData.password && formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
      toast.error(errors.password);
    }

    if (
      formData.password &&
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        formData.password,
      )
    ) {
      errors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character";
      toast.error(errors.password);
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      toast.error(errors.confirmPassword);
    }

    return errors;
  };

  const renderError = () => (
    <div className="mt-7 text-center text-red-500 text-[22px]">
      {error && <p className="text-center">{error}</p>}
    </div>
  );

  const renderSuccess = () => (
    <div className="mt-7 text-center text-green-500 text-[22px]">
      {success && <p className="text-center">Updated successfully!</p>}
    </div>
  );

  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]/50 backdrop-blur-sm rounded-3xl">
          <Loading />
        </div>
      )}

      <div className="mt-4">
        <form onSubmit={submitHandler} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-gray-400 text-xs uppercase tracking-widest font-bold ml-1">Full Name</label>
              <div className="relative group">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-5 text-white placeholder:text-gray-600 focus:outline-none focus:border-primaryColor/50 focus:bg-white/10 transition-all duration-300"
                />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primaryColor group-focus-within:w-[80%] transition-all duration-500 rounded-full opacity-50" />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-gray-400 text-xs uppercase tracking-widest font-bold ml-1">Email Address</label>
              <div className="relative group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-5 text-white placeholder:text-gray-600 focus:outline-none focus:border-primaryColor/50 focus:bg-white/10 transition-all duration-300"
                  readOnly
                />
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label className="text-gray-400 text-xs uppercase tracking-widest font-bold ml-1">Location</label>
              <div className="relative group">
                <input
                  type="text"
                  name="place"
                  value={formData.place}
                  onChange={handleInputChange}
                  placeholder="e.g. London, UK"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-5 text-white placeholder:text-gray-600 focus:outline-none focus:border-primaryColor/50 focus:bg-white/10 transition-all duration-300"
                />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primaryColor group-focus-within:w-[80%] transition-all duration-500 rounded-full opacity-50" />
              </div>
            </div>

            {/* Company/Club */}
            <div className="space-y-2">
              <label className="text-gray-400 text-xs uppercase tracking-widest font-bold ml-1">Company / Club</label>
              <div className="relative group">
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Organization name"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-5 text-white placeholder:text-gray-600 focus:outline-none focus:border-primaryColor/50 focus:bg-white/10 transition-all duration-300"
                />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primaryColor group-focus-within:w-[80%] transition-all duration-500 rounded-full opacity-50" />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Phone */}
            <div className="space-y-2">
              <label className="text-gray-400 text-xs uppercase tracking-widest font-bold ml-1">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter phone number"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-5 text-white placeholder:text-gray-600 focus:outline-none focus:border-primaryColor/50 focus:bg-white/10 transition-all duration-300"
              />
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <label className="text-gray-400 text-xs uppercase tracking-widest font-bold ml-1">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-5 text-gray-400 focus:outline-none focus:border-primaryColor/50 focus:bg-white/10 transition-all duration-300 appearance-none cursor-pointer"
              >
                <option value="" className="bg-[#0a0a0a]">Select Gender</option>
                <option value="male" className="bg-[#0a0a0a]">Male</option>
                <option value="female" className="bg-[#0a0a0a]">Female</option>
                <option value="other" className="bg-[#0a0a0a]">Other</option>
              </select>
            </div>
          </div>

          {/* Password Section */}
          <div className="pt-4 border-t border-white/5">
            <p className="text-white font-semibold mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primaryColor shadow-[0_0_10px_rgba(161,13,9,0.8)]" />
              Security Update
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-gray-400 text-xs uppercase tracking-widest font-bold ml-1">New Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-5 text-white placeholder:text-gray-600 focus:outline-none focus:border-primaryColor/50 focus:bg-white/10 transition-all duration-300"
                />
              </div>
              <div className="space-y-2">
                <label className="text-gray-400 text-xs uppercase tracking-widest font-bold ml-1">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 px-5 text-white placeholder:text-gray-600 focus:outline-none focus:border-primaryColor/50 focus:bg-white/10 transition-all duration-300"
                />
              </div>
            </div>
          </div>

          {/* Photo Upload */}
          <div className="flex items-center gap-6 py-4">
            {formData.photo && (
              <figure className="w-16 h-16 rounded-2xl border-2 border-primaryColor/30 p-1 relative overflow-hidden group">
                <img
                  src={selectedFile || formData.photo}
                  alt="profile"
                  className="w-full h-full object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-[10px] text-white font-bold">New</span>
                </div>
              </figure>
            )}

            <div className="relative flex-1">
              <input
                type="file"
                name="photo"
                id="customFile"
                onChange={handleFileInputChange}
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <label
                htmlFor="customFile"
                className="flex items-center justify-center gap-3 px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-dashed border-white/20 rounded-2xl text-gray-400 font-medium transition-all duration-300"
              >
                {uploadLoading ? (
                  <HashLoader color="#A10D09" size={20} />
                ) : (
                  "Change Profile Picture"
                )}
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            disabled={loading || uploadLoading}
            type="submit"
            className="w-full bg-primaryColor hover:bg-primaryColor/90 text-white font-bold py-4 rounded-2xl shadow-xl shadow-primaryColor/20 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {loading ? <HashLoader color="#fff" size={25} /> : "Update Profile"}
            <div className="w-2 h-2 rounded-full bg-white/30 group-hover:scale-150 transition-transform duration-500" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
