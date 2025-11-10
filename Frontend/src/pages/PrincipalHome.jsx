import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

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
    <div className="min-h-screen bg-[#ECF4E8] text-[#043915] flex flex-col gap-6 p-4 overflow-auto">
      {/* Header */}
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
          <button className="bg-[#4C763B] text-white px-4 py-2 rounded-xl hover:bg-[#043915] transition-all">
            Chat
          </button>
        </div>
      </div>

      {/* School Media Section */}
      <div className="bg-white rounded-2xl shadow-sm flex justify-center items-center p-6 border border-[#B0CE88]/40 text-[#4C763B] font-semibold">
        School's images/videos
      </div>

      {/* Description Section */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-[#B0CE88]/40 leading-relaxed">
        <p>
         About Us
        </p>
      </div>

      {/* Team Section */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-[#B0CE88]/40">
        <h2 className="text-center text-[#4C763B] font-semibold mb-4 text-lg">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="bg-[#B0CE88]/20 rounded-xl p-6 flex flex-col items-center border border-[#B0CE88]/40"
            >
              <div className="bg-[#4C763B] text-white rounded-full h-16 w-16 flex justify-center items-center font-bold">
                Img
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🌿 Detailed Footer */}
      <footer className="bg-[#4C763B] text-[#ECF4E8] mt-10 rounded-t-3xl pt-10 pb-6 px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 border-b border-[#B0CE88]/40 pb-8">
          {/* About */}
          <div>
            <h3 className="font-semibold text-lg mb-3 text-[#FFE797]">
              About Us
            </h3>
            <p className="text-sm leading-relaxed text-[#ECF4E8]/80">
              {schoolData?.schoolName || "Our School"} is dedicated to nurturing
              young minds with knowledge, creativity, and values. We aim to
              inspire lifelong learning and curiosity in every student.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-3 text-[#FFE797]">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-[#B0CE88] transition">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to={`/principalDashboard/${schoolData?._id}`}
                  className="hover:text-[#B0CE88] transition"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#B0CE88] transition">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#B0CE88] transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-3 text-[#FFE797]">
              Contact Info
            </h3>
            <ul className="space-y-2 text-sm text-[#ECF4E8]/80">
              <li>📍 {schoolData?.schoolLocation || "Jaipur, Rajasthan"}</li>
              <li>📧 {schoolData?.schoolEmail || "info@yourschool.com"}</li>
              <li>📞 +91 98765 43210</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold text-lg mb-3 text-[#FFE797]">
              Follow Us
            </h3>
            <div className="flex space-x-4 text-xl">
              <a href="#" className="hover:text-[#B0CE88] transition">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-[#B0CE88] transition">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-[#B0CE88] transition">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-[#B0CE88] transition">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-[#ECF4E8]/70 pt-6">
          © {new Date().getFullYear()} {schoolData?.schoolName || "Your School"}. All rights reserved.
        </div>
      </footer>

      {/* Bottom Navigation */}
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
