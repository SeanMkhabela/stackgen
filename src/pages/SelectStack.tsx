import {
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  CardHeader,
  useTheme,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  RadioGroup,
  Radio,
  Switch,
  FormGroup,
  Divider,
  Alert,
  Tooltip
} from "@mui/material";
import {
  Code as ReactIcon,
  DoubleArrow as NextJsIcon,
  Visibility as VueIcon,
  ChangeHistory as AngularIcon,
  Fireplace as SvelteIcon,
  Route as ExpressIcon,
  FlashOn as FastifyIcon,
  AccountTree as NestJsIcon,
  DataObject as DjangoIcon,
  Storage as LaravelIcon,
  SmartToy as RobotIcon,
  Info as InfoIcon,
  Warning as WarningIcon,
  Check as CheckIcon,
  HelpOutline as HelpIcon
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useStack } from "../context/StackContext";
import { useWizard } from "../context/WizardContext";
import { useState, useEffect } from "react";
import GuidedSetupWizard from "../components/GuidedSetupWizard";

// Define form structure with types
interface StackFormData {
  frontend: string;
  backend: string;
  features: {
    typescript: boolean;
    eslint: boolean;
    tailwind: boolean;
    testing: boolean;
    stateManagement: boolean;
  };
}

// Validation errors interface
interface FormErrors {
  frontend?: string;
  backend?: string;
  general?: string;
}

// Stack compatibility data
interface CompatibilityData {
  [key: string]: {
    compatibleWith: string[];
    recommendations: {
      [key: string]: string;
    };
    features: {
      [key: string]: boolean;
    };
  }
}

// Stack compatibility data
const stackCompatibility: CompatibilityData = {
  react: {
    compatibleWith: ["express", "fastify", "nest"],
    recommendations: {
      express: "React + Express.js is a popular combination for full-stack JavaScript applications.",
      fastify: "Fastify works well with React for high-performance applications.",
      nest: "NestJS provides a structured backend that pairs nicely with React's component model."
    },
    features: {
      typescript: true,
      stateManagement: true
    }
  },
  nextjs: {
    compatibleWith: ["express", "nest"],
    recommendations: {
      express: "Next.js works well with Express for API routes beyond what Next.js provides natively.",
      nest: "NestJS offers strong TypeScript support that complements Next.js well."
    },
    features: {
      typescript: true,
      tailwind: true
    }
  },
  vue: {
    compatibleWith: ["express", "fastify", "nest"],
    recommendations: {
      express: "Vue + Express is a lightweight and flexible combination.",
      fastify: "Fastify's speed works well with Vue's reactivity system.",
      nest: "NestJS provides structure that complements Vue's flexibility."
    },
    features: {
      typescript: true
    }
  },
  angular: {
    compatibleWith: ["express", "nest"],
    recommendations: {
      express: "Express provides a simple backend for Angular applications.",
      nest: "NestJS was inspired by Angular and shares similar architecture principles."
    },
    features: {
      typescript: true,
      testing: true
    }
  },
  svelte: {
    compatibleWith: ["express", "fastify"],
    recommendations: {
      express: "Express is lightweight like Svelte, making them a good match.",
      fastify: "Fastify's performance focus matches Svelte's efficiency."
    },
    features: {
      tailwind: true
    }
  }
};

