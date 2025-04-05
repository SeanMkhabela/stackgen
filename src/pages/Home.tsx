import { Box, Typography, Card, CardContent, useTheme } from "@mui/material";

export default function Home() {
  const theme = useTheme();
  
  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ 
        fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
        fontWeight: 600,
        color: theme.palette.primary.main 
      }}>
        Welcome to StackGen <img src="/wave-emoji.png" alt="wave" style={{ width: '1.25rem', height: '1.25rem', verticalAlign: 'middle' }} />
      </Typography>
      
      <Typography variant="body1" paragraph sx={{ mb: 3 }}>
        Your modern development environment is ready!
      </Typography>
      
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, 
        gap: 3, 
        mt: 2,
        minHeight: '300px'
      }}>
        <Card 
          variant="outlined" 
          sx={{ 
            height: '100%',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: theme.shadows[4]
            }
          }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Project Stats
            </Typography>
            <Typography variant="body2">
              Your project is now fully responsive and has a centralized theme system.
            </Typography>
          </CardContent>
        </Card>
        
        <Card 
          variant="outlined" 
          sx={{ 
            height: '100%',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: theme.shadows[4]
            }
          }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Theme Control
            </Typography>
            <Typography variant="body2">
              Use the theme settings button in the corner to customize your experience.
            </Typography>
          </CardContent>
        </Card>
        
        <Card 
          variant="outlined" 
          sx={{ 
            height: '100%',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: theme.shadows[4]
            }
          }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Responsive Design
            </Typography>
            <Typography variant="body2">
              This layout will automatically adjust to any screen size for the best user experience.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
