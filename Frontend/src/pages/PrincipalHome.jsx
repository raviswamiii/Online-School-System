import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

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
    <div className="h-screen overflow-auto px-4 pt-4 flex flex-col gap-4 ">
      <div className="flex border p-4 justify-between items-center">
        <div className="rounded-full h-[60px] w-[60px] flex justify-center items-center overflow-hidden">
          {schoolData?.schoolLogo ? (
            <img
              className="h-full w-full object-cover"
              src={`${backendURL}${schoolData.schoolLogo}`}
              alt="school logo"
            />
          ) : (
            "Logo"
          )}
        </div>
        <div className="flex gap-3">
          <div>Chat</div>
        </div>
      </div>

      <div className="border flex justify-center items-center">
        School's images/videos
      </div>

      <div className="border">
        <p className="text-center p-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta atque
          molestias necessitatibus vel voluptatum provident dolor, labore,
          obcaecati perferendis est odit reiciendis numquam minima debitis
          veniam? Earum minus quaerat quia unde cum sapiente, culpa accusamus,
          exercitationem hic voluptates aliquid dignissimos ex? Maxime nam quae
          eum autem placeat consequatur ab cumque commodi non, libero illum!
          Eveniet corrupti quas itaque perspiciatis veniam cupiditate officiis,
          aperiam veritatis alias quasi reprehenderit amet esse soluta illo,
          ratione expedita.
        </p>
      </div>

      <div className="border flex flex-col justify-center items-center space-y-4">
        <p>Meet Our Team</p>
        <div className="grid grid-cols-2 gap-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="border px-4 py-6 rounded">
              <div className="border p-10 rounded-full h-10 w-10 flex justify-center items-center">
                img
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center items-center border">
        <p>Footer</p>
      </div>

        {loggedInPrincipalId === principalId && (
          <div className="sticky bottom-0 w-full flex border-t">
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
        )}
      </div>
  );
};
