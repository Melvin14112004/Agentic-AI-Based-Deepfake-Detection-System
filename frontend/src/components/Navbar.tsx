import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-brand">
          <div className="navbar-logo">
            <span>A</span>
          </div>
          <div className="navbar-title">
            <span className="navbar-title-main">Agentic AI-Based Deepfake</span>
            <span className="navbar-title-sub">Detection System</span>
          </div>
        </div>
        
        {/* Theme Toggle Button - Top Right */}
        <div className="navbar-actions">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}