import React, { useRef, useState } from "react";
import { IoAddCircleSharp } from "react-icons/io5";
import { MdAdd } from "react-icons/md";

export const EditSchool = () => {
  const [logoPreview, setLogoPreview] = useState(null);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const logoInputRef = useRef();
  const imageInputRef = useRef();
  const teamInputRef = useRef();

  const logoClickHandle = () => {
    logoInputRef.current.click();
  };

  const imageClickHandle = () => {
    imageInputRef.current.click();
  };

  const teamClickHandle = (index) => {
    teamInputRef.current.dataset.index = index;
    teamInputRef.current.click();
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

  const getTeamHandle = (e) => {
    const file = e.target.files[0];
    const index = teamInputRef.current.dataset.index;
    const imageURL = URL.createObjectURL(file);
    setTeamMembers((prev) => {
      const updated = [...prev];
      updated[index].img = imageURL;
      return updated;
    });
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

  const getDotSize = (i) => {
    const distance = Math.abs(i - currentIndex);

    if (distance === 0) return "w-6 opacity-100";
    if (distance === 1) return "w-4 opacity-70";
    if (distance === 0) return "w-2 opacity-50";
    return "w-1 opacity-30";
  };

  const teamCardHandle = () => {
    setTeamMembers((prev) => [
      ...prev,
      { img: null, name: "Ravi Swami", role: "Web Developer" },
    ]);
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

        <div className="relative flex flex-col justify-center items-center bg-white h-[40vh] shadow-sm border border-[#B0CE88]/40 overflow-hidden">
          <IoAddCircleSharp
            onClick={imageClickHandle}
            className="text-[#4C763B] rounded-full text-2xl absolute right-3 top-3 bg-white z-10"
          />
          {imagesPreview.length > 0 ? (
            <div
              className="h-full w-full flex transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              onTouchStart={touchStartHandle}
              onTouchMove={touchMoveHandle}
              onTouchEnd={touchEndHandle}
            >
              {imagesPreview.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  className="h-full w-full object-cover shrink-0"
                  alt="School"
                />
              ))}
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

          {imagesPreview.length > 1 && (
            <div className="absolute bottom-3 w-full flex justify-center gap-1 px-4">
              {imagesPreview.map((_, index) => {
                const style = getDotSize(index);
                return (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-1 rounded-full transition-all duration-300 ${style} ${
                      index === currentIndex
                        ? "bg-[#4C763B]"
                        : "bg-[#B0CE88]/70 hover:bg-[#B0CE88]"
                    }`}
                  ></button>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex justify-center items-center bg-white p-4 h-[40vh] shadow-sm border border-[#B0CE88]/40">
          <textarea
            className="h-full w-full border border-gray-300 rounded-md p-3 outline-none focus:border-[#B0CE88] resize-none"
            placeholder="About Us"
          />
        </div>

        <div className="relative bg-white p-4 min-h-[40vh] shadow-sm border border-[#B0CE88]/40">
          <p className="text-center text-[#4C763B] font-semibold mb-4">
            Add Team Members
          </p>

          <IoAddCircleSharp
            onClick={teamCardHandle}
            className="text-[#4C763B] rounded-full text-2xl absolute right-3 top-3 bg-white z-10"
          />

          <div className=" grid grid-cols-2 gap-y-6 place-items-center ">
            {teamMembers.map((member, index) => {
              return (
                <div
                  className="bg-[#ECF4E8] rounded-2xl p-6 flex flex-col items-center text-center 
                  border border-[#B0CE88]/40 w-36 shadow-sm hover:shadow-md 
                  transition-all cursor-pointer"
                  key={index}
                >
                  <div className="bg-[#4C763B] text-white rounded-full h-20 w-20 flex justify-center items-center shadow-md overflow-hidden">
                    {member.img ? (
                      <img
                        className="h-full w-full object-cover"
                        src={member.img}
                        alt="Team Member"
                      />
                    ) : (
                      <MdAdd
                        onClick={() => teamClickHandle(index)}
                        className="text-3xl"
                      />
                    )}
                  </div>
                  <div className="mt-3 space-y-1">
                    <p className="font-semibold text-gray-800 text-sm">
                      {member.name}
                    </p>
                    <p className="text-gray-600 text-xs">{member.role}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <input
            onChange={getTeamHandle}
            ref={teamInputRef}
            className="hidden"
            type="file"
            accept="image/*"
          />
        </div>

        <div className="flex justify-center items-center bg-white p-4 h-[40vh]  shadow-sm border border-[#B0CE88]/40">
          <p className="text-center text-[#4C763B] font-semibold">Footer</p>
        </div>
      </form>
    </div>
  );
};
