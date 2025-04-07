import { useState, ChangeEvent, FormEvent } from 'react';
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
  IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FaGoogle, FaApple } from 'react-icons/fa';
import { useAuth } from '../context/useAuth';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  email: string;
  password: string;
  confirmPassword: string;
  server: string;
}

export default function SignUp() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<FormErrors>({
    email: '',
    password: '',
    confirmPassword: '',
    server: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password: string): boolean => password.length >= 8;

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setAcceptTerms(checked);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<FormErrors> = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!validateEmail(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (!validatePassword(formData.password)) newErrors.password = 'Password must be at least 8 characters';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!acceptTerms) newErrors.server = 'You must accept the terms and conditions';
    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      // Use the signup function from our auth context
      await signup(formData.email, formData.password, formData.email.split('@')[0]);
      // After successful signup, navigate to home (user is now logged in)
      navigate('/home');
    } catch(err: unknown) {
      setErrors((prev) => ({ 
        ...prev, 
        server: err instanceof Error ? err.message : 'An unknown error occurred' 
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        
        p: 2,
        overflow: 'auto',
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
            Sign Up
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
              onChange={handleChange}
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
              onChange={handleChange}
              error={Boolean(errors.password)}
              helperText={errors.password ?? 'Use 8+ characters including letters, numbers & symbols'}
              margin="normal"
              // Using newer pattern instead of deprecated InputProps
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Repeat Password"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleChange}
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword}
              margin="normal"
              // Using newer pattern instead of deprecated InputProps
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={acceptTerms}
                  onChange={handleChange}
                  name="terms"
                  color="primary"
                />
              }
              label={
                <Typography variant="body2">
                  I accept the{' '}
                  <Link href="#" underline="hover">
                    Terms
                  </Link>
                </Typography>
              }
              sx={{ mt: 1 }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{ 
                mt: 3, 
                py: 1.5,
                position: 'relative',
                minHeight: '42px',
                '& .MuiCircularProgress-root': {
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-12px',
                  marginLeft: '-12px'
                }
              }}
              disabled={isSubmitting}
            >
              <span style={{ visibility: isSubmitting ? 'hidden' : 'visible' }}>Sign Up</span>
              {isSubmitting && <CircularProgress size={24} color="inherit" />}
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
                Already have an account?{' '}
                <Link component={RouterLink} to="/signin">
                  Sign In
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
