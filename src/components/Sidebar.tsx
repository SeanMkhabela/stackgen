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
  Tooltip,
  useMediaQuery,
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
  { label: "Home", icon: <IconHome2 />, path: "/home" },
  { label: "Start New", icon: <IconPlus />, path: "/select-stack" },
  { label: "Result", icon: <IconCheckupList />, path: "/result" },
  { label: "Settings", icon: <IconSettings2 />, path: "/settings" },
];

export default function Sidebar() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const location = useLocation();
  const activePage = location.pathname;
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [collapsed, setCollapsed] = useState(isMobile);

  // Auto-collapse on mobile devices
  useEffect(() => {
    setCollapsed(isMobile);
  }, [isMobile]);

  const toggleDrawer = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: collapsed ? collapsedWidth : drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: collapsed ? collapsedWidth : drawerWidth,
          boxSizing: "border-box",
          backgroundColor: isDark
            ? theme.palette.background.paper
            : theme.palette.background.paper,
          backdropFilter: "blur(6px)",
          borderRight: `1px solid ${
            isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
          }`,
          transition: theme.transitions.create(["width", "border-color"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          overflowX: "hidden",
          height: '100%',
          boxShadow: theme.shadows[1],
        },
      }}
    >
      <Toolbar />
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          p: 1,
          borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
          mb: 1,
        }}
      >
        <Tooltip title={collapsed ? "Expand" : "Collapse"} placement="right">
          <IconButton onClick={toggleDrawer} color="primary" size="small">
            {collapsed ? <IconArrowRight size={18} /> : <IconArrowLeft size={18} />}
          </IconButton>
        </Tooltip>
      </Box>
      <List sx={{ px: 1 }}>
        {navItems.map(({ label, icon, path }) => (
          <Tooltip 
            key={path}
            title={collapsed ? label : ""}
            placement="right"
            disableHoverListener={!collapsed}
          >
            <ListItemButton
              component={Link}
              to={path}
              selected={activePage === path}
              sx={{
                minHeight: 48,
                justifyContent: collapsed ? "center" : "initial",
                px: 2.5,
                borderRadius: theme.shape.borderRadius,
                mb: 0.5,
                "&:hover": {
                  backgroundColor: isDark
                    ? "rgba(255,255,255,0.04)"
                    : "rgba(0,0,0,0.04)",
                },
                "&.Mui-selected": {
                  backgroundColor: isDark
                    ? "rgba(100,108,255,0.25)"
                    : "rgba(100,108,255,0.15)",
                  borderRight: `4px solid ${theme.palette.primary.main}`,
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: collapsed ? 'auto' : 3,
                  justifyContent: 'center',
                  color: activePage === path ? theme.palette.primary.main : 'inherit',
                }}
              >
                {icon}
              </ListItemIcon>
              {!collapsed && <ListItemText primary={label} sx={{ 
                opacity: 1,
                transition: theme.transitions.create('opacity', {
                  duration: theme.transitions.duration.standard
                })
              }} />}
            </ListItemButton>
          </Tooltip>
        ))}
      </List>
    </Drawer>
  );
}
