// src/context/EventContext.js
import React, { createContext, useState } from 'react';

// Creiamo il contesto
export const EventContext = createContext();

// Provider per gestire lo stato degli eventi
export const EventProvider = ({ children }) => {
  const [eventi, setEventi] = useState([
    { id: 1, nome: "Concerto di Musica Classica", data: "2025-03-01", isVisible: true },
    { id: 2, nome: "Seminario di Tecnologia", data: "2025-03-10", isVisible: true },
    { id: 3, nome: "Fiera dell'Arte", data: "2025-03-15", isVisible: false },
  ]);

  // Aggiungi un nuovo evento
  const handleCreateEvent = (nome, data) => {
    const newEvent = {
      id: eventi.length + 1,
      nome,
      data,
      isVisible: true,
    };
    setEventi([...eventi, newEvent]);
  };

  // Rimuovi un evento
  const handleDeleteEvent = (id) => {
    setEventi(eventi.filter(evento => evento.id !== id));
  };

  // Cambia visibilità di un evento
  const handleToggleVisibility = (id) => {
    setEventi(eventi.map(evento => 
      evento.id === id ? { ...evento, isVisible: !evento.isVisible } : evento
    ));
  };

  return (
    <EventContext.Provider value={{ eventi, handleCreateEvent, handleDeleteEvent, handleToggleVisibility }}>
      {children}
    </EventContext.Provider>
  );
};
