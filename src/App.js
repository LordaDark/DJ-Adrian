// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { EventProvider } from './context/EventContext'; // Importiamo il provider
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

function App() {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <EventProvider> {/* Avvolgiamo l'app con il provider */}
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={isMobile ? <MobileHome /> : <DesktopHome />} />
            <Route path="/eventiadmin" element={isMobile ? <MobileEventiAdmin /> : <EventiAdmin />} />
            <Route path="/login" element={<Login />} /> {/* Pagina login accessibile solo da computer */}
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/music" element={<Music />} />
            <Route path="/eventi" element={<Eventi />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
      </Router>
    </EventProvider>
  );
}

export default App;
