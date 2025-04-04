import { Typography, Card, CardContent, Box } from '@mui/material';
import { PageLayout } from '../components/ResponsiveLayout';

export default function Dashboard() {
  return (
    <PageLayout>
      <Box sx={{ width: '100%', py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to StackGen 🎉
        </Typography>
        
        <Typography variant="body1" paragraph>
          Your modern development environment is ready!
        </Typography>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: 3, mt: 2 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Project Stats
              </Typography>
              <Typography variant="body2">
                Your project is now fully responsive and has a centralized theme system.
              </Typography>
            </CardContent>
          </Card>
          
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Theme Control
              </Typography>
              <Typography variant="body2">
                Use the theme settings button in the corner to customize your experience.
              </Typography>
            </CardContent>
          </Card>
          
          <Card variant="outlined">
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
    </PageLayout>
  );
}
  