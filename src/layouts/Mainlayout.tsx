// src/layouts/MainLayout.tsx
import { ReactNode, useEffect, useState } from 'react'
import { Box, CssBaseline, Toolbar } from '@mui/material'
import Header from '../components/Header'
import Sidebar, { drawerWidth } from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
import ThemeSettings from '../components/ThemeSettings'

interface MainLayoutProps {
  children?: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [sidebarWidth, setSidebarWidth] = useState(drawerWidth)

  useEffect(() => {
    const handleSidebarChange = () => {
      const sidebarElement = document.querySelector('.MuiDrawer-paper')
      if (sidebarElement) {
        const width = parseInt(window.getComputedStyle(sidebarElement).width, 10)
        setSidebarWidth(width)
      }
    }

    const observer = new MutationObserver(handleSidebarChange)
    const sidebarElement = document.querySelector('.MuiDrawer-paper')
    if (sidebarElement) {
      observer.observe(sidebarElement, { attributes: true })
    }

    // Initial check
    handleSidebarChange()

    return () => observer.disconnect()
  }, [])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100%',
      }}
    >
      <CssBaseline />
      <Header />

      <Box sx={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            ml: `${sidebarWidth}px`,
            transition: theme => theme.transitions.create('margin', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }}
        >
          <Toolbar /> {/* Spacer for fixed header */}
          <Box component="main" sx={{ flexGrow: 1, px: 3, py: 2, pb: 4 }}>
            {children || <Outlet />}
          </Box>
        </Box>

      </Box>


      <ThemeSettings />

    </Box>
  )
}
