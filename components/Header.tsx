
import React, { useState, useEffect } from 'react';
// FIX: Use namespace import for react-router-dom to fix "no exported member" errors.
import * as ReactRouterDOM from 'react-router-dom';
import { FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useCart } from '../hooks/useCart';
import { useScrollSpy } from '../context/ScrollSpyContext';

const ANIMATION_END_SCROLL = 400;

const Header: React.FC = () => {
  const { cartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoOpacity, setLogoOpacity] = useState(0);
  const [headerOpacity, setHeaderOpacity] = useState(1);
  const [hasScrollStarted, setHasScrollStarted] = useState(false);
  const { activeSection } = useScrollSpy();
  const location = ReactRouterDOM.useLocation();
  const navigate = ReactRouterDOM.useNavigate();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50 || !isHomePage);
      
      // Track if scrolling has started on homepage
      if (isHomePage && scrollY > 0 && !hasScrollStarted) {
        setHasScrollStarted(true);
      } else if (isHomePage && scrollY === 0) {
        setHasScrollStarted(false);
      }
      
      // Increase transparency as you scroll (more transparent the more you scroll)
      if (isHomePage) {
        const opacity = Math.max(0.7, 1 - scrollY / 800);
        setHeaderOpacity(opacity);
      } else {
        setHeaderOpacity(1);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage, hasScrollStarted]);

  useEffect(() => {
    if (!isHomePage) {
      setLogoOpacity(1);
      return;
    }
    const handleLogoFade = () => {
      const scrollY = window.scrollY;
      const progress = Math.min(1, scrollY / ANIMATION_END_SCROLL);
      setLogoOpacity(progress);
    };
    handleLogoFade();
    window.addEventListener('scroll', handleLogoFade, { passive: true });
    return () => window.removeEventListener('scroll', handleLogoFade);
  }, [isHomePage]);

  const handleNavClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (path === '/' || path.startsWith('/#')) {
      if (!isHomePage) {
        navigate(path);
      } else {
        const hash = path.split('#')[1];
        if (hash) {
          // Add a small delay to ensure element is rendered
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

  const showSolidHeader = isScrolled || !isHomePage;
  const isCategoriesPage = location.pathname.startsWith('/category');
  const isAboutPage = location.pathname === '/about';

  const linkColorClasses = showSolidHeader ? 'text-primary-blue hover:text-blue-800' : 'text-off-white hover:text-white';

  return (
    <header 
      className={`fixed w-full top-0 z-40 transition-all duration-300 ease-out ${hasScrollStarted ? 'backdrop-blur-xl animate-foggy-shimmer' : 'backdrop-blur-none'}`}
      style={{
        backgroundColor: showSolidHeader 
          ? `rgba(248, 250, 252, ${headerOpacity})` 
          : `rgba(255, 255, 255, ${isHomePage && hasScrollStarted ? headerOpacity * 0.15 : 0})`,
        borderBottom: `1px solid rgba(203, 213, 225, ${hasScrollStarted ? headerOpacity * 0.3 : 0})`
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-1">
            <ReactRouterDOM.Link 
              to="/" 
              onClick={(e) => handleNavClick(e, '/')}
              className="text-lg sm:text-xl font-bold uppercase font-display tracking-wider text-primary-blue transition-all duration-300 ease-out whitespace-nowrap hover:scale-105 active:scale-95"
              style={{ opacity: isHomePage ? logoOpacity : 1, textShadow: (isHomePage && logoOpacity > 0.9) || !isHomePage ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none' }}
              aria-hidden={isHomePage && logoOpacity < 1}
            >
              GOYAL TEXTILES
            </ReactRouterDOM.Link>
          </div>
          
          <nav className="hidden md:block">
            <div className={`transition-all duration-300 ease-out rounded-full ${showSolidHeader ? 'bg-black/5 shadow-sm' : 'bg-primary-blue/20 backdrop-blur-md'}`}>
              <div className="flex items-center space-x-1 p-1">
                {navLinks.map((link) => {
                  const isLinkActive = (isHomePage && activeSection === link.id) || (link.id === 'categories' && isCategoriesPage) || (link.id === 'about' && isAboutPage);
                  return (
                    <ReactRouterDOM.Link
                      key={link.to}
                      to={link.to}
                      onClick={(e) => handleNavClick(e, link.to)}
                      className={`px-6 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ease-out block hover:scale-105 active:scale-95 ${
                        isLinkActive ? 'bg-off-white text-primary-blue shadow-md' : showSolidHeader ? 'text-primary-blue hover:bg-black/10' : 'text-off-white hover:bg-off-white/20'
                      }`}
                    >
                      {link.text}
                    </ReactRouterDOM.Link>
                  )
                })}
              </div>
            </div>
          </nav>

          <div className="flex-1 flex items-center justify-end space-x-4 sm:space-x-6">
            <a 
              href="https://wa.me/918860440884?text=Hello%2C%20I%20would%20like%20to%20place%20an%20order."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Place an order via WhatsApp"
              className={`flex items-center space-x-2 transition-all duration-300 ease-out hover:scale-110 active:scale-95 ${linkColorClasses}`}
            >
                <FaWhatsapp size={24} />
                <span className="hidden sm:inline text-sm font-medium">Make an Order</span>
            </a>
            <ReactRouterDOM.Link to="/cart" className={`relative transition-all duration-300 ease-out hover:scale-110 active:scale-95 ${linkColorClasses}`}>
              <FiShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-blue text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-floating font-semibold">
                  {cartCount}
                </span>
              )}
            </ReactRouterDOM.Link>
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`transition-all duration-300 ease-out hover:scale-110 active:scale-95 ${linkColorClasses}`}>
                {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className={`md:hidden bg-off-white/95 backdrop-blur-sm shadow-md overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-20' : 'max-h-0'}`}>
        <nav className="flex justify-center items-center py-4">
            <div className="flex items-center space-x-1 p-1 bg-black/5 rounded-full">
              {navLinks.map((link) => {
                const isLinkActive = (isHomePage && activeSection === link.id) || (link.id === 'categories' && isCategoriesPage) || (link.id === 'about' && isAboutPage);
                return (
                  <ReactRouterDOM.Link
                    key={link.to}
                    to={link.to}
                    onClick={(e) => handleNavClick(e, link.to)}
                    className={`px-6 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ease-out block ${
                      isLinkActive ? 'bg-off-white text-primary-blue shadow-sm' : 'text-primary-blue hover:bg-black/10'
                    }`}
                  >
                    {link.text}
                  </ReactRouterDOM.Link>
                );
              })}
            </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
