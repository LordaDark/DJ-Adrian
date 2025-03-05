import React, { useState, useEffect } from 'react';
import './EditUser.css';
import { updateDoc, doc } from "firebase/firestore"; 
import { db } from "../../../../firebase-config"; 

const EditUser = ({ editUser, setEditUser, updateUser }) => {
  const [permissions, setPermissions] = useState({
    adminAccess: editUser.adminAccess || false,
    manageMusicAdd: editUser.manageMusicAdd || false,
    manageMusicDelete: editUser.manageMusicDelete || false,
    manageEventsAdd: editUser.manageEventsAdd || false,
    manageEventsDelete: editUser.manageEventsDelete || false,
    manageEventsEdit: editUser.manageEventsEdit || false,
    manageUsersRole: editUser.manageUsersRole || false,
    manageUsersDisable: editUser.manageUsersDisable || false,
    musicAccess: editUser.musicAccess || false,
    eventsAccess: editUser.eventsAccess || false,
    usersAccess: editUser.usersAccess || false,
    role: editUser.role || 'user', // Default to 'user' if not specified
  });

  useEffect(() => {
    // Logica per aggiornare il ruolo in base ai permessi
    const checkRole = () => {
      if (permissions.adminAccess) {
        setPermissions(prev => ({ ...prev, role: 'admin' }));
      } else if (permissions.musicAccess || permissions.eventsAccess || permissions.usersAccess) {
        setPermissions(prev => ({ ...prev, role: 'moderator' }));
      } else {
        setPermissions(prev => ({ ...prev, role: 'user' }));
      }
    };
    checkRole();
  }, [permissions.adminAccess, permissions.musicAccess, permissions.eventsAccess, permissions.usersAccess]);

  const handlePermissionChange = (e) => {
    const { name, checked } = e.target;
    setPermissions(prev => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleRoleChange = (e) => {
    const role = e.target.value;
    setPermissions(prev => ({ ...prev, role }));

    // Modifica dei permessi in base al ruolo selezionato
    if (role === 'user') {
      setPermissions(prev => ({
        ...prev,
        adminAccess: false,
        musicAccess: false,
        eventsAccess: false,
        usersAccess: false,
        manageMusicAdd: false,
        manageMusicDelete: false,
        manageEventsAdd: false,
        manageEventsDelete: false,
        manageEventsEdit: false,
        manageUsersRole: false,
        manageUsersDisable: false,
      }));
    } else if (role === 'moderator') {
      setPermissions(prev => ({
        ...prev,
        manageMusicAdd: false,
        manageMusicDelete: false,
        manageEventsAdd: false,
        manageEventsDelete: false,
        manageEventsEdit: false,
        manageUsersRole: false,
        manageUsersDisable: false,
      }));
    } else if (role === 'admin') {
      setPermissions(prev => ({
        ...prev,
        adminAccess: true,
        musicAccess: true,
        eventsAccess: true,
        usersAccess: true,
        manageMusicAdd: true,
        manageMusicDelete: true,
        manageEventsAdd: true,
        manageEventsDelete: true,
        manageEventsEdit: true,
        manageUsersRole: true,
        manageUsersDisable: true,
      }));
    }
  };

  const handleSave = async () => {
    try {
      // Salvataggio in Firestore solo quando l'utente conferma le modifiche
      await updateDoc(doc(db, "users", editUser.id), { ...editUser, ...permissions });
      updateUser({ ...editUser, ...permissions }); // Update stato in App principale
      setEditUser(null);  // Chiude la modalità di modifica
    } catch (err) {
      console.error("Errore durante il salvataggio:", err);
    }
  };

  const handleCancel = () => {
    setEditUser(null); // Annulla la modifica
  };

  return (
    <div className="edit-bar">
      <p>Modifica permessi per <strong>{editUser.name}</strong></p>
      <div className="permissions-section">
        <h3>Accesso alle pagine</h3>
        <label><input type="checkbox" name="musicAccess" checked={permissions.musicAccess} onChange={handlePermissionChange} /> Musica</label>
        <label><input type="checkbox" name="eventsAccess" checked={permissions.eventsAccess} onChange={handlePermissionChange} /> Eventi</label>
        <label><input type="checkbox" name="usersAccess" checked={permissions.usersAccess} onChange={handlePermissionChange} /> Utenti</label>
      </div>

      <div className="permissions-section">
        <h3>Musica</h3>
        <label><input type="checkbox" name="manageMusicAdd" checked={permissions.manageMusicAdd} disabled={!permissions.musicAccess && permissions.role !== 'admin'} onChange={handlePermissionChange} /> Aggiungere brani</label>
        <label><input type="checkbox" name="manageMusicDelete" checked={permissions.manageMusicDelete} disabled={!permissions.musicAccess && permissions.role !== 'admin'} onChange={handlePermissionChange} /> Eliminare brani</label>
      </div>

      <div className="permissions-section">
        <h3>Eventi</h3>
        <label><input type="checkbox" name="manageEventsAdd" checked={permissions.manageEventsAdd} disabled={!permissions.eventsAccess && permissions.role !== 'admin'} onChange={handlePermissionChange} /> Aggiungere eventi</label>
        <label><input type="checkbox" name="manageEventsDelete" checked={permissions.manageEventsDelete} disabled={!permissions.eventsAccess && permissions.role !== 'admin'} onChange={handlePermissionChange} /> Eliminare eventi</label>
        <label><input type="checkbox" name="manageEventsEdit" checked={permissions.manageEventsEdit} disabled={!permissions.eventsAccess && permissions.role !== 'admin'} onChange={handlePermissionChange} /> Modificare eventi</label>
      </div>

      <div className="permissions-section">
        <h3>Utenti</h3>
        <label><input type="checkbox" name="manageUsersRole" checked={permissions.manageUsersRole} disabled={!permissions.usersAccess && permissions.role !== 'admin'} onChange={handlePermissionChange} /> Modificare ruolo</label>
        <label><input type="checkbox" name="manageUsersDisable" checked={permissions.manageUsersDisable} disabled={!permissions.usersAccess && permissions.role !== 'admin'} onChange={handlePermissionChange} /> Disabilitare</label>
      </div>

      <div className="permissions-section">
        <h3>Ruolo</h3>
        <select name="role" value={permissions.role} onChange={handleRoleChange}>
          <option value="user">Utente</option>
          <option value="moderator">Moderatore</option>
          <option value="admin">Amministratore</option>
        </select>
      </div>

      <button onClick={handleSave} className="save-btn">Salva</button>
      <button onClick={handleCancel} className="cancel-btn">Annulla</button>
    </div>
  );
};

export default EditUser;
