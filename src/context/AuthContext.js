import React, { createContext, useState, useContext } from 'react';

// Crea il contesto
export const AuthContext = createContext();

// Componente Provider per l'autenticazione
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);  // Inizializza l'utente come null

  const login = (userInfo) => {
    setUser(userInfo);  // Salva i dati dell'utente
  };

  const logout = () => {
    setUser(null);  // Rimuovi l'utente
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizzato per utilizzare il contesto
export const useAuth = () => {
  return useContext(AuthContext);
};
