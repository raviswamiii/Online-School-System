import React, { useEffect, useState } from "react";
import { PrincipalFooter } from "../components/PrincipalFooter";
import axios from "axios";
import { useParams } from "react-router-dom";

export const PrincipalHome = () => {
  const [schoolData, setSchoolData] = useState(null);
  const [error, setError] = useState("");
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const { principalId } = useParams();

  const getSchoolDetails = async () => {
    try {
      const response = await axios.get(`${backendURL}/schools/getSchool/${principalId}`);
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

  return (
    <div className="overflow-auto space-y-4">
      <div className="flex border p-4 justify-between">
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
        <div>Chat</div>
      </div>

      <div className="border h-60 flex justify-center items-center">
        School's images/videos
      </div>

      <div className="border">
        <p className="text-center">
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

      <div className="h-80 flex justify-center items-center">
        <p>Footer</p>
      </div>
    </div>
  );
};
