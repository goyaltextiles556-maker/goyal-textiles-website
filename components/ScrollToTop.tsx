
import { useEffect } from 'react';
// FIX: Use namespace import for react-router-dom to fix "no exported member" errors.
import * as ReactRouterDOM from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash } = ReactRouterDOM.useLocation();

  useEffect(() => {
    // Only scroll if not navigating to a hash anchor
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
