
import React, { createContext, useState, ReactNode, useContext } from 'react';

interface ScrollSpyContextType {
  activeSection: string;
  setActiveSection: (sectionId: string) => void;
}

const ScrollSpyContext = createContext<ScrollSpyContextType | undefined>(undefined);

export const ScrollSpyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeSection, setActiveSection] = useState('home');

  return (
    <ScrollSpyContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </ScrollSpyContext.Provider>
  );
};

export const useScrollSpy = () => {
    const context = useContext(ScrollSpyContext);
    if (!context) {
        throw new Error('useScrollSpy must be used within a ScrollSpyProvider');
    }
    return context;
};
