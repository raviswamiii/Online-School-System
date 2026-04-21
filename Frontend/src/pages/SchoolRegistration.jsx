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

  // ✅ LOCATION STATES
  const [locationInput, setLocationInput] = useState("");
  const [latitude, setLatitude] = useState(null); // ✅ FIX
  const [longitude, setLongitude] = useState(null); // ✅ FIX
  const [suggestions, setSuggestions] = useState([]);
  const dropdownRef = useRef();

  const [error, setError] = useState("");

  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
  const navigate = useNavigate();

  const handleLogoClick = () => logoInputRef.current.click();

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreviewLogo(URL.createObjectURL(file));
    setLogo(file);
  };

  // ✅ MAPBOX AUTOCOMPLETE
  useEffect(() => {
    const delay = setTimeout(async () => {
      if (!locationInput) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${locationInput}.json?access_token=${MAPBOX_TOKEN}&autocomplete=true&limit=5`,
        );

        setSuggestions(res.data.features);
        console.log(res.data.features);
      } catch (err) {
        console.log(err);
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [locationInput]);

  // ✅ CLOSE DROPDOWN
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setSuggestions([]);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  // ✅ SELECT LOCATION (IMPORTANT)
  const handleSelectLocation = (place) => {
    if (!place?.center) return;

    setLatitude(Number(place.center[1]));
    setLongitude(Number(place.center[0]));
    setLocationInput(place.place_name);
    setSuggestions([]);

    // ✅ close keyboard (important on mobile)
    document.activeElement.blur();
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // ✅ STRONG VALIDATION
    if (!schoolName || !schoolEmail || !schoolPassword) {
      return setError("All fields are required.");
    }

    if (latitude === null || longitude === null) {
      return setError("Please select location from dropdown.");
    }

    try {
      const formdata = new FormData();

      formdata.append("logo", logo);
      formdata.append("schoolName", schoolName);
      formdata.append("schoolEmail", schoolEmail);
      formdata.append("schoolPassword", schoolPassword);

      // ✅ SEND CLEAN DATA
      formdata.append("latitude", latitude);
      formdata.append("longitude", longitude);
      formdata.append("address", locationInput);

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
                  <span className="text-sm">Upload Logo</span>
                )}
              </div>

              <IoAddCircleSharp
                onClick={handleLogoClick}
                className="absolute bottom-0 right-0 text-2xl text-[#4C763B]"
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

          {/* LOCATION */}
          <div className="relative" ref={dropdownRef}>
            <input
              type="text"
              placeholder="School Location"
              value={locationInput}
              onChange={(e) => {
                setLocationInput(e.target.value);
                setLatitude(null);
                setLongitude(null);
              }}
              className="w-full px-4 py-2.5 rounded-lg border"
            />

            {suggestions.length > 0 && (
              <div className="absolute w-full bg-white border mt-1 rounded-lg shadow-lg max-h-56 overflow-y-auto z-10 touch-manipulation">
                {" "}
                {suggestions.map((place, index) => (
                  <div
                    key={index}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleSelectLocation(place);
                    }}
                    onTouchEnd={(e) => {
                      e.preventDefault();
                      handleSelectLocation(place);
                    }}
                    className="p-3 cursor-pointer hover:bg-gray-100"
                  >
                    <p className="font-medium">{place.text}</p>
                    <p className="text-xs text-gray-500">{place.place_name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

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
