import "./Hero.css";
import { usePreferences } from "../../context/PreferencesContext";

export default function Hero() {
  const { t } = usePreferences();

  return (
    <section className="hero-section" id="home">
      <div className="hero-content">
        <span className="hero-label">
          SARH — {t("heroLabel")}
        </span>

        <h1>{t("heroTitle")}</h1>

        <p className="hero-description">
          {t("heroDescription")}
        </p>

        <div className="hero-buttons">
          <a href="#properties" className="hero-button primary">
            {t("exploreProperties")}
          </a>

          <a href="#services" className="hero-button secondary">
            {t("requestService")}
          </a>
        </div>

        <div className="hero-search">
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
          />

          <button type="button">
            {t("search")}
          </button>
        </div>
      </div>
    </section>
  );
}