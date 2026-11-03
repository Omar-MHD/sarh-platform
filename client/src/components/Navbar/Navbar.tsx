
import "./Navbar.css";

import LanguageSwitcher from "../Switchers/LanguageSwitcher";
import ThemeSwitcher from "../ThemeSwitcher";
import { usePreferences } from "../../context/PreferencesContext";

export default function Navbar() {
  const { t } = usePreferences();

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* Brand */}
        <a href="/" className="navbar-brand">
          <span className="brand-icon">ص</span>

          <span className="brand-text">
            <strong>صَرح</strong>
            <small>SARH</small>
          </span>
        </a>

        {/* Navigation links */}
        <nav className="navbar-links">
          <a href="#home">{t("home")}</a>
          <a href="#properties">{t("properties")}</a>
          <a href="#tenders">{t("tenders")}</a>
          <a href="#services">{t("services")}</a>
          <a href="#about">{t("about")}</a>
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
