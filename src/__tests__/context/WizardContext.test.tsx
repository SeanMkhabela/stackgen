import { render, screen, fireEvent } from '@testing-library/react';
import { WizardProvider, useWizard } from '../../context/WizardContext';
import { vi, describe, test, expect, beforeEach } from 'vitest';

// Mock component that uses the wizard context
const TestComponent = () => {
  const { showWizard, openWizard, closeWizard, hasSeenWizard, markWizardAsSeen } = useWizard();
  
  return (
    <div>
      <div data-testid="wizard-state">{showWizard ? 'open' : 'closed'}</div>
      <div data-testid="seen-state">{hasSeenWizard ? 'seen' : 'not-seen'}</div>
      <button onClick={openWizard} data-testid="open-button">Open Wizard</button>
      <button onClick={closeWizard} data-testid="close-button">Close Wizard</button>
      <button onClick={markWizardAsSeen} data-testid="mark-seen-button">Mark as Seen</button>
    </div>
  );
};

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('WizardContext', () => {
  beforeEach(() => {
    // Clear localStorage and reset mocks before each test
    localStorageMock.clear();
    vi.clearAllMocks();
  });
  
  test('initializes with default values', () => {
    render(
      <WizardProvider>
        <TestComponent />
      </WizardProvider>
    );
    
    expect(screen.getByTestId('wizard-state')).toHaveTextContent('closed');
    // Initially not seen
    expect(screen.getByTestId('seen-state')).toHaveTextContent('not-seen');
  });
  
  test('initializes with localStorage values if present', () => {
    // Set localStorage to indicate the wizard has been seen
    localStorageMock.getItem.mockReturnValueOnce('true');
    
    render(
      <WizardProvider>
        <TestComponent />
      </WizardProvider>
    );
    
    expect(screen.getByTestId('seen-state')).toHaveTextContent('seen');
    expect(localStorageMock.getItem).toHaveBeenCalledWith('hasSeenWizard');
  });
  
  test('openWizard sets showWizard to true', () => {
    render(
      <WizardProvider>
        <TestComponent />
      </WizardProvider>
    );
    
    // Initially closed
    expect(screen.getByTestId('wizard-state')).toHaveTextContent('closed');
    
    // Open wizard
    fireEvent.click(screen.getByTestId('open-button'));
    
    // Should now be open
    expect(screen.getByTestId('wizard-state')).toHaveTextContent('open');
  });
  
  test('closeWizard sets showWizard to false', () => {
    render(
      <WizardProvider>
        <TestComponent />
      </WizardProvider>
    );
    
    // First open the wizard
    fireEvent.click(screen.getByTestId('open-button'));
    expect(screen.getByTestId('wizard-state')).toHaveTextContent('open');
    
    // Now close it
    fireEvent.click(screen.getByTestId('close-button'));
    
    // Should now be closed
    expect(screen.getByTestId('wizard-state')).toHaveTextContent('closed');
  });
  
  test('markWizardAsSeen updates localStorage and state', () => {
    render(
      <WizardProvider>
        <TestComponent />
      </WizardProvider>
    );
    
    // Initially not seen
    expect(screen.getByTestId('seen-state')).toHaveTextContent('not-seen');
    
    // Mark as seen
    fireEvent.click(screen.getByTestId('mark-seen-button'));
    
    // Should now be seen
    expect(screen.getByTestId('seen-state')).toHaveTextContent('seen');
    
    // Should update localStorage
    expect(localStorageMock.setItem).toHaveBeenCalledWith('hasSeenWizard', 'true');
  });
  
  test('throws error when used outside provider', () => {
    // Mock console.error to prevent React from logging the expected error
    const originalConsoleError = console.error;
    console.error = vi.fn();
    
    // Expect render to throw when TestComponent is used outside provider
    expect(() => {
      render(<TestComponent />);
    }).toThrow('useWizard must be used within a WizardProvider');
    
    // Restore console.error
    console.error = originalConsoleError;
  });
}); 