import React, { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc } from "firebase/firestore"; 
import { db } from "../../../../firebase-config"; 
import Header from "../header/Header_admin";
import './utenti.css';
import EditUser from './EditUser';

const Utenti = () => {
  const [users, setUsers] = useState([]); 
  const [error, setError] = useState(null); 
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, "users");
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

  const handleEdit = (user) => {
    setEditUser(user);
  };

  const updateUser = (updatedUser) => {
    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
  };

  const handleDisable = async (userId) => {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, { isDisabled: true });
      setUsers(users.map(u => u.id === userId ? { ...u, isDisabled: true } : u));
    } catch (err) {
      setError("Errore durante la disabilitazione dell'utente.");
      console.error(err);
    }
  };

  return (
    <div className="utenti-container">
      <Header />
      <h1 className="title">Gestione Utenti</h1>
      {error && <p className="error-message">{error}</p>}

      {editUser && (
        <EditUser 
          editUser={editUser}
          setEditUser={setEditUser}
          updateUser={updateUser}
        />
      )}

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
                  <button className="action-btn" onClick={() => handleEdit(user)}>Modifica</button>
                  <button className="action-btn disable" onClick={() => handleDisable(user.id)}>Disabilita</button>
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
