import { useState, useEffect, useRef, useMemo } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Paper,
  useTheme
} from '@mui/material';
import {
  Close as CloseIcon,
  SmartToy as RobotIcon,
  ArrowForward as ArrowIcon,
  Home as HomeIcon,
  Code as CodeIcon,
  Settings as SettingsIcon,
  GitHub as GitHubIcon
} from '@mui/icons-material';

interface WizardStep {
  title: string;
  description: string;
  robotMessage: string;
  icon: React.ReactNode;
  targetId?: string;
}

interface GuidedSetupWizardProps {
  open: boolean;
  onClose: () => void;
}

export default function GuidedSetupWizard({ open, onClose }: GuidedSetupWizardProps) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [highlightElement, setHighlightElement] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Memoized steps to avoid unnecessary re-renders
  const steps: WizardStep[] = useMemo(() => [
    {
      title: "Welcome to StackGen!",
      description: "I'll guide you through creating your perfect project.",
      robotMessage: "Hello! I'm StackBot, here to help you create an awesome project with StackGen.",
      icon: <HomeIcon fontSize="large" />,
    },
    {
      title: "Choose Your Frontend",
      description: "Select the frontend framework that suits your needs.",
      robotMessage: "Pick a frontend framework. React offers flexibility, Next.js adds SSR, and Vue is lightweight.",
      icon: <CodeIcon fontSize="large" />,
      targetId: "frontend-selection"
    },
    {
      title: "Pick Your Backend",
      description: "Select a backend that works well with your frontend.",
      robotMessage: "Choose a backend that complements your frontend choice. I'll suggest optimal combinations.",
      icon: <SettingsIcon fontSize="large" />,
      targetId: "backend-selection"
    },
    {
      title: "Configure Features",
      description: "Enable the features you want in your project.",
      robotMessage: "Almost done! Add TypeScript for type safety, Tailwind for style, or testing tools for quality.",
      icon: <SettingsIcon fontSize="large" />,
      targetId: "features-configuration"
    },
    {
      title: "Generate Your Project",
      description: "Create your customized project based on your selections.",
      robotMessage: "You're all set! Click Generate to create your project with your chosen features.",
      icon: <GitHubIcon fontSize="large" />,
      targetId: "generate-button"
    }
  ], []);

  useEffect(() => {
    if (open && steps[activeStep].targetId) {
      setHighlightElement(steps[activeStep].targetId);
    } else {
      setHighlightElement(null);
    }
    
    if (highlightElement) {
      const element = document.getElementById(highlightElement);
      if (element) element.classList.add('wizard-highlight');
    }
    
    return () => {
      if (highlightElement) {
        const element = document.getElementById(highlightElement);
        if (element) element.classList.remove('wizard-highlight');
      }
    };
  }, [open, activeStep, highlightElement, steps]);

  const handleNext = () => {
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const handleFinish = () => {
    onClose();
    setActiveStep(0);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      ref={dialogRef}
      PaperProps={{
        sx: {
          borderRadius: 4,
          overflow: 'visible',
          width: '90%',
          maxWidth: 1000,
          boxShadow: theme.shadows[5]
        }
      }}
    >
      <DialogTitle sx={{
        background: theme.palette.background.default,
        borderBottom: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        px: 3,
        py: 2
      }}>
        <Typography
          component="div"
          sx={{
            fontWeight: 'bold',
            fontSize: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <RobotIcon fontSize="large" /> Guided Setup
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{
        p: 4,
        pt: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        position: 'relative'
      }}>
        <Stepper
          activeStep={activeStep}
          sx={{ mb: 3, mt: 4 }}
        >
          {steps.map((step) => (
            <Step key={step.title}>
              <StepLabel
                optional={<Typography variant="caption">{step.title}</Typography>}
                StepIconProps={{ icon: step.icon }}
              />
            </Step>
          ))}
        </Stepper>

        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 3,
          position: 'relative'
        }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              pt: 4,
              flex: '1 1 60%',
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 4,
              position: 'relative',
              bgcolor: theme.palette.background.paper
            }}
          >
            <Typography variant="h6" gutterBottom fontWeight="bold">
              {steps[activeStep].title}
            </Typography>
            <Typography variant="body1"
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {steps[activeStep].description}
            </Typography>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: 3,
              flex: '1 1 40%',
              bgcolor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              borderRadius: 4,
              display: 'flex',
              flexDirection: 'column',
              position: 'relative'
            }}
          >
            <Box sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 2,
              mb: 1
            }}>
              <Box sx={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                
              }}>
                <RobotIcon sx={{ fontSize: '2rem' }} />
              </Box>
              <Typography
                variant="body1"
                sx={{
                  mt: 1,
                  fontSize: '1.1rem',
                  fontFamily: theme.typography.fontFamily,
                  display: '-webkit-box',
                  WebkitLineClamp: 4,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}
              >
                {steps[activeStep].robotMessage}
              </Typography>
            </Box>
          </Paper>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button onClick={handleBack}
            disabled={activeStep === 0}
            variant="outlined"
            sx={{
              borderRadius: 8,
              fontSize: '1rem',
              px: 3
            }}
          >
            Back
          </Button>
          {activeStep === steps.length - 1 ? (
            <Button onClick={handleFinish}
              variant="contained"
              color="primary"
              sx={{
                borderRadius: 8,
                fontSize: '1rem',
                px: 3
              }}
            >
              Get Started
            </Button>
          ) : (
            <Button onClick={handleNext}
              variant="contained"
              color="primary"
              endIcon={<ArrowIcon />}
              sx={{
                borderRadius: 8,
                fontSize: '1rem',
                px: 3
              }}
            >
              Next
            </Button>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
