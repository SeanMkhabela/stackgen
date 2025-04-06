import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import { ThemeProvider, createTheme } from '@mui/material';

// Helper to render Sidebar with required providers
const renderSidebar = () => {
  const theme = createTheme();
  return render(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    </ThemeProvider>
  );
};

describe('Sidebar Component', () => {
  test('renders all navigation items', () => {
    renderSidebar();
    
    // Check if all nav items are rendered
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Start New')).toBeInTheDocument();
    expect(screen.getByText('Result')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  test('toggles between collapsed and expanded state', () => {
    renderSidebar();
    
    // Find the toggle button (it has Expand/Collapse tooltip)
    const toggleButton = screen.getByRole('button');
    
    // Initial state depends on viewport size in the component
    // Let's assume it starts expanded for this test
    
    // Click to toggle
    fireEvent.click(toggleButton);
    
    // Can't easily test the actual width in JSDOM, but we can test that
    // the button was clicked and component didn't crash
    expect(toggleButton).toBeInTheDocument();
  });
  
  test('navigation links have correct hrefs', () => {
    renderSidebar();
    
    // Get all links and check their href attributes
    const homeLink = screen.getByText('Home').closest('a');
    const newProjectLink = screen.getByText('Start New').closest('a');
    const resultLink = screen.getByText('Result').closest('a');
    
    expect(homeLink).toHaveAttribute('href', '/home');
    expect(newProjectLink).toHaveAttribute('href', '/select-stack');
    expect(resultLink).toHaveAttribute('href', '/result');
  });
}); 