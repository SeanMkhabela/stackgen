import { createContext, useContext, useState, ReactNode, useMemo } from 'react';

interface StackContextType {
  selectedStack: string | null;
  setSelectedStack: (stack: string) => void;
  isStackSelected: () => boolean;
}

const StackContext = createContext<StackContextType | undefined>(undefined);

export function StackProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [selectedStack, setSelectedStack] = useState<string | null>(() => {
    // Initialize from localStorage if available
    const saved = localStorage.getItem('selectedStack');
    return saved ?? null;
  });

  const isStackSelected = () => {
    return !!selectedStack;
  };

  // Save to localStorage whenever stack changes
  const handleSetStack = (stack: string) => {
    localStorage.setItem('selectedStack', stack);
    setSelectedStack(stack);
  };

  return (
    <StackContext.Provider
      value={useMemo(() => ({
        selectedStack,
        setSelectedStack: handleSetStack,
        isStackSelected
      }), [selectedStack])}
    >
      {children}
    </StackContext.Provider>
  );
}

export function useStack() {
  const context = useContext(StackContext);
  if (context === undefined) {
    throw new Error('useStack must be used within a StackProvider');
  }
  return context;
} 