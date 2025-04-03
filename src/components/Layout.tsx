import { ReactNode, useState, useEffect } from "react";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import Header from "./Header";
import Sidebar, { drawerWidth, collapsedWidth } from "./Sidebar";
import Footer from "./footer";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const [sidebarWidth, setSidebarWidth] = useState(isSmallScreen ? collapsedWidth : drawerWidth);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    const handleSidebarChange = () => {
      // Get the computed style of the sidebar to determine its width
      const sidebarElement = document.querySelector('.MuiDrawer-paper');
      if (sidebarElement) {
        const width = parseInt(window.getComputedStyle(sidebarElement).width, 10);
        setSidebarWidth(width);
      }
    };

    // Observer to detect sidebar width changes
    const observer = new MutationObserver(handleSidebarChange);
    const sidebarElement = document.querySelector('.MuiDrawer-paper');
    if (sidebarElement) {
      observer.observe(sidebarElement, { attributes: true });
    }

    window.addEventListener('resize', handleResize);
    handleResize();
    handleSidebarChange();

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <CssBaseline />
      <Header />
      <Box sx={{ display: "flex", flex: 1, position: "relative" }}>
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            ml: `${sidebarWidth}px`,
            transition: theme => theme.transitions.create('margin', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
      <Box 
        component="footer"
        sx={{
          width: '100%',
          position: 'relative',
          left: 0,
          right: 0,
          marginLeft: 0,
          marginTop: "auto",
          zIndex: 1200, // Ensure footer is above sidebar
        }}
      >
        <Footer />
      </Box>
    </Box>
  );
}
