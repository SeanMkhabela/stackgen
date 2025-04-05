import { ReactNode } from 'react';
import { Box, Container, useTheme } from '@mui/material';

// Define type alias for content width options
type ContentWidth = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;

// Augment the Theme interface
declare module '@mui/material/styles' {
  interface Theme {
    contentWidth?: ContentWidth;
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    contentWidth?: ContentWidth;
  }
}

interface ResponsiveLayoutProps {
  children: ReactNode;
  maxWidth?: ContentWidth;
  fullHeight?: boolean;
  padding?: string | number | object;
  disableGutters?: boolean;
  centerContent?: boolean;
}

export default function ResponsiveLayout({
  children,
  maxWidth = 'lg',
  fullHeight = true,
  padding = { xs: 2, sm: 3, md: 4 },
  disableGutters = false,
  centerContent = false,
}: Readonly<ResponsiveLayoutProps>) {
  // Get the content width from theme if available
  const theme = useTheme();
  const contentWidth = theme.contentWidth ?? maxWidth;
  
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        minHeight: fullHeight ? '100vh' : 'auto',
        height: fullHeight ? '100%' : 'auto',
       
      }}
    >
      <Container
        maxWidth={contentWidth}
        disableGutters={disableGutters}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          width: '100%',
          height: fullHeight ? '100%' : 'auto',
          padding: padding,
          justifyContent: centerContent ? 'center' : 'flex-start',
          alignItems: centerContent ? 'center' : 'stretch',
          '& > *': {
            width: '100%',
          }
        }}
      >
        {children}
      </Container>
    </Box>
  );
}

// A component to ensure content is centered both vertically and horizontally
export function CenteredContent({
  children,
  maxWidth = 'sm',
}: Readonly<{
  children: ReactNode;
  maxWidth?: ContentWidth;
}>) {
  const theme = useTheme();
  const contentWidth = theme.contentWidth ?? maxWidth;
  
  return (
    <ResponsiveLayout maxWidth={contentWidth} fullHeight centerContent>
      {children}
    </ResponsiveLayout>
  );
}

// A component for page layout with automatic padding
export function PageLayout({
  children,
  maxWidth = 'lg',
}: Readonly<{
  children: ReactNode;
  maxWidth?: ContentWidth;
}>) {
  const theme = useTheme();
  const contentWidth = theme.contentWidth ?? maxWidth;
  
  return (
    <ResponsiveLayout maxWidth={contentWidth} fullHeight>
      {children}
    </ResponsiveLayout>
  );
} 