import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
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
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard"); // Reindirizza alla dashboard dopo il login
    } catch (err) {
      setError("Email o password non corretti."); // Messaggio generico per sicurezza
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
