import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore"; // Importa Firestore
import "./register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Le password non coincidono.");
      return;
    }

    try {
      // Registrazione dell'utente con email e password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Ottieni Firestore
      const db = getFirestore();

      // Aggiungi i dettagli dell'utente alla collezione "users"
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        role: "user", // Puoi cambiare il ruolo in base alle necessità
      });

      navigate("/dashboard"); // Reindirizza alla dashboard o altra pagina
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Registrati</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <label>Nome</label>
            <input
              type="text"
              placeholder="Inserisci il tuo nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Inserisci la tua email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Inserisci la tua password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Conferma Password</label>
            <input
              type="password"
              placeholder="Conferma la tua password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="register-button">Registrati</button>
          <button type="button" className="login-button" onClick={() => navigate("/login")}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
