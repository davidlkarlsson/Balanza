import { useState, useEffect, useRef } from "react"
import "./NavBar.css"
import { NavLink } from "react-router"

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLUListElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Stäng menyn vid klick utanför (fungerar både för mus och touch)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false)
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("touchstart", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("touchstart", handleClickOutside)
    }
  }, [menuOpen])

  return (
    <nav className="navbar">
      {/* Desktop Navbar */}
      <div className="nav-desktop">
        <ul className="nav-links">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              No Spend Week
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/history"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Mina Resultat
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/savingtips"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Dagens Spartips!
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="nav-mobile">
        <button
          ref={buttonRef}
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
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
            No Spend Week
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/history"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={() => setMenuOpen(false)}
          >
            Mina Resultat
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/savingtips"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={() => setMenuOpen(false)}
          >
            Dagens Spartips!
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}
