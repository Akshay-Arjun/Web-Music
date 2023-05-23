import React, { useState, useEffect } from 'react';
import './MusicPlayer.css'; // Import the CSS file

function MusicPlayer({ selectedSong, handleDownload }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.createRef();

  useEffect(() => {
    setIsPlaying(false); // Reset the play state when a new song is selected
  }, [selectedSong]);

  if (!selectedSong) {
    return <div className="music-player">No song selected</div>;
  }

  const handlePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="music-player">
      <h2>Now Playing</h2>
      <p className="song-name">{selectedSong.name}</p>
      <p className="song-artist">{selectedSong.primaryArtists}</p>
      <audio className="audio-player" ref={audioRef} src={selectedSong.downloadUrl.find((item) => item.quality === '320kbps').link} controls />
      <button className="play-button" onClick={handlePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
      <br />
      <button className="play-button" onClick={() => handleDownload(selectedSong)}>Download</button>
    </div>
  );
}

export default MusicPlayer;
