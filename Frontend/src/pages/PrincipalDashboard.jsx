import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaBars } from "react-icons/fa6";
import { MdKeyboardBackspace } from "react-icons/md";
import { LogOut } from "../components/LogOut";
import { DeleteAccount } from "../components/DeleteAccount";

export const PrincipalDashboard = () => {
  const [schoolData, setSchoolData] = useState(null);
  const [error, setError] = useState("");
  const [showMenuPage, setShowMenuPage] = useState(false);
  const [deleteAccountPopUp, setDeleteAccountPopUp] = useState(false);
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
        { headers: { Authorization: `Bearer ${token}` } },
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

  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  if (!schoolData) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-[#ECF4E8] flex flex-col relative overflow-hidden">
      <div className="bg-white px-4 py-3 shadow-sm border-b border-[#B0CE88]/50">
        <div className="mb-8 flex justify-between items-center">
          <p className="font-semibold text-[#043915] truncate">
            {schoolData.schoolName}
          </p>
          <FaBars
            className="text-xl text-[#4C763B] cursor-pointer"
            onClick={() => setShowMenuPage(true)}
          />

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

            <p
              onClick={() => {
                setDeleteAccountPopUp(true);
              }}
            >
              Delete Account
            </p>
            <div
              className={`flex justify-center items-center absolute top-0 bottom-0 left-0 right-0 translate-z-11 ${
                deleteAccountPopUp ? "block" : "hidden"
              }`}
            >
              <DeleteAccount setDeleteAccountPopUp={setDeleteAccountPopUp} />
            </div>
            <Link to={"/updateAuthentication"}>Update Authentication</Link>
          </div>
        </div>
      </div>

      <main className="flex-1 px-4 py-6 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-[#B0CE88]/50 p-5 flex items-center gap-6">
          <div className="h-20 w-20 rounded-full overflow-hidden border border-[#4C763B]">
            {schoolData.schoolLogo ? (
              <img
                src={schoolData.schoolLogo}
                alt="School Logo"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-sm">
                Logo
              </div>
            )}
          </div>

          <div className="flex flex-1 justify-around text-center">
            <div>
              <p className="text-xl font-semibold">00</p>
              <p className="text-sm text-[#4C763B]/70">Teacher Requests</p>
            </div>
            <div>
              <p className="text-xl font-semibold">00</p>
              <p className="text-sm text-[#4C763B]/70">Student Requests</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-[#B0CE88]/50 overflow-hidden">
          <div className="flex text-center font-semibold text-[#043915]">
            <div className="w-1/2 py-3 border-r border-[#B0CE88]/50">
              Teachers (00)
            </div>
            <div className="w-1/2 py-3">Students (00)</div>
          </div>
        </div>
      </main>

      <div className="sticky bottom-0 w-full flex border-t border-[#B0CE88]/50 bg-white shadow-inner">
        <Link
          to={`/principalHome/${schoolData._id}`}
          className="w-full text-center py-3 border-r border-[#B0CE88]/50 text-[#043915] font-semibold hover:bg-[#B0CE88]/30 transition-all"
        >
          Home
        </Link>

        <Link
          to={`/principalDashboard/${schoolData._id}`}
          className="w-full text-center py-3 text-[#043915] font-semibold hover:bg-[#B0CE88]/30 transition-all"
        >
          My Profile
        </Link>
      </div>
    </div>
  );
};
