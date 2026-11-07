
import { usePreferences } from '../../context/PreferencesContext';

export default function ThemeSwitcher() {
  const { theme, setTheme, t } = usePreferences();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button onClick={toggleTheme}>
      {theme === "light" ? ` ${t("dark")}` : ` ${t("light")}`}
    </button>
  );
}
