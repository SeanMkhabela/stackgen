import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Avatar,
  Button,
  Divider,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  Container
} from '@mui/material';
import { Person, Logout } from '@mui/icons-material';
import { useAuth } from '../context/useAuth';

export default function Profile() {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { user, logout } = useAuth(); // Use the authentication context

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      // Call the AuthProvider's logout function
      logout();
      
      // Redirect to login
      navigate('/signin');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <Container disableGutters sx={{ maxWidth: { xs: '100%', sm: '600px' }, ml: 0 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        User Profile
      </Typography>
      
      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar 
              sx={{ 
                width: 80, 
                height: 80, 
                bgcolor: 'primary.main',
                mr: 3
              }}
            >
              <Person fontSize="large" />
            </Avatar>
            <Box>
              <Typography variant="h5" component="div" gutterBottom>
                Profile Information
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Manage your account details
              </Typography>
            </Box>
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Email Address
            </Typography>
            <Typography variant="body1">
              {user?.email ?? 'Not signed in'}
            </Typography>
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button
              variant="contained"
              color="error"
              startIcon={isLoggingOut ? <CircularProgress size={20} color="inherit" /> : <Logout />}
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? 'Logging out...' : 'Log Out'}
            </Button>
          </Box>
        </CardContent>
      </Card>
      
      <Alert severity="info" sx={{ mb: 2 }}>
        Additional profile features like password reset will be implemented in a future update.
      </Alert>
    </Container>
  );
} 