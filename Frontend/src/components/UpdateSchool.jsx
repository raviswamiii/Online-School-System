import axios from "axios";
import React, { useRef, useState } from "react";
import { IoAddCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export const UpdateSchool = () => {
  const [changeLogo, setChangeLogo] = useState(null);
  const [changePreviewLogo, setChangePreviewLogo] = useState(null);
  const [changeName, setChangeName] = useState("");
  const [changeLocation, setChangeLocation] = useState("");
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const logoInputRef = useRef();

  const logoClickHandle = () => {
    logoInputRef.current.click();
  };

  const logoChangeHandle = (e) => {
    const file = e.target.files[0];
    if (file) {
      setChangePreviewLogo(URL.createObjectURL(file));
      setChangeLogo(file);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("changeLogo", changeLogo);
      formData.append("changeName", changeName);
      formData.append("changeLocation", changeLocation);

      const response = await axios.put(
        `${backendURL}/schools/updateSchool`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success) {
        navigate(`/principalDashboard/${response.data.school._id}`);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={onSubmitHandler}
        className="flex items-center flex-col border w-[80vw] p-4 rounded-lg gap-3"
      >
        <div className="relative">
          <div
            onClick={logoClickHandle}
            className="border h-20 w-20 rounded-full flex justify-center items-center overflow-hidden"
          >
            {changePreviewLogo ? (
              <img
                className="h-full w-full object-cover"
                src={changePreviewLogo}
                alt="Logo"
              />
            ) : (
              <p className="text-base text-gray-400">Logo</p>
            )}
          </div>
          <IoAddCircleSharp
            onClick={logoClickHandle}
            className="absolute bottom-1 right-0 rounded-full bg-white text-2xl"
          />
          <input
            onChange={logoChangeHandle}
            className="hidden"
            ref={logoInputRef}
            accept="image/*"
            type="file"
          />
        </div>

        <input
          className="border outline-none w-full px-4 py-2 rounded"
          type="text"
          placeholder="Change name..."
          value={changeName}
          onChange={(e) => setChangeName(e.target.value)}
        />
        <input
          className="border outline-none w-full px-4 py-2 rounded"
          type="text"
          placeholder="Change location..."
          value={changeLocation}
          onChange={(e) => setChangeLocation(e.target.value)}
        />
        <button
          className="border outline-none w-full rounded py-2"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
