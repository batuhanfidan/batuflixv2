import React from "react";
import catImage from "../assets/image/cat.jpg"; // Resim dosyasını import ediyoruz
import "./troll.css"; // CSS dosyasını import ediyoruz

export default function Troll() {
  return (
    <>
      <div className="troll-container">
        <div className="troll-content">
          <h1>Welcome!</h1>
          <p>If you know me, I knew you would click here first.</p>
        </div>
        <img src={catImage} alt="Troll Cat" className="troll-image" />
      </div>
    </>
  );
}
