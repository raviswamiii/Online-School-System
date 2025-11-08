import React from "react";
import { useNavigate } from "react-router-dom";

export const LogOut = ({ setShowLogoutPopUp }) => {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/schoolSignIn");
  };
  return (
    <div className="border flex flex-col justify-center items-center gap-4 rounded px-4 py-2">
      <div className="text-center">
        <p className="text-xl font-semibold">Log Out</p>
        <p className="text-gray-600">Are you sure you want to log out?</p>
      </div>
      <div>
        <button onClick={logOut} className="border px-5 py-1 rounded mr-2">
          Confirm
        </button>
        <button
          onClick={() => setShowLogoutPopUp(false)}
          className="border px-5 py-1 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
