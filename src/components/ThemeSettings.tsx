import { useState, useContext, useEffect, useCallback, memo } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Switch, 
  FormControlLabel, 
  Button,
  Divider,
  IconButton,
  Tooltip,
  Drawer,
  Radio,
  RadioGroup,
  FormControl,
  Slider,
  Select,
  MenuItem,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { ColorModeContext } from './ThemeProvider';
import { Settings as SettingsIcon, Close as CloseIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Memoize the theme settings to prevent unnecessary re-renders
export default memo(function ThemeSettings() {
  const [open, setOpen] = useState(false);
  const { mode, toggleColorMode } = useContext(ColorModeContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  
  // Get settings from localStorage with lazy initialization
  const [contentWidth, setContentWidth] = useState(() => 
    localStorage.getItem('theme-content-width') || 'lg'
  );
  
  const [fontSize, setFontSize] = useState(() => 
    parseInt(localStorage.getItem('theme-font-size') || '14', 10)
  );
  
  const [primaryColor, setPrimaryColor] = useState(() => 
    localStorage.getItem('theme-primary-color') || theme.palette.primary.main
  );
  
  // Update localStorage when settings change, using useCallback for better performance
  const updateLocalStorage = useCallback(() => {
    localStorage.setItem('theme-content-width', contentWidth);
    localStorage.setItem('theme-font-size', fontSize.toString());
    localStorage.setItem('theme-primary-color', primaryColor);
  }, [contentWidth, fontSize, primaryColor]);

  useEffect(() => {
    updateLocalStorage();
  }, [updateLocalStorage]);

  const goToSettings = useCallback(() => {
    setOpen(false);
    navigate('/settings');
  }, [navigate]);

  const toggleDrawer = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  return (
    <>
      <Tooltip title="Theme Settings" arrow>
        <IconButton 
          color="inherit" 
          onClick={toggleDrawer}
          sx={{ 
            position: 'fixed', 
            right: { xs: 16, sm: 20 }, 
            bottom: { xs: 16, sm: 20 },
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
            zIndex: theme.zIndex.drawer + 1,
            width: { xs: 40, sm: 48 },
            height: { xs: 40, sm: 48 },
            boxShadow: 6,
          }}
        >
          <SettingsIcon />
        </IconButton>
      </Tooltip>

      <Drawer
        anchor={isMobile ? "bottom" : "right"}
        open={open}
        onClose={toggleDrawer}
        PaperProps={{
          sx: {
            width: isMobile ? '100%' : { xs: '100%', sm: 360 },
            maxHeight: isMobile ? '80vh' : '100vh',
            p: { xs: 2, sm: 3 },
            borderTopLeftRadius: isMobile ? 16 : 0,
            borderTopRightRadius: isMobile ? 16 : 0,
            overflowY: 'auto',
          }
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" fontWeight="bold">Quick Settings</Typography>
          <IconButton onClick={toggleDrawer} edge="end" aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" fontWeight="medium" gutterBottom>Mode</Typography>
        <Card variant="outlined" sx={{ mb: 3 }}>
          <CardContent>
            <FormControlLabel 
              control={<Switch checked={mode === 'dark'} onChange={toggleColorMode} color="primary" />} 
              label={mode === 'dark' ? "Dark Mode" : "Light Mode"} 
            />
          </CardContent>
        </Card>

        <Typography variant="subtitle1" fontWeight="medium" gutterBottom>Content Width</Typography>
        <Card variant="outlined" sx={{ mb: 3 }}>
          <CardContent>
            <FormControl component="fieldset" fullWidth>
              <RadioGroup
                row
                value={contentWidth}
                onChange={(e) => setContentWidth(e.target.value)}
                name="content-width"
              >
                <FormControlLabel value="xs" control={<Radio size="small" />} label="XS" />
                <FormControlLabel value="sm" control={<Radio size="small" />} label="SM" />
                <FormControlLabel value="md" control={<Radio size="small" />} label="MD" />
                <FormControlLabel value="lg" control={<Radio size="small" />} label="LG" />
                <FormControlLabel value="xl" control={<Radio size="small" />} label="XL" />
              </RadioGroup>
            </FormControl>
          </CardContent>
        </Card>

        <Typography variant="subtitle1" fontWeight="medium" gutterBottom>Font Size</Typography>
        <Card variant="outlined" sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ px: 1 }}>
              <Typography variant="body2" gutterBottom>{fontSize}px</Typography>
              <Slider
                value={fontSize}
                onChange={(_, newValue) => setFontSize(newValue as number)}
                step={1}
                marks
                min={12}
                max={18}
                valueLabelDisplay="auto"
              />
            </Box>
          </CardContent>
        </Card>

        <Typography variant="subtitle1" fontWeight="medium" gutterBottom>Primary Color</Typography>
        <Card variant="outlined" sx={{ mb: 3 }}>
          <CardContent>
            <FormControl fullWidth size="small">
              <Select
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                displayEmpty
              >
                <MenuItem value="#646cff">Default Purple</MenuItem>
                <MenuItem value="#2196f3">Blue</MenuItem>
                <MenuItem value="#4caf50">Green</MenuItem>
                <MenuItem value="#f44336">Red</MenuItem>
                <MenuItem value="#ff9800">Orange</MenuItem>
                <MenuItem value="#9c27b0">Purple</MenuItem>
              </Select>
            </FormControl>
          </CardContent>
        </Card>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button 
            variant="contained" 
            onClick={goToSettings}
            fullWidth
          >
            More Settings
          </Button>
          <Button 
            variant="outlined" 
            onClick={toggleDrawer} 
            fullWidth
          >
            Close
          </Button>
        </Box>
      </Drawer>
    </>
  );
}); 