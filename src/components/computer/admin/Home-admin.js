import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header/Header_admin";
import "./admin.css";

const Admin = () => {
  const navigate = useNavigate();

  const items = [
    { title: "Musica", path: "/music-admin", icon: "🎵" },
    { title: "Eventi", path: "/eventiadmin", icon: "🎉" },
    { title: "Utenti", path: "/utenti", icon: "🛠️" },
  ];

  return (
    <div className="admin-container">
      <Header />
      <div className="cornice-admin">
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

export default Admin;
