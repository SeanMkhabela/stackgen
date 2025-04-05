import { createContext } from "react";
import { PaletteMode } from "@mui/material";

export type ColorModeContextType = {
  toggleColorMode: () => void;
  mode: PaletteMode;
  setMode: (mode: PaletteMode) => void;
};

export const ColorModeContext = createContext<ColorModeContextType>({ 
  toggleColorMode: () => {},
  mode: 'light',
  setMode: () => {}
}); 