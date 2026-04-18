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
  const [userLocation, setUserLocation] = useState(null);

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

  const onNavigateHandler = (schoolId) => {
    navigate(`principalHome/${schoolId}`);
  };

  // ✅ Haversine formula (distance in KM)
  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // ✅ Find nearby schools
  const findNearbySchools = () => {
  if (!navigator.geolocation) {
    alert("Geolocation not supported");
    return;
  }

  navigator.geolocation.getCurrentPosition(async (position) => {
    const { latitude, longitude } = position.coords;

    try {
      const res = await axios.get(
        `${backendURL}/schools/nearby?lng=${longitude}&lat=${latitude}`
      );

      if (res.data.success) {
        setFilteredSchools(res.data.schools);
      }
    } catch (err) {
      console.log(err);
    }
  });
};

  return (
    <div className="flex flex-col h-full">
      <SearchBar search={search} setSearch={setSearch} />

      <button
        onClick={findNearbySchools}
        className="border bg-[#4C763B] text-white mt-2 py-2 px-4 rounded-3xl"
      >
        Find schools near me
      </button>

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

                <p className="text-sm text-gray-500">
                  {school.address || "Location not found"}
                </p>

                {/* ✅ Distance display */}
                {school.distance !== undefined && (
                  <p className="text-xs text-blue-600">
                    {school.distance.toFixed(2)} km away
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};