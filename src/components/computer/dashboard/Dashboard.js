import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header/Header";
import "./dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const items = [
    { title: "Musica", path: "/musica", icon: "🎵" },
    { title: "Eventi", path: "/eventi", icon: "🎉" },
    { title: "Servizi", path: "/servizi", icon: "🛠️" },
  ];

  return (
    <div className="dashboard-container">
      <Header />
      <div className="cornice">
        <div className="cards-container">
          {items.map((item, index) => (
            <div key={index} className="card" onClick={() => navigate(item.path)}>
              <span className="icon">{item.icon}</span>
              <h3>{item.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
