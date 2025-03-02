import React, { useState } from "react";
import { TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material"; // ✅ Import MUI components
import "../styles/search.css";

function Search({ onSearch }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("posts"); // Default: Posts

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value, filter);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    onSearch(query, e.target.value);
  };

  return (
    <div className="search-container">
      {/* ✅ MUI Floating Label TextField */}
      <TextField
        label="Search"
        variant="outlined"
        size="small"
        fullWidth
        value={query}
        onChange={handleQueryChange}
      />

      {/* ✅ MUI Radio Button Group for Filters */}
      <FormControl component="fieldset" className="search-filters">
        <FormLabel component="legend">Filter By</FormLabel>
        <RadioGroup row value={filter} onChange={handleFilterChange}>
          <FormControlLabel value="posts" control={<Radio />} label="Posts" />
          <FormControlLabel value="users" control={<Radio />} label="Users" />
          <FormControlLabel value="comments" control={<Radio />} label="Comments" />
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default Search;
