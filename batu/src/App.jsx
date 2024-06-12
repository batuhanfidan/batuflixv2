import "./App.css";
import Login from "./comp/login";
import Users from "./comp/users";
import Home from "./comp/home.jsx";
import Header from "./comp/home.jsx";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useState } from "react";
import Troll from "./comp/troll";
import { profilesData } from "./Profiles.js";

function App() {
  const [activeProfile, setActiveProfile] = useState(null);
  const [profiles, setProfiles] = useState(profilesData);

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
          <Header />
          <Home />
        </Route>
        <Route path="/troll">
          <Troll />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
