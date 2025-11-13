import React, { useRef, useState } from "react";
import { IoAddCircleSharp } from "react-icons/io5";
import { FaArrowAltCircleLeft } from "react-icons/fa";

export const EditSchool = () => {
  const [logoPreview, setLogoPreview] = useState(null);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

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
    const files = Array.from(e.target.files);
    if (files) {
      const newPreview = files.map((file) => URL.createObjectURL(file));
      setImagesPreview((prev) => [...prev, ...newPreview]);
    }
  };

  const touchStartHandle = (e) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const touchMoveHandle = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const touchEndHandle = () => {
    if (!touchStartX || !touchEndX) return;

    const distance = touchStartX - touchEndX;

    if (distance > 50) {
      setCurrentIndex((prev) =>
        prev === imagesPreview.length - 1 ? 0 : prev + 1
      );
    } else if (distance < -50) {
      setCurrentIndex((prev) =>
        prev === 0 ? imagesPreview.length - 1 : prev - 1
      );
    }

    setTouchEndX(0);
    setTouchStartX(0);
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
          {imagesPreview.length > 0 ? (
              <img
                className="h-full w-full object-cover"
                src={imagesPreview[currentIndex]}
                alt="School images"
                onTouchStart={touchStartHandle}
                onTouchEnd={touchEndHandle}
                onTouchMove={touchMoveHandle}
              />
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
