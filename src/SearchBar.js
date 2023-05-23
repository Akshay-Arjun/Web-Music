import React from 'react';

function SearchBar({ searchQuery, setSearchQuery, handleSearch }) {
  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleChange}
          placeholder="Enter music name"
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default SearchBar;
