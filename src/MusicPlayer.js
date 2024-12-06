import React, { useState, useEffect, useRef } from 'react';
import './MusicPlayer.css';

function MusicPlayer({ selectedSong, handleDownload }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sarcasticMessage, setSarcasticMessage] = useState('');
  const audioRef = useRef(null);
  const isInitialRender = useRef(true);

  const sarcasticLines = [
    "🎧 Stop the music. Those chats won’t reply to themselves!",
    "🤔 Oh, you're playing music? Must be done with XM, right?",
    "💰 Pause the music player and earn your incentives—those chats won’t clear themselves.",
    "📩 Your manager just pinged. They said no more music player sessions unless you finish an XM!",
    "🎶 This song is great, but you know what’s better? Replying to those unread chats.",
    "💼 Stop pretending you're in a motivational video and get back to that XM prep.",
    "⏳ Work now, play the music player later. Unless you're planning to DJ your termination party.",
    "🎯 Music player paused. Now go slay that chat backlog like a true office ninja.",
    "⌛ Don’t make the customer wait so long they add ‘Are you still there?’ to the chat.",
    "🛑 Your customers need solutions, not a DJ. Hit pause.",
    "📊 Remember, your next performance review isn’t graded on your music taste.",
    "😅 Playing music won’t increase your resolution rate. Sorry.",
    "💬 Your customers are typing… and probably wondering why you’re vibing instead of replying.",
    "🔥 This playlist is fire, but so is the chat queue you’re ignoring.",
    "😢 Pause the music—your incentive tracker just shed a tear.",
    "🎵 Chats are the new beats. Get grooving on those customer issues.",
    "📞 Your queue is calling, and it doesn’t sound like your favorite track.",
    "🎤 Why not remix some empathy into those chat replies?",
    "🚨 Stop the music player. You’ve got customers waiting to be wowed.",
    "🧐 XM or Spotify? One helps your career, the other... well, doesn’t.",
  ];

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
    return (
      <div className="music-player">
        Damn! The music player looks empty. Why not search for songs using the above search bar & click on play?
      </div>
    );
  }

  const handlePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setSarcasticMessage('');
    } else {
      const randomLine = sarcasticLines[Math.floor(Math.random() * sarcasticLines.length)];
      setSarcasticMessage(randomLine);
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
      <audio
        className="audio-player"
        ref={audioRef}
        src={selectedSong.downloadUrl.find((item) => item.quality === '320kbps').link}
        controls
      />
      <button className="play-button" onClick={handlePlay}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>

      <button className="play-button" onClick={() => handleDownload(selectedSong)}>
        Download
      </button>

      {sarcasticMessage && <p className="sarcastic-message">{sarcasticMessage}</p>}
    </div>
  );
}

export default MusicPlayer;
