import { useEffect } from "react";
import { createContext , useState } from "react";
import { translations } from "@/lang";
const LangContext = createContext();

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('lang') || "en";
  });
  
  useEffect(() => {
    localStorage.setItem("lang" , lang);
  })

  const toggleLang = () => {
    const newLang = lang === "en" ? "id" : "en";
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  }
  const t = (key) => {
    const keys = key.split(".");
    let value = translations[lang];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  };
  return (
    <LangContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export default LangContext;
