import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

export const DeleteAccount = ({ setDeleteAccountPopUp }) => {
  const navigate = useNavigate();
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const deleteAccountHandle = async () => {
    try {
      const response = await axios.post(
        `${backendURL}/schools/deleteSchoolAccount`,
        null,
        {
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response.data.success) {
        localStorage.removeItem("token");
        navigate("/");
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error(error.response?.data?.message);
    }
  };
  return (
    <div className="border flex flex-col justify-center items-center gap-4 rounded px-4 py-2 w-[70%]">
      <div className="text-center">
        <p className="text-gray-600">
          Are you sure you want to delete this account? This action cannot be undone.
        </p>
      </div>
      <div>
        <button
          onClick={deleteAccountHandle}
          className="border px-5 py-1 rounded mr-2"
        >
          Delete
        </button>
        <button
          onClick={() => setDeleteAccountPopUp(false)}
          className="border px-5 py-1 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
