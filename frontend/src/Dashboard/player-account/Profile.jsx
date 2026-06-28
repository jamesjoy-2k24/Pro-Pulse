/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FaTrash, FaCloudUploadAlt, FaCalendarAlt, FaMapMarkerAlt, FaFileAlt } from "react-icons/fa";
import uploadImage from "../../utils/uploadCloudinary.js";
import { BASE_URL, token } from "../../config";
import { toast } from "react-toastify";

function Profile({ player }) {
  const [formData, setFormData] = useState({
    name: player.name || "",
    email: player.email || "",
    phone: player.phone || "",
    bio: player.bio || "",
    place: player.place || "",
    club: player.club || "",
    age: player.age || "",
    gender: player.gender || "",
    sports: player.sports || [],
    price: player.price || "",
    experiences: player.experiences || [],
    about: player.about || "",
    photo: player.photo,
  });

  useEffect(() => {
    setFormData({
      name: player.name || "",
      email: player.email || "",
      phone: player.phone || "",
      bio: player.bio || "",
      place: player.place || "",
      club: player.club || "",
      age: player.age || "",
      gender: player.gender || "",
      sports: player.sports || [],
      price: player.price || "",
      experiences: player.experiences || [],
      about: player.about || "",
      photo: player.photo,
    });
  }, [player]);

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

  const updateProfileHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/players/${player._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message);
      } else {
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      toast.error(error.message);
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
    <div className="space-y-6">
      <div className="border-b border-[#1f2833] pb-3 mb-6">
        <h4 className="text-lg font-bold text-white">Profile Settings</h4>
        <p className="text-xs text-[#8f94a6] mt-0.5">Customize your personal bio, club affiliations, price specifications, and experiences</p>
      </div>

      <form onSubmit={updateProfileHandler} className="space-y-6">
        {/* Basic Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            {
              label: "Name",
              name: "name",
              type: "text",
              placeholder: "Enter your name",
            },
            {
              label: "Email Address",
              name: "email",
              type: "email",
              placeholder: "Email",
              readOnly: true,
              disabled: true,
            },
            {
              label: "Phone Number",
              name: "phone",
              type: "tel",
              placeholder: "10-digit number",
            },
            {
              label: "Place / Location",
              name: "place",
              type: "text",
              placeholder: "City or Place",
            },
            {
              label: "Current Club",
              name: "club",
              type: "text",
              placeholder: "Club you play in",
            },
            {
              label: "Bio Summary Tagline",
              name: "bio",
              type: "text",
              placeholder: "Short bio (10-100 characters)",
              minLength: 10,
              maxLength: 100,
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
                className="w-full bg-[#0b0c10]/60 border border-[#1f2833] focus:border-[#66fcf1] focus:ring-1 focus:ring-[#66fcf1] rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 transition-all outline-none disabled:opacity-50"
                readOnly={input.readOnly}
                disabled={input.disabled}
                required
              />
            </div>
          ))}
        </div>

        {/* Specifications */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-[#1f2833]/60">
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

        {/* Sports Checkbox select */}
        <div className="flex flex-col gap-2.5 pt-4 border-t border-[#1f2833]/60">
          <label className="text-xs font-semibold uppercase tracking-wider text-[#8f94a6]">
            Sports Selector <span className="text-[#66fcf1]">*</span>
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

        {/* Career Experiences */}
        <div className="space-y-6 pt-6 border-t border-[#1f2833]">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
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
            <div className="text-center p-6 bg-[#0b0c10]/20 border border-dashed border-[#1f2833] rounded-2xl">
              <p className="text-xs text-[#8f94a6] italic">No experiences added yet. Click above to append career milestones.</p>
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
                        value={item.place || ""}
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

        {/* Detailed About Statement */}
        <div className="space-y-6 pt-6 border-t border-[#1f2833]">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#8f94a6] flex items-center gap-1.5">
              <FaFileAlt /> Detailed About Statement <span className="text-[#66fcf1]">*</span>
            </label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleInputChange}
              placeholder="Write a comprehensive overview of your career..."
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
                <span className="text-xs text-emerald-400 font-semibold">Ready to update</span>
              </div>
            ) : (
              <span className="text-xs text-[#8f94a6] italic">No image file selected.</span>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6 border-t border-[#1f2833] flex justify-end">
          <button
            type="submit"
            className="bg-[#66fcf1] hover:bg-[#66fcf1]/80 text-[#0b0c10] font-bold px-8 py-3 rounded-xl shadow-[0_0_20px_rgba(102,252,241,0.15)] transition-all duration-300 hover:scale-[1.02] active:scale-98">
            Update Profile Settings
          </button>
        </div>
      </form>
    </div>
  );
}

export default Profile;
