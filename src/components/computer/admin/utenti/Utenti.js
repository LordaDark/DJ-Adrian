import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../firebase-config"; // Importazione di Firestore
import Header from "../header/Header_admin";
import './utenti.css';

const Utenti = () => {
  const [users, setUsers] = useState([]); // Stato per gli utenti
  const [error, setError] = useState(null); // Gestione degli errori

  // Caricamento degli utenti da Firestore al montaggio del componente
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, "users"); // Sostituisci "users" con il nome della tua collezione
        const userSnapshot = await getDocs(usersCollection);
        const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(userList);
      } catch (err) {
        setError("Errore nel caricamento degli utenti.");
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  // Funzione per eliminare un utente
  const handleDelete = async (userId) => {
    try {
      const userDoc = doc(db, "users", userId);
      await deleteDoc(userDoc); // Elimina il documento dalla collezione "users"
      setUsers(users.filter(user => user.id !== userId)); // Rimuovi l'utente dalla lista in stato
    } catch (err) {
      setError("Errore durante l'eliminazione dell'utente.");
      console.error(err);
    }
  };

  return (
    <div className="utenti-container">
      <Header />
      <h1 className="title">Gestione Utenti</h1>
      {error && <p className="error-message">{error}</p>} {/* Mostra eventuali errori */}
      <div className="utenti-list">
        <table className="utenti-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Ruolo</th>
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button className="action-btn">Modifica</button>
                  <button className="action-btn" onClick={() => handleDelete(user.id)}>Elimina</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Utenti;
