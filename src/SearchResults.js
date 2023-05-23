import React from 'react';
import './SearchResults.css'; // Import the CSS file

function SearchResults({ searchResults, handleSongSelect, handleDownload }) {
  return (
    <div className="search-results">
      {searchResults.map((song) => (
        <div key={song.id} className="song-item">
          <p className="song-name" dangerouslySetInnerHTML={{ __html: song.name }}></p>
          <p className="song-artist">{song.primaryArtists}</p>
          {song.image && song.image.length > 0 && (
            <img className="song-image" src={song.image.find((item) => item.quality === '500x500').link} alt="Song Cover" />
          )}
          <button className="play-button" onClick={() => handleSongSelect(song)}>Play</button>
        
          <button className="play-button" onClick={() => handleDownload(song)}>Download</button>
        </div>
      ))}
    </div>
  );
}

export default SearchResults;
