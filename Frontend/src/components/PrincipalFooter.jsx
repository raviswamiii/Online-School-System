import React from "react";
import { Link } from "react-router-dom";

export const PrincipalFooter = () => {
  return (
    <div className="flex absolute bottom-0 border-t w-full">
      <Link to={"/principalHome"} className="w-full text-center border-r bg-white">
        Home
      </Link>
      <Link to={"/principalDashboard"} className="w-full text-center bg-white">My Profile</Link>
    </div>
  );
};
