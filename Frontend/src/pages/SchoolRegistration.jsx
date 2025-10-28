import React from "react";
import { IoAddCircleSharp } from "react-icons/io5";

export const SchoolRegistration = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <form className="flex flex-col items-center" action="">
        <div className="relative">
          <div  className="border rounded-full flex justify-center items-center h-[70px] w-[70px] overflow-hidden">
            logo
          </div>
          < IoAddCircleSharp className="absolute text-2xl bottom-0 right-0 bg-white rounded-full" />
        </div>
        <input type="text" placeholder="School Name..." />
        <input type="email" placeholder="School Email..." />
        <input type="password" placeholder="School Password..." />
      </form>
    </div>
  );
};
