import React from "react";
import "./service.css";
import { FaHeadphones, FaLightbulb, FaTools } from "react-icons/fa";

const Service = () => {
  return (
    <section className="servizi-container">
      <h2 className="servizi-title">I Nostri Servizi</h2>
      <div className="servizi-list">
        <div className="servizio-card">
          <FaHeadphones className="servizio-icon" />
          <h3>DJ per Feste</h3>
          <p>Portiamo la musica giusta per rendere la tua festa indimenticabile!</p>
        </div>
        <div className="servizio-card">
          <FaLightbulb className="servizio-icon" />
          <h3>Illuminazione</h3>
          <p>Luci spettacolari per creare l'atmosfera perfetta.</p>
        </div>
        <div className="servizio-card">
          <FaTools className="servizio-icon" />
          <h3>Assistenza Tecnica</h3>
          <p>Riparazione e manutenzione di attrezzature elettroniche.</p>
        </div>
      </div>
    </section>
  );
};

export default Service;
