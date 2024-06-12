import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./home.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header__logo">
        <Link to="/home">
          <img src="/src/assets/image/bfheader.png" alt="Home" />
        </Link>
      </div>
      <div className="header__nav">
        <Link to="/home" className="header__navLink">
          Home
        </Link>
        <Link to="/movies" className="header__navLink">
          Movies
        </Link>
        <Link to="/tvShows" className="header__navLink">
          TV Shows
        </Link>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <div className="footer">
      <p>© 2024 Batuflix. All Rights Reserved.</p>
      <p>Privacy · Terms · Sitemap · About Me</p>
    </div>
  );
};

const MovieRecommendation = ({ title, description, image }) => {
  return (
    <div className="movie-recommendation">
      <img src={image} alt={title} className="movie-recommendation__image" />
      <div className="movie-recommendation__details">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

const MainContent = () => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    videoRef.current.muted = !isMuted;
  };

  const handleVideoEnd = () => {
    setVideoEnded(true);
  };

  return (
    <div className="main-content">
      <div className={`main-content__video ${videoEnded ? "hidden" : ""}`}>
        <video
          ref={videoRef}
          src="/path/to/your/video.mp4"
          autoPlay
          loop={false}
          muted={isMuted}
          onEnded={handleVideoEnd}
        ></video>
        <button onClick={handleMuteToggle} className="mute-button">
          {isMuted ? "Unmute" : "Mute"}
        </button>
      </div>
      {videoEnded && (
        <div className="main-content__image">
          <img src="/path/to/your/image.jpg" alt="Background" />
        </div>
      )}
      <div className="main-content__recommendations">
        <h2>Recommended for You</h2>
        <div className="recommendations__list">
          <MovieRecommendation
            title="Movie 1"
            description="Description for Movie 1"
            image="/path/to/movie1.jpg"
          />
          <MovieRecommendation
            title="Movie 2"
            description="Description for Movie 2"
            image="/path/to/movie2.jpg"
          />
          <MovieRecommendation
            title="Movie 3"
            description="Description for Movie 3"
            image="/path/to/movie3.jpg"
          />
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div className="home">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
};

export default Home;
