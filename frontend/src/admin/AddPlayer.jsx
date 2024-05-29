/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
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
    const { name, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: checked ? [...prevFormData[name], event.target.value] : [],
    }));
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
      const data = await uploadImage(file);
      setFormData((prevFormData) => ({
        ...prevFormData,
        photo: data.url,
      }));
      console.log(data, data.url);
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
      toast.error(error.message, "Some thing went wrong");
    }
  };

  const addItem = (key, value) => {
    console.log(key, value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: [...prevFormData[key], value],
    }));
  };

  const removeItem = (key, index) => {
    console.log(key, index);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: prevFormData[key].filter((_, i) => i !== index),
    }));
  };

  const handleExperienceChange = (event, index) => {
    const { name, value } = event.target;
    console.log(`Updating experiences at index ${index}, ${name}: ${value}`);
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
    <section className="bg-gray-200 text-center">
      <h2 className="text-black font-extrabold text-[30px] leading-9 mb-10">
        Profile Information
      </h2>

      <form onSubmit={addProfile} className="w-[70%] mx-auto text-center">
        {[
          {
            label: "Name",
            name: "name",
            type: "text",
            placeholder: "Enter your name",
          },
          {
            label: "Email",
            name: "email",
            type: "email",
            placeholder: "Email",
            readOnly: true,
            disabled: true,
          },
          {
            label: "Phone",
            name: "phone",
            type: "text",
            placeholder: "Phone Number",
            maxLength: 10,
          },
          {
            label: "Bio",
            name: "bio",
            type: "text",
            placeholder: "Bio",
            minLength: 10,
            maxLength: 100,
          },
          {
            label: "Place",
            name: "place",
            type: "text",
            placeholder: "Vavuniya..",
          },
          {
            label: "Club",
            name: "club",
            type: "text",
            placeholder: "Club",
          },
        ].map((input, index) => (
          <div key={index} className="mb-5">
            <p className="form__label">
              {input.label} <span className="text-primaryColor">*</span>
            </p>
            <input
              type={input.type}
              name={input.name}
              value={formData[input.name]}
              onChange={handleInputChange}
              placeholder={input.placeholder}
              className="form__input text-center bg-white h-[60px]"
              readOnly={input.readOnly}
              disabled={input.disabled}
              maxLength={input.maxLength}
              minLength={input.minLength}
            />
          </div>
        ))}

        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          <div className="mb-5">
            <p className="form__label">
              Gender <span className="text-primaryColor">*</span>
            </p>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="form__input text-black">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="mb-5">
            <p className="form__label">
              Sports <span className="text-primaryColor">*</span>
            </p>
            <div className="w-[110px] flex flex-col mx-auto">
              <div className="flex items-center justify-between">
                <p className="font-bold ">Football</p>
                <input
                  type="checkbox"
                  name="sports"
                  value="Football"
                  onChange={handleCheckboxChange}
                  checked={formData.sports?.includes("Football")}
                  className="text-black"
                />
              </div>
              <div className="flex items-center justify-between">
                <p className="font-bold">Cricket</p>
                <input
                  type="checkbox"
                  name="sports"
                  value="Cricket"
                  onChange={handleCheckboxChange}
                  checked={formData.sports?.includes("Cricket")}
                  className=" text-black"
                />
              </div>
              <div className="flex items-center justify-between ">
                <p className="font-bold">Volleyball</p>
                <input
                  type="checkbox"
                  name="sports"
                  value="Volleyball"
                  onChange={handleCheckboxChange}
                  checked={formData.sports?.includes("Volleyball")}
                  className=" text-black"
                />
              </div>
            </div>
          </div>

          <div className="mb-5">
            <p className="form__label">
              Age <span className="text-primaryColor">*</span>
            </p>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              className="form__input p-2 text-center"
            />
          </div>

          <div>
            <p className="form__label">
              Price
              <span className="text-primaryColor">*</span>
            </p>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="form__input p-2 text-center"
            />
          </div>
        </div>

        <div className="mb-5 mt-5">
          <p className="form__label text-[22px] font-bold">
            Experiences <span className="text-primaryColor">*</span>
          </p>
          {formData.experiences?.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-5">
                {[
                  { label: "Starting Date", name: "startDate", type: "date" },
                  { label: "Ending Date", name: "endDate", type: "date" },
                ].map((input, idx) => (
                  <div key={idx}>
                    <p className="form__label">{input.label}</p>
                    <input
                      type={input.type}
                      name={input.name}
                      value={item[input.name]}
                      onChange={(e) => handleExperienceChange(e, index)}
                      className="form__input"
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-5 mt-5">
                {[
                  {
                    label: "Position",
                    name: "position",
                    type: "text",
                    placeholder: "Captain/ Vice-Captain..",
                  },
                  {
                    label: "Club",
                    name: "club",
                    type: "text",
                    placeholder: "Club you play in...",
                  },
                  {
                    label: "Place",
                    name: "place",
                    type: "text",
                    placeholder: "Place you play in...",
                  },
                ].map((input, idx) => (
                  <div key={idx} className="mb-5">
                    <p className="form__label">
                      {input.label} <span className="text-primaryColor">*</span>
                    </p>
                    <input
                      type={input.type}
                      name={input.name}
                      value={item[input.name]}
                      onChange={(e) => handleExperienceChange(e, index)}
                      placeholder={input.placeholder}
                      className="form__input"
                    />
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => removeItem("experiences", index)}
                className="bg-primaryColor p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer">
                <FaTrash />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              addItem("experiences", {
                startDate: "",
                endDate: "",
                position: "",
                club: "",
              })
            }
            className="bg-[#000] py-2 px-5 rounded-md text-white hover:text-blue-500 transition-all duration-200 cursor-pointer mb-5">
            Add Experiences
          </button>
        </div>

        <div className="mb-5">
          <p className="form__label text-[22px]">
            About <span className="text-primaryColor">*</span>
          </p>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleInputChange}
            placeholder="Write about you"
            className="form__input"></textarea>
        </div>

        <div className="mb-5 flex items-center gap-3">
          {formData.photo && (
            <figure className="flex items-center justify-center w-[70px] h-[70px] rounded-full border-2 border-solid border-primaryColor overflow-hidden">
              <img
                src={formData.photo}
                alt="profile"
                loading="lazy"
                className="w-full h-full object-cover rounded-full"
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

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full btn bg-primaryColor text-white py-2 px-5 rounded-md text-[18px] mt-2 mb-[30px] cursor-pointer">
            Update Profile
          </button>
        </div>
      </form>
    </section>
  );
}

export default Profile;
