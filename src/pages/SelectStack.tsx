import { Box, Typography, Paper, Card, CardContent, CardHeader, useTheme } from "@mui/material";

export default function SelectStack() {
  const theme = useTheme();
  
  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ 
        fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
        fontWeight: 600,
        color: theme.palette.primary.main,
        mb: 3
      }}>
        Select your stack
      </Typography>
      
      <Paper 
        elevation={0} 
        variant="outlined" 
        sx={{ 
          p: { xs: 2, sm: 3 }, 
          borderRadius: 2,
          backgroundColor: theme.palette.mode === 'dark' 
            ? 'rgba(255,255,255,0.03)' 
            : 'rgba(0,0,0,0.01)',
          display: 'flex',
          flexDirection: 'column',
          mb: 2
        }}
      >
        <Typography variant="body1" paragraph>
          Choose the technologies and configurations for your new project
        </Typography>
        
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, 
          gap: 3, 
          mt: 3,
          minHeight: '300px'
        }}>
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardHeader title="Frontend" />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Select your frontend framework and libraries
              </Typography>
              {/* Add dropdowns, toggles, checkboxes here later */}
            </CardContent>
          </Card>
          
          <Card variant="outlined" sx={{ height: '100%' }}>
            <CardHeader title="Backend" />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Choose your backend technologies
              </Typography>
              {/* Add dropdowns, toggles, checkboxes here later */}
            </CardContent>
          </Card>
        </Box>
      </Paper>
    </Box>
  );
}