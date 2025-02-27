import React, { useState, useEffect } from 'react';
import { db } from '../../../../firebase-config'; // Importiamo il nostro db Firestore
import { collection, query, where, getDocs, onSnapshot } from 'firebase/firestore'; // Funzioni per leggere da Firestore
import './eventi.css';

const Eventi = () => {
  const [eventi, setEventi] = useState([]);
  
  useEffect(() => {
    // Funzione per recuperare gli eventi
    const eventiRef = collection(db, "eventi");
    const q = query(eventiRef, where("isVisible", "==", true)); // Filtriamo solo gli eventi visibili
    
    // Ascoltiamo in tempo reale le modifiche agli eventi
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const eventiList = [];
      querySnapshot.forEach((doc) => {
        eventiList.push({ ...doc.data(), id: doc.id });
      });
      setEventi(eventiList); // Impostiamo gli eventi ricevuti nel nostro stato
    });

    // Cleanup della subscription quando il componente viene smontato
    return () => unsubscribe();
  }, []); // Eseguito solo una volta al montaggio del componente

  return (
    <div className="eventi-container-mobile">
      <h2>Eventi in Evidenza</h2>
      <div className="eventi-list">
        {eventi.map(evento => (
          <div key={evento.id} className="evento">
            <h3>{evento.nome}</h3>
            <p>Data: {evento.data}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Eventi;
