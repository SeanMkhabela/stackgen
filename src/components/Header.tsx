import { AppBar, Toolbar, Typography, IconButton, useTheme } from "@mui/material";
import { IconSun, IconMoon } from "@tabler/icons-react";
import { useContext } from "react";
import { ColorModeContext } from "./ThemeProvider";

export default function Header() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const isDark = theme.palette.mode === "dark";

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        background: isDark
          ? "linear-gradient(90deg, #2c2c54, #1e3a8a 60%, #0bc9e8)"
          : "linear-gradient(90deg, #646cff, #3b82f6 60%, #61dafb)",
        color: "white",
      }}
    >
      <Toolbar>
        <Typography
          variant="h5"
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: 700,
            fontFamily: "'Poppins', 'Segoe UI', sans-serif",
            letterSpacing: 1,
          }}
        >
          StackGen
        </Typography>
        <IconButton onClick={colorMode.toggleColorMode} color="inherit">
          {isDark ? <IconSun /> : <IconMoon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
