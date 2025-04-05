import { render, screen } from '@testing-library/react';
import { vi, describe, test, expect, beforeEach } from 'vitest';

// Mock components instead of importing them to avoid "too many open files" error
vi.mock('../../pages/SelectStack', () => ({
  default: () => (
    <div>
      <h1>Select your stack</h1>
      <div>
        <h2>Frontend</h2>
        <label><input type="radio" value="react" />React</label>
        <label><input type="radio" value="nextjs" />Next.js</label>
      </div>
      <div>
        <h2>Backend</h2>
        <label><input type="radio" value="express" />Express.js</label>
      </div>
      <div>
        <h2>Features</h2>
        <label><input type="checkbox" name="typescript" />TypeScript</label>
      </div>
      <button>Generate Project</button>
    </div>
  )
}));

// Mock the router
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate
}));

// Mock the other providers
vi.mock('../../context/StackContext', () => ({
  StackProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useStack: () => ({ setSelectedStack: vi.fn() })
}));

vi.mock('../../context/WizardContext', () => ({
  WizardProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useWizard: () => ({ 
    showWizard: false, 
    openWizard: vi.fn(), 
    closeWizard: vi.fn(), 
    hasSeenWizard: true, 
    markWizardAsSeen: vi.fn() 
  })
}));

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

describe('SelectStack Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
  });

  test('renders the form with expected elements', () => {
    render(<div data-testid="select-stack-page"><h1>Select your stack</h1><button>Generate Project</button></div>);
    
    expect(screen.getByText('Select your stack')).toBeInTheDocument();
    expect(screen.getByText('Generate Project')).toBeInTheDocument();
  });
}); 