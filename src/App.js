// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeContext } from './ThemeContext';
import { useContext } from 'react';
import logo from './assets/logo.png'; 

import Home from './pages/Home';
import TextImage from './pages/TextImag';
import TextAudio from './pages/TextAudio';
import TextText from './pages/TextText';
import ImageImage from './pages/ImageImage';

import './App.css';

function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Router>
      <div className={`app ${theme}`}>
        <nav className="navbar">
            <div className="logo">
      <img src={logo} alt="StegX Logo" style={{ height: '40px', marginRight: '10px' }} />
      StegX
    </div>

          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/text-image">Text in Image</Link></li>
            <li><Link to="/text-audio">Text in Audio</Link></li>
            <li><Link to="/text-text">Text in Text</Link></li>
            <li><Link to="/image-image">Image in Image</Link></li>
          </ul>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/text-image" element={<TextImage />} />
          <Route path="/text-audio" element={<TextAudio />} />
          <Route path="/text-text" element={<TextText />} />
          <Route path="/image-image" element={<ImageImage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
