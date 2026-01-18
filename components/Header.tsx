import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50 || !isHomePage);
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
      const progress = Math.min(1, window.scrollY / ANIMATION_END_SCROLL);
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
          document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
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
  ];

  const showSolidHeader = isScrolled || !isHomePage;
  const isCategoriesPage = location.pathname.startsWith('/category');

  return (
    <header
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        showSolidHeader
          ? 'bg-off-white/95 backdrop-blur-sm shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-1">
            <Link
              to="/"
              onClick={(e) => handleNavClick(e, '/')}
              className="text-lg sm:text-xl font-bold uppercase font-display tracking-wider text-primary-blue whitespace-nowrap"
              style={{
                opacity: isHomePage ? logoOpacity : 1,
                textShadow:
                  (isHomePage && logoOpacity > 0.9) || !isHomePage
                    ? '0 1px 3px rgba(0,0,0,0.1)'
                    : 'none',
              }}
            >
              GOYAL TEXTILES
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:block">
            <div
              className={`rounded-full transition-colors duration-300 ${
                showSolidHeader
                  ? 'bg-black/5'
                  : 'bg-primary-blue/20 backdrop-blur-md'
              }`}
            >
              <div className="flex items-center space-x-1 p-1">
                {navLinks.map((link) => {
                  const isActive =
                    (isHomePage && activeSection === link.id) ||
                    (link.id === 'categories' && isCategoriesPage);

                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={(e) => handleNavClick(e, link.to)}
                      className={`px-6 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                        isActive
                          ? 'bg-off-white text-primary-blue shadow-sm'
                          : showSolidHeader
                          ? 'text-primary-blue hover:bg-black/10'
                          : 'text-off-white hover:bg-off-white/20'
                      }`}
                    >
                      {link.text}
                    </Link>
                  );
                })}
              </div>
            </div>
          </nav>

          {/* Right Actions */}
          <div className="flex-1 flex items-center justify-end space-x-2">
            {/* Cart */}
            <Link
              to="/cart"
              className={`relative flex items-center justify-center w-10 h-10 ${
                showSolidHeader
                  ? 'text-primary-blue'
                  : 'text-off-white'
              }`}
            >
              <FiShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-blue text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden flex items-center justify-center w-10 h-10 ${
                showSolidHeader
                  ? 'text-primary-blue'
                  : 'text-off-white'
              }`}
            >
              {isMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav – anchored, not hanging */}
      <div
        className={`md:hidden absolute left-0 right-0 top-20 flex justify-center transition-all duration-300 ${
          isMenuOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="bg-off-white/95 backdrop-blur-sm shadow-md rounded-full px-2 py-1">
          <div className="flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive =
                (isHomePage && activeSection === link.id) ||
                (link.id === 'categories' && isCategoriesPage);

              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={(e) => handleNavClick(e, link.to)}
                  className={`px-6 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-off-white text-primary-blue shadow-sm'
                      : 'text-primary-blue hover:bg-black/10'
                  }`}
                >
                  {link.text}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
