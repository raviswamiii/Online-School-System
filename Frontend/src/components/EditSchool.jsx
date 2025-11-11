import React from "react";

export const EditSchool = () => {
  return (
    <div className="bg-[#ECF4E8] h-screen p-4 ">
      <form className="flex flex-col gap-6">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#B0CE88]/40">
          <p className="border h-[60px] w-[60px] rounded-full flex justify-center items-center">
            Logo
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#B0CE88]/40">
          <p className="text-center text-[#4C763B] font-semibold">School images/videos</p>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#B0CE88]/40">
          <p className="text-center text-[#4C763B] font-semibold">About us</p>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#B0CE88]/40">
          <p className="text-center text-[#4C763B] font-semibold">Meet our team</p>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#B0CE88]/40">
          <p className="text-center text-[#4C763B] font-semibold">Footer</p>
        </div>
      </form>
    </div>
  );
};
