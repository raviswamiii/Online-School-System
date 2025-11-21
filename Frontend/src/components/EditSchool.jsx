import axios from "axios";
import React, { useRef, useState } from "react";
import { IoAddCircleSharp } from "react-icons/io5";
import { MdAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export const EditSchool = () => {
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  const [schoolName, setSchoolName] = useState("");

  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const [aboutUs, setAboutUs] = useState("");

  const [teamMembers, setTeamMembers] = useState([]);

  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [workingPeriod, setWorkingPeriod] = useState("");

  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const logoInputRef = useRef();
  const imageInputRef = useRef();
  const teamInputRef = useRef();

  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const logoClickHandle = () => logoInputRef.current.click();
  const imageClickHandle = () => imageInputRef.current.click();

  const teamClickHandle = (index) => {
    teamInputRef.current.dataset.index = index;
    teamInputRef.current.click();
  };

  const getLogoHandle = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLogo(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const getImageHandle = (e) => {
    const files = Array.from(e.target.files);
    const newPreview = files.map((file) => URL.createObjectURL(file));

    setImagesPreview((prev) => [...prev, ...newPreview]);
    setImages((prev) => [...prev, ...files]);
  };

  const getTeamHandle = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const index = teamInputRef.current.dataset.index;

    setTeamMembers((prev) => {
      const updated = [...prev];
      updated[index].file = file;
      updated[index].img = URL.createObjectURL(file);
      return updated;
    });
  };

  const teamCardHandle = () => {
    setTeamMembers((prev) => [
      ...prev,
      { img: "", file: null, name: "", role: "" },
    ]);
  };

  const removeMember = (index) => {
    setTeamMembers((prev) => prev.filter((_, i) => i !== index));
  };

  const touchStartHandle = (e) => setTouchStartX(e.targetTouches[0].clientX);

  const touchMoveHandle = (e) => setTouchEndX(e.targetTouches[0].clientX);

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

    setTouchStartX(0);
    setTouchEndX(0);
  };

  const getDotSize = (i) => {
    const distance = Math.abs(i - currentIndex);
    if (distance === 0) return "w-6 opacity-100";
    if (distance === 1) return "w-4 opacity-70";
    return "w-2 opacity-50";
  };

  const onSubmitHandle = async (e) => {
    e.preventDefault();

    try {
      const formdata = new FormData();

      formdata.append("logo", logo);

      formdata.append("schoolName", schoolName);

      images.forEach((file) => formdata.append("images", file));

      formdata.append("aboutUs", aboutUs);

      const memberDetails = teamMembers.map((m) => ({
        name: m.name,
        role: m.role,
      }));

      formdata.append("teamMembers", JSON.stringify(memberDetails));

      teamMembers.forEach((member) => {
        if (member.file) formdata.append("teamImages", member.file);
      });

      formdata.append("address", address);
      formdata.append("phoneNumber", phoneNumber);
      formdata.append("email", email);
      formdata.append("workingPeriod", workingPeriod);

      const response = await axios.post(
        `${backendURL}/school/schoolEdit`,
        formdata,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        navigate("/principalHome");
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="bg-[#ECF4E8] min-h-screen">
      <form onSubmit={onSubmitHandle}>
        <div className="bg-[#4C763B]/50 p-4 shadow-sm">
          <div className="relative h-[60px] w-[60px] flex gap-5 items-center">
            <div>
              <div
                onClick={logoClickHandle}
                className="border-[#B0CE88]/40 bg-white h-[60px] w-[60px] rounded-full flex justify-center items-center overflow-hidden cursor-pointer"
              >
                {logoPreview ? (
                  <img
                    className="h-full w-full object-cover"
                    src={logoPreview}
                  />
                ) : (
                  <p>Logo</p>
                )}
              </div>

              <IoAddCircleSharp
                onClick={logoClickHandle}
                className="text-xl absolute right-0 bottom-0 bg-white rounded-full cursor-pointer"
              />
            </div>

            <input
              className="w-[45vw] h-[4vh] outline-none text-white font-semibold text-md"
              type="text"
              placeholder="School name..."
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
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
            className="text-[#4C763B] text-2xl absolute right-3 top-3 bg-white rounded-full cursor-pointer z-10"
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
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-[#4C763B]/50 font-semibold">
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
                        : "bg-[#B0CE88]/70"
                    }`}
                  ></button>
                );
              })}
            </div>
          )}
        </div>

        <div className="bg-white p-4 h-[40vh] shadow-sm border border-[#B0CE88]/40">
          <textarea
            className="h-full w-full border border-gray-300 rounded-md p-3 outline-none focus:border-[#B0CE88] resize-none"
            placeholder="About Us"
            value={aboutUs}
            onChange={(e) => setAboutUs(e.target.value)}
          />
        </div>

        <div className="relative bg-white p-4 min-h-[40vh] shadow-sm border border-[#B0CE88]/40 flex justify-center items-center">
          <p className="text-center text-[#4C763B]/50 font-semibold mb-4">
            Add Team Members
          </p>

          <IoAddCircleSharp
            onClick={teamCardHandle}
            className="text-[#4C763B] text-2xl absolute right-3 top-3 bg-white rounded-full cursor-pointer"
          />

          <div className="grid grid-cols-2 gap-y-6 place-items-center">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="relative bg-[#ECF4E8] rounded-2xl p-6 flex flex-col items-center text-center 
                border border-[#B0CE88]/40 w-36 shadow-sm hover:shadow-md cursor-pointer"
              >
                <div
                  className="absolute right-2 top-0 text-2xl rotate-45 text-red-500"
                  onClick={() => removeMember(index)}
                >
                  +
                </div>

                <div className="bg-[#4C763B] text-white rounded-full h-20 w-20 flex justify-center items-center shadow-md overflow-hidden">
                  {member.img ? (
                    <img
                      src={member.img}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <MdAdd
                      onClick={() => teamClickHandle(index)}
                      className="text-3xl cursor-pointer"
                    />
                  )}
                </div>

                <div className="mt-3 space-y-1 w-full">
                  <input
                    className="font-semibold text-gray-800 text-sm w-full text-center"
                    placeholder="name..."
                    value={member.name}
                    onChange={(e) =>
                      setTeamMembers((prev) => {
                        const updated = [...prev];
                        updated[index].name = e.target.value;
                        return updated;
                      })
                    }
                  />

                  <input
                    className="text-gray-600 text-xs w-full text-center"
                    placeholder="role..."
                    value={member.role}
                    onChange={(e) =>
                      setTeamMembers((prev) => {
                        const updated = [...prev];
                        updated[index].role = e.target.value;
                        return updated;
                      })
                    }
                  />
                </div>
              </div>
            ))}
          </div>

          <input
            onChange={getTeamHandle}
            ref={teamInputRef}
            className="hidden"
            type="file"
            accept="image/*"
          />
        </div>

        <div className="bg-white p-4 shadow-sm border border-[#B0CE88]/40 mt-4">
          <h2 className="font-semibold text-[#4C763B]/50 mb-3">
            Edit Footer Info
          </h2>

          <div className="space-y-3">
            <input
              className="w-full border border-[#4C763B]/50 outline-[#4C763B] p-2 rounded"
              placeholder="Location..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              className="w-full border border-[#4C763B]/50 outline-[#4C763B] p-2 rounded"
              placeholder="Phone no."
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <input
              className="w-full border border-[#4C763B]/50 outline-[#4C763B] p-2 rounded"
              placeholder="Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="w-full border border-[#4C763B]/50 outline-[#4C763B] p-2 rounded"
              placeholder="Working period..."
              value={workingPeriod}
              onChange={(e) => setWorkingPeriod(e.target.value)}
            />
          </div>
        </div>
      </form>
    </div>
  );
};
