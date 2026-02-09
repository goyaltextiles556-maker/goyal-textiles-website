
import React, { useState, useEffect, useMemo } from 'react';
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
  const { activeSection } = useScrollSpy();
  const location = ReactRouterDOM.useLocation();
  const navigate = ReactRouterDOM.useNavigate();
  const isHomePage = location.pathname === '/';

  // Handle scroll position changes with passive listener for better performance
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Use passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate hero height with more robust detection
  useEffect(() => {
    const updateHeroHeight = () => {
      if (isHomePage) {
        // Try multiple selectors to find the hero element
        let heroElement = document.querySelector('[class*="aspect-video"]') as HTMLElement;
        if (!heroElement) {
          heroElement = document.querySelector('.aspect-video') as HTMLElement;
        }
        if (!heroElement) {
          heroElement = document.querySelector('[class*="slideshow"], [class*="hero"]') as HTMLElement;
        }
        
        if (heroElement) {
          const height = heroElement.offsetHeight || heroElement.getBoundingClientRect().height;
          if (height > 0) {
            setHeroHeight(height);
          }
        }
      }
    };

    // Use a small delay to ensure DOM is fully rendered
    const timeoutId = setTimeout(updateHeroHeight, 100);
    
    // Also update on load and resize
    window.addEventListener('load', updateHeroHeight);
    window.addEventListener('resize', updateHeroHeight);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('load', updateHeroHeight);
      window.removeEventListener('resize', updateHeroHeight);
    };
  }, [isHomePage]);

  const { headerStyle, isHeaderDark } = useMemo(() => {
    let colorProgress = 0;
    if (isHomePage) {
      // Always calculate based on scroll, even if heroHeight is still being calculated
      if (heroHeight > 0) {
        const transitionEnd = heroHeight * 1.5;
        colorProgress = Math.min(Math.max(scrollY / transitionEnd, 0), 1);
      } else if (scrollY > 0) {
        // If heroHeight hasn't loaded yet but user is scrolling, estimate based on scroll position
        // This ensures the header transitions even if hero height detection is delayed
        colorProgress = Math.min(Math.max(scrollY / 400, 0), 1);
      }
    } else {
      colorProgress = 1;
    }

    const easeProgress = colorProgress < 0.5 
      ? 2 * colorProgress * colorProgress 
      : -1 + (4 - 2 * colorProgress) * colorProgress;
    
    const lightBg = { r: 255, g: 255, b: 255, a: 0.8 };
    // Footer gradient: from-primary-blue (42, 67, 101) to blue-950 (23, 37, 84)
    const darkBgTop = { r: 42, g: 67, b: 101, a: 0.95 };
    const darkBgBottom = { r: 23, g: 37, b: 84, a: 0.95 };
    
    // Interpolate top color
    const rTop = Math.round(lightBg.r + (darkBgTop.r - lightBg.r) * easeProgress);
    const gTop = Math.round(lightBg.g + (darkBgTop.g - lightBg.g) * easeProgress);
    const bTop = Math.round(lightBg.b + (darkBgTop.b - lightBg.b) * easeProgress);
    const aTop = (lightBg.a + (darkBgTop.a - lightBg.a) * easeProgress).toFixed(3);
    
    // Interpolate bottom color
    const rBottom = Math.round(lightBg.r + (darkBgBottom.r - lightBg.r) * easeProgress);
    const gBottom = Math.round(lightBg.g + (darkBgBottom.g - lightBg.g) * easeProgress);
    const bBottom = Math.round(lightBg.b + (darkBgBottom.b - lightBg.b) * easeProgress);
    const aBottom = (lightBg.a + (darkBgBottom.a - lightBg.a) * easeProgress).toFixed(3);
    
    const blur = 10 - (2 * easeProgress);
    const borderLight = Math.round(42 * (1 - easeProgress));
    const borderDark = Math.round(255 * easeProgress);
    
    const style = {
      background: `linear-gradient(180deg, rgba(${rTop}, ${gTop}, ${bTop}, ${aTop}) 0%, rgba(${rBottom}, ${gBottom}, ${bBottom}, ${aBottom}) 100%)`,
      backdropFilter: `blur(${blur}px)`,
      WebkitBackdropFilter: `blur(${blur}px)`,
      borderBottom: `1px solid rgba(${easeProgress < 0.5 ? `${borderLight}, ${borderLight}, ${borderLight}` : `${borderDark}, ${borderDark}, ${borderDark}`}, ${(0.06 + (0.02 * easeProgress)).toFixed(3)})`,
    };

    return { headerStyle: style, isHeaderDark: easeProgress > 0.5 };
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
            
            <nav className="hidden md:flex items-center gap-x-8">
              {navLinks.map((link) => {
                const isLinkActive = (isHomePage && activeSection === link.id) || (link.id === 'categories' && isCategoriesPage) || (link.id === 'about' && isAboutPage);
                return (
                  <ReactRouterDOM.Link
                    key={link.to}
                    to={link.to}
                    onClick={(e) => handleNavClick(e, link.to)}
                    className={`text-sm font-medium transition-all duration-300 ease-out relative pb-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:transition-all after:duration-300 ${
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
          <div className="flex items-center justify-end gap-x-3 sm:gap-x-4">
             <div className="hidden md:flex items-center gap-x-3 sm:gap-x-4">
              <SearchBar />
              <a 
                href="https://wa.me/918860440884?text=Hello%2C%20I%20would%20like%20to%20place%20an%20order."
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Place an order via WhatsApp"
                className={`flex items-center space-x-2 transition-all duration-300 ease-out hover:scale-110 active:scale-95 group ${
                  isHeaderDark ? 'text-off-white' : 'text-primary-blue'
                }`}
              >
                <FaWhatsapp size={22} />
                <span className={`hidden lg:inline text-sm font-medium transition-colors duration-300 ${
                  isHeaderDark ? 'group-hover:text-gray-200' : 'group-hover:text-blue-800'
                }`}>Make an Order</span>
              </a>
            </div>

            <ReactRouterDOM.Link 
              to="/cart" 
              className={`relative transition-all duration-300 ease-out hover:scale-110 active:scale-95 group flex items-center p-2 ${
                isHeaderDark ? 'text-off-white' : 'text-primary-blue'
              }`}
            >
              <FiShoppingCart size={24} className="group-hover:drop-shadow-sm transition-all duration-300" />
              {cartCount > 0 && (
                <span className={`absolute -top-2 -right-2 text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold text-center leading-none ${
                  isHeaderDark ? 'bg-red-500 text-white shadow-lg' : 'bg-red-500 text-white shadow-md'
                }`}>
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </ReactRouterDOM.Link>

            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className={`transition-all duration-300 ease-out hover:scale-110 active:scale-95 p-2 ${
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
          <nav className="flex flex-col items-start space-y-3 pt-2">
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
