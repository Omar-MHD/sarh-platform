
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { translations } from "../i18n/translations";

// أنواع الإعدادات المسموح بها
type Language = "ar" | "en";
type Theme = "light" | "dark";

// شكل البيانات التي سيقدمها Context
type PreferencesContextType = {
  language: Language;
  theme: Theme;
  setLanguage: (language: Language) => void;
  setTheme: (theme: Theme) => void;
  t: (key: keyof typeof translations.ar) => string;
};

// إنشاء Context
const PreferencesContext = createContext<
  PreferencesContextType | undefined
>(undefined);

// Provider المسؤول عن مشاركة الإعدادات
export function PreferencesProvider({
  children,
}: {
  children: ReactNode;
}) {
  // قراءة الإعدادات المحفوظة أو استخدام القيم الافتراضية
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem("language");

    return savedLanguage === "en" ? "en" : "ar";
  });

  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("theme");

    return savedTheme === "dark" ? "dark" : "light";
  });

  // تطبيق اللغة والثيم على الصفحة وحفظهما
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.dataset.theme = theme;

    localStorage.setItem("language", language);
    localStorage.setItem("theme", theme);
  }, [language, theme]);

  // دالة للحصول على الترجمة حسب اللغة الحالية
  const t = (key: keyof typeof translations.ar) => {
    return translations[language][key];
  };

  return (
    <PreferencesContext.Provider
      value={{
        language,
        theme,
        setLanguage,
        setTheme,
        t,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}

// Hook لاستخدام الإعدادات داخل Components
export function usePreferences() {
  const context = useContext(PreferencesContext);

  if (!context) {
    throw new Error(
      "usePreferences must be used inside PreferencesProvider"
    );
  }

  return context;
}
