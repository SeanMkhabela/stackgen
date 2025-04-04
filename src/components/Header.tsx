import { AppBar, Toolbar, Typography, IconButton, useTheme, Box, Container } from "@mui/material";
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
        color: theme.palette.primary.contrastText,
        boxShadow: theme.shadows[3],
        transition: theme.transitions.create(['background', 'box-shadow'], {
          duration: theme.transitions.duration.standard,
        }),
      }}
    >
      <Container maxWidth={false}>
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: { xs: theme.spacing(0, 1), sm: theme.spacing(0, 2) },
            minHeight: { xs: 56, sm: 64 },
          }}
        >
          <Typography
            variant="h5"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              fontFamily: theme.typography.fontFamily,
              letterSpacing: 1,
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            StackGen
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton 
              onClick={colorMode.toggleColorMode} 
              color="inherit"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              sx={{
                transition: theme.transitions.create('transform', {
                  duration: theme.transitions.duration.shorter,
                }),
                '&:hover': {
                  transform: 'rotate(15deg)',
                }
              }}
            >
              {isDark ? <IconSun /> : <IconMoon />}
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
