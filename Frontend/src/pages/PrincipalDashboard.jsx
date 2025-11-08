import React, { useEffect, useState } from "react";
import { IoAddCircleSharp } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaBars } from "react-icons/fa6";
import { MdKeyboardBackspace } from "react-icons/md";
import { LogOut } from "../components/LogOut";

export const PrincipalDashboard = () => {
  const [schoolData, setSchoolData] = useState(null);
  const [error, setError] = useState("");
  const [showMenuPage, setShowMenuPage] = useState(false);
  const [showLogoutPopUp, setShowLogoutPopUp] = useState(false);
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const { principalId } = useParams();
  const navigate = useNavigate();

  const fetchSchool = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/schoolSignIn");
        return;
      }
      const response = await axios.get(
        `${backendURL}/schools/getPrincipalDashboard/${principalId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setSchoolData(response.data.school);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong.");
    }
  };

  useEffect(() => {
    if (principalId) fetchSchool();
  }, [principalId]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!schoolData) return <p>Loading...</p>;

  return (
    <div className="h-screen w-screen px-4 py-2 relative overflow-hidden">
      <div className="h-full">
        <div className="mb-8 flex justify-between items-center">
          <p>{schoolData.schoolName}</p>
          <FaBars onClick={() => setShowMenuPage(true)} />
          <div
            className={`absolute bg-white border top-0 h-full w-full z-10 px-4 py-2 flex flex-col gap-2 transition-all duration-300 ease-in-out ${
              showMenuPage ? "right-0" : "-right-full"
            }`}
          >
            <MdKeyboardBackspace
              onClick={() => {
                setShowMenuPage(false);
              }}
              className="text-3xl"
            />
            <p onClick={() => setShowLogoutPopUp(true)}>Log Out</p>
            <div
              className={`flex justify-center items-center absolute top-0 bottom-0 left-0 right-0 translate-z-11 ${
                showLogoutPopUp ? "block" : "hidden"
              }`}
            >
              <LogOut setShowLogoutPopUp={setShowLogoutPopUp} />
            </div>
            <p>Delete Account</p>
          </div>
        </div>
        <div className="flex gap-3 border-b pb-5">
          <div className="relative">
            <div className="rounded-full h-20 w-20 flex justify-center items-center overflow-hidden">
              {schoolData.schoolLogo ? (
                <img
                  className="h-full w-full object-cover"
                  src={`${backendURL}${schoolData.schoolLogo}`}
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
            <p className="text-center">Teacher's Requests</p>
          </div>
          <div>
            <p className="text-center">00</p>
            <p className="text-center">Students' Requests</p>
          </div>
        </div>
        <div className="flex border-b">
          <div className="text-center w-full border-r">Teachers(00)</div>
          <div className="text-center w-full">Students(00)</div>
        </div>
      </div>
      <div className="flex sticky bottom-0 border-t w-full">
        <Link
          to={`/principalHome/${schoolData._id}`}
          className="w-full text-center border-r bg-white"
        >
          Home
        </Link>
        <Link
          to={`/principalDashboard/${schoolData._id}`}
          className="w-full text-center bg-white"
        >
          My Profile
        </Link>
      </div>
    </div>
  );
};
