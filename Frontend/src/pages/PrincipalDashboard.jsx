import React from "react";
import { IoAddCircleSharp } from "react-icons/io5";

export const PrincipalDashboard = () => {
  return (
    <div className="px-4 py-2 h-screen">
      <div className="h-full relative">
      <p className="mb-8">Principal name</p>
      <div className="flex gap-3 border-b pb-5">
        <div className="relative">
          <div className="border rounded-full h-20 w-20 flex justify-center items-center">
            Pro pic
          </div>
          <IoAddCircleSharp className="absolute bottom-0 right-0 rounded-full bg-white text-2xl" />
        </div>
        <div>
          <p className="text-center">00</p>
          <p className="text-center">Teacher's Request's</p>
        </div>
        <div>
          <p className="text-center">00</p>
          <p className="text-center">Students's Request's</p>
        </div>
      </div>
      <div className="flex border-b">
        <div className="text-center w-full border-r">Teachers(00)</div>
        <div className="text-center w-full">Students(00)</div>
      </div>
      <div className="flex absolute bottom-0 border-t w-full">
        <p className="w-full text-center border-r">Home</p>
        <p className="w-full text-center">My Profile</p>
      </div>
    </div>
    </div>
  );
};
