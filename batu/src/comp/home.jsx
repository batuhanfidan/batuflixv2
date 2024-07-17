import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import "./home.css";
import { IoMdNotificationsOutline } from "react-icons/io";
import { GoSearch } from "react-icons/go";
import axios from "axios";
import { FaPlay } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { IoVolumeMuteSharp } from "react-icons/io5";

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
          Series
        </Link>
      </div>
      <div className="panels">
        <GoSearch style={{ width: "35px", height: "35px" }} />
        <IoMdNotificationsOutline style={{ width: "40px", height: "40px" }} />
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

const MovieRecommendation = ({ title, description, image, overview }) => {
  return (
    <div className="movie-recommendation">
      <img src={image} alt={title} className="movie-recommendation__image" />
      <div className="movie-recommendation__details">
        <h4>{title}</h4>
        <p>{description}</p>
        <p> {overview} </p>
      </div>
    </div>
  );
};

const MovieRow = ({ title, movies }) => {
  return (
    <div className="movie-row">
      <h3>{title}</h3>
      <div className="movie-row__list">
        {movies.map((movie, index) => (
          <MovieRecommendation
            key={index}
            title={movie.title}
            description={movie.genres}
            image={movie.backdrop_path}
            overview={movie.overview}
            date={movie.relase_date}
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
  const [movies, setMovies] = useState([]);

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

  useEffect(() => {
    axios
      .get("https://movies-api14.p.rapidapi.com/movies", {
        headers: {
          "x-rapidapi-key":
            "1fd7bcd429mshb25f368e4d39d11p19262djsn2f5c24e3c359",
          "x-rapidapi-host": "movies-api14.p.rapidapi.com",
        },
      })
      .then((response) => {
        console.log(response.data);
        const random = Math.floor(
          Math.random() * (response.data.movies.length - 6)
        );
        setMovies(response.data.movies.slice(random, random + 30));
      })
      .catch((error) => {
        console.warn(error);
      });
  }, []);
  return (
    <div className="main-content">
      <div className="nee">
        <div className="avatar" style={{ width: "35%" }}>
          <img src="https://i.hizliresim.com/927py5w.png" className="logo" />
          <p>
            Katara ve Sokka kardeşler, uzun kış uykusundan uyandırdıkları genç
            Aang'ın kötü kalpli Ateş Ulusu'nu yenebilecek hava bükücüsü
            güçlerine sahip Avatar olduğunu öğrenir.
          </p>
          <button>
            <FaPlay />
            Play
          </button>
          <button>
            <FaInfoCircle />
            More info
          </button>
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
            <source
              src="https://lh3.googleusercontent.com/pw/AP1GczNVBT9q8isPNIaImeaf7LLxLliNQSS0N3l5UiJncDVNTe8ASynPcb2u7TwOT39pKOavG43ULr1TG65oDfFnGi_Rj5OocC4cFHkfAqsYJEpuaF55tTPzmtvJ04_Z4sVc97vzjW4v1VU7VnAZP5bJCPMUqkop9fMK8umfmEWr4OIYNnUwwS8AO-Sl5UvCE5cB1MOyXm71I7MD8uhB6HDEquX7LAyGWZU28-to79apNPUalk6H9tH3Gp8KRaI24AdSRenDSws8ppuBLutENvx4WsPIwmWlsKbFNXG0cRkHscocBX9ChemClj2Y-ohAo_WzyxS4eYOYy-hcqJNlWiZDg8W-3NJpvP1z64O3Hgm91bRffibUV3iQwH60JPtFRcAqREyyRNBFhI0yDP-uju9BLwhoWlBHwZCcpaXGMJi3DorRHb4SVEqWed0_6m8Z1aHsHn1DjcaSGUlz-oQrhym5PhULDGtW2BQPehc8GV6f_kGhZEoLKBKgwx2MWXmjlm3YMuiYLhfGlqLd0y3Lmuwy8eC0h_cl89xs8BHSDCHchFGtjvgpG0IvwCmVR7PbRQjTgadLqWli_ekIVeYHNHEFATzDERTLB-5h7Zd5vkqw-8qKdXSQod7_dDHJMBETA78fMfztTBlcqS0OdQq2ppik3elBwbcQcHRVYkM-3rEv1JPMf1fopYfWR4Whn_S75U5sE7pvrjpR8yOqqEB0CJe-quBp4npc5aun1eivOsScsVtbiFftYDiRXzIHKN_FHxTFLYqmqoaTwVGiO5s-OU5gmLIf5PLO3kgHzxbyshz8NnSQDCiYO4tFkDALrsxgNNbTVnGnmZ5OvdUsKuX5arDkcqmAca0rKKJ-af-B7b1j-Q1xUG1kQQuTp2wKlPX6RwJqYs-W8PnchXz4uDcoC0blNEA=m15?authuser=0&cpn=k-d7xqW8Uwi-f-7M&c=WEB_EMBEDDED_PLAYER&cver=1.20240714.00.00"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <button onClick={handleMuteToggle} className="mute-button">
            {isMuted ? "Unmute" : "Mute"}
          </button>
        </div>
      </div>
      {videoEnded && (
        <div className="main-content__image">
          <img src="https://i.hizliresim.com/eukpqc7.jpeg" alt="Background" />
        </div>
      )}
      {videoLoadError && (
        <div className="main-content__error">
          Video failed to load. Please try again later.
        </div>
      )}
      <div className="main-content__recommendations">
        <div className="recommendations__list">
          <MovieRow title="Movies You Might Like" movies={movies.slice(0, 5)} />
          <MovieRow title="Top 5 Movies" movies={movies.slice(5, 10)} />
          <MovieRow title="Editor's choice" movies={movies.slice(10, 15)} />
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <div className="footer">
      <p>© 2024 Batuflix. All Rights Reserved.</p>
      <p>
        <Link to="/privacy">Privacy</Link> ·<Link to="/terms"> Terms</Link> ·
        <Link to="/sitemap"> Sitemap</Link> ·<Link> About Me </Link>
      </p>
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
