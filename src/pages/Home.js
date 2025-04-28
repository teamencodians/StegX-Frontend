import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // <-- Import your logo
import './Home.css';

export default function Home() {
  return (
    <motion.div className="home-wrapper" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      <div className="hero-container">
        <img src={logo} alt="StegX Logo" className="hero-logo" />

        <p className="tagline">"Hiding your secrets smarter!"</p>

        <div className="hero-buttons">
          <Link to="/text-image" className="hero-btn">🖼️ Text in Image</Link>
          <Link to="/text-audio" className="hero-btn">🎧 Text in Audio</Link>
          <Link to="/text-text" className="hero-btn">📄 Text in Text</Link>
          <Link to="/image-image" className="hero-btn">🖼️ Image in Image</Link>
        </div>
      </div>
    </motion.div>
  )
}
