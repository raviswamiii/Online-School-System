import React from "react";
import { Route, Routes } from "react-router-dom";
import { RegisterYourself } from "./pages/RegisterYourself";
import { SchoolRegistration } from "./pages/SchoolRegistration";
import { CollegeRegistration } from "./pages/CollegeRegistration";
import { SoloRegistration } from "./pages/SoloRegistration";
import { PrincipalDashboard } from "./pages/PrincipalDashboard";
import { Home } from "./pages/Home";
import { PrincipalHome } from "./pages/PrincipalHome";
import { SignIn } from "./pages/SignIn";
import { SchoolSignIn } from "./pages/SchoolSignIn";
import { CollegeSignIn } from "./pages/CollegeSignIn";
import { SoloSignIn } from "./pages/SoloSignIn";
import { ProtectRoutes } from "./pages/ProtectRoutes";
import { UpdateSchool } from "./components/UpdateSchool";

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registerYourself" element={<RegisterYourself />} />
        <Route path="/schoolRegistration" element={<SchoolRegistration />} />
        <Route path="/collegeRegistration" element={<CollegeRegistration />} />
        <Route path="/soloRegistration" element={<SoloRegistration />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/schoolSignIn" element={<SchoolSignIn />} />
        <Route path="/collegeSignIn" element={<CollegeSignIn />} />
        <Route path="/soloSignIn" element={<SoloSignIn />} />
        <Route path="/principalDashboard/:principalId" element={ <ProtectRoutes><PrincipalDashboard /></ProtectRoutes>} />
        <Route path="/principalHome/:principalId" element={<PrincipalHome />} />
        <Route path="/edit" element={<UpdateSchool />} />
      </Routes>
    </div>
  );
};
