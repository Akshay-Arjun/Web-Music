import React, { useState } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import MusicPlayer from './MusicPlayer';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const formattedQuery = searchQuery.replace(/\s/g, '+');
      const response = await fetch(`https://akshay-jiosaavn-api.vercel.app/search/songs?query=${formattedQuery}`);
      const data = await response.json();

      if (data.status === 'SUCCESS') {
        setSearchResults(data.data.results);
        setError(null);
      } else {
        setError('An error occurred while fetching search results. Please try again.');
      }
    } catch (error) {
      console.error('Error occurred while fetching search results:', error);
      setError('An error occurred while fetching search results. Please try again.');
    }
  };

  const handleSongSelect = (song) => {
    setSelectedSong(song);
  };

  const handleDownload = async (song) => {
    const downloadUrl = song.downloadUrl.find((item) => item.quality === '320kbps').link;
  
    try {
      const response = await fetch(downloadUrl);
      const blob = await response.blob();
  
      const url = URL.createObjectURL(blob);
  
      const link = document.createElement('a');
      link.href = url;
      link.download = `${song.name} ${song.primaryArtists}.mp3`; // Set the downloaded file's name
      link.target = '_blank';
      link.click();
  
      URL.revokeObjectURL(url); // Clean up the URL object
    } catch (error) {
      console.error('Error occurred while downloading:', error);
      // Handle error
    }
  };
  

  return (
    <div>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
      />
      {error && <div>{error}</div>}
      <SearchResults
        searchResults={searchResults}
        handleSongSelect={handleSongSelect}
        handleDownload={handleDownload}
      />
      <MusicPlayer selectedSong={selectedSong} handleDownload={handleDownload} />
    </div>
  );
}

export default App;
