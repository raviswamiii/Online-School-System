import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { MdEdit } from "react-icons/md";
import { BsChatRightFill } from "react-icons/bs";
import { FaCreditCard, FaWallet } from "react-icons/fa";

export const PrincipalHome = () => {
  const [schoolData, setSchoolData] = useState(null);
  const [error, setError] = useState("");
  const [loggedInPrincipalId, setLoggedInPrincipalId] = useState(null);
  const navigate = useNavigate();

  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const { principalId } = useParams();
  const token = localStorage.getItem("token");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  const touchStartHandle = (e) => setTouchStartX(e.targetTouches[0].clientX);
  const touchMoveHandle = (e) => setTouchEndX(e.targetTouches[0].clientX);
  const touchEndHandle = () => {
    if (!touchStartX || !touchEndX || !schoolData?.images) return;

    const distance = touchStartX - touchEndX;

    if (distance > 50) {
      setCurrentIndex((prev) =>
        prev === schoolData.images.length - 1 ? 0 : prev + 1
      );
    } else if (distance < -50) {
      setCurrentIndex((prev) =>
        prev === 0 ? schoolData.images.length - 1 : prev - 1
      );
    }

    setTouchStartX(0);
    setTouchEndX(0);
  };

  const getDotSize = (i) => {
    const distance = Math.abs(i - currentIndex);
    if (distance === 0) return "w-6 opacity-100";
    if (distance === 1) return "w-4 opacity-70";
    return "w-2 opacity-50";
  };

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
      setError(error.response?.data?.message || "Something went wrong.");
    }
  };

  useEffect(() => {
    if (principalId) getSchoolDetails();
  }, [principalId]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!schoolData) return <p>Loading...</p>;

  const handleChatClick = () => {
    if (!token) {
      navigate("/schoolSignIn");
      return;
    }

    if (loggedInPrincipalId === principalId) {
      navigate("/allMessages");
      return;
    }

    navigate(`/chatSection/${schoolData._id}`);
  };

  return (
    <div className="relative">
      <div className="min-h-screen bg-[#ECF4E8] text-[#043915] flex flex-col overflow-auto">
        <div
          className={`overflow-hidden ${
            schoolData?.images?.length > 0 ? "lg:h-screen" : ""
          }`}
        >
          <div className="flex justify-between items-center gap-5 bg-[#4C763B]/50 shadow-sm p-4 border border-[#B0CE88]/40">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="rounded-full h-[60px] w-[60px] bg-white flex justify-center items-center overflow-hidden border border-[#B0CE88] shrink-0">
                {schoolData?.schoolLogo ? (
                  <img
                    src={schoolData.schoolLogo}
                    className="h-full w-full object-cover"
                    alt="school logo"
                  />
                ) : (
                  <span className="text-[#4C763B] font-semibold">Logo</span>
                )}
              </div>

              <div className="text-white text-md font-semibold truncate">
                {schoolData.schoolName}
              </div>
            </div>

            <div className="flex gap-3 shrink-0">
              {loggedInPrincipalId === principalId && (
                <Link
                  to={"/editSchool"}
                  className="bg-white flex justify-center items-center rounded-full h-8 w-8 hover:bg-[#043915] transition-all"
                >
                  <MdEdit className="text-[#4C763B]" />
                </Link>
              )}

              <Link
                to={"/paymentGateway"}
                className="bg-white flex justify-center items-center rounded-full h-8 w-8 hover:bg-[#043915] transition-all"
              >
                <span className="text-[#4C763B] font-bold">₹</span>
              </Link>

              <button
                onClick={handleChatClick}
                className="bg-white flex justify-center items-center rounded-full h-8 w-8 hover:bg-[#043915] transition-all"
              >
                <BsChatRightFill className="text-[#4C763B]" />
              </button>
            </div>
          </div>

          <div
            className={` ${
              schoolData?.images?.length > 0
                ? "h-60 sm:h-90 md:h-100 lg:h-full"
                : " h-60 sm:h-[50vh]"
            } w-full relative flex flex-col justify-center items-center bg-white shadow-sm border border-[#B0CE88]/40 overflow-hidden`}
          >
            {schoolData?.images?.length > 0 ? (
              <div
                className="w-full flex transition-transform duration-300 ease-out z-10"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                onTouchStart={touchStartHandle}
                onTouchMove={touchMoveHandle}
                onTouchEnd={touchEndHandle}
              >
                {schoolData.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    className="h-full w-full object-cover shrink-0"
                    alt="school"
                  />
                ))}
              </div>
            ) : (
              <div>
                <h2 className="text-[#4C763B] font-semibold text-center my-4">
                  Gallery
                </h2>
                <p className="text-center text-[#4C763B]/50 font-semibold mb-6">
                  No images uploaded
                </p>
              </div>
            )}

            {schoolData?.images?.length > 1 && (
              <div className="absolute bottom-3 w-full flex justify-center gap-1 px-4 z-20">
                {schoolData.images.map((_, index) => {
                  const style = getDotSize(index);
                  return (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-1 rounded-full transition-all duration-300 ${style} ${
                        index === currentIndex
                          ? "bg-[#4C763B]"
                          : "bg-[#B0CE88]/70"
                      }`}
                    ></button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div
          className={`${schoolData?.aboutUs ? "h-full w-full" : "h-[50vh]"}`}
        >
          <div className="bg-white shadow-sm p-6 border border-[#B0CE88]/40 h-full w-full flex flex-col justify-center items-center">
            <h2 className="text-[#4C763B] font-semibold text-center mb-4">
              About Us
            </h2>

            {schoolData?.aboutUs ? (
              <p className="text-gray-700 text-center leading-relaxed px-2 whitespace-normal wrap-break-word">
                {schoolData.aboutUs}
              </p>
            ) : (
              <p className="text-[#4C763B]/50 font-semibold text-center">
                No description added yet.
              </p>
            )}
          </div>
        </div>

        <div
          className={`${
            schoolData?.teamMembers?.length > 0 ? "h-full w-full" : "h-[50vh]"
          }`}
        >
          <div className="h-full w-full bg-white shadow-sm p-6 border border-[#B0CE88]/40 flex flex-col justify-center items-center">
            <h2 className="text-[#4C763B] font-semibold text-center mb-6">
              Meet Our Team
            </h2>

            {schoolData?.teamMembers?.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {schoolData.teamMembers.map((member, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center p-3 shadow-md rounded-xl border border-[#B0CE88]/50"
                  >
                    <img
                      src={member.img}
                      className="h-24 w-24 rounded-full object-cover mb-3 border border-[#4C763B]"
                      alt={member.name}
                    />
                    <p className="font-semibold text-[#043915] text-center">
                      {member.name}
                    </p>
                    <p className="text-sm text-[#4C763B]/70 text-center">
                      {member.role}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-[#4C763B]/50 font-semibold">
                No team members added
              </p>
            )}
          </div>
        </div>

        <footer className="bg-[#4C763B]/50 text-[#ECF4E8] pt-10 pb-6 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-8 border-b border-[#ECF4E8]/20">
              <div>
                <h3 className="font-semibold text-lg mb-4 text-[#FFE797] tracking-wide">
                  Contact Info
                </h3>

                <ul className="space-y-2 text-sm text-white leading-relaxed">
                  <li>📍 {schoolData.address || "Not added"}</li>
                  <li>📞 {schoolData.phoneNumber || "Not added"}</li>
                  <li>✉️ {schoolData.email || "Not added"}</li>
                  <li>🕒 {schoolData.workingPeriod || "Not added"}</li>
                </ul>
              </div>
            </div>

            <div className="text-center text-sm text-white pt-6 tracking-wide">
              © {new Date().getFullYear()}{" "}
              <span className="font-semibold">{schoolData.schoolName}</span>.
              All rights reserved.
            </div>
          </div>
        </footer>
      </div>

      {loggedInPrincipalId === principalId && (
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
      )}
    </div>
  );
};
