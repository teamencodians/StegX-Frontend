import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import './Navbar.css';

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="navbar">
      <div className="logo">StegX</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/text-image">Text in Image</Link></li>
        <li><Link to="/text-audio">Text in Audio</Link></li>
        <li><Link to="/text-text">Text in Text</Link></li>
        <li><Link to="/image-image">Image in Image</Link></li>
      </ul>
      <div className="theme-toggle" onClick={toggleTheme}>
        {theme === 'light' ? <FaMoon /> : <FaSun />}
      </div>
    </nav>
  )
}
