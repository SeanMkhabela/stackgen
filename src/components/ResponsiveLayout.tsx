import { ReactNode } from 'react';
import { Box, Container } from '@mui/material';

interface ResponsiveLayoutProps {
  children: ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
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
}: ResponsiveLayoutProps) {
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
        maxWidth={maxWidth}
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
}: {
  children: ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
}) {
  return (
    <ResponsiveLayout maxWidth={maxWidth} fullHeight centerContent>
      {children}
    </ResponsiveLayout>
  );
}

// A component for page layout with automatic padding
export function PageLayout({
  children,
  maxWidth = 'lg',
}: {
  children: ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
}) {
  return (
    <ResponsiveLayout maxWidth={maxWidth} fullHeight>
      {children}
    </ResponsiveLayout>
  );
} 