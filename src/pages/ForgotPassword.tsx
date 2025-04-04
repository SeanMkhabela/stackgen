import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Paper,
  Link,
  CircularProgress
} from '@mui/material';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({ email: '', server: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setErrors({ email: 'Email is required', server: '' });
      return;
    } else if (!validateEmail(email)) {
      setErrors({ email: 'Please enter a valid email address', server: '' });
      return;
    }

    setIsSubmitting(true);
    setErrors({ email: '', server: '' });

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSuccess(true);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setErrors({ email: '', server: 'Failed to send reset email. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to bottom right, #e3f2fd, #c5cae9)',
        p: 2,
        overflow: 'auto',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 400,
          mx: 'auto',
        }}
      >
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
            Forgot Password
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" gutterBottom>
            We'll send you a reset link
          </Typography>

          {isSuccess ? (
            <Box textAlign="center" mt={3}>
              <Alert severity="success" sx={{ mb: 2 }}>
                Reset link sent! Check your email for instructions.
              </Alert>
              <Link component={RouterLink} to="/signin" variant="body2">
                Back to Sign In
              </Link>
            </Box>
          ) : (
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              {errors.server && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {errors.server}
                </Alert>
              )}

              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={Boolean(errors.email)}
                helperText={errors.email}
                margin="normal"
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                sx={{ mt: 2, py: 1.5 }}
              >
                {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Send Reset Link'}
              </Button>

              <Box textAlign="center" mt={3}>
                <Typography variant="body2">
                  Remember your password?{' '}
                  <Link component={RouterLink} to="/signin">
                    Sign In
                  </Link>
                </Typography>
              </Box>
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
}
