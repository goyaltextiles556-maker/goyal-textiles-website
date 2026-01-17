
import React from 'react';

/**
 * A wrapper for standard pages that provides consistent padding and spacing,
 * ensuring content appears below the fixed header.
 */
const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    // pt-28 provides space for the h-20 header plus vertical rhythm.
    // pb-8/md:pb-12 provides bottom spacing before the footer.
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-8 md:pb-12">
      {children}
    </div>
  );
};

export default PageLayout;
