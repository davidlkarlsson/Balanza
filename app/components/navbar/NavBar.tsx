import { useState, useEffect, useRef } from "react";
import "./NavBar.css";
import { NavLink } from "react-router";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);

  // Stäng menyn vid klick utanför (fungerar både för mus och touch)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <nav className="navbar">
      {/* Desktop Navbar */}
      <div className="nav-desktop">
        <ul className="nav-links">
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
              Utmaningar
            </NavLink>
          </li>
          <li>
            <NavLink to="/savingtips" className={({ isActive }) => (isActive ? "active" : "")}>
              Spartips
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="nav-mobile">
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰ {/* Hamburgersymbol */}
        </button>
      </div>

      {/* Mobile Menu */}
      <ul ref={menuRef} className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={() => setMenuOpen(false)}
          >
            Utmaningar
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/savingtips"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={() => setMenuOpen(false)}
          >
            Spartips
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
