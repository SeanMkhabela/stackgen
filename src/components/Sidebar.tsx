import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useTheme,
  IconButton,
  Box,
} from "@mui/material";
import {
  IconHome2,
  IconPlus,
  IconCheckupList,
  IconSettings2,
  IconArrowLeft,
  IconArrowRight,
} from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";
import '../styles/Sidebar.css';
import { useState, useEffect } from "react";

export const drawerWidth = 240;
export const collapsedWidth = 65;

const navItems = [
  { label: "Home", icon: <IconHome2 />, path: "/" },
  { label: "Start New", icon: <IconPlus />, path: "/select-stack" },
  { label: "Result", icon: <IconCheckupList />, path: "/result" },
  { label: "Settings", icon: <IconSettings2 />, path: "/settings" },
];

export default function Sidebar() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const location = useLocation();
  const activePage = location.pathname;
  const [collapsed, setCollapsed] = useState(false);
  const [sidebarHeight, setSidebarHeight] = useState('calc(100vh - 250px)');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
      
      // Calculate the height to leave space for the footer
      const footerHeight = document.querySelector('footer')?.clientHeight || 250;
      setSidebarHeight(`calc(100vh - ${footerHeight}px)`);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Set up a mutation observer to check when footer dimensions change
    const footerObserver = new MutationObserver(handleResize);
    const footer = document.querySelector('footer');
    if (footer) {
      footerObserver.observe(footer, { attributes: true, childList: true, subtree: true });
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      footerObserver.disconnect();
    };
  }, []);

  const toggleDrawer = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: collapsed ? collapsedWidth : drawerWidth,
        flexShrink: 0,
        position: 'absolute',
        height: 'auto',
        "& .MuiDrawer-paper": {
          position: 'relative',
          width: collapsed ? collapsedWidth : drawerWidth,
          boxSizing: "border-box",
          backgroundColor: isDark
            ? "rgba(15,15,30,0.8)"
            : "rgba(250,250,255,0.8)",
          backdropFilter: "blur(6px)",
          borderRight: `1px solid ${
            isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
          }`,
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          overflowX: "hidden",
          overflowY: "auto",
          height: sidebarHeight,
          maxHeight: sidebarHeight,
        },
      }}
    >
      <Toolbar />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
        <IconButton onClick={toggleDrawer} color="primary">
          {collapsed ? <IconArrowRight size={18} /> : <IconArrowLeft size={18} />}
        </IconButton>
      </Box>
      <List>
        {navItems.map(({ label, icon, path }) => (
          <ListItemButton
            key={path}
            component={Link}
            to={path}
            selected={activePage === path}
            sx={{
              minHeight: 48,
              justifyContent: collapsed ? "center" : "initial",
              px: 2.5,
              "&:hover": {
                backgroundColor: isDark
                  ? "rgba(255,255,255,0.04)"
                  : "rgba(0,0,0,0.04)",
              },
              "&.Mui-selected": {
                backgroundColor: isDark
                  ? "rgba(100,108,255,0.25)"
                  : "rgba(100,108,255,0.15)",
                borderRight: "4px solid #646cff",
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: collapsed ? 'auto' : 3,
                justifyContent: 'center',
              }}
            >
              {icon}
            </ListItemIcon>
            {!collapsed && <ListItemText primary={label} />}
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}
