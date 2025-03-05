import React, { createContext, useState, useContext, useEffect } from 'react';

// Creiamo il contesto
export const EventContext = createContext();

// Componente provider per il contesto degli eventi
export const EventProvider = ({ children }) => {
  // Stato per memorizzare gli eventi
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Funzione per caricare gli eventi (puoi sostituirla con una chiamata API o un database)
  useEffect(() => {
    // Esempio di carico degli eventi, puoi sostituirlo con il tuo metodo (es. chiamata a Firebase)
    const fetchEvents = async () => {
      try {
        // Supponiamo di avere una funzione che recupera gli eventi da un'API o un database
        const response = await fetch('/api/events'); // Modifica con il tuo URL dell'API
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Errore nel caricare gli eventi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []); // Solo al caricamento iniziale del componente

  // Funzione per aggiungere un nuovo evento
  const addEvent = (event) => {
    setEvents(prevEvents => [...prevEvents, event]);
  };

  // Funzione per rimuovere un evento
  const removeEvent = (eventId) => {
    setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
  };

  // Funzione per aggiornare un evento
  const updateEvent = (updatedEvent) => {
    setEvents(prevEvents => prevEvents.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    ));
  };

  return (
    <EventContext.Provider value={{ events, loading, addEvent, removeEvent, updateEvent }}>
      {children}
    </EventContext.Provider>
  );
};

// Hook per usare facilmente il contesto
export const useEvents = () => {
  return useContext(EventContext);
};
