import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../comp1/dashboard.css";

export default function Dashboard() {
  useEffect(() => {
    const cards = document.querySelectorAll(".feature-card");
    cards.forEach((card, i) => {
      setTimeout(() => {
        card.classList.add("show");
      }, 200 * i);
    });
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <p className="tagline">Your Personal AI Cyber Guardian</p>

        <div className="description">
          <strong>ArchLync</strong> is an intelligent AI-driven platform designed
          to empower everyday users with the tools and guidance needed to
          navigate digital threats safely. In today's world, fraudulent
          messages, phishing emails, and mobile security threats are becoming
          increasingly sophisticated, often targeting non-technical users.
          ArchLync bridges this gap by providing real-time, actionable
          assistance without requiring any IT expertise.
        </div>

        <Link to="/consult">
          <button className="cta-button">Get Help Now</button>
        </Link>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <div className="feature-title">Real-time Protection</div>
            <div className="feature-desc">
              AI-powered threat detection that works 24/7 to keep you safe
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <div className="feature-title">Smart Analysis & Mobile Security</div>
            <div className="feature-desc">
              Analyze suspicious messages instantly and get comprehensive
              protection for all your devices
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <div className="feature-title">AI Assistant</div>
            <div className="feature-desc">
              Get instant help and guidance from our intelligent chatbot
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
