
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

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