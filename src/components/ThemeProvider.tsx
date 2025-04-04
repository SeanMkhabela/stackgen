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
  
  // Check localStorage for saved preference
  const getSavedMode = (): PaletteMode => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('theme-mode');
      if (savedMode === 'light' || savedMode === 'dark') {
        return savedMode;
      }
    }
    return prefersDarkMode ? 'dark' : 'light';
  };

  const [mode, setMode] = useState<PaletteMode>(getSavedMode());

  // Update localStorage when mode changes
  useEffect(() => {
    localStorage.setItem('theme-mode', mode);
  }, [mode]);

  // Listen for system preference changes
  useEffect(() => {
    const savedMode = localStorage.getItem('theme-mode');
    if (!savedMode) {
      setMode(prefersDarkMode ? 'dark' : 'light');
    }
  }, [prefersDarkMode]);

  const colorMode = useMemo(() => ({
    toggleColorMode: () => setMode((prev) => (prev === "light" ? "dark" : "light")),
    mode,
    setMode
  }), [mode]);

  // Use our centralized theme configuration
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
