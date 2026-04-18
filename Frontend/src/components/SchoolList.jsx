import React, { useEffect, useState } from "react";
import axios from "axios";
import { SearchBar } from "./SearchBar";
import { useNavigate } from "react-router-dom";

export const SchoolList = () => {
  const [schools, setSchools] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredSchools, setFilteredSchools] = useState([]);

  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

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

  const onNavigateHandler = (schoolId) => {
    navigate(`principalHome/${schoolId}`);
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setFilteredSchools(schools);
    } else {
      const filtered = schools.filter((school) =>
        school.schoolName.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredSchools(filtered);
    }
  }, [schools, search]);

  return (
    <div className="flex flex-col h-full">
      <SearchBar search={search} setSearch={setSearch} />

      <div className="flex-1 overflow-y-auto mt-2 flex flex-col gap-3 pr-1">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : filteredSchools.length === 0 ? (
          <p className="text-gray-500 text-center mt-5">No School Found</p>
        ) : (
          filteredSchools.map((school) => (
            <div
              key={school._id}
              onClick={() => onNavigateHandler(school._id)}
              className="border p-3 flex items-center gap-3 rounded-lg shadow-sm cursor-pointer hover:shadow-md"
            >
              <div className="h-[70px] w-[70px] rounded-full overflow-hidden">
                {school?.schoolLogo ? (
                  <img
                    src={school.schoolLogo}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  "Logo"
                )}
              </div>

              <div>
                <p className="font-semibold">{school.schoolName}</p>

                {/* ✅ Direct address (NO API call) */}
                <p className="text-sm text-gray-500">
                  {school.address || "Location not found"}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};