import styles from "./Header.module.css"
import logo from "../../images/BalanzaRATT.svg"
import { useEffect, useState } from "react"

// Lägg till denna!
import { Link } from "react-router"
import NavBar from "../navbar/NavBar"

export function Header() {
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`${styles.header} ${hasScrolled ? styles.scrolled : ""}`}
    >
      <NavBar />

      <Link to="/">
        <img
          className={styles.logo}
          src={logo}
          alt="Bild på en logotyp för Balanza"
        />
      </Link>
    </header>
  )
}
