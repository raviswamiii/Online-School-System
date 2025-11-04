import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export const ProtectRoutes = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(()=>{
    if (!token) {
    navigate("/schoolSignIn");
  }
  },[navigate, token])
  return <div>{children}</div>;
};
