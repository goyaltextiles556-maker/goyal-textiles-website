
import React from 'react';
// FIX: Use namespace import for react-router-dom to fix "no exported member" errors.
import * as ReactRouterDOM from 'react-router-dom';
import { categories } from '../data/products';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-blue text-off-white mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {/* About Us Section */}
          <div>
            <h3 className="text-lg font-bold font-body tracking-wider mb-4 uppercase text-white">
              About Us
            </h3>
            <p className="font-bold text-white">GOYAL TEXTILES</p>
            <p className="text-sm text-gray-200 mt-2">123 Fabric Lane, Textile Market</p>
            <p className="text-sm text-gray-200">New Delhi, India</p>
            <p className="mt-2 text-sm text-gray-200">Mobile: +91 98765 43210</p>
          </div>

          {/* Categories Section */}
          <div>
            <h3 className="text-lg font-bold font-body tracking-wider mb-4 uppercase text-white">
              Categories
            </h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.id}>
                  <ReactRouterDOM.Link 
                    to={`/category/${category.id}`} 
                    className="text-sm text-gray-200 hover:text-white hover:underline transition-colors"
                  >
                    {category.name}
                  </ReactRouterDOM.Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information Section */}
          <div>
            <h3 className="text-lg font-bold font-body tracking-wider mb-4 uppercase text-white">
              Information
            </h3>
            <ul className="space-y-2">
              <li>
                <ReactRouterDOM.Link to="/privacy-policy" className="text-sm text-gray-200 hover:text-white hover:underline transition-colors">
                  Privacy Policy
                </ReactRouterDOM.Link>
              </li>
              <li>
                <ReactRouterDOM.Link to="/terms-of-service" className="text-sm text-gray-200 hover:text-white hover:underline transition-colors">
                  Terms of Service
                </ReactRouterDOM.Link>
              </li>
              <li>
                <ReactRouterDOM.Link to="/returns-policy" className="text-sm text-gray-200 hover:text-white hover:underline transition-colors">
                  Returns, Refunds & Exchange Policy
                </ReactRouterDOM.Link>
              </li>
              <li>
                <ReactRouterDOM.Link to="/shipping-policy" className="text-sm text-gray-200 hover:text-white hover:underline transition-colors">
                  Shipping & Cancellation Policy
                </ReactRouterDOM.Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-blue-400/30 mt-8 pt-4 text-center text-xs text-blue-200/70">
          <p>Goyal Textiles, A family owned business</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