export default function SelectStack() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { setSelectedStack } = useStack();
  const { showWizard, openWizard, closeWizard, hasSeenWizard, markWizardAsSeen } = useWizard();

  // Form state
  const [formData, setFormData] = useState<StackFormData>({
    frontend: "",
    backend: "",
    features: {
      typescript: true,
      eslint: true,
      tailwind: false,
      testing: false,
      stateManagement: false
    }
  });

  // Validation state
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Assistant message state
  const [assistantMessage, setAssistantMessage] = useState<{
    message: string;
    type: "info" | "warning" | "success";
  }>({
    message: "Select a frontend and backend to get started. I'll help you choose compatible technologies.",
    type: "info"
  });

  // Check if first-time user and show wizard
  useEffect(() => {
    if (!hasSeenWizard) {
      // Delay to ensure UI is fully loaded
      const timer = setTimeout(() => {
        openWizard();
        markWizardAsSeen();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [hasSeenWizard, openWizard, markWizardAsSeen]);

  // Update assistant message when selections change
  useEffect(() => {
    if (!formData.frontend && !formData.backend) {
      setAssistantMessage({
        message: "Select a frontend and backend to get started. I'll help you choose compatible technologies.",
        type: "info"
      });
      return;
    }

    if (formData.frontend && !formData.backend) {
      const frontend = stackCompatibility[formData.frontend];
      if (frontend) {
        setAssistantMessage({
          message: `Great choice! ${formData.frontend.charAt(0).toUpperCase() + formData.frontend.slice(1)} works well with ${frontend.compatibleWith.join(", ")} backends.`,
          type: "info"
        });
      }
      return;
    }

    if (!formData.frontend && formData.backend) {
      setAssistantMessage({
        message: "Now select a frontend framework to complete your stack.",
        type: "info"
      });
      return;
    }

    // Both frontend and backend selected
    if (formData.frontend && formData.backend) {
      const frontend = stackCompatibility[formData.frontend];
      
      // Check compatibility
      if (frontend && frontend.compatibleWith.includes(formData.backend)) {
        setAssistantMessage({
          message: frontend.recommendations[formData.backend] || "Good choice! These technologies work well together.",
          type: "success"
        });
        
        // Suggest features
        if (frontend.features) {
          const suggestedFeatures = Object.entries(frontend.features)
            .filter(([key, value]) => value && !formData.features[key as keyof typeof formData.features])
            .map(([key]) => key);
            
          if (suggestedFeatures.length > 0) {
            setAssistantMessage(prev => ({
              ...prev,
              message: `${prev.message} Consider enabling ${suggestedFeatures.join(", ")} for this stack.`
            }));
          }
        }
      } else {
        setAssistantMessage({
          message: `Warning: ${formData.frontend} and ${formData.backend} aren't commonly used together. You might face integration challenges.`,
          type: "warning"
        });
      }
    }
  }, [formData.frontend, formData.backend, formData.features]);

  const handleFrontendChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      frontend: event.target.value
    });
    if (errors.frontend) {
      setErrors({ ...errors, frontend: undefined });
    }
  };

  const handleBackendChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      backend: event.target.value
    });
    if (errors.backend) {
      setErrors({ ...errors, backend: undefined });
    }
  };

  const clearSelection = (field: 'frontend' | 'backend') => {
    setFormData({
      ...formData,
      [field]: ""
    });
  };

  const handleFeatureToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      features: {
        ...formData.features,
        [event.target.name]: event.target.checked
      }
    });
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.frontend) {
      newErrors.frontend = "Please select a frontend framework";
    }
    if (!formData.backend) {
      newErrors.backend = "Please select a backend framework";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    setIsSubmitting(true);

    if (validateForm()) {
      const stackDescription = JSON.stringify({
        frontend: formData.frontend,
        backend: formData.backend,
        features: formData.features
      });
      setSelectedStack(stackDescription);
      navigate("/result");
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{
          fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
          fontWeight: 600,
          color: theme.palette.primary.main,
          mb: 0
        }}>
          Select your stack
        </Typography>
        
        <Tooltip title="Get guided help">
          <Button 
            startIcon={<HelpIcon />} 
            variant="outlined" 
            color="primary"
            onClick={openWizard}
            sx={{ borderRadius: 8 }}
          >
            Guided Setup
          </Button>
        </Tooltip>
      </Box>

      {/* Assistant Guidance Bar */}
      <Paper
        elevation={0}
        variant="outlined"
        sx={{
          p: 2,
          borderRadius: 2,
          mb: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          backgroundColor: 
            assistantMessage.type === "info" 
              ? theme.palette.info.light 
              : assistantMessage.type === "warning"
                ? theme.palette.warning.light
                : theme.palette.success.light,
          border: `1px solid ${
            assistantMessage.type === "info" 
              ? theme.palette.info.main 
              : assistantMessage.type === "warning"
                ? theme.palette.warning.main
                : theme.palette.success.main
          }`,
        }}
      >
        <RobotIcon 
          sx={{ 
            color: 
              assistantMessage.type === "info" 
                ? theme.palette.info.dark 
                : assistantMessage.type === "warning"
                  ? theme.palette.warning.dark
                  : theme.palette.success.dark 
          }} 
        />
        <Typography variant="body1" sx={{ 
          color: theme.palette.getContrastText(
            assistantMessage.type === "info" 
              ? theme.palette.info.light 
              : assistantMessage.type === "warning"
                ? theme.palette.warning.light
                : theme.palette.success.light
          ),
          flex: 1
        }}>
          {assistantMessage.message}
        </Typography>
        {assistantMessage.type === "info" && <InfoIcon sx={{ color: theme.palette.info.dark }} />}
        {assistantMessage.type === "warning" && <WarningIcon sx={{ color: theme.palette.warning.dark }} />}
        {assistantMessage.type === "success" && <CheckIcon sx={{ color: theme.palette.success.dark }} />}
      </Paper>

      {errors.general && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errors.general}
        </Alert>
      )}

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
          Choose the technologies and configurations for your new project
        </Typography>

        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
          gap: 3,
          mt: 3,
        }}>
          {/* Frontend Selection */}
          <Card variant="outlined" sx={{ height: '100%' }} id="frontend-selection">
            <CardHeader 
              title="Frontend" 
              action={
                formData.frontend ? (
                  <Button 
                    size="small" 
                    variant="outlined" 
                    color="secondary"
                    onClick={() => clearSelection('frontend')}
                  >
                    Clear
                  </Button>
                ) : null
              }
            />
            <CardContent>
              <FormControl error={!!errors.frontend} fullWidth>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Select your frontend framework
                </Typography>
                <RadioGroup
                  name="frontend"
                  value={formData.frontend}
                  onChange={handleFrontendChange}
                >
                  <FormControlLabel value="react" control={<Radio />} label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <ReactIcon fontSize="small" /> React
                    </Box>
                  } />
                  <FormControlLabel value="nextjs" control={<Radio />} label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <NextJsIcon fontSize="small" /> Next.js
                    </Box>
                  } />
                  <FormControlLabel value="vue" control={<Radio />} label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <VueIcon fontSize="small" /> Vue.js
                    </Box>
                  } />
                  <FormControlLabel value="angular" control={<Radio />} label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AngularIcon fontSize="small" /> Angular
                    </Box>
                  } />
                  <FormControlLabel value="svelte" control={<Radio />} label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <SvelteIcon fontSize="small" /> Svelte
                    </Box>
                  } />
                </RadioGroup>
                {errors.frontend && (
                  <FormHelperText error>{errors.frontend}</FormHelperText>
                )}
              </FormControl>
            </CardContent>
          </Card>

          {/* Backend Selection */}
          <Card variant="outlined" sx={{ height: '100%' }} id="backend-selection">
            <CardHeader 
              title="Backend" 
              action={
                formData.backend ? (
                  <Button 
                    size="small" 
                    variant="outlined" 
                    color="secondary"
                    onClick={() => clearSelection('backend')}
                  >
                    Clear
                  </Button>
                ) : null
              }
            />
            <CardContent>
              <FormControl error={!!errors.backend} fullWidth>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Choose your backend technology
                </Typography>
                <RadioGroup
                  name="backend"
                  value={formData.backend}
                  onChange={handleBackendChange}
                >
                  <FormControlLabel value="express" control={<Radio />} label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <ExpressIcon fontSize="small" /> Express.js
                    </Box>
                  } />
                  <FormControlLabel value="fastify" control={<Radio />} label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <FastifyIcon fontSize="small" /> Fastify
                    </Box>
                  } />
                  <FormControlLabel value="nest" control={<Radio />} label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <NestJsIcon fontSize="small" /> NestJS
                    </Box>
                  } />
                  <FormControlLabel value="django" control={<Radio />} label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <DjangoIcon fontSize="small" /> Django
                    </Box>
                  } />
                  <FormControlLabel value="laravel" control={<Radio />} label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LaravelIcon fontSize="small" /> Laravel
                    </Box>
                  } />
                </RadioGroup>
                {errors.backend && (
                  <FormHelperText error>{errors.backend}</FormHelperText>
                )}
              </FormControl>
            </CardContent>
          </Card>
        </Box>

        {/* Features & Configuration */}
        <Card variant="outlined" sx={{ mt: 3 }} id="features-configuration">
          <CardHeader title="Features & Configuration" />
          <CardContent>
            <FormGroup>
              <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                gap: 2
              }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.features.typescript}
                      onChange={handleFeatureToggle}
                      name="typescript"
                    />
                  }
                  label="TypeScript"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.features.eslint}
                      onChange={handleFeatureToggle}
                      name="eslint"
                    />
                  }
                  label="ESLint"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.features.tailwind}
                      onChange={handleFeatureToggle}
                      name="tailwind"
                    />
                  }
                  label="Tailwind CSS"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.features.testing}
                      onChange={handleFeatureToggle}
                      name="testing"
                    />
                  }
                  label="Testing Framework"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.features.stateManagement}
                      onChange={handleFeatureToggle}
                      name="stateManagement"
                    />
                  }
                  label="State Management"
                />
              </Box>
            </FormGroup>
          </CardContent>
        </Card>

        <Divider sx={{ my: 4 }} />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSubmit}
            disabled={isSubmitting}
            id="generate-button"
          >
            Generate Project
          </Button>
        </Box>
      </Paper>
      
      {/* Guided Setup Wizard Dialog */}
      <GuidedSetupWizard open={showWizard} onClose={closeWizard} />
    </Box>
  );
}
