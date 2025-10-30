import React, { useState } from "react";

export const SearchBar = ({search, setSearch}) => {

  return (
    <div>
      <input
        className="border w-full py-2 px-4 rounded-3xl"
        type="text"
        placeholder="Search schools..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};
