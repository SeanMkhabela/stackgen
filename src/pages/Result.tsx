import { Box, Typography, Paper, Card, CardContent, useTheme } from "@mui/material";

export default function Result() {
  const theme = useTheme();
  
  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ 
        fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
        fontWeight: 600,
        color: theme.palette.primary.main,
        mb: 3
      }}>
        Generated Project
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
          Your project has been generated with the selected configurations.
        </Typography>
        
        <Card 
          variant="outlined" 
          sx={{ 
            mt: 3,
            mb: 2,
            minHeight: '200px',
            backgroundColor: theme.palette.mode === 'dark' 
              ? 'rgba(0,0,0,0.2)' 
              : 'rgba(0,0,0,0.03)',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Download Options
            </Typography>
            <Typography variant="body2" paragraph>
              The generated code will be available for download shortly.
            </Typography>
            {/* Download options will be added here */}
          </CardContent>
        </Card>
      </Paper>
    </Box>
  );
}