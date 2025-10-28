import React from "react";
import { Link } from "react-router-dom";

export const RegisterYourself = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <p>Register yourself as:</p>
      <div className="flex flex-col">
        <Link to={"/schoolRegistration"}>School</Link>
        <Link to={"/collegeRegistration"}>College</Link>
        <Link to={"/soloRegistration"}>Solo</Link>
      </div>
    </div>
  );
};
