import "./App.css";
import Login from "./comp/login";
import Users from "./comp/users";
import Home from "./comp/home";
import Troll from "./comp/troll";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState, useEffect } from "react";
import { profilesData } from "./Profiles.js";

function App() {
  const [activeProfile, setActiveProfile] = useState(() => {
    const savedProfile = localStorage.getItem("activeProfile");
    return savedProfile ? JSON.parse(savedProfile) : null;
  });
  const [profiles, setProfiles] = useState(profilesData);

  useEffect(() => {
    if (activeProfile) {
      localStorage.setItem("activeProfile", JSON.stringify(activeProfile));
    } else {
      localStorage.removeItem("activeProfile");
    }
  }, [activeProfile]);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/users">
          <Users
            profiles={profiles}
            setProfiles={setProfiles}
            activeProfile={activeProfile}
            setActiveProfile={setActiveProfile}
          />
        </Route>
        <Route path="/home">
          <Home
            activeProfile={activeProfile}
            profiles={profiles}
            setProfiles={setProfiles}
            setActiveProfile={setActiveProfile}
          />
        </Route>
        <Route path="/troll">
          <Troll />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
