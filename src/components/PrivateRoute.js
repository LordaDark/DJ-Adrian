// src/components/PrivateRoute.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from "../firebase-config";
import { doc, getDoc } from "firebase/firestore";

const PrivateRoute = ({ children, requiredPermission }) => {
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkPermissions = async () => {
      const user = auth.currentUser;

      if (user) {
        // Se l'utente è loggato, controlliamo i permessi
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        const userData = userSnap.data();

        // Verifica se l'utente ha il permesso richiesto
        if (userData && userData[requiredPermission] === true) {
          setHasPermission(true);
        } else {
          setHasPermission(false);
          navigate('/login');  // Reindirizza a login se non ha il permesso
        }
      } else {
        // Se l'utente non è loggato, reindirizza alla pagina di login
        navigate('/login');
      }
      setLoading(false);
    };

    checkPermissions();
  }, [requiredPermission, navigate]);

  if (loading) {
    return <div>Loading...</div>;  // Mostra un loader mentre verifica i permessi
  }

  if (!hasPermission) {
    return null;  // Non mostra nulla se l'utente non ha il permesso
  }

  return children;
};

export default PrivateRoute;
