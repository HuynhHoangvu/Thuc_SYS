import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";

type ThemeMode = "light" | "tet" | "japan";

interface ThemeContextType {
  themeMode: ThemeMode;
  toggleTheme: () => void;
}

// Default value to prevent errors during initial render
const defaultContext: ThemeContextType = {
  themeMode: "light",
  toggleTheme: () => {},
};

const ThemeContext = createContext<ThemeContextType>(defaultContext);

const THEME_KEY = "panda-theme-mode";

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    if (typeof window === "undefined") return "light";
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "tet" || saved === "japan") return saved;
    return "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("theme-panda", "theme-panda-dark", "theme-tet", "theme-japan");

    if (themeMode === "tet") {
      root.classList.add("theme-tet");
    } else if (themeMode === "japan") {
      root.classList.add("theme-japan");
    } else {
      root.classList.add("theme-panda");
    }
    localStorage.setItem(THEME_KEY, themeMode);
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode((prev) => {
      if (prev === "light") return "tet";
      if (prev === "tet") return "japan";
      return "light";
    });
  };

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  return useContext(ThemeContext);
};