import React, { useEffect, useState } from "react";
import { IoAddCircleSharp } from "react-icons/io5";
import { PrincipalFooter } from "../components/PrincipalFooter";
import { Link } from "react-router-dom";
import axios from "axios";

export const PrincipalDashboard = () => {
  const [schoolData, setSchoolData] = useState([]);
  const [error, setError] = useState("");
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const fetchSchool = async () => {
    try {
      const response = await axios.get(`${backendURL}/schools/getSchools`);
      if (response.data.success) {
        setSchoolData(response.data.schools);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong.");
    }
  };

  useEffect(() => {
    fetchSchool();
  }, []);
  return (
    <div>
      {error && <p>{error}</p>}
      {schoolData.map((school) => (
        <div key={school._id} className="px-4 py-2 h-screen">
          <div className="h-full relative">
            <p className="mb-8">Principal name</p>
            <div className="flex gap-3 border-b pb-5">
              <div className="relative">
                <div className="rounded-full h-20 w-20 flex justify-center items-center overflow-hidden">
                  {school?.schoolLogo ? (
                    <img
                      className="h-full w-full object-cover"
                      src={`${backendURL}${school.schoolLogo}`}
                      alt="School Logo"
                    />
                  ) : (
                    "Logo"
                  )}
                </div>
                <IoAddCircleSharp className="absolute bottom-0 right-0 rounded-full bg-white text-2xl" />
              </div>
              <div>
                <p className="text-center">00</p>
                <p className="text-center">Teacher's Request's</p>
              </div>
              <div>
                <p className="text-center">00</p>
                <p className="text-center">Students's Request's</p>
              </div>
            </div>
            <div className="flex border-b">
              <div className="text-center w-full border-r">Teachers(00)</div>
              <div className="text-center w-full">Students(00)</div>
            </div>
            <div className="flex absolute bottom-0 border-t w-full">
              <Link
                to={`/principalHome/${school._id}`}
                className="w-full text-center border-r bg-white"
              >
                Home
              </Link>
              <Link
                to={"/principalDashboard"}
                className="w-full text-center bg-white"
              >
                My Profile
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
