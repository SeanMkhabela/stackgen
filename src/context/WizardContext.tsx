import { createContext, useContext, useState, ReactNode } from 'react';

interface WizardContextType {
  showWizard: boolean;
  openWizard: () => void;
  closeWizard: () => void;
  hasSeenWizard: boolean;
  markWizardAsSeen: () => void;
}

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export function WizardProvider({ children }: { children: ReactNode }) {
  const [showWizard, setShowWizard] = useState(false);
  const [hasSeenWizard, setHasSeenWizard] = useState(() => {
    return localStorage.getItem('hasSeenWizard') === 'true';
  });

  const openWizard = () => {
    setShowWizard(true);
  };

  const closeWizard = () => {
    setShowWizard(false);
  };

  const markWizardAsSeen = () => {
    localStorage.setItem('hasSeenWizard', 'true');
    setHasSeenWizard(true);
  };

  return (
    <WizardContext.Provider value={{
      showWizard,
      openWizard,
      closeWizard,
      hasSeenWizard,
      markWizardAsSeen
    }}>
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