
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * A wrapper for standard pages that provides consistent padding and spacing,
 * ensuring content appears below the fixed header. It also adds a fade-in
 * transition on page load.
 */
const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 10); // Short delay to trigger transition
    return () => clearTimeout(timer);
  }, [location.key]);

  return (
    <div className={`container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-8 md:pb-12 transition-opacity duration-300 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {children}
    </div>
  );
};

export default PageLayout;
