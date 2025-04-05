import { useEffect, useState } from 'react';
import { Box, Button, Container, Typography, Paper, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowBack as ArrowBackIcon, Home as HomeIcon } from '@mui/icons-material';

const NotFound = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [counter, setCounter] = useState(15);
  
  // Automatic redirect countdown
  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => setCounter(counter - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      navigate('/');
    }
  }, [counter, navigate]);
  
  // Handle navigation
  const handleGoBack = () => {
    navigate(-1);
  };
  
  const handleGoHome = () => {
    navigate('/');
  };
  
  return (
    <Container maxWidth="md" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 5, 
          borderRadius: 3,
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: theme.palette.mode === 'dark' 
            ? 'rgba(0, 0, 0, 0.7)' 
            : 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)'
        }}
      >
        {/* Animated background elements */}
        <Box 
          sx={{
            position: 'absolute',
            top: -100,
            left: -100,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: theme.palette.primary.main,
            opacity: 0.2,
            animation: 'float 8s infinite ease-in-out',
            zIndex: -1
          }}
        />
        <Box 
          sx={{
            position: 'absolute',
            bottom: -120,
            right: -120,
            width: 250,
            height: 250,
            borderRadius: '50%',
            background: theme.palette.secondary.main,
            opacity: 0.15,
            animation: 'float 12s infinite ease-in-out reverse',
            zIndex: -1
          }}
        />
        
        <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <Typography 
            variant="h1" 
            sx={{ 
              fontSize: { xs: '6rem', md: '10rem' },
              fontWeight: 900,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2
            }}
          >
            404
          </Typography>
          
          <Typography variant="h4" component="h1" gutterBottom>
            Page Not Found
          </Typography>
          
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: '600px', mx: 'auto' }}>
            We couldn't find the page you're looking for. It might have been moved, 
            deleted, or perhaps it never existed. Don't worry, you'll be redirected to 
            the home page in <strong>{counter}</strong> seconds.
          </Typography>
          
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: 2, 
              flexWrap: { xs: 'wrap', sm: 'nowrap' }
            }}
          >
            <Button 
              variant="outlined"
              color="primary"
              startIcon={<ArrowBackIcon />}
              onClick={handleGoBack}
              sx={{ minWidth: '140px' }}
            >
              Go Back
            </Button>
            
            <Button 
              variant="contained"
              color="primary" 
              startIcon={<HomeIcon />}
              onClick={handleGoHome}
              sx={{ minWidth: '140px' }}
            >
              Home Page
            </Button>
          </Box>
        </Box>
      </Paper>
      
      {/* CSS animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(30px, 30px); }
          }
        `}
      </style>
    </Container>
  );
};

export default NotFound; 