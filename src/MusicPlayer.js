import React, { useState, useEffect, useRef } from 'react';
import './MusicPlayer.css';

function MusicPlayer({ selectedSong, handleDownload }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sarcasticMessage, setSarcasticMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false); // To control popup visibility
  const audioRef = useRef(null);
  const isInitialRender = useRef(true);

  const sarcasticLines = [
    "🎧 Stop the music. Those chats won’t reply to themselves!",
    "🤔 Oh, you're playing music? Must be done with XM, right?",
    "💰 Pause the music player and earn your incentives—those chats won’t clear themselves.",
    "📩 Your manager just pinged. They said no more music player sessions unless you finish an XM!",
    "🎶 This song is great, but you know what’s better? Replying to those unread chats.",
    "💼 Stop pretending you're in a motivational video and get back to that CHAT.",
    "⏳ Work now, play the music player later. Unless you're planning to DJ your termination party.",
    "🎯 Music player should be paused and go slay that chat like a true office ninja.",
    "⌛ While vibing to music, Don’t make the customer wait so long they add ‘Are you still there?’ to the chat.",
    "🛑 Your customers need solutions, not a DJ. Hit pause.",
    "📊 Remember, your next performance review isn’t graded on your music taste.",
    "😅 Playing music won’t increase your resolution rate. Sorry.",
    "💬 Your customers are typing… and probably wondering why you’re vibing instead of replying.",
    "🔥 This playlist is fire, but so is the customer on chat queue you’re ignoring.",
    "😢 Pause the music—your incentive tracker just shed a tear.",
    "🎵 Chats are the new beats. Get grooving on those customer issues.",
    "📞 Your chat queue is calling, and it doesn’t sound like your favorite track.",
    "🎤 Why not remix some empathy into those chat replies?",
    "🚨 Stop the music player. You’ve got customers waiting to be wowed.",
    "🧐 XM or This Song? One helps your career, the other... well, doesn’t.",
  ];

  useEffect(() => {
    if (!isInitialRender.current && selectedSong) {
      // Display a sarcastic message immediately after selecting a song
      const randomLine = sarcasticLines[Math.floor(Math.random() * sarcasticLines.length)];
      setSarcasticMessage(randomLine);
      setShowPopup(true); // Show the popup when the song is selected

      setTimeout(() => {
        setShowPopup(false); // Hide the popup after 5 seconds
      }, 7000); // 5 seconds duration

      if (audioRef.current) {
        audioRef.current.load();
        audioRef.current.play();
        setIsPlaying(true);
        window.scrollTo(0, document.body.scrollHeight);
      }
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
      setSarcasticMessage(''); // Optional: Clear message when paused
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
      <audio
        className="audio-player"
        ref={audioRef}
        src={selectedSong.downloadUrl.find((item) => item.quality === '320kbps').link}
        controls
      />

      {/* Fake Popup */}
      {showPopup && sarcasticMessage && (
        <div className="sarcastic-popup" style={sarcasticPopupStyle}>
          {sarcasticMessage}
        </div>
      )}

      <button className="play-button" onClick={handlePlay}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>

      <button className="play-button" onClick={() => handleDownload(selectedSong)}>
        Download
      </button>
    </div>
  );
}

// Inline styles for sarcastic popup
const sarcasticPopupStyle = {
  backgroundColor: '#ffcc00', // Yellow background for attention
  color: '#d32f2f', // Red color for sarcasm
  fontStyle: 'italic',
  padding: '20px',
  borderRadius: '8px',
  position: 'fixed',
  top: '20px', // Position from the top
  left: '50%',
  transform: 'translateX(-50%)', // Center horizontally
  fontSize: '18px',
  textAlign: 'center',
  zIndex: 1000, // Make sure it appears above other content
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  opacity: 1,
  animation: 'popupAnimation 1s ease-out',
};

// Add CSS for the animation in the styles
const css = `
@keyframes popupAnimation {
  0% {
    transform: translateX(-50%) translateY(-20px);
    opacity: 0;
  }
  50% {
    transform: translateX(-50%) translateY(10px);
    opacity: 1;
  }
  100% {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
  }
}
`;
// Injecting CSS into the head for animation
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = css;
document.head.appendChild(styleSheet);

export default MusicPlayer;
