import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Accedi con email e password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Controlla se l'utente è disabilitato
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.data();

      if (userData && userData.isDisabled) {
        setError("Il tuo account è disabilitato.");
        return;
      }

      // Controlla il ruolo dell'utente e reindirizza
      if (userData && userData.role === "admin") {
        navigate("/admin"); // Reindirizza alla pagina Admin se l'utente è un amministratore
      } else {
        navigate("/dashboard"); // Reindirizza alla dashboard per gli altri utenti
      }

    } catch (err) {
      setError("Email o password non corretti.");
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Accedi</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
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
          <button type="submit" className="login-button">Login</button>
          <button 
            type="button" 
            className="register" 
            onClick={() => navigate("/register")}
          >
            Registrati!
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
