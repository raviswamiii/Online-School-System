import React, { useState } from "react";

export const SearchBar = ({search, setSearch}) => {

  return (
    <div>
      <input
        className="border w-full py-2 px-4 sm:py-3 sm:px-5 rounded-3xl xl:rounded-4xl sm:placeholder:text-lg"
        type="text"
        placeholder="Search schools..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};
