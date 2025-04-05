import { render, screen, fireEvent } from '@testing-library/react';
import { StackProvider, useStack } from '../../context/StackContext';
import { vi, describe, test, expect, beforeEach } from 'vitest';

// Test component that uses the stack context
const TestComponent = () => {
  const { selectedStack, setSelectedStack, isStackSelected } = useStack();
  
  return (
    <div>
      <div data-testid="stack-value">{selectedStack || 'none'}</div>
      <div data-testid="is-selected">{isStackSelected() ? 'selected' : 'not-selected'}</div>
      <button 
        onClick={() => setSelectedStack('react-express')} 
        data-testid="select-button"
      >
        Select React-Express
      </button>
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

describe('StackContext', () => {
  beforeEach(() => {
    // Clear localStorage and reset mocks before each test
    localStorageMock.clear();
    vi.clearAllMocks();
  });
  
  test('initializes with null stack when localStorage is empty', () => {
    render(
      <StackProvider>
        <TestComponent />
      </StackProvider>
    );
    
    expect(screen.getByTestId('stack-value')).toHaveTextContent('none');
    expect(screen.getByTestId('is-selected')).toHaveTextContent('not-selected');
    expect(localStorageMock.getItem).toHaveBeenCalledWith('selectedStack');
  });
  
  test('initializes with stack from localStorage if present', () => {
    // Set localStorage with a selected stack
    localStorageMock.getItem.mockReturnValueOnce('react-express');
    
    render(
      <StackProvider>
        <TestComponent />
      </StackProvider>
    );
    
    expect(screen.getByTestId('stack-value')).toHaveTextContent('react-express');
    expect(screen.getByTestId('is-selected')).toHaveTextContent('selected');
  });
  
  test('setSelectedStack updates state and localStorage', () => {
    render(
      <StackProvider>
        <TestComponent />
      </StackProvider>
    );
    
    // Initially no stack
    expect(screen.getByTestId('stack-value')).toHaveTextContent('none');
    
    // Select a stack
    fireEvent.click(screen.getByTestId('select-button'));
    
    // Stack should be updated
    expect(screen.getByTestId('stack-value')).toHaveTextContent('react-express');
    expect(screen.getByTestId('is-selected')).toHaveTextContent('selected');
    
    // Should save to localStorage
    expect(localStorageMock.setItem).toHaveBeenCalledWith('selectedStack', 'react-express');
  });
  
  test('isStackSelected returns correct boolean value', () => {
    render(
      <StackProvider>
        <TestComponent />
      </StackProvider>
    );
    
    // Initially not selected
    expect(screen.getByTestId('is-selected')).toHaveTextContent('not-selected');
    
    // Select a stack
    fireEvent.click(screen.getByTestId('select-button'));
    
    // Should now be selected
    expect(screen.getByTestId('is-selected')).toHaveTextContent('selected');
  });
  
  test('throws error when used outside provider', () => {
    // Mock console.error to prevent React from logging the expected error
    const originalConsoleError = console.error;
    console.error = vi.fn();
    
    // Expect render to throw when TestComponent is used outside provider
    expect(() => {
      render(<TestComponent />);
    }).toThrow('useStack must be used within a StackProvider');
    
    // Restore console.error
    console.error = originalConsoleError;
  });
}); 