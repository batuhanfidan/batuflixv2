import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import "./home.css";
import { IoMdNotificationsOutline } from "react-icons/io";
import { GoSearch } from "react-icons/go";
import axios from "axios";

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

const MovieRow = ({ title }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("https://movies-api14.p.rapidapi.com/movies", {
        headers: {
          "x-rapidapi-key":
            "2ce04038e2msh104054e193ec289p18cdf9jsnb6a4a44d19e9",
          "x-rapidapi-host": "movies-api14.p.rapidapi.com",
        },
      })
      .then((response) => {
        console.log(response.data);
        const random = Math.floor(
          Math.random() * (response.data.movies.length - 0)
        );
        setMovies(response.data.movies.slice(random, random + 5));
      })
      .catch((error) => {
        console.warn(error);
      });
  }, []);

  return (
    <div className="movie-row">
      <h3>{title}</h3>
      <div className="movie-row__list">
        {movies.map((movie, index) => (
          <MovieRecommendation
            key={index}
            title={movie.title}
            description={movie.description}
            image={movie.backdrop_path}
          />
        ))}
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
      <div>
        <img src="src\assets\image\avatarlogo.png" className="logo" />
        <p>
          Katara ve Sokka kardeşler, uzun kış uykusundan uyandırdıkları genç
          Aang'ın kötü kalpli Ateş Ulusu'nu yenebilecek hava bükücüsü güçlerine
          sahip Avatar olduğunu öğrenir.
        </p>
        <button>sa</button>
        <button>as</button>
      </div>
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
          <img src="/src/assets/image/anafoto.jpeg" alt="Background" />
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
          <MovieRow title="Movies You Might Like" />
          <MovieRow title="Top 5 Movies" />
          <MovieRow title="Series" />
        </div>
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
