import React, { useState, useEffect, useRef } from 'react';
import './MusicPlayer.css';

function MusicPlayer({ selectedSong, handleDownload }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const isInitialRender = useRef(true);

  useEffect(() => {
    setIsPlaying(false);

    if (!isInitialRender.current && audioRef.current) {
      audioRef.current.load();
      audioRef.current.play();
      setIsPlaying(true);
      window.scrollTo(0, document.body.scrollHeight);
    } else {
      isInitialRender.current = false;
    }
  }, [selectedSong]);

  if (!selectedSong) {
    return <div className="music-player"> Damn! The music player looks empty. Why not search for songs using above search bar & click on play?</div>;
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
      <img className="select-song-image" src={selectedSong.image} alt="Song Cover" />
      <p className="song-name">{selectedSong.name}</p>
      <p className="song-artist">{selectedSong.primaryArtists}</p>
      <audio className="audio-player" ref={audioRef} src={selectedSong.downloadUrl.find(item => item.quality === '320kbps').link} controls />
      <button className="play-button" onClick={handlePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
      
      <button className="play-button" onClick={() => handleDownload(selectedSong)}>Download</button>
    </div>
  );
}

export default MusicPlayer;
