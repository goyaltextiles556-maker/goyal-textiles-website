import React, { useState, useEffect } from 'react';
// FIX: Use namespace import for react-router-dom to fix "no exported member" errors.
import * as ReactRouterDOM from 'react-router-dom';
import { FiShoppingCart, FiMenu, FiX, FiSearch } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useCart } from '../hooks/useCart';
import { useScrollSpy } from '../context/ScrollSpyContext';
import SearchBar from './SearchBar';

const Header: React.FC = () => {
  const { cartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [heroHeight, setHeroHeight] = useState(0);
  const [headerStyle, setHeaderStyle] = useState<React.CSSProperties>({});
  const { activeSection } = useScrollSpy();
  const location = ReactRouterDOM.useLocation();
  const navigate = ReactRouterDOM.useNavigate();
  const isHomePage = location.pathname === '/';

  // Handle scroll position changes
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate hero height and determine header styling
  useEffect(() => {
    const updateHeroHeight = () => {
      if (isHomePage) {
        // Get the hero element (slideshow)
        const heroElement = document.querySelector('[class*="aspect-video"]') as HTMLElement;
        if (heroElement) {
          setHeroHeight(heroElement.offsetHeight);
        }
      }
    };

    updateHeroHeight();
    window.addEventListener('resize', updateHeroHeight);
    return () => window.removeEventListener('resize', updateHeroHeight);
  }, [isHomePage]);

  // Update header styling based on scroll position with smooth transition
  useEffect(() => {
    if (isHomePage && heroHeight > 0) {
      // Calculate transition progress: 0 = at top, 1 = fully scrolled past hero
      // Transition spans from hero start to 1.5x hero height for smooth, gradual effect
      const transitionEnd = heroHeight * 1.5;
      const progress = Math.min(Math.max(scrollY / transitionEnd, 0), 1);
      
      // Interpolate between light and dark states using progress
      // Light state: white/off-white translucent
      // Dark state: deep navy solid
      const lightBg = {
        r: 255,
        g: 255,
        b: 255,
        a: 0.8,
      };
      const darkBg = {
        r: 14,
        g: 26,
        b: 43,
        a: 0.95,
      };
      
      // Smooth easing function (cubic ease-in-out)
      const easeProgress = progress < 0.5 
        ? 2 * progress * progress 
        : -1 + (4 - 2 * progress) * progress;
      
      // Interpolate color values
      const r = Math.round(lightBg.r + (darkBg.r - lightBg.r) * easeProgress);
      const g = Math.round(lightBg.g + (darkBg.g - lightBg.g) * easeProgress);
      const b = Math.round(lightBg.b + (darkBg.b - lightBg.b) * easeProgress);
      const a = (lightBg.a + (darkBg.a - lightBg.a) * easeProgress).toFixed(3);
      
      // Interpolate blur and border based on progress
      const blur = 10 - (2 * easeProgress);
      const borderLight = Math.round(42 * (1 - easeProgress));
      const borderDark = Math.round(255 * easeProgress);
      
      setHeaderStyle({
        background: `linear-gradient(180deg, rgba(${r}, ${g}, ${b}, ${a}) 0%, rgba(${r}, ${g}, ${b}, ${(parseFloat(a) * 0.95).toFixed(3)}) 100%)`,
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`,
        borderBottom: `1px solid rgba(${easeProgress < 0.5 ? `${borderLight}, ${borderLight}, ${borderLight}` : `${borderDark}, ${borderDark}, ${borderDark}`}, ${(0.06 + (0.02 * easeProgress)).toFixed(3)})`,
      });
    } else {
      // Non-home pages - use navy-blue
      setHeaderStyle({
        background: 'linear-gradient(180deg, rgba(14, 26, 43, 0.95) 0%, rgba(11, 31, 51, 0.92) 100%)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      });
    }
  }, [scrollY, heroHeight, isHomePage]);

  const handleNavClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (path === '/' || path.startsWith('/#')) {
      if (!isHomePage) {
        navigate(path);
      } else {
        const hash = path.split('#')[1];
        if (hash) {
          setTimeout(() => {
            const element = document.getElementById(hash);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 50);
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    } else {
      navigate(path);
    }
  };

  const navLinks = [
    { to: '/', text: 'Home', id: 'home' },
    { to: '/#categories', text: 'Categories', id: 'categories' },
    { to: '/about', text: 'About Us', id: 'about' },
  ];

  const isCategoriesPage = location.pathname.startsWith('/category');
  const isAboutPage = location.pathname === '/about';

  // Calculate smooth color transition progress for text/icons
  let colorProgress = 0;
  if (isHomePage && heroHeight > 0) {
    const transitionEnd = heroHeight * 1.5;
    colorProgress = Math.min(Math.max(scrollY / transitionEnd, 0), 1);
  } else if (!isHomePage) {
    colorProgress = 1; // Non-home pages are always dark
  }
  
  // Use threshold to determine when to switch text colors (smooth with easing)
  const easeColorProgress = colorProgress < 0.5 
    ? 2 * colorProgress * colorProgress 
    : -1 + (4 - 2 * colorProgress) * colorProgress;
  const isHeaderDark = easeColorProgress > 0.5;

  return (
    <header 
      className="fixed w-full top-0 z-40 transition-all duration-300 ease-out"
      style={headerStyle}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left Side: Logo + Nav */}
          <div className="flex items-center gap-x-6">
            <ReactRouterDOM.Link 
              to="/" 
              onClick={(e) => handleNavClick(e, '/')}
              className={`text-lg sm:text-xl font-bold uppercase font-display tracking-wider transition-all duration-300 ease-out whitespace-nowrap hover:scale-105 active:scale-95 ${
                isHeaderDark ? 'text-off-white drop-shadow-sm' : 'text-primary-blue'
              }`}
            >
              GOYAL TEXTILES
            </ReactRouterDOM.Link>
            
            <nav className="hidden md:flex items-center gap-x-6">
              {navLinks.map((link) => {
                const isLinkActive = (isHomePage && activeSection === link.id) || (link.id === 'categories' && isCategoriesPage) || (link.id === 'about' && isAboutPage);
                return (
                  <ReactRouterDOM.Link
                    key={link.to}
                    to={link.to}
                    onClick={(e) => handleNavClick(e, link.to)}
                    className={`text-sm font-semibold transition-all duration-300 ease-out relative pb-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2.5px] after:transition-all after:duration-300 ${
                      isHeaderDark
                        ? isLinkActive
                          ? 'text-off-white after:bg-off-white after:w-full'
                          : 'text-gray-200 after:bg-off-white after:w-0 hover:text-off-white hover:after:w-full'
                        : isLinkActive
                          ? 'text-primary-blue after:bg-primary-blue after:w-full'
                          : 'text-gray-600 after:bg-primary-blue after:w-0 hover:text-primary-blue hover:after:w-full'
                    }`}
                  >
                    {link.text}
                  </ReactRouterDOM.Link>
                )
              })}
            </nav>
          </div>

          {/* Right Side: Actions */}
          <div className="flex items-center justify-end gap-x-4 sm:gap-x-6">
            <div className="hidden md:block">
              <SearchBar />
            </div>
            <a 
              href="https://wa.me/918860440884?text=Hello%2C%20I%20would%20like%20to%20place%20an%20order."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Place an order via WhatsApp"
              className={`flex items-center space-x-2 transition-all duration-300 ease-out hover:scale-110 active:scale-95 group ${
                isHeaderDark ? 'text-off-white' : 'text-primary-blue'
              }`}
            >
              <FaWhatsapp size={24} />
              <span className={`hidden sm:inline text-sm font-medium transition-colors duration-300 ${
                isHeaderDark ? 'group-hover:text-gray-200' : 'group-hover:text-blue-800'
              }`}>Make an Order</span>
            </a>
            <ReactRouterDOM.Link 
              to="/cart" 
              className={`relative transition-all duration-300 ease-out hover:scale-110 active:scale-95 group ${
                isHeaderDark ? 'text-off-white' : 'text-primary-blue'
              }`}
            >
              <FiShoppingCart size={24} className="group-hover:drop-shadow-sm transition-all duration-300" />
              {cartCount > 0 && (
                <span className={`absolute -top-2.5 -right-2.5 text-xs rounded-full h-5 w-5 flex items-center justify-center animate-floating font-bold text-center leading-none ${
                  isHeaderDark ? 'bg-red-500 text-white shadow-lg' : 'bg-red-500 text-white shadow-md'
                }`}>
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </ReactRouterDOM.Link>
            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className={`transition-all duration-300 ease-out hover:scale-110 active:scale-95 ${
                  isHeaderDark ? 'text-off-white' : 'text-primary-blue'
                }`}
              >
                {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96' : 'max-h-0'} ${
        isHeaderDark 
          ? 'bg-gradient-to-b from-blue-950/95 to-slate-900/90 backdrop-blur-sm shadow-lg' 
          : 'bg-off-white/95 backdrop-blur-sm shadow-lg'
      }`}>
        <div className="p-4 space-y-4">
          <SearchBar />
          <nav className="flex flex-col items-start space-y-3">
            {navLinks.map((link) => {
              const isLinkActive = (isHomePage && activeSection === link.id) || (link.id === 'categories' && isCategoriesPage) || (link.id === 'about' && isAboutPage);
              return (
                <ReactRouterDOM.Link
                  key={link.to}
                  to={link.to}
                  onClick={(e) => handleNavClick(e, link.to)}
                  className={`w-full text-left p-2 rounded-md text-base font-medium transition-all duration-300 ease-out ${
                    isLinkActive 
                      ? isHeaderDark
                        ? 'bg-off-white/15 text-off-white'
                        : 'bg-primary-blue text-off-white'
                      : isHeaderDark
                        ? 'text-gray-300 hover:bg-white/10'
                        : 'text-primary-blue hover:bg-black/10'
                  }`}
                >
                  {link.text}
                </ReactRouterDOM.Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
