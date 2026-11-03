
import { usePreferences } from "../../context/PreferencesContext";

export default function LanguageSwitcher() {
  const { language, setLanguage } = usePreferences();

  const toggleLanguage = () => {
    setLanguage(language === "ar" ? "en" : "ar");
  };

  return (
    <button onClick={toggleLanguage}>
      {language === "ar" ? "English" : "العربية"}
    </button>
  );
}
