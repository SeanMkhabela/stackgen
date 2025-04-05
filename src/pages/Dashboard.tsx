import { useEffect, useState } from 'react';
import {
  Typography,
  Card,
  CardContent,
  Box,
  
} from '@mui/material';
import { PageLayout } from '../components/ResponsiveLayout';
import { fetchPing } from '../utils/api';

export default function Dashboard() {
  const [message, setMessage] = useState('');
  

  useEffect(() => {
    fetchPing().then((res) => setMessage(res.message));
  }, []);



  return (
    <PageLayout>
      <Box sx={{ width: '100%', py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to StackGen 🎉
        </Typography>

        <Typography variant="body1" paragraph>
          Your modern development environment is ready!
        </Typography>

        {message && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Backend says: {message}
          </Typography>
        )}

        

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            },
            gap: 3,
            mt: 4,
          }}
        >
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
