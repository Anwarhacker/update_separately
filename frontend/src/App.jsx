import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./components/Registration";
import Update from "./components/Update";
import Login from "./components/Login"; // 🆕 Import the Login component
import "./App.css";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/login" element={<Login />} /> {/* 🆕 Login Route */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
