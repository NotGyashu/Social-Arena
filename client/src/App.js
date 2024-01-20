import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Home from "./pages/home";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Register from "./pages/register";
import Edit from "./pages/edit";
import { Messenger } from "./pages/messenger";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router >
      <Routes>
        <Route path="/" element={user ? <Home /> : <Register />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/messenger"
          element={!user ? <Navigate to="/" /> : <Messenger />}
        />
        <Route path="/profile/:username" element={<Profile />} />
        <Route
          path="/profile/:username/edit"
          element={user ? <Edit user={user} /> : <Register />}
        />
      </Routes>
    </Router>
  );
}

export default App;
