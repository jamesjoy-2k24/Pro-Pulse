/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FaTrash, FaArrowLeft, FaCloudUploadAlt, FaCalendarAlt, FaMapMarkerAlt, FaFileAlt } from "react-icons/fa";
import uploadImage from "../utils/uploadCloudinary.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Profile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    bio: "",
    place: "",
    club: "",
    age: "",
    gender: "",
    sports: [],
    price: "",
    experiences: [],
    about: "",
    photo: null,
  });

  useEffect(() => {
    setFormData({
      name: "",
      email: "",
      password: "",
      phone: "",
      bio: "",
      place: "",
      club: "",
      age: "",
      gender: "",
      sports: [],
      price: "",
      experiences: [],
      about: "",
      photo: null,
    });
  }, []);

  const navigate = useNavigate();

  // Multiple selection of check boxes
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setFormData((prevFormData) => {
      const currentSports = prevFormData.sports || [];
      return {
        ...prevFormData,
        sports: checked
          ? [...currentSports, value]
          : currentSports.filter((s) => s !== value),
      };
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      toast.info("Uploading image...");
      try {
        const data = await uploadImage(file);
        setFormData((prevFormData) => ({
          ...prevFormData,
          photo: data.url,
        }));
        toast.success("Image uploaded successfully!");
      } catch (err) {
        toast.error("Failed to upload image.");
      }
    }
  };

  const addProfile = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/api/v1/auth/register", {
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

      toast.success("Successfully registered!");
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  const addItem = (key, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: [...(prevFormData[key] || []), value],
    }));
  };

  const removeItem = (key, index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: prevFormData[key].filter((_, i) => i !== index),
    }));
  };

  const handleExperienceChange = (event, index) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      const updatedExperience = [...prevFormData.experiences];
      updatedExperience[index][name] = value;
      return {
        ...prevFormData,
        experiences: updatedExperience,
      };
    });
  };

  return (
    <section className="min-h-screen bg-[#0b0c10] text-[#c5c6c7] py-10 px-4 sm:px-6 lg:px-8 font-sans antialiased">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Back navigation & header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[#1f2833] pb-6 gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="p-2.5 rounded-xl bg-[#1f2833]/40 border border-[#1f2833] text-[#8f94a6] hover:text-[#66fcf1] transition-all">
              <FaArrowLeft size={16} />
            </button>
            <div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">Create Player Profile</h1>
              <p className="text-sm text-[#8f94a6] mt-1">Register a new player in the Pro-Pulse system</p>
            </div>
          </div>
          <span className="text-xs text-[#8f94a6] font-mono tracking-widest uppercase bg-[#1f2833]/40 px-3 py-1 rounded-full border border-[#1f2833]">
            Admin View
          </span>
        </div>

        <form onSubmit={addProfile} className="space-y-8 bg-[#1f2833]/10 border border-[#1f2833] rounded-3xl p-6 sm:p-10 shadow-2xl">
          
          {/* Section 1: Basic Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white border-l-4 border-[#66fcf1] pl-3">
              Basic Account Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  label: "Full Name",
                  name: "name",
                  type: "text",
                  placeholder: "e.g., Jane Doe",
                },
                {
                  label: "Email Address",
                  name: "email",
                  type: "email",
                  placeholder: "e.g., player@propulse.com",
                  disabled: false, // Let admin input the new player email
                },
                {
                  label: "Temporary Password",
                  name: "password",
                  type: "password",
                  placeholder: "Minimum 6 characters",
                },
                {
                  label: "Phone Number",
                  name: "phone",
                  type: "text",
                  placeholder: "10-digit number",
                  maxLength: 10,
                },
              ].map((input) => (
                <div key={input.name} className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#8f94a6]">
                    {input.label} <span className="text-[#66fcf1]">*</span>
                  </label>
                  <input
                    type={input.type}
                    name={input.name}
                    value={formData[input.name]}
                    onChange={handleInputChange}
                    placeholder={input.placeholder}
                    className="w-full bg-[#0b0c10]/60 border border-[#1f2833] focus:border-[#66fcf1] focus:ring-1 focus:ring-[#66fcf1] rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 transition-all outline-none"
                    maxLength={input.maxLength}
                    required
                  />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#8f94a6]">
                  Place / Location <span className="text-[#66fcf1]">*</span>
                </label>
                <input
                  type="text"
                  name="place"
                  value={formData.place}
                  onChange={handleInputChange}
                  placeholder="e.g. Vavuniya"
                  className="w-full bg-[#0b0c10]/60 border border-[#1f2833] focus:border-[#66fcf1] focus:ring-1 focus:ring-[#66fcf1] rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 transition-all outline-none"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#8f94a6]">
                  Current Club <span className="text-[#66fcf1]">*</span>
                </label>
                <input
                  type="text"
                  name="club"
                  value={formData.club}
                  onChange={handleInputChange}
                  placeholder="Club name"
                  className="w-full bg-[#0b0c10]/60 border border-[#1f2833] focus:border-[#66fcf1] focus:ring-1 focus:ring-[#66fcf1] rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 transition-all outline-none"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#8f94a6]">
                  Bio Summary <span className="text-[#66fcf1]">*</span>
                </label>
                <input
                  type="text"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Short tagline (10-100 characters)"
                  minLength={10}
                  maxLength={100}
                  className="w-full bg-[#0b0c10]/60 border border-[#1f2833] focus:border-[#66fcf1] focus:ring-1 focus:ring-[#66fcf1] rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 transition-all outline-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* Section 2: Player Stats & Sports */}
          <div className="space-y-6 pt-6 border-t border-[#1f2833]">
            <h3 className="text-lg font-bold text-white border-l-4 border-[#66fcf1] pl-3">
              Player Specifications & Sports
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#8f94a6]">
                  Gender <span className="text-[#66fcf1]">*</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full bg-[#0b0c10]/60 border border-[#1f2833] focus:border-[#66fcf1] focus:ring-1 focus:ring-[#66fcf1] rounded-xl px-4 py-3 text-sm text-white transition-all outline-none"
                  required>
                  <option value="" className="bg-[#0b0c10]">Select Gender</option>
                  <option value="male" className="bg-[#0b0c10]">Male</option>
                  <option value="female" className="bg-[#0b0c10]">Female</option>
                  <option value="other" className="bg-[#0b0c10]">Other</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#8f94a6]">
                  Age <span className="text-[#66fcf1]">*</span>
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full bg-[#0b0c10]/60 border border-[#1f2833] focus:border-[#66fcf1] focus:ring-1 focus:ring-[#66fcf1] rounded-xl px-4 py-3 text-sm text-white transition-all outline-none"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#8f94a6]">
                  Sponsorship Base Price (LKR) <span className="text-[#66fcf1]">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Base Price"
                  className="w-full bg-[#0b0c10]/60 border border-[#1f2833] focus:border-[#66fcf1] focus:ring-1 focus:ring-[#66fcf1] rounded-xl px-4 py-3 text-sm text-white transition-all outline-none"
                  required
                />
              </div>
            </div>

            {/* Sports Selector Grid */}
            <div className="flex flex-col gap-2.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#8f94a6]">
                Sports / Activities <span className="text-[#66fcf1]">*</span>
              </label>
              <div className="grid grid-cols-3 gap-4 max-w-lg">
                {["Football", "Cricket", "Volleyball"].map((sport) => (
                  <label
                    key={sport}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl border cursor-pointer transition-all ${
                      formData.sports?.includes(sport)
                        ? "border-[#66fcf1] bg-[#66fcf1]/10 text-[#66fcf1]"
                        : "border-[#1f2833] bg-[#0b0c10]/30 text-zinc-400 hover:text-white"
                    }`}>
                    <span className="text-sm font-semibold">{sport}</span>
                    <input
                      type="checkbox"
                      name="sports"
                      value={sport}
                      onChange={handleCheckboxChange}
                      checked={formData.sports?.includes(sport)}
                      className="hidden"
                    />
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3: Professional Experience */}
          <div className="space-y-6 pt-6 border-t border-[#1f2833]">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-white border-l-4 border-[#66fcf1] pl-3">
                Career Timelines & Experiences
              </h3>
              <button
                type="button"
                onClick={() =>
                  addItem("experiences", {
                    startDate: "",
                    endDate: "",
                    position: "",
                    club: "",
                    place: "",
                  })
                }
                className="text-xs font-semibold text-[#66fcf1] hover:underline">
                + Add Experience Card
              </button>
            </div>

            {formData.experiences?.length === 0 ? (
              <div className="text-center p-8 bg-[#0b0c10]/20 border border-dashed border-[#1f2833] rounded-2xl">
                <p className="text-sm text-[#8f94a6] italic">No experiences added yet. Click above to append career milestones.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {formData.experiences.map((item, index) => (
                  <div key={index} className="relative p-5 bg-[#0b0c10]/30 border border-[#1f2833] rounded-2xl space-y-4">
                    {/* Remove Action */}
                    <button
                      type="button"
                      onClick={() => removeItem("experiences", index)}
                      className="absolute top-4 right-4 p-2 text-red-400 hover:text-white bg-red-950/40 hover:bg-red-900 border border-red-900/40 rounded-lg transition-all">
                      <FaTrash size={12} />
                    </button>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mr-8">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[10px] uppercase font-bold text-[#8f94a6] flex items-center gap-1.5">
                          <FaCalendarAlt /> Start Date
                        </span>
                        <input
                          type="date"
                          name="startDate"
                          value={item.startDate}
                          onChange={(e) => handleExperienceChange(e, index)}
                          className="bg-[#0b0c10]/40 border border-[#1f2833] focus:border-[#66fcf1] rounded-xl px-3 py-2 text-xs text-white outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[10px] uppercase font-bold text-[#8f94a6] flex items-center gap-1.5">
                          <FaCalendarAlt /> End Date
                        </span>
                        <input
                          type="date"
                          name="endDate"
                          value={item.endDate}
                          onChange={(e) => handleExperienceChange(e, index)}
                          className="bg-[#0b0c10]/40 border border-[#1f2833] focus:border-[#66fcf1] rounded-xl px-3 py-2 text-xs text-white outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[10px] uppercase font-bold text-[#8f94a6]">Position</span>
                        <input
                          type="text"
                          name="position"
                          value={item.position}
                          onChange={(e) => handleExperienceChange(e, index)}
                          placeholder="e.g. Captain / Defender"
                          className="bg-[#0b0c10]/40 border border-[#1f2833] focus:border-[#66fcf1] rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-700 outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[10px] uppercase font-bold text-[#8f94a6]">Club Played In</span>
                        <input
                          type="text"
                          name="club"
                          value={item.club}
                          onChange={(e) => handleExperienceChange(e, index)}
                          placeholder="e.g. Lions FC"
                          className="bg-[#0b0c10]/40 border border-[#1f2833] focus:border-[#66fcf1] rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-700 outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[10px] uppercase font-bold text-[#8f94a6] flex items-center gap-1">
                          <FaMapMarkerAlt /> City / Country
                        </span>
                        <input
                          type="text"
                          name="place"
                          value={item.place}
                          onChange={(e) => handleExperienceChange(e, index)}
                          placeholder="e.g. Colombo"
                          className="bg-[#0b0c10]/40 border border-[#1f2833] focus:border-[#66fcf1] rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-700 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 4: About & Media Upload */}
          <div className="space-y-6 pt-6 border-t border-[#1f2833]">
            <h3 className="text-lg font-bold text-white border-l-4 border-[#66fcf1] pl-3">
              Profile Bio & Portfolio Image
            </h3>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#8f94a6] flex items-center gap-1.5">
                <FaFileAlt /> Detailed About Statement <span className="text-[#66fcf1]">*</span>
              </label>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleInputChange}
                placeholder="Write a comprehensive overview of the player's career, strengths, accomplishments..."
                rows={4}
                className="w-full bg-[#0b0c10]/60 border border-[#1f2833] focus:border-[#66fcf1] focus:ring-1 focus:ring-[#66fcf1] rounded-xl p-4 text-sm text-white placeholder-zinc-600 transition-all outline-none resize-y"
                required
              />
            </div>

            <div className="flex items-center gap-6 p-4 bg-[#0b0c10]/30 border border-[#1f2833] rounded-2xl">
              <div className="relative w-36 h-12">
                <input
                  type="file"
                  name="photo"
                  id="customFile"
                  onChange={handleFileInputChange}
                  accept="image/*"
                  className="w-full h-full cursor-pointer opacity-0 absolute z-10"
                />
                <label
                  htmlFor="customFile"
                  className="absolute top-0 left-0 w-full h-full flex items-center justify-center gap-2 bg-[#1f2833] hover:bg-zinc-800 text-white text-xs font-bold rounded-xl border border-zinc-700 cursor-pointer transition-colors">
                  <FaCloudUploadAlt size={16} className="text-[#66fcf1]" />
                  Upload Photo
                </label>
              </div>

              {formData.photo ? (
                <div className="flex items-center gap-3">
                  <img
                    src={formData.photo}
                    alt="Uploaded preview"
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-[#66fcf1]"
                  />
                  <span className="text-xs text-emerald-400 font-semibold">Ready to register</span>
                </div>
              ) : (
                <span className="text-xs text-[#8f94a6] italic">No image file selected.</span>
              )}
            </div>
          </div>

          {/* Submit action */}
          <div className="pt-6 border-t border-[#1f2833] flex justify-end">
            <button
              type="submit"
              className="bg-[#66fcf1] hover:bg-[#66fcf1]/80 text-[#0b0c10] font-bold px-8 py-3 rounded-xl shadow-[0_0_20px_rgba(102,252,241,0.15)] transition-all duration-300 hover:scale-[1.02] active:scale-98">
              Register Player Profile
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Profile;
