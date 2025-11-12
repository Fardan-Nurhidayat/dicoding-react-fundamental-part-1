import { createContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Check localStorage first, then system preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme;
    }
    return "light";
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
    setTheme((prevTheme) => prevTheme === "light" ? "dark" : "light");
    document.documentElement.className = theme;
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