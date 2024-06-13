import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import "./home.css";
import { IoMdNotificationsOutline } from "react-icons/io";
import { GoSearch } from "react-icons/go";

const Header = ({ activeProfile }) => {
  const history = useHistory();

  const handleProfileClick = () => {
    history.push("/users");
  };

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
      <div className="panels">
        <GoSearch />
        <IoMdNotificationsOutline />
        {activeProfile && (
          <div className="header__profile" onClick={handleProfileClick}>
            <img
              src={activeProfile.avatar}
              alt={activeProfile.name}
              className="header__profileImage"
            />
            <span className="header__profileName">{activeProfile.name}</span>
          </div>
        )}
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
  const [videoLoadError, setVideoLoadError] = useState(false);

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  const handleVideoEnd = () => {
    setVideoEnded(true);
  };

  const handleVideoError = () => {
    setVideoLoadError(true);
  };

  return (
    <div className="main-content">
      <div className={`main-content__video ${videoEnded ? "hidden" : ""}`}>
        <video
          ref={videoRef}
          autoPlay
          loop={false}
          muted={isMuted}
          onEnded={handleVideoEnd}
          onError={handleVideoError}
        >
          <source src="/src/assets/videos/aangValcano.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <button onClick={handleMuteToggle} className="mute-button">
          {isMuted ? "Unmute" : "Mute"}
        </button>
      </div>
      {videoEnded && (
        <div className="main-content__image">
          <img src="/src/assets/image/anafoto.jpeg" />
        </div>
      )}
      {videoLoadError && (
        <div className="main-content__error">
          Video failed to load. Please try again later.
        </div>
      )}
      <div className="main-content__recommendations">
        <h2>Recommended for You</h2>
        <div className="recommendations__list">
          <MovieRecommendation
            title="Movie 1"
            description="Description for Movie 1"
            image=""
          />
          <MovieRecommendation
            title="Movie 2"
            description="Description for Movie 2"
            image=""
          />
          <MovieRecommendation
            title="Movie 3"
            description="Description for Movie 3"
            image=""
          />
        </div>
      </div>
    </div>
  );
};

const Home = ({ activeProfile }) => {
  return (
    <div className="home">
      <Header activeProfile={activeProfile} />
      <MainContent />
      <Footer />
    </div>
  );
};

export default Home;
