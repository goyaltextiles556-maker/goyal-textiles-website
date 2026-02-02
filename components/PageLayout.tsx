
import React, { useState, useEffect } from 'react';
// FIX: Use namespace import for react-router-dom to fix "no exported member" errors.
import * as ReactRouterDOM from 'react-router-dom';

/**
 * A wrapper for standard pages that provides consistent padding and spacing,
 * ensuring content appears below the fixed header. It also adds a fade-in
 * transition on page load.
 */
const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const location = ReactRouterDOM.useLocation();

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 10); // Short delay to trigger transition
    return () => clearTimeout(timer);
  }, [location.key]);

  return (
    <div className={`container mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-6 md:pb-8 transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}>
      {children}
    </div>
  );
};

export default PageLayout;