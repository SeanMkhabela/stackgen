import { Component, ErrorInfo, ReactNode } from 'react';
import { Button, Container, Typography, Box, Paper } from '@mui/material';
import { toast } from 'react-hot-toast';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Uncaught error:', error, errorInfo);
    
    // Log the error to your monitoring service
    // Example: logErrorToService(error, errorInfo);
    
    // Notify the user
    toast.error('Oops! Something went wrong.');
  }

  private readonly handleReload = (): void => {
    window.location.reload();
  };

  private readonly handleGoHome = (): void => {
    window.location.href = '/';
  };

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <Container maxWidth="md">
          <Paper 
            elevation={3} 
            sx={{ 
              mt: 8, 
              p: 4, 
              borderRadius: 2,
              backgroundColor: (theme) => theme.palette.mode === 'dark' 
                ? 'rgba(0, 0, 0, 0.8)' 
                : 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <Box 
              sx={{ 
                textAlign: 'center',
                py: 4
              }}
            >
              <Typography variant="h3" component="h1" gutterBottom color="error">
                Oops!
              </Typography>
              
              <Typography variant="h5" component="h2" gutterBottom>
                Something went wrong
              </Typography>
              
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                We're sorry for the inconvenience. You can try refreshing the page or going back home.
              </Typography>
              
              {this.state.error && (
                <Paper 
                  sx={{ 
                    p: 2, 
                    mb: 4, 
                    backgroundColor: (theme) => theme.palette.mode === 'dark' 
                      ? 'rgba(0, 0, 0, 0.5)' 
                      : 'rgba(0, 0, 0, 0.05)',
                    maxHeight: '150px',
                    overflow: 'auto',
                    textAlign: 'left'
                  }}
                >
                  <Typography variant="body2" component="pre" sx={{ whiteSpace: 'pre-wrap' }}>
                    {this.state.error.toString()}
                  </Typography>
                </Paper>
              )}
              
              <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={this.handleReload}
                >
                  Refresh Page
                </Button>
                
                <Button 
                  variant="outlined"
                  onClick={this.handleGoHome}
                >
                  Go Home
                </Button>
              </Box>
            </Box>
          </Paper>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 