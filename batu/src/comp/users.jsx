import { useHistory } from "react-router-dom";
import "./users.css";
import { profilesData } from "../Profiles.js";
import { FaUserPlus } from "react-icons/fa";

const MAX_PROFILES = 5;

function Profile({ name, avatar, onClick, onDelete, isAddProfile }) {
  return (
    <div className={`profile ${isAddProfile ? "add-profile" : ""}`}>
      <div onClick={onClick} className="profile-content">
        <img
          src={isAddProfile ? "/src/assets/images/add.png" : avatar}
          alt={name}
          className="profile-image"
        />
        <div className="profile-name">
          {isAddProfile ? "Add profile" : name}
        </div>
      </div>
      {!isAddProfile && (
        <button className="delete-button" onClick={onDelete}>
          Delete
        </button>
      )}
    </div>
  );
}

function AddProfileButton({ onClick }) {
  return (
    <div className="addProfile">
      <button className="add-profile-button" onClick={onClick}>
        <div className="add-profile-container">
          <FaUserPlus className="add-profile-icon" />
        </div>
      </button>
      <span className="span">Add Profile</span>
    </div>
  );
}

export default function Users({ profiles, setProfiles, setActiveProfile }) {
  let newProfiles = [];
  let order = ["Funke", "Fields", "Batu", "Lawson"];
  profiles.map((eleman, index) => {
    if (!order.includes(eleman.name)) {
      order.push(eleman.name);
    }
  });

  for (let i = 0; i < order.length; i++) {
    const foundP = profiles.find((p) => p.name === order[i]);
    if (foundP) {
      newProfiles.push(foundP);
    }
  }

  const history = useHistory();

  const addProfile = () => {
    if (profiles.length >= MAX_PROFILES) {
      alert(`Maksimum ${MAX_PROFILES} profil ekleyebilirsiniz.`);
      return;
    }
    const profileName = prompt("Yeni profil ismi girin:");
    if (profileName && profileName.trim()) {
      setProfiles([
        ...profiles,
        { name: profileName, avatar: "/src/assets/images/default-avatar.png" },
      ]);
    }
  };

  const deleteProfile = (profileToDelete) => {
    setProfiles(
      profiles.filter((profile) => profile.name !== profileToDelete.name)
    );
  };

  const selectProfile = (profile) => {
    setActiveProfile(profile);
    if (profile.name === "Batu") {
      history.push("/troll");
    } else {
      history.push("/home");
    }
  };

  return (
    <div className="main">
      <div className="users-container">
        <h1>Who's watching?</h1>
        <div className="profiles">
          {newProfiles.map((profile, index) => (
            <Profile
              key={index}
              name={profile.name}
              avatar={profile.avatar}
              onClick={() => selectProfile(profile)}
              onDelete={() => deleteProfile(profile)}
            />
          ))}
          <AddProfileButton onClick={addProfile} />
        </div>
        <div className="profile-management">
          <button
            className="profile-button"
            onClick={() => alert("Profil Yönetimi")}
          >
            Profile management
          </button>
        </div>
      </div>
    </div>
  );
}
