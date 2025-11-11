import React, { useRef, useState } from "react";
import { IoAddCircleSharp } from "react-icons/io5";
import { FaArrowAltCircleLeft } from "react-icons/fa";

export const EditSchool = () => {
  const [logoPreview, setLogoPreview] = useState(null);
  const [imagesPreview, setImagesPreview] = useState(null);
  const logoInputRef = useRef();
  const imageInputRef = useRef();

  const logoClickHandle = () => {
    logoInputRef.current.click();
  };

  const imageClickHandle = () => {
    imageInputRef.current.click();
  };

  const getLogoHandle = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const getImageHandle = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagesPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="bg-[#ECF4E8] h-screen ">
      <form className="">
        <div className=" bg-[#B0CE88]/40 p-4 shadow-sm">
          <div className="relative h-[60px] w-[60px]">
            <div
              onClick={logoClickHandle}
              className="border-[#B0CE88]/40 bg-white h-[60px] w-[60px] rounded-full flex justify-center items-center overflow-hidden"
            >
              {logoPreview ? (
                <img
                  className="h-full w-full object-cover"
                  src={logoPreview}
                  alt="Logo"
                />
              ) : (
                <p>Logo</p>
              )}
            </div>
            <IoAddCircleSharp
              onClick={logoClickHandle}
              className="text-xl absolute right-0 bottom-0 bg-white rounded-full"
            />
            <input
              onChange={getLogoHandle}
              ref={logoInputRef}
              className="hidden"
              accept="image/*"
              type="file"
            />
          </div>
        </div>

        <div className="relative flex justify-center items-center bg-white h-[40vh] shadow-sm border border-[#B0CE88]/40 overflow-hidden">
          <IoAddCircleSharp
            onClick={imageClickHandle}
            className="text-[#4C763B] rounded-full text-2xl absolute right-3 top-3 bg-white z-10"
          />
          {imagesPreview ? (
            <div className="h-full w-full relative">
              <div className="absolute top-30 left-3">
                <FaArrowAltCircleLeft className="text-3xl text-[#4C763B] bg-white rounded-full" />
              </div>
              <img
                className="h-full w-full object-cover"
                src={imagesPreview}
                alt="School images"
              />
              <div className="absolute top-30 right-3">
                <FaArrowAltCircleLeft className="text-3xl text-[#4C763B] bg-white rounded-full rotate-180" />
              </div>
            </div>
          ) : (
            <p className="text-center text-[#4C763B] font-semibold">
              Click here to get images
            </p>
          )}
          <input
            onChange={getImageHandle}
            ref={imageInputRef}
            className="hidden"
            accept="image/*"
            type="file"
          />
        </div>

        <div className="flex justify-center items-center bg-white p-4 h-[40vh] shadow-sm border border-[#B0CE88]/40">
          <p className="text-center text-[#4C763B] font-semibold">About us</p>
        </div>

        <div className="flex justify-center items-center bg-white p-4 h-[40vh]  shadow-sm border border-[#B0CE88]/40">
          <p className="text-center text-[#4C763B] font-semibold">
            Meet our team
          </p>
        </div>

        <div className="flex justify-center items-center bg-white p-4 h-[40vh]  shadow-sm border border-[#B0CE88]/40">
          <p className="text-center text-[#4C763B] font-semibold">Footer</p>
        </div>
      </form>
    </div>
  );
};
