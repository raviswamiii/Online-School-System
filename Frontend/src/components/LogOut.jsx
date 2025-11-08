import React from "react";

export const LogOut = ({ setShowLogoutPopUp }) => {
  return (
    <div className="border flex flex-col justify-center items-center gap-2 rounded px-4 py-2">
      <p className="text-xl">Log Out</p>
      <div>
        <button className="border px-5 py-1 rounded mr-2">Confirm</button>
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
