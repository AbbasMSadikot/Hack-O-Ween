import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

export default function Header() {
  return (
    <header className="app-header">
      <div className="headlogo">
        <Link to="/" className="app-title">
          ArchLync
        </Link>
      </div>
    </header>
  );
}
