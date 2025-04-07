import { useState } from 'react';
import { Box, Typography, Button, Container, TextField, Grid, Paper, Avatar, useTheme, IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
// Import ArrowForward icon directly from MUI to avoid potential issues
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MenuIcon from '@mui/icons-material/Menu';
import Footer from '../components/footer';

export default function LandingPage() {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email signup logic here
    console.log('Email submitted:', email);
    // Redirect to signup page with email prefilled
    window.location.href = `/signup?email=${encodeURIComponent(email)}`;
  };
  
  return (
    <><Box sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f7f9fe 0%, #e6ebfd 100%)', // Light gradient background
    }}>
      {/* Header */}
      <Box
        component="header"
        sx={{
          p: { xs: 2, md: 3 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: 'none',
          backgroundColor: 'transparent',
          zIndex: 10,
          position: 'relative',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar
            sx={{
              bgcolor: theme.palette.primary.main,
              width: 36,
              height: 36,
              fontSize: '1.2rem',
              fontWeight: 'bold',
            }}
          >
            S
          </Avatar>
          <Typography
            variant="h6"
            component="span"
            sx={{
              fontWeight: 700,
              color: theme.palette.primary.main,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            StackGen
          </Typography>
        </Box>

        {/* Navigation for desktop */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 4 }}>
          <Button color="inherit" component={RouterLink} to="/" sx={{ fontWeight: 500 }}>Home</Button>
          <Button color="inherit" component={RouterLink} to="/features" sx={{ fontWeight: 500 }}>Features</Button>
          <Button color="inherit" component={RouterLink} to="/pricing" sx={{ fontWeight: 500 }}>Pricing</Button>
          <Button color="inherit" component={RouterLink} to="/docs" sx={{ fontWeight: 500 }}>Docs</Button>
        </Box>

        {/* Auth buttons */}
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 2 }}>
          <Button
            component={RouterLink}
            to="/signin"
            sx={{ fontWeight: 600 }}
          >
            Sign In
          </Button>
          <Button
            variant="contained"
            component={RouterLink}
            to="/signup"
            sx={{
              fontWeight: 600,
              borderRadius: '20px',
              boxShadow: 4,
              px: 3,
            }}
          >
            Sign Up Free
          </Button>
        </Box>

        {/* Mobile menu button */}
        <IconButton
          color="primary"
          sx={{ display: { sm: 'none' } }}
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
      </Box>

      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ mt: { xs: 4, md: 8 }, mb: { xs: 8, md: 15 }, textAlign: 'center' }}>
        <Box sx={{ maxWidth: 'md', mx: 'auto', px: 2 }}>
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Avatar sx={{ bgcolor: '#FFC107', width: 28, height: 28, fontSize: '0.75rem' }}>👨‍💻</Avatar>
            <Avatar sx={{ bgcolor: '#E91E63', width: 28, height: 28, fontSize: '0.75rem' }}>👩‍💻</Avatar>
            <Avatar sx={{ bgcolor: '#673AB7', width: 28, height: 28, fontSize: '0.75rem' }}>🧑‍💻</Avatar>
            <Typography variant="body2" sx={{ fontWeight: 500, display: 'flex', alignItems: 'center' }}>
              5000+ 5 stars reviews
            </Typography>
          </Box>

          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              mb: 2,
              background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: theme.palette.primary.main, // Fallback color for browsers that don't support background clip
            }}
          >
            Seamless Stack Management for Teams and Individuals
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 4,
              color: 'text.secondary',
              fontSize: '1.125rem',
              maxWidth: '700px',
              mx: 'auto',
            }}
          >
            In today's fast-paced world, staying organized with your tech stack can be challenging,
            whether you're working alone or as part of a team.
          </Typography>

          {/* Email signup form */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'center',
              gap: 2,
              maxWidth: '500px',
              mx: 'auto',
              mb: 6,
            }}
          >
            <TextField
              variant="outlined"
              placeholder="Enter your email"
              fullWidth
              value={email}
              onChange={handleEmailChange}
              sx={{
                bgcolor: 'white',
                borderRadius: '30px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '30px',
                }
              }} />
            <Button
              type="submit"
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              sx={{
                borderRadius: '30px',
                px: 3,
                py: 1.5,
                fontSize: '1rem',
                boxShadow: 4,
                whiteSpace: 'nowrap',
              }}
            >
              Try it Free
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Stats/Features Section */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          borderRadius: '30px 30px 0 0',
          mt: 'auto',
          pb: 10,
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0px -5px 20px rgba(0,0,0,0.05)',
        }}
      >
        <Container maxWidth="lg" sx={{ pt: 8 }}>
          <Grid sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '5fr 7fr' }, gap: 4 }}>
            <Box>
              <Box sx={{ pr: { md: 4 } }}>
                <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 2 }}>
                  Generate Full-Stack Code in Seconds
                </Typography>
                <Typography variant="body1" paragraph sx={{ color: 'text.secondary', mb: 4 }}>
                  StackGen is a modern developer tool that generates fullstack boilerplate codebases in seconds.
                  Skip the setup and start building immediately with your preferred tech stack.
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
                  <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                    <Box component="span" sx={{ mr: 1, color: 'primary.main', fontWeight: 'bold' }}>🧑‍💻</Box> Perfect for developers who want to skip tedious setup
                  </Typography>
                  <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                    <Box component="span" sx={{ mr: 1, color: 'primary.main', fontWeight: 'bold' }}>🧑‍🏫</Box> Ideal for students needing project boilerplates
                  </Typography>
                  <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                    <Box component="span" sx={{ mr: 1, color: 'primary.main', fontWeight: 'bold' }}>🧑‍💼</Box> Great for teams who want standardized starting points
                  </Typography>
                </Box>
                <Button
                  variant="outlined"
                  endIcon={<ArrowForwardIcon />}
                  component={RouterLink}
                  to="/select-stack"
                  sx={{
                    borderRadius: '20px',
                    px: 3,
                    py: 1,
                  }}
                >
                  Get Started
                </Button>
              </Box>
            </Box>
            <Box>
              <Paper
                elevation={6}
                sx={{
                  borderRadius: 4,
                  overflow: 'hidden',
                  p: 3,
                  bgcolor: theme.palette.mode === 'light' ? theme.palette.primary.dark : '#131340',
                  color: 'white',
                  height: '100%',
                  minHeight: 400,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6">Popular Tech Stacks</Typography>
                  <Button size="small" sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>
                    Browse All
                  </Button>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                    Configure and generate any tech stack in seconds
                  </Typography>
                </Box>

                {/* Tech stack cards */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flexGrow: 1 }}>
                  {/* MERN Stack */}
                  <Box sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>MERN Stack</Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                        MongoDB + Express + React + Node.js
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        bgcolor: theme.palette.secondary.main,
                        '&:hover': { bgcolor: theme.palette.secondary.dark }
                      }}
                    >
                      Select
                    </Button>
                  </Box>

                  {/* Next.js + Prisma */}
                  <Box sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Next.js Full Stack</Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                        Next.js + Prisma + PostgreSQL + TypeScript
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        bgcolor: theme.palette.secondary.main,
                        '&:hover': { bgcolor: theme.palette.secondary.dark }
                      }}
                    >
                      Select
                    </Button>
                  </Box>

                  {/* Django Stack */}
                  <Box sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Django + React</Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                        Django + PostgreSQL + React + Redux
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        bgcolor: theme.palette.secondary.main,
                        '&:hover': { bgcolor: theme.palette.secondary.dark }
                      }}
                    >
                      Select
                    </Button>
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Container>
      </Box>
    </Box><Footer /></>

  );
}
