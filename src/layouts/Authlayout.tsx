import { Box, CssBaseline } from '@mui/material'
import { Outlet } from 'react-router-dom'
import PageTransition from '../components/PageTransition'

export default function AuthLayout() {
  return (
    <Box
      sx={{
        width: '100vw',                 
        height: '100vh',                
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(to bottom right, #e3f2fd, #c5cae9)',
        overflowX: 'hidden',            
        margin: 0,
        padding: 0,
      }}
    >
      <CssBaseline />

      {/* If you want your sign-in form centered */}
      <Box
        sx={{
          flex: 1,                      
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <PageTransition>
          <Outlet />
        </PageTransition>
      </Box>
    </Box>
  )
}
