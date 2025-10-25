import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./comp1/Header";
import Dashboard from "./comp1/Dashboard";

function App() {
  return (
    <BrowserRouter>
      {/* Fixed Header */}
      <Header />

      {/* Main Content */}
      <div style={{ marginTop: "100px" }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {/* <Route path="/consult" element={<Consult />} /> */}
          <Route path="*" element={<h2>404 - Page Not Found</h2>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
