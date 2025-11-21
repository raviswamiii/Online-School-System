import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { MdEdit } from "react-icons/md";
import { BsChatRightFill } from "react-icons/bs";

export const PrincipalHome = () => {
  const [schoolData, setSchoolData] = useState(null);
  const [error, setError] = useState("");
  const [loggedInPrincipalId, setLoggedInPrincipalId] = useState(null);
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const { principalId } = useParams();
  const token = localStorage.getItem("token");

  const getSchoolDetails = async () => {
    try {
      if (token) {
        const decoded = jwtDecode(token);
        setLoggedInPrincipalId(decoded.id || decoded._id);
      }

      const response = await axios.get(
        `${backendURL}/schools/getSchool/${principalId}`
      );
      if (response.data.success) {
        setSchoolData(response.data.school);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Something went wrong.");
    }
  };

  useEffect(() => {
    if (principalId) getSchoolDetails();
  }, [principalId]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!schoolData) return <p>Loading...</p>;

  return (
    <div className="relative h-screen bg-[#ECF4E8] text-[#043915] flex flex-col gap-6 px-4 pt-4 overflow-auto">
      <div className="flex justify-between items-center bg-white rounded-2xl shadow-sm p-4 border border-[#B0CE88]/40">
        <div className="rounded-full h-[60px] w-[60px] flex justify-center items-center overflow-hidden border border-[#B0CE88]">
          {schoolData?.schoolLogo ? (
            <img
              className="h-full w-full object-cover"
              src={`${backendURL}${schoolData.schoolLogo}`}
              alt="school logo"
            />
          ) : (
            <span className="text-[#4C763B] font-semibold">Logo</span>
          )}
        </div>
        <div className="flex gap-3">
          <Link
            to={"/editSchool"}
            className="bg-[#4C763B] text-white flex justify-center items-center rounded-full h-8 w-8 hover:bg-[#043915] transition-all"
          >
            <MdEdit />
          </Link>
          <button className="bg-[#4C763B] text-white flex justify-center items-center rounded-full h-8 w-8 hover:bg-[#043915] transition-all">
            <BsChatRightFill />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm flex justify-center items-center p-6 border border-[#B0CE88]/40 text-[#4C763B] font-semibold">
        School's images/videos
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6 border border-[#B0CE88]/40 leading-relaxed flex justify-center items-center">
        <p className="text-center text-[#4C763B] font-semibold text-lg">
          About Us
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6 border border-[#B0CE88]/40">
        <h2 className="text-center text-[#4C763B] font-semibold text-lg">
          Meet Our Team
        </h2>
      </div>

      <footer className="bg-[#4C763B] text-[#ECF4E8] rounded-t-3xl pt-10 pb-6 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-8 border-b border-[#ECF4E8]/20">
            <div>
              <h3 className="font-semibold text-lg mb-4 text-[#FFE797] tracking-wide">
                Contact Info
              </h3>
              <ul className="space-y-2 text-sm text-[#ECF4E8]/90 leading-relaxed">
                <li>📍 Location XYZ</li>
                <li>📞 +91 0000000000</li>
                <li>✉️ info@xyzschool.edu.in</li>
                <li>🕒 Mon–Sat, 8:00 AM – 2:00 PM</li>
              </ul>
            </div>
          </div>

          <div className="text-center text-sm text-[#ECF4E8]/70 pt-6 tracking-wide">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold">
              {"XYZ School"}
            </span>
            . All rights reserved.
          </div>
        </div>
      </footer>

      {loggedInPrincipalId === principalId && (
        <div className="sticky bottom-0 w-full flex border-t border-[#B0CE88]/50 bg-white rounded-t-2xl shadow-inner">
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
      )}
    </div>
  );
};
