import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoAddCircleSharp } from "react-icons/io5";
import axios from "axios";

export const SchoolRegistration = () => {
  const [logo, setLogo] = useState(null);
  const [previewLogo, setPreviewLogo] = useState(null);
  const logoInputRef = useRef();
  const [schoolName, setSchoolName] = useState("");
  const [schoolEmail, setSchoolEmail] = useState("");
  const [schoolPassword, setSchoolPassword] = useState("");
  const [schoolLocation, setSchoolLocation] = useState("");
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewLogo(URL.createObjectURL(file));
      setLogo(file);
    }
  };

  const handleLogoClick = () => {
    logoInputRef.current.click();
  };

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      if (
        !schoolName ||
        !schoolEmail ||
        !schoolPassword ||
        !schoolLocation
      ) {
        setError("All fields are required.");
        return;
      }

      const formdata = new FormData();
      formdata.append("schoolName", schoolName);
      formdata.append("schoolEmail", schoolEmail);
      formdata.append("schoolPassword", schoolPassword);
      formdata.append("schoolLocation", schoolLocation);
      formdata.append("logo", logo);

      const response = await axios.post(
        `${backendURL}/schools/registerSchool`,
        formdata,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        navigate(`/principalDashboard/${response.data.school._id}`);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="h-screen flex flex-col gap-2 justify-center items-center bg-gray-100">
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col items-center space-y-4 shadow-md p-6 bg-white rounded-xl"
        action=""
      >
        <div className="relative">
          <div
            onClick={handleLogoClick}
            className="h-[85px] w-[85px] border rounded-full flex justify-center items-center overflow-hidden"
          >
            {previewLogo ? (
              <img
                className="object-cover h-full w-full"
                src={previewLogo}
                alt="School Logo"
              />
            ) : (
              <p>Logo</p>
            )}
          </div>

          <IoAddCircleSharp
            onClick={handleLogoClick}
            className="absolute bottom-1 right-0 rounded-full bg-white text-2xl"
          />

          <input
            onChange={handleLogoChange}
            className="hidden"
            ref={logoInputRef}
            type="file"
            accept="image/*"
          />
        </div>

        <input
          className="border rounded outline-none py-2 px-3 w-64 focus:ring-2 focus:ring-blue-400"
          type="text"
          placeholder="Enter School Name..."
          value={schoolName}
          onChange={(e) => {
            setSchoolName(e.target.value);
          }}
        />
        <input
          className="border rounded outline-none py-2 px-3 w-64 focus:ring-2 focus:ring-blue-400"
          type="email"
          placeholder="Enter School Email..."
          value={schoolEmail}
          onChange={(e) => {
            setSchoolEmail(e.target.value);
          }}
        />
        <input
          className="border rounded outline-none py-2 px-3 w-64 focus:ring-2 focus:ring-blue-400"
          type="text"
          placeholder="Enter School Location..."
          value={schoolLocation}
          onChange={(e) => {
            setSchoolLocation(e.target.value);
          }}
        />
        <input
          className="border rounded outline-none py-2 px-3 w-64 focus:ring-2 focus:ring-blue-400"
          type="password"
          placeholder="Enter School Password..."
          value={schoolPassword}
          onChange={(e) => {
            setSchoolPassword(e.target.value);
          }}
        />
        <button
          className="py-2 px-4 w-64 bg-blue-500 hover:bg-blue-600 rounded text-white"
          type="submit"
        >
          Submit
        </button>
      </form>
      <p className="text-red-500 text-center">{error}</p>
    </div>
  );
};
