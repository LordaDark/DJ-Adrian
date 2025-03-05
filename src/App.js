// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { EventProvider } from './context/EventContext';
import DesktopHome from './components/computer/home/Home';
import MobileHome from './components/mobile/home/Home';
import EventiAdmin from './components/computer/admin/eventi/EventiAdmin';
import MobileEventiAdmin from './components/mobile/admin/eventi/MobileEventiAdmin';
import Login from './components/computer/login/Login';
import Register from './components/computer/register/Register';
import Dashboard from './components/computer/dashboard/Dashboard';
import Music from './components/computer/dashboard/music/Home-music';
import Eventi from './components/computer/dashboard/eventi/Eventi-page';
import Admin from './components/computer/admin/Home-admin';
import Utenti from './components/computer/admin/utenti/Utenti';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <EventProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={isMobile ? <MobileHome /> : <DesktopHome />} />

            {/* Proteggi la rotta /eventiadmin con il permesso eventsAccess */}
            <Route 
              path="/eventiadmin" 
              element={
                <PrivateRoute requiredPermission="eventsAccess">
                  {isMobile ? <MobileEventiAdmin /> : <EventiAdmin />}
                </PrivateRoute>
              } 
            />
            
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/music" element={<Music />} />
            <Route path="/eventi" element={<Eventi />} />

            {/* Proteggi la rotta /admin con il permesso musicAccess */}
            <Route 
              path="/music-admin" 
              element={
                <PrivateRoute requiredPermission="musicAccess">
                  <Music />
                </PrivateRoute>
              } 
            />

            {/* Proteggi la rotta /utenti con il permesso usersAccess */}
            <Route 
              path="/utenti" 
              element={
                <PrivateRoute requiredPermission="usersAccess">
                  <Utenti />
                </PrivateRoute>
              } 
            />
            
            {/* Proteggi la rotta /admin con il controllo di autenticazione e permessi */}
            <Route 
              path="/admin" 
              element={
                <PrivateRoute requiredPermission="adminAccess">
                  <Admin />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </EventProvider>
  );
}

export default App;
