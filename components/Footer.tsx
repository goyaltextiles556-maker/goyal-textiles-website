
import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../data/products';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-primary-blue to-blue-950 text-off-white mt-12 transition-all duration-300 hover:shadow-2xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {/* About Us Section */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0ms' }}>
            <h3 className="text-lg font-bold font-display tracking-wider mb-4 uppercase text-white group hover:text-blue-100 transition-colors duration-300">
              About Us
            </h3>
            <p className="font-bold text-white hover:text-blue-100 transition-colors duration-300">GOYAL TEXTILES</p>
            <p className="text-sm text-gray-200 mt-3 hover:text-gray-100 transition-colors duration-300">556, Katra Neel, Chandni Chowk</p>
            <p className="text-sm text-gray-200 hover:text-gray-100 transition-colors duration-300">Delhi-110006, India</p>
            <p className="mt-3 text-sm text-gray-200 hover:text-gray-100 transition-colors duration-300"><span className="font-semibold">Mobile:</span> +91 98107 77391</p>
          </div>

          {/* Categories Section */}
          <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <h3 className="text-lg font-bold font-display tracking-wider mb-4 uppercase text-white group hover:text-blue-100 transition-colors duration-300">
              Categories
            </h3>
            <ul className="space-y-2.5">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link 
                    to={`/category/${category.id}`} 
                    className="text-sm text-gray-200 hover:text-white hover:underline hover:translate-x-1 transition-all duration-250 ease-out inline-block font-medium"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information Section */}
          <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <h3 className="text-lg font-bold font-display tracking-wider mb-4 uppercase text-white group hover:text-blue-100 transition-colors duration-300">
              Information
            </h3>
            <ul className="space-y-2.5">
              {[
                { to: '/privacy-policy', label: 'Privacy Policy' },
                { to: '/terms-of-service', label: 'Terms of Service' },
                { to: '/returns-policy', label: 'Returns, Refunds & Exchange' },
                { to: '/shipping-policy', label: 'Shipping & Cancellation' },
                { to: '/faq', label: 'FAQ' },
              ].map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-sm text-gray-200 hover:text-white hover:underline hover:translate-x-1 transition-all duration-250 ease-out inline-block font-medium">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-blue-400/30 mt-8 pt-4 text-center text-xs text-blue-200/80 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <p className="hover:text-blue-200 transition-colors duration-300 font-medium">© 2024 Goyal Textiles. A family-owned business committed to quality.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
