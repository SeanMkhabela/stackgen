import { Box, Typography, Paper, Card, CardContent, Button, useTheme, Chip, Stack, Divider } from "@mui/material";
import { useStack } from "../context/StackContext";

// Interface for parsed stack data
interface ParsedStackData {
  frontend: string;
  backend: string;
  features: {
    typescript: boolean;
    eslint: boolean;
    tailwind: boolean;
    testing: boolean;
    stateManagement: boolean;
  }
}

export default function Result() {
  const theme = useTheme();
  const { selectedStack } = useStack();
  
  // Default stack data
  const defaultStackData: ParsedStackData = {
    frontend: "Unknown",
    backend: "Unknown",
    features: {
      typescript: false,
      eslint: false,
      tailwind: false,
      testing: false,
      stateManagement: false
    }
  };
  
  // Parse the JSON string back to an object (safely)
  const stackData: ParsedStackData = (() => {
    if (!selectedStack) return defaultStackData;
    
    try {
      // Try to parse as JSON
      return JSON.parse(selectedStack);
    } catch {
      // If parsing fails, assume it's a legacy format with just the frontend framework
      return {
        ...defaultStackData,
        frontend: selectedStack
      };
    }
  })();

  // Helper to get more descriptive names for frontend/backend
  const getFrameworkName = (key: string): string => {
    const frameworks: Record<string, string> = {
      "react": "React",
      "nextjs": "Next.js",
      "vue": "Vue.js",
      "angular": "Angular",
      "svelte": "Svelte",
      "express": "Express.js",
      "fastify": "Fastify",
      "nest": "NestJS",
      "django": "Django",
      "laravel": "Laravel"
    };
    
    return frameworks[key] || key;
  };

  // Get active features as an array
  const activeFeatures = Object.entries(stackData.features)
    .filter(([, enabled]) => enabled)
    .map(([feature]) => {
      const featureNames: Record<string, string> = {
        "typescript": "TypeScript",
        "eslint": "ESLint",
        "tailwind": "Tailwind CSS",
        "testing": "Testing Framework",
        "stateManagement": "State Management"
      };
      return featureNames[feature] || feature;
    });
  
  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ 
        fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
        fontWeight: 600,
        color: theme.palette.primary.main,
        mb: 3
      }}>
        Generated Project
      </Typography>
      
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
          Your project has been generated with the selected configurations.
        </Typography>
        
        <Card 
          variant="outlined" 
          sx={{ 
            mb: 3,
            backgroundColor: theme.palette.mode === 'dark' 
              ? 'rgba(0,0,0,0.2)' 
              : 'rgba(0,0,0,0.03)',
          }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Stack Configuration
            </Typography>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Frontend:
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {getFrameworkName(stackData.frontend)}
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Backend:
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {getFrameworkName(stackData.backend)}
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                  Features:
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {activeFeatures.length > 0 ? (
                    activeFeatures.map((feature) => (
                      <Chip 
                        key={feature} 
                        label={feature} 
                        size="small" 
                        color="primary" 
                        variant="outlined"
                        sx={{ mb: 1 }}
                      />
                    ))
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No additional features selected
                    </Typography>
                  )}
                </Stack>
              </Box>
            </Box>
          </CardContent>
        </Card>
        
        <Divider sx={{ my: 2 }} />
        
        <Card 
          variant="outlined" 
          sx={{ 
            minHeight: '200px',
            backgroundColor: theme.palette.mode === 'dark' 
              ? 'rgba(0,0,0,0.2)' 
              : 'rgba(0,0,0,0.03)',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Download Options
            </Typography>
            <Typography variant="body2" paragraph>
              The generated code is ready for download or deployment.
            </Typography>
            <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
              <Button variant="contained" color="primary">
                Download ZIP
              </Button>
              <Button variant="outlined">
                Push to GitHub
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Paper>
    </Box>
  );
}