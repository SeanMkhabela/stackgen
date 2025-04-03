import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useTheme,
} from "@mui/material";
import {
  IconHome2,
  IconPlus,
  IconCheckupList,
  IconSettings2,
} from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";
import '../styles/Sidebar.css';

const drawerWidth = 240;

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

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: isDark
            ? "rgba(15,15,30,0.8)"
            : "rgba(250,250,255,0.8)",
          backdropFilter: "blur(6px)",
          borderRight: `1px solid ${
            isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
          }`,
        },
      }}
    >
      <Toolbar />
      <List>
        {navItems.map(({ label, icon, path }) => (
          <ListItemButton
            key={path}
            component={Link}
            to={path}
            selected={activePage === path}
            sx={{
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
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}
