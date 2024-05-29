/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import uploadCloudinary from "../../utils/uploadCloudinary";
import { BASE_URL, token } from "../../config";
import Loading from "../../components/Loader/Loading";

const Profile = ({ user }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    place: user?.place || "",
    company: user?.company || "",
    photo: user?.photo || "",
    gender: user?.gender || "",
  });

  const navigate = useNavigate();

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

    const uploadedFile = await uploadCloudinary(file);

    setSelectedFile(uploadedFile.url);
    setFormData({
      ...formData,
      photo: uploadedFile.url,
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${BASE_URL}/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to update profile");
      }

      toast.success("Successfully updated!");
      setSuccess(true);
      navigate(`/users/profile/me`);
    } catch (error) {
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
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
    <section>
      {loading && <Loading />}

      <div className="mt-10">
        <form onSubmit={submitHandler}>
          <div className="mb-[2rem] flex items-center gap-5">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Full Name"
              className="w-full py-3 px-5 border-b border-solid border-gray-500 bg-[#FFFCC8] focus:outline-none focus:border-b-primaryColor text-[18px] leading-7 text-black placeholder:text-gray-500 rounded-md"
            />
          </div>
          <div className="mb-[2rem] flex items-center gap-5">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter Your Email"
              readOnly
              className="w-full py-3 px-5 border-b border-solid border-gray-500 bg-[#FFFCC8] focus:outline-none focus:border-b-primaryColor text-[18px] leading-7 text-black placeholder:text-gray-500 rounded-md"
            />
          </div>
          <div className="mb-[2rem] flex items-center gap-5">
            <input
              type="text"
              name="place"
              value={formData.place}
              onChange={handleInputChange}
              placeholder="Enter Your location"
              className="w-full py-3 px-5 border-b border-solid border-gray-500 bg-[#FFFCC8] focus:outline-none focus:border-b-primaryColor text-[18px] leading-7 text-black placeholder:text-gray-500 rounded-md"
            />
          </div>
          <div className="mb-[2rem] flex items-center gap-5">
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              placeholder="Company or Club Name"
              className="w-full py-3 px-5 border-b border-solid border-gray-500 bg-[#FFFCC8] focus:outline-none focus:border-b-primaryColor text-[18px] leading-7 text-black placeholder:text-gray-500 rounded-md"
            />
          </div>
          <div className="mb-[2rem] flex items-center gap-5">
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter Your Phone Number"
              className="w-full py-3 px-5 border-b border-solid border-gray-500 bg-[#FFFCC8] focus:outline-none focus:border-b-primaryColor text-[18px] leading-7 text-black placeholder:text-gray-500 rounded-md"
            />
          </div>
          <div className="mb-5 flex items-center justify-between">
            <label className="text-primaryColor font-bold text-[16px] leading-7">
              Gender:
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="ml-3 text-gray-800 bg-gray-200 font-semibold text-[15px] leading-7 p-4 py-2 rounded-md focus:outline-none">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </label>
          </div>
          <div className="mb-5 flex items-center gap-3">
            {formData.photo && (
              <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
                <img
                  src={selectedFile || formData.photo}
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
                className="absolute top-0 w-full h-full flex items-center px-[0.7rem] py-[0.3rem] text-[18px] leading-6 overflow-hidden bg-gray-200 text-black font-semibold rounded-lg truncate cursor-pointer">
                {selectedFile ? selectedFile.name : "Upload Photo"}
              </label>
            </div>
          </div>
          {renderError()}
          {renderSuccess()}
          <div className="mt-7">
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-primaryColor text-white px-4 py-3 text-[22px] font-semibold rounded-lg">
              {loading ? <HashLoader size={30} color="white" /> : "Update"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Profile;
