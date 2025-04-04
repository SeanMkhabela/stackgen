// ThemeProvider.tsx
import React, { createContext, useMemo, useState, useEffect } from "react";
import { ThemeProvider as MUIThemeProvider, createTheme, CssBaseline, PaletteMode, useMediaQuery } from "@mui/material";
import { getThemeOptions } from "../styles/theme";

type ColorModeContextType = {
  toggleColorMode: () => void;
  mode: PaletteMode;
  setMode: (mode: PaletteMode) => void;
};

export const ColorModeContext = createContext<ColorModeContextType>({ 
  toggleColorMode: () => {},
  mode: 'light',
  setMode: () => {}
});

export default function ThemeProviderWrapper({ children }: { children: React.ReactNode }) {
  // Use system preference as default
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  
  // Check localStorage for saved preference only once on mount
  const [mode, setMode] = useState<PaletteMode>(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('theme-mode');
      if (savedMode === 'light' || savedMode === 'dark') {
        return savedMode as PaletteMode;
      }
    }
    return prefersDarkMode ? 'dark' : 'light';
  });

  // Update localStorage when mode changes
  useEffect(() => {
    localStorage.setItem('theme-mode', mode);
  }, [mode]);

  // Listen for system preference changes only if no user preference exists
  useEffect(() => {
    const savedMode = localStorage.getItem('theme-mode');
    if (!savedMode) {
      setMode(prefersDarkMode ? 'dark' : 'light');
    }
  }, [prefersDarkMode]);

  // Memoize the color mode context to prevent unnecessary re-renders
  const colorMode = useMemo(() => ({
    toggleColorMode: () => setMode((prev) => (prev === "light" ? "dark" : "light")),
    mode,
    setMode
  }), [mode]);

  // Memoize theme to prevent unnecessary re-creation
  const theme = useMemo(() => createTheme(getThemeOptions(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ColorModeContext.Provider>
  );
}
