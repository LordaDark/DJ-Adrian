import React, { useState, useEffect } from 'react';
import { db } from '../../../../firebase-config';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import Header from "../header/Header_admin";
import './eventiadmin.css';

const EventiAdmin = () => {
  const [eventi, setEventi] = useState([]);
  const [newEvento, setNewEvento] = useState({ nome: '', data: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  const [modificaData, setModificaData] = useState(null); // Nuovo stato per tracciare l'evento in modifica
  const [newData, setNewData] = useState('');

  useEffect(() => {
    const eventiRef = collection(db, "eventi");
    const getData = async () => {
      const querySnapshot = await getDocs(eventiRef);
      const eventiList = [];
      querySnapshot.forEach((doc) => {
        eventiList.push({ ...doc.data(), id: doc.id });
      });
      setEventi(eventiList);
    };
    getData();
  }, []);

  const handleCreateEvent = async () => {
    if (newEvento.nome && newEvento.data) {
      setLoading(true);
      setMessage('Creando evento...');
      try {
        const newEvent = { nome: newEvento.nome, data: newEvento.data, isVisible: true };
        await addDoc(collection(db, "eventi"), newEvent);
        setNewEvento({ nome: '', data: '' });
        setMessage('Evento creato con successo!');
        setLoading(false);

        const eventiRef = collection(db, "eventi");
        const querySnapshot = await getDocs(eventiRef);
        const eventiList = [];
        querySnapshot.forEach((doc) => {
          eventiList.push({ ...doc.data(), id: doc.id });
        });
        setEventi(eventiList);
      } catch (error) {
        setLoading(false);
        setMessage('Errore nella creazione dell\'evento. Riprova.');
        console.error("Errore nella creazione dell'evento: ", error);
      }
    } else {
      setMessage('Per favore, compila tutti i campi.');
    }
  };

  const handleUpdateEvent = async (id) => {
    if (newData) {
      const eventoRef = doc(db, "eventi", id);
      await updateDoc(eventoRef, { data: newData });
      setMessage('Evento aggiornato con successo!');
      
      const querySnapshot = await getDocs(collection(db, "eventi"));
      const eventiList = [];
      querySnapshot.forEach((doc) => {
        eventiList.push({ ...doc.data(), id: doc.id });
      });
      setEventi(eventiList);
      setModificaData(null); // Nascondiamo il campo di modifica
      setNewData('');
    } else {
      setMessage('Per favore, inserisci una nuova data.');
    }
  };

  const handleDeleteEvent = async (id) => {
    const eventoRef = doc(db, "eventi", id);
    await deleteDoc(eventoRef);
    setMessage('Evento eliminato con successo!');
    const querySnapshot = await getDocs(collection(db, "eventi"));
    const eventiList = [];
    querySnapshot.forEach((doc) => {
      eventiList.push({ ...doc.data(), id: doc.id });
    });
    setEventi(eventiList);
  };

  const handleToggleVisibility = async (id, isVisible) => {
    const eventoRef = doc(db, "eventi", id);
    await updateDoc(eventoRef, { isVisible: !isVisible });
    setMessage('Visibilità dell\'evento aggiornata!');
    const querySnapshot = await getDocs(collection(db, "eventi"));
    const eventiList = [];
    querySnapshot.forEach((doc) => {
      eventiList.push({ ...doc.data(), id: doc.id });
    });
    setEventi(eventiList);
  };

  return (
    <div className="eventi-admin-container">
      <Header />
      
      <h2>Gestisci Eventi</h2>

      <div className="create-event">
        <h3>Crea un Nuovo Evento</h3>
        <input
          type="text"
          placeholder="Nome Evento"
          value={newEvento.nome}
          onChange={(e) => setNewEvento({ ...newEvento, nome: e.target.value })}
        />
        <input
          type="date"
          value={newEvento.data}
          onChange={(e) => setNewEvento({ ...newEvento, data: e.target.value })}
        />
        <button onClick={handleCreateEvent} disabled={loading}>
          {loading ? 'Creando...' : 'Crea Evento'}
        </button>
      </div>

      {message && <div className="message">{message}</div>}

      {/* Sezione di modifica data */}
      {modificaData && (
        <div className="modify-date-section">
          <h3>Modifica la data dell'evento</h3>
          <input
            type="date"
            value={newData}
            onChange={(e) => setNewData(e.target.value)}
          />
          <div className="evento-buttons">
            <button onClick={() => handleUpdateEvent(modificaData.id)}>
                Modifica Data
            </button>
            <button onClick={() => setModificaData(null)}>Annulla</button>
          </div>
        </div>
      )}

      <div className="eventi-list">
        <h3>Eventi Esistenti</h3>
        {eventi.map(evento => (
          <div key={evento.id} className="evento">
            <h4>{evento.nome}</h4>
            <p>Data: {evento.data}</p>
            <p>Visibilità: {evento.isVisible ? 'Visibile' : 'Nascosto'}</p>
            <div className="evento-buttons">
              <button onClick={() => { setModificaData(evento); setNewData(evento.data); }}>
                Modifica Data
              </button>
              <button onClick={() => handleDeleteEvent(evento.id)}>Elimina</button>
              <button onClick={() => handleToggleVisibility(evento.id, evento.isVisible)}>
                {evento.isVisible ? 'Nascondi' : 'Mostra'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventiAdmin;
