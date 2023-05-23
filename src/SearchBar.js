import React from 'react';
import './MusicPlayer.css';
function SearchBar({ searchQuery, setSearchQuery, handleSearch }) {
  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch();
  };

  return (
    <div className='music-player'>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleChange}
          placeholder="Enter song name"
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default SearchBar;
