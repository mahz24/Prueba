import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CharactersByLocation from "../pages/CharactersByLocation";
import Home from "../pages/Home";

const AppRouter = () => {
  return (
    <Router>
      <div>
        <div className="container my-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/characters/:location"
              element={<CharactersByLocation />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default AppRouter;
