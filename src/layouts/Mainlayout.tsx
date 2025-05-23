// src/layouts/MainLayout.tsx
import { ReactNode, useEffect, useState, useCallback } from 'react'
import { Box, CssBaseline, Toolbar } from '@mui/material'
import Sidebar, { drawerWidth } from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
import ThemeSettings from '../components/ThemeSettings'
import AuthNavBar from '../components/AuthNavBar'
import PageTransition from '../components/PageTransition'

interface MainLayoutProps {
  children?: ReactNode
}

export default function MainLayout({ children }: Readonly<MainLayoutProps>) {
  const [sidebarWidth, setSidebarWidth] = useState(drawerWidth)

  // More efficient sidebar width tracking with useCallback
  const handleSidebarChange = useCallback(() => {
    const sidebarElement = document.querySelector('.MuiDrawer-paper')
    if (sidebarElement) {
      const width = parseInt(window.getComputedStyle(sidebarElement).width, 10)
      setSidebarWidth(width)
    }
  }, [])

  useEffect(() => {
    // Create ResizeObserver instead of MutationObserver for better performance
    const resizeObserver = new ResizeObserver(handleSidebarChange)
    const sidebarElement = document.querySelector('.MuiDrawer-paper')
    
    if (sidebarElement) {
      resizeObserver.observe(sidebarElement)
    }

    // Initial check
    handleSidebarChange()

    return () => resizeObserver.disconnect()
  }, [handleSidebarChange])

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
      <AuthNavBar />

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
          <Box component="main" sx={{ flexGrow: 1, py: 2, pb: 4, mr: 4 }}>
            <PageTransition>
              {children ?? <Outlet />}
            </PageTransition>
          </Box>
        </Box>
      </Box>

      <ThemeSettings />
    </Box>
  )
}
