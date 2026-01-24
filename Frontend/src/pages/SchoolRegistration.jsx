import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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
  const [schoolLocation, setSchoolLocation] = useState("");
  const [error, setError] = useState("");

  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewLogo(URL.createObjectURL(file));
      setLogo(file);
    }
  };

  const handleLogoClick = () => logoInputRef.current.click();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!schoolName || !schoolEmail || !schoolPassword || !schoolLocation) {
      setError("All fields are required.");
      return;
    }

    try {
      const formdata = new FormData();
      formdata.append("schoolName", schoolName);
      formdata.append("schoolEmail", schoolEmail);
      formdata.append("schoolPassword", schoolPassword);
      formdata.append("schoolLocation", schoolLocation);
      if (logo) formdata.append("logo", logo);

      const response = await axios.post(
        `${backendURL}/schools/registerSchool`,
        formdata,
      );
      console.log(response.data.school.schoolLogo);

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
    <div className="min-h-screen bg-[#ECF4E8] flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-sm border border-[#B0CE88]/50 p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="h-12 w-12 rounded-full bg-[#4C763B]/10 flex items-center justify-center mb-3">
            <MdSchool className="text-2xl text-[#4C763B]" />
          </div>
          <h1 className="text-2xl font-semibold text-[#043915]">
            Register School
          </h1>
          <p className="text-sm text-[#4C763B]/70">
            Create your school profile
          </p>
        </div>

        <form onSubmit={onSubmitHandler} className="space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <div
                onClick={handleLogoClick}
                className="h-[90px] w-[90px] rounded-full border border-[#B0CE88]/50 flex items-center justify-center overflow-hidden cursor-pointer hover:bg-[#ECF4E8]/60 transition-all"
              >
                {previewLogo ? (
                  <img
                    src={previewLogo}
                    alt="School Logo"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-sm text-[#4C763B]/70">Upload Logo</span>
                )}
              </div>

              <IoAddCircleSharp
                onClick={handleLogoClick}
                className="absolute bottom-0 right-0 text-2xl text-[#4C763B] bg-white rounded-full cursor-pointer"
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
            className="w-full px-4 py-2.5 rounded-lg border border-[#B0CE88]/50 outline-none focus:ring-2 focus:ring-[#4C763B]/40"
          />

          <input
            type="email"
            placeholder="School Email"
            value={schoolEmail}
            onChange={(e) => setSchoolEmail(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-[#B0CE88]/50 outline-none focus:ring-2 focus:ring-[#4C763B]/40"
          />

          <input
            type="text"
            placeholder="School Location"
            value={schoolLocation}
            onChange={(e) => setSchoolLocation(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-[#B0CE88]/50 outline-none focus:ring-2 focus:ring-[#4C763B]/40"
          />

          <input
            type="password"
            placeholder="Password"
            value={schoolPassword}
            onChange={(e) => setSchoolPassword(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-[#B0CE88]/50 outline-none focus:ring-2 focus:ring-[#4C763B]/40"
          />

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-[#4C763B] text-white font-semibold hover:bg-[#043915] transition-all"
          >
            Register School
          </button>
        </form>

        <div className="text-center text-sm text-[#4C763B]/70 mt-6">
          Already registered?{" "}
          <Link
            to="/schoolSignIn"
            className="font-semibold text-[#4C763B] hover:underline"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};
