// ThemeProvider.tsx
import React, { createContext, useMemo, useState, useEffect } from "react";
import { ThemeProvider as MUIThemeProvider, createTheme, CssBaseline, PaletteMode, useMediaQuery, Theme, ThemeOptions } from "@mui/material";
import { getThemeOptions } from "../styles/theme";

// Extend ThemeOptions to include our custom properties
interface ExtendedThemeOptions extends ThemeOptions {
  contentWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
}

// Extend Theme to include our custom properties
interface ExtendedTheme extends Theme {
  contentWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
}

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

  // Get additional theme settings from localStorage
  const [fontSize, setFontSize] = useState<number>(() => {
    const savedFontSize = localStorage.getItem('theme-font-size');
    return savedFontSize ? parseInt(savedFontSize, 10) : 14;
  });

  const [primaryColor, setPrimaryColor] = useState<string>(() => {
    return localStorage.getItem('theme-primary-color') || '#646cff';
  });

  const [contentWidth, setContentWidth] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl' | false>(() => {
    const savedWidth = localStorage.getItem('theme-content-width');
    return (savedWidth as 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false) || 'lg';
  });

  // Update localStorage when mode changes
  useEffect(() => {
    localStorage.setItem('theme-mode', mode);
  }, [mode]);

  // Listen for changes in localStorage from other components
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'theme-font-size' && e.newValue) {
        setFontSize(parseInt(e.newValue, 10));
      } else if (e.key === 'theme-primary-color' && e.newValue) {
        setPrimaryColor(e.newValue);
      } else if (e.key === 'theme-content-width' && e.newValue) {
        setContentWidth(e.newValue as 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

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
  const theme = useMemo(() => {
    const themeOptions = getThemeOptions(mode);
    
    // Apply custom settings from localStorage
    const customizedThemeOptions: ExtendedThemeOptions = {
      ...themeOptions,
      typography: {
        ...themeOptions.typography,
        fontSize: fontSize,
      },
      palette: {
        ...themeOptions.palette,
        primary: {
          ...themeOptions.palette?.primary,
          main: primaryColor,
        }
      },
      // Store contentWidth in theme to be used by layout components
      contentWidth: contentWidth
    };
    
    return createTheme(customizedThemeOptions) as ExtendedTheme;
  }, [mode, fontSize, primaryColor, contentWidth]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ColorModeContext.Provider>
  );
}
