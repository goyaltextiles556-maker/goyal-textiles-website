
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Only scroll if not navigating to a hash anchor
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
