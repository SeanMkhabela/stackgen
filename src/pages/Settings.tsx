import { useState, useContext } from 'react';
import { Box, Typography, Card, CardContent, Switch, FormControlLabel, Divider, Button, RadioGroup, Radio, FormControl, FormLabel, Slider, useTheme, InputLabel, MenuItem, Select, Alert } from "@mui/material";
import { PageLayout } from '../components/ResponsiveLayout';
import { ColorModeContext } from '../context/ColorModeContext';

export default function Settings() {
  const theme = useTheme();
  const { mode, toggleColorMode } = useContext(ColorModeContext);
  const isDark = mode === 'dark';
  
  const [contentWidth, setContentWidth] = useState('lg');
  const [fontSize, setFontSize] = useState(14);
  const [primaryColor, setPrimaryColor] = useState(theme.palette.primary.main);
  const [saved, setSaved] = useState(false);
  
  const handleSave = () => {
    // In a real app, this would save preferences to localStorage or a backend
    localStorage.setItem('theme-content-width', contentWidth);
    localStorage.setItem('theme-font-size', fontSize.toString());
    localStorage.setItem('theme-primary-color', primaryColor);
    
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };
  
  const handleReset = () => {
    // Reset to defaults
    setContentWidth('lg');
    setFontSize(14);
    setPrimaryColor(theme.palette.primary.main);
    localStorage.removeItem('theme-content-width');
    localStorage.removeItem('theme-font-size');
    localStorage.removeItem('theme-primary-color');
    
    // We don't reset theme mode here as it's handled by the ThemeProvider
  };

  return (
    <PageLayout>
      <Box sx={{ width: '100%', py: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
          Application Settings
        </Typography>
        
        {saved && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Settings saved successfully!
          </Alert>
        )}
        
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
          gap: 3,
          mb: 3
        }}>
          {/* Theme Settings */}
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Theme Settings
              </Typography>
              <Divider sx={{ mb: 3 }} />
              
              <Box sx={{ mb: 4 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={isDark}
                      onChange={toggleColorMode}
                      color="primary"
                    />
                  }
                  label={isDark ? "Dark Mode" : "Light Mode"}
                />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Choose between light and dark theme for the application.
                </Typography>
              </Box>
              
              <Box sx={{ mb: 4 }}>
                <FormControl fullWidth>
                  <InputLabel id="primary-color-label">Primary Color</InputLabel>
                  <Select
                    labelId="primary-color-label"
                    id="primary-color"
                    value={primaryColor}
                    label="Primary Color"
                    onChange={(e) => setPrimaryColor(e.target.value)}
                  >
                    <MenuItem value="#646cff">Default Purple</MenuItem>
                    <MenuItem value="#2196f3">Blue</MenuItem>
                    <MenuItem value="#4caf50">Green</MenuItem>
                    <MenuItem value="#f44336">Red</MenuItem>
                    <MenuItem value="#ff9800">Orange</MenuItem>
                    <MenuItem value="#9c27b0">Purple</MenuItem>
                  </Select>
                </FormControl>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Select the primary color for buttons and accents throughout the application.
                </Typography>
              </Box>
            </CardContent>
          </Card>
          
          {/* Layout Settings */}
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Layout Settings
              </Typography>
              <Divider sx={{ mb: 3 }} />
              
              <Box sx={{ mb: 4 }}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Content Width</FormLabel>
                  <RadioGroup
                    row
                    value={contentWidth}
                    onChange={(e) => setContentWidth(e.target.value)}
                  >
                    <FormControlLabel value="xs" control={<Radio />} label="XS" />
                    <FormControlLabel value="sm" control={<Radio />} label="SM" />
                    <FormControlLabel value="md" control={<Radio />} label="MD" />
                    <FormControlLabel value="lg" control={<Radio />} label="LG" />
                    <FormControlLabel value="xl" control={<Radio />} label="XL" />
                    <FormControlLabel value="false" control={<Radio />} label="Full" />
                  </RadioGroup>
                </FormControl>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Set the maximum width of content containers in the application.
                </Typography>
              </Box>
              
              <Box sx={{ mb: 4 }}>
                <Typography id="font-size-slider" gutterBottom>
                  Base Font Size: {fontSize}px
                </Typography>
                <Slider
                  value={fontSize}
                  onChange={(_, newValue) => setFontSize(newValue as number)}
                  aria-labelledby="font-size-slider"
                  valueLabelDisplay="auto"
                  step={1}
                  marks
                  min={12}
                  max={18}
                />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Adjust the base font size for text throughout the application.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
        
        {/* Accessibility Settings */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Accessibility Settings
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            <Box sx={{ mb: 3 }}>
              <FormControlLabel
                control={<Switch color="primary" />}
                label="Reduced Motion"
              />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Reduces animations throughout the application for users who prefer less motion.
              </Typography>
            </Box>
            
            <Box sx={{ mb: 3 }}>
              <FormControlLabel
                control={<Switch color="primary" />}
                label="High Contrast"
              />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Increases contrast for better readability.
              </Typography>
            </Box>
            
            <Box>
              <FormControlLabel
                control={<Switch color="primary" />}
                label="Screen Reader Optimizations"
              />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Enables additional descriptive elements for screen readers.
              </Typography>
            </Box>
          </CardContent>
        </Card>
        
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button variant="outlined" onClick={handleReset}>
            Reset to Defaults
          </Button>
          <Button variant="contained" onClick={handleSave}>
            Save Settings
          </Button>
        </Box>
      </Box>
    </PageLayout>
  );
}