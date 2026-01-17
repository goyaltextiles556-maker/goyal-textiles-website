
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';
import { useCart } from '../hooks/useCart';
import { useScrollSpy } from '../context/ScrollSpyContext';

const ANIMATION_END_SCROLL = 400;

const Header: React.FC = () => {
  const { cartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoOpacity, setLogoOpacity] = useState(0);
  const { activeSection } = useScrollSpy();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (isHomePage) {
        setIsScrolled(window.scrollY > 50);
      } else {
        setIsScrolled(true);
      }
    };
    
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

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
    
    handleLogoFade(); // Set initial state
    window.addEventListener('scroll', handleLogoFade, { passive: true });
    return () => window.removeEventListener('scroll', handleLogoFade);
  }, [isHomePage]);

  const navLinks = [
    { to: '/', text: 'Home', id: 'home' },
    { to: '/categories', text: 'Categories', id: 'categories' },
  ];

  const showSolidHeader = isScrolled || !isHomePage;

  return (
    <header className={`fixed w-full top-0 z-40 transition-all duration-300 ${showSolidHeader ? 'bg-off-white/95 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-1">
            {/* This logo is always rendered but fades in on the homepage */}
            <Link 
              to="/" 
              className="text-xl font-bold uppercase font-display tracking-wider text-primary-blue transition-opacity duration-100"
              style={{ 
                opacity: logoOpacity, 
                textShadow: logoOpacity > 0.9 ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none'
              }}
              // Hide from accessibility tree during transition to avoid duplicate content
              aria-hidden={isHomePage && logoOpacity < 1}
            >
              GOYAL TEXTILES
            </Link>
          </div>
          
          <nav className="hidden md:block">
            <div className={`transition-colors duration-300 rounded-full ${showSolidHeader ? 'bg-black/5' : 'bg-primary-blue/20 backdrop-blur-md'}`}>
              <div className="flex items-center space-x-1 p-1">
                {navLinks.map((link) => {
                  const isLinkActive = (isHomePage && activeSection === link.id) || (!isHomePage && link.to === '/categories' && location.pathname.startsWith('/category')) || (!isHomePage && location.pathname === link.to);

                  return (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      className={
                        `px-6 py-1.5 rounded-full text-sm font-medium transition-all duration-300 block ${
                          isLinkActive
                            ? 'bg-off-white text-primary-blue shadow-sm'
                            : showSolidHeader
                            ? 'text-primary-blue hover:bg-black/10'
                            : 'text-off-white hover:bg-off-white/20'
                        }`
                      }
                    >
                      {link.text}
                    </NavLink>
                  )
                })}
              </div>
            </div>
          </nav>

          <div className="flex-1 flex items-center justify-end space-x-4">
            <Link to="/cart" className={`relative transition-colors duration-300 ${showSolidHeader ? 'text-primary-blue hover:text-blue-800' : 'text-off-white hover:text-white'}`}>
              <FiShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-blue text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`transition-colors duration-300 ${showSolidHeader ? 'text-primary-blue' : 'text-off-white'}`}>
                {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden bg-primary-blue/95 backdrop-blur-lg">
          <nav className="flex flex-col items-center space-y-2 py-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `px-6 py-3 rounded-full text-lg transition-colors duration-300 w-full text-center ${isActive ? 'bg-off-white text-primary-blue' : 'text-off-white'}`
                }
              >
                {link.text}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
