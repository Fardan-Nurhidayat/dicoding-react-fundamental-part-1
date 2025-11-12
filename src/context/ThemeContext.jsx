import { createContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
     return localStorage.getItem("theme") || "light";
  });

  // Sync theme ke localStorage dan HTML element
  useEffect(() => {
    localStorage.setItem("theme", theme);

    // Update HTML class untuk styling global
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

 const toggleTheme = () => {
   setTheme((prev) => (prev === "light" ? "dark" : "light"));
 };

  const value = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export default ThemeContext;