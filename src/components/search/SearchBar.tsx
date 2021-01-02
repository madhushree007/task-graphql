import React, { useState } from "react";

export default function SearchBar({ onChange }) {
  const [query, setQuery] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    onChange(query);
  }
  return (
    <form role="search" className="SearchBar" onSubmit={handleSubmit}>
      <label htmlFor="search-bar">Search Repo</label>
      <input
        id="search-bar"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type='submit'>Search</button>
    </form>
  );
}
