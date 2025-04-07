// src/pages/ApiDocs.tsx
import { Box, Typography, Paper, Container, Alert, AlertTitle, Divider, Chip, Button, Card, CardContent, CardActions, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Code as CodeIcon, Api as ApiIcon, ArrowForward as ArrowForwardIcon } from '@mui/icons-material';

export default function ApiDocs() {
  const backendSwaggerUrl = 'http://localhost:3001/documentation';

  return (
    <Container maxWidth="lg" sx={{ pt: 4, pb: 8 }}>
      <Paper 
        elevation={2} 
        sx={{ 
          p: 3, 
          mb: 4, 
          borderRadius: 2,
          background: 'linear-gradient(145deg, #f5f7fa 0%, #e4e8ef 100%)'
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, color: '#1a237e' }}>
          API Documentation
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1, mb: 2, alignItems: 'center' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>Status:</Typography>
          <Chip 
            label="Prototype" 
            color="warning" 
            size="small" 
            sx={{ fontWeight: 'bold' }} 
          />
        </Box>
        
        <Alert severity="info" sx={{ mb: 4 }}>
          <AlertTitle><strong>Prototype Notice</strong></AlertTitle>
          <Typography variant="body2" sx={{ mb: 2 }}>
            StackGen is currently under active development. This application serves as a prototype 
            and portfolio piece demonstrating a modern full-stack web application architecture.
          </Typography>
          <Typography variant="body2">
            The API and feature set are being continuously updated as development progresses.
          </Typography>
        </Alert>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" gutterBottom sx={{ fontWeight: 500, color: '#1a237e', mb: 3 }}>
          Backend API Details
        </Typography>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ mb: 4 }}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <ApiIcon sx={{ mr: 1, color: '#1a237e' }} />
                  <Typography variant="h6" component="h2" sx={{ fontWeight: 500 }}>
                    Swagger Documentation
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  The StackGen API is fully documented using Swagger/OpenAPI. The interactive documentation 
                  allows you to explore all available endpoints, request formats, and response schemas.
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  <strong>Base URL:</strong> <code>http://localhost:3001</code>
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  variant="contained" 
                  color="primary" 
                  endIcon={<ArrowForwardIcon />}
                  component="a"
                  href={backendSwaggerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ ml: 'auto' }}
                >
                  Open Swagger UI
                </Button>
              </CardActions>
            </Card>
            
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CodeIcon sx={{ mr: 1, color: '#1a237e' }} />
                  <Typography variant="h6" component="h2" sx={{ fontWeight: 500 }}>
                    Authentication
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  The API uses JWT token-based authentication. To authenticate, obtain a token 
                  via the <code>/auth/signin</code> endpoint.
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  For programmatic access, you can also use API keys via the <code>X-API-Key</code> header.
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 'medium', mb: 1 }}>
                  Key Endpoints:
                </Typography>
                <ul style={{ paddingLeft: '20px', margin: 0 }}>
                  <li><Typography variant="body2"><code>/auth/signup</code> - Create new account</Typography></li>
                  <li><Typography variant="body2"><code>/auth/signin</code> - Authenticate user</Typography></li>
                </ul>
              </CardContent>
              <CardActions>
                <Button 
                  variant="outlined" 
                  color="primary"
                  component={RouterLink}
                  to="/"
                  sx={{ ml: 'auto' }}
                >
                  Back to Home
                </Button>
              </CardActions>
            </Card>
        </Stack>
      </Paper>
    </Container>
  );
}
