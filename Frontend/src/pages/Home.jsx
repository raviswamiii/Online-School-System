import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SchoolList } from "../components/SchoolList";
import { CollegeList } from "../components/CollegeList";
import { IndividualList } from "../components/IndividualList";

export const Home = () => {
  const [value, setValue] = useState("schools");
  return (
    <div className="h-screen py-2 overflow-hidden">
      <Link
        className="absolute right-2 bg-green-200 p-2 rounded text-sm"
        to={"/registerYourself"}
      >
        Register Yourself
      </Link>
      <div className="absolute top-[10%] h-full w-full">
        <div className="flex justify-between ">
          <div
            onClick={() => setValue("schools")}
            className="border w-full text-center py-2"
          >
            Schools
          </div>
          <div
            onClick={() => setValue("colleges")}
            className="border w-full text-center py-2"
          >
            Colleges
          </div>
          <div
            onClick={() => setValue("individuals")}
            className="border w-full text-center py-2"
          >
            Individuals
          </div>
        </div>
        <div className="h-full">
          {value === "schools" ? (
            <SchoolList />
          ) : value === "colleges" ? (
            <CollegeList />
          ) : value === "individuals" ? (
            <IndividualList />
          ) : null}
        </div>
      </div>
    </div>
  );
};
