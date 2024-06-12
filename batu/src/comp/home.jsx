import React from "react";
import "./home.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div className="header__logo">
        <Link to="/home">
          <img src="/path/to/your/logo.png" alt="/home" />
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

export default Header;
