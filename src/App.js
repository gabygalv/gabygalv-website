import React from 'react';
import { HashRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.scss';
import Navbar from './components/Navbar';
import Home from './components/home';
import Resume from './components/resume';
import Projects from './components/projects';
import Contact from './components/contact';
import Scorekeeper from './components/xmas';

function App() {
  const location = useLocation();

  // Adjust location check for HashRouter (path starts after "#/")
  const isXmasPage = location.pathname === '/xmas' || location.hash === '#/xmas';

  return (
    <div>
      {!isXmasPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Resume />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/xmas" element={<Scorekeeper />} />
      </Routes>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
