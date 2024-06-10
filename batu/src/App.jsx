import "./App.css";
import Login from "./comp/login";
import Users from "./comp/users";
import { Route } from "react-router-dom";

function App() {
  return (
    <>
      <Route exact path="/">
        <Login />
      </Route>{" "}
      <Route path="/users">
        <Users />
      </Route>
    </>
  );
}

export default App;
