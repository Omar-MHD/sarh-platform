import { useState, useEffect } from "react";
import "./Navbar.css";
import LanguageSwitcher from '../Switchers/LanguageSwitcher';
import ThemeSwitcher from '../Switchers/ThemeSwitcher';
import { usePreferences } from "../../context/PreferencesContext";

export default function Navbar() {
  const { t } = usePreferences();
  const [activeHash, setActiveHash] = useState<string>("home");

  useEffect(() => {
    const updateHash = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      setActiveHash(hash);
    };

    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* Brand */}
        <a href="#home" className="navbar-brand">
          <span className="brand-icon">ص</span>
          <span className="brand-text">
            <strong>صَرح</strong>
            <small>SARH</small>
          </span>
        </a>

        {/* Navigation links with Active Indicator */}
        <nav className="navbar-links">
          <a href="#home" className={activeHash === "home" ? "active" : ""}>
            {t("home")}
          </a>
          <a href="#properties" className={activeHash === "properties" ? "active" : ""}>
            {t("properties")}
          </a>
          <a href="#tenders" className={activeHash === "tenders" ? "active" : ""}>
            {t("tenders")}
          </a>
          <a href="#services" className={activeHash === "services" ? "active" : ""}>
            {t("services")}
          </a>
          <a href="#about" className={activeHash === "about" ? "active" : ""}>
            {t("about")}
          </a>
        </nav>

        {/* Actions */}
        <div className="navbar-actions">
          <LanguageSwitcher />
          <ThemeSwitcher />
          <button className="login-button">
            {t("login")}
          </button>
        </div>

      </div>
    </header>
  );
}