import React, { useEffect, useState } from "react";
import axios from "axios";
import { SearchBar } from "./SearchBar";

export const SchoolList = () => {
  const [schools, setSchools] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredSchools, setFilteredSchools] = useState([]);
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const fetchSchools = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${backendURL}/schools/getSchools`);
      if (response.data.success) {
        setSchools(response.data.schools);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setFilteredSchools(schools);
    } else {
      const filtered = schools.filter((school) => {
        return school.schoolName.toLowerCase().includes(search.toLowerCase());
      });
      setFilteredSchools(filtered);
    }
  }, [schools, search]);
  return (
    <div className="h-full p-2 space-y-2">
      <SearchBar search={search} setSearch={setSearch} />
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : filteredSchools.length === 0 ? (
        <p className="text-gray-500 text-center">No School Found</p>
      ) : (
        filteredSchools.map((school) => (
          <div
            className="border p-2 flex items-center gap-2 rounded-lg shadow-sm hover:shadow-md transition"
            key={school._id}
          >
            <div className="border rounded-full h-[70px] w-[70px] flex justify-center items-center overflow-hidden">
              {school?.schoolLogo ? (
                <img
                  className="h-full w-full object-cover"
                  src={`${backendURL}${school.schoolLogo}`}
                  alt="School Logo"
                />
              ) : (
                "Logo"
              )}
            </div>
            <div>
              <p className="font-semibold">{school.schoolName}</p>
              <p className="text-sm text-gray-500">{school.schoolLocation}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
