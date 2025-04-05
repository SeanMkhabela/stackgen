import { createContext, useContext, useState, ReactNode, useMemo, useCallback } from 'react';

interface WizardContextType {
  showWizard: boolean;
  openWizard: () => void;
  closeWizard: () => void;
  hasSeenWizard: boolean;
  markWizardAsSeen: () => void;
}

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export function WizardProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [showWizard, setShowWizard] = useState(false);
  const [hasSeenWizard, setHasSeenWizard] = useState(() => {
    return localStorage.getItem('hasSeenWizard') === 'true';
  });

  const openWizard = useCallback(() => {
    setShowWizard(true);
  }, []);

  const closeWizard = useCallback(() => {
    setShowWizard(false);
  }, []);

  const markWizardAsSeen = useCallback(() => {
    localStorage.setItem('hasSeenWizard', 'true');
    setHasSeenWizard(true);
  }, []);

  const contextValue = useMemo(() => ({
    showWizard,
    openWizard,
    closeWizard,
    hasSeenWizard,
    markWizardAsSeen
  }), [showWizard, hasSeenWizard, openWizard, closeWizard, markWizardAsSeen]);

  return (
    <WizardContext.Provider value={contextValue}>
      {children}
    </WizardContext.Provider>
  );
}

export function useWizard() {
  const context = useContext(WizardContext);
  if (context === undefined) {
    throw new Error('useWizard must be used within a WizardProvider');
  }
  return context;
} 