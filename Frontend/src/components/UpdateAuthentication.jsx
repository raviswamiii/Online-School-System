import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const UpdateAuthentication = () => {
  const [changeEmail, setChangeEmail] = useState("");
  const [changePassword, setChangePassword] = useState("");
  const [error, setError] = useState("");
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (!changeEmail && !changePassword) {
        setError("Please update at least one field.");
        return;
      }

      const response = await axios.put(
        `${backendURL}/schools/updateAuthentication`,
        { changeEmail, changePassword },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate(`/principalDashboard/${response.data.school._id}`);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      setError(error.response?.data?.message);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <form
        onSubmit={onSubmitHandler}
        className="flex items-center flex-col border w-[80vw] p-4 rounded-lg gap-3"
      >
        <input
          className="border outline-none w-full px-4 py-2 rounded"
          type="email"
          placeholder="Change email..."
          value={changeEmail}
          onChange={(e) => setChangeEmail(e.target.value)}
        />
        <input
          className="border outline-none w-full px-4 py-2 rounded"
          type="text"
          placeholder="Change password..."
          value={changePassword}
          onChange={(e) => setChangePassword(e.target.value)}
        />
        <button
          className="border outline-none w-full rounded py-2"
          type="submit"
        >
          Submit
        </button>
      </form>
      <p className="text-red-500 text-base mt-2 text-center">{error}</p>
    </div>
  );
};
