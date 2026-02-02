
import React from 'react';
// FIX: Use namespace import for react-router-dom to fix "no exported member" errors.
import * as ReactRouterDOM from 'react-router-dom';
import { categories } from '../data/products';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-blue text-off-white mt-12 transition-all duration-300 hover:shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {/* About Us Section */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0ms' }}>
            <h3 className="text-lg font-bold font-body tracking-wider mb-4 uppercase text-white group hover:text-blue-100 transition-colors duration-300">
              About Us
            </h3>
            <p className="font-bold text-white hover:text-blue-100 transition-colors duration-300">GOYAL TEXTILES</p>
            <p className="text-sm text-gray-200 mt-2 hover:text-gray-100 transition-colors duration-300">556, Katra Neel, Chandni Chowk</p>
            <p className="text-sm text-gray-200 hover:text-gray-100 transition-colors duration-300">Delhi-110006, India</p>
            <p className="mt-2 text-sm text-gray-200 hover:text-gray-100 transition-colors duration-300">Mobile: +91 98107 77391 </p>
          </div>

          {/* Categories Section */}
          <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <h3 className="text-lg font-bold font-body tracking-wider mb-4 uppercase text-white group hover:text-blue-100 transition-colors duration-300">
              Categories
            </h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.id}>
                  <ReactRouterDOM.Link 
                    to={`/category/${category.id}`} 
                    className="text-sm text-gray-200 hover:text-white hover:underline hover:translate-x-1 transition-all duration-250 ease-out inline-block"
                  >
                    {category.name}
                  </ReactRouterDOM.Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information Section */}
          <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <h3 className="text-lg font-bold font-body tracking-wider mb-4 uppercase text-white group hover:text-blue-100 transition-colors duration-300">
              Information
            </h3>
            <ul className="space-y-2">
              <li>
                <ReactRouterDOM.Link to="/privacy-policy" className="text-sm text-gray-200 hover:text-white hover:underline hover:translate-x-1 transition-all duration-250 ease-out inline-block">
                  Privacy Policy
                </ReactRouterDOM.Link>
              </li>
              <li>
                <ReactRouterDOM.Link to="/terms-of-service" className="text-sm text-gray-200 hover:text-white hover:underline hover:translate-x-1 transition-all duration-250 ease-out inline-block">
                  Terms of Service
                </ReactRouterDOM.Link>
              </li>
              <li>
                <ReactRouterDOM.Link to="/returns-policy" className="text-sm text-gray-200 hover:text-white hover:underline hover:translate-x-1 transition-all duration-250 ease-out inline-block">
                  Returns, Refunds & Exchange Policy
                </ReactRouterDOM.Link>
              </li>
              <li>
                <ReactRouterDOM.Link to="/shipping-policy" className="text-sm text-gray-200 hover:text-white hover:underline hover:translate-x-1 transition-all duration-250 ease-out inline-block">
                  Shipping & Cancellation Policy
                </ReactRouterDOM.Link>
              </li>
              <li>
                <ReactRouterDOM.Link to="/faq" className="text-sm text-gray-200 hover:text-white hover:underline hover:translate-x-1 transition-all duration-250 ease-out inline-block">
                  FAQ
                </ReactRouterDOM.Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-blue-400/30 mt-8 pt-4 text-center text-xs text-blue-200/70 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <p className="hover:text-blue-200 transition-colors duration-300">Goyal Textiles, A family owned business</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
