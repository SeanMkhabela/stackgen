import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Alert,
  CircularProgress,
  Divider,
  Link,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FaGoogle, FaApple } from 'react-icons/fa';

export default function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '', server: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: { target: { name: any; value: any; type: any; checked: any; }; }) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setRememberMe(checked);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = { email: '', password: '' };
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!validateEmail(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors((prev) => ({ ...prev, ...newErrors }));
    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await new Promise((res) => setTimeout(res, 1000));
      // Store email in localStorage for profile page to use
      localStorage.setItem('userEmail', formData.email);
      navigate('/home');
    } catch {
      setErrors((prev) => ({ ...prev, server: 'Invalid email or password' }));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Dev shortcut to bypass login
  const handleDevBypass = () => {
    // Set a dummy email for development
    localStorage.setItem('userEmail', 'dev@example.com');
    navigate('/home');
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
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
            Sign In
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" gutterBottom>
            Your Social Campaigns
          </Typography>

          {errors.server && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errors.server}
            </Alert>
          )}

          <Box component="form" noValidate onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
              error={Boolean(errors.email)}
              helperText={errors.email}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
              error={Boolean(errors.password)}
              helperText={errors.password}
              margin="normal"
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />

            <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={handleChange}
                    name="remember"
                    color="primary"
                  />
                }
                label="Remember me"
              />
              <Link component={RouterLink} to="/forgot-password" variant="body2">
                Forgot password?
              </Link>
            </Box>

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{ mt: 3, py: 1.5 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
            </Button>
            <Divider sx={{ my: 3 }}>Or with</Divider>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box sx={{ flex: 1 }}>
                <Button fullWidth variant="outlined" startIcon={<FaGoogle />}>
                  Google
                </Button>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Button fullWidth variant="outlined" startIcon={<FaApple />}>
                  Apple
                </Button>
              </Box>
            </Box>

            <Box textAlign="center" mt={3}>
              <Typography variant="body2">
                Don't have an account?{' '}
                <Link component={RouterLink} to="/signup">
                  Sign Up
                </Link>
              </Typography>
            </Box>
            
            {/* Developer bypass button */}
            <Tooltip title="Developer shortcut - bypasses authentication">
              <Button 
                variant="text" 
                size="small" 
                onClick={handleDevBypass}
                sx={{ 
                  mt: 2, 
                  fontSize: '0.7rem', 
                  opacity: 0.6,
                  '&:hover': {
                    opacity: 1
                  }
                }}
              >
                DEV: Skip to Home
              </Button>
            </Tooltip>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}