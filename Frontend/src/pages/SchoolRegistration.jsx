import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoAddCircleSharp } from "react-icons/io5";
import { MdSchool } from "react-icons/md";
import axios from "axios";

export const SchoolRegistration = () => {
  const [logo, setLogo] = useState(null);
  const [previewLogo, setPreviewLogo] = useState(null);
  const logoInputRef = useRef();

  const [schoolName, setSchoolName] = useState("");
  const [schoolEmail, setSchoolEmail] = useState("");
  const [schoolPassword, setSchoolPassword] = useState("");
  const [schoolAddress, setSchoolAddress] = useState("");

  const [error, setError] = useState("");

  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const handleLogoClick = () => logoInputRef.current.click();

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreviewLogo(URL.createObjectURL(file));
    setLogo(file);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    console.log({
      schoolName,
      schoolEmail,
      schoolPassword,
      schoolAddress,
    });

    // ✅ STRONG VALIDATION
    if (!schoolName || !schoolEmail || !schoolPassword || !schoolAddress) {
      return setError("All fields are required.");
    }

    try {
      const formdata = new FormData();

      formdata.append("logo", logo);
      formdata.append("schoolName", schoolName);
      formdata.append("schoolEmail", schoolEmail);
      formdata.append("schoolPassword", schoolPassword);
      formdata.append("schoolAddress", schoolAddress);

      const response = await axios.post(
        `${backendURL}/schools/registerSchool`,
        formdata,
      );

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        navigate(`/principalDashboard/${response.data.school._id}`);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.log(error);
      console.log(error.response?.data);
      setError(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-[#ECF4E8] flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-sm border p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="h-12 w-12 rounded-full bg-[#4C763B]/10 flex items-center justify-center mb-3">
            <MdSchool className="text-2xl text-[#4C763B]" />
          </div>

          <h1 className="text-2xl font-semibold text-[#043915]">
            Register School
          </h1>
        </div>

        <form onSubmit={onSubmitHandler} className="space-y-4">
          {/* LOGO */}
          <div className="flex justify-center">
            <div className="relative">
              <div
                onClick={handleLogoClick}
                className="h-[90px] w-[90px] rounded-full border flex items-center justify-center overflow-hidden cursor-pointer"
              >
                {previewLogo ? (
                  <img
                    src={previewLogo}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-sm text-center">Upload <br/> Logo</span>
                )}
              </div>

              <IoAddCircleSharp
                onClick={handleLogoClick}
                className="absolute rounded-full bottom-1 right-0 text-2xl text-[#4C763B] bg-white"
              />

              <input
                ref={logoInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoChange}
              />
            </div>
          </div>

          <input
            type="text"
            placeholder="School Name"
            value={schoolName}
            onChange={(e) => setSchoolName(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border"
          />

          <input
            type="email"
            placeholder="School Email"
            value={schoolEmail}
            onChange={(e) => setSchoolEmail(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border"
          />

          <input
            type="text"
            placeholder="Address"
            value={schoolAddress}
            onChange={(e) => setSchoolAddress(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border"
          />

          <input
            type="password"
            placeholder="Password"
            value={schoolPassword}
            onChange={(e) => setSchoolPassword(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border"
          />

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <button className="w-full py-2.5 rounded-lg bg-[#4C763B] text-white">
            Register School
          </button>
        </form>
      </div>
    </div>
  );
};
