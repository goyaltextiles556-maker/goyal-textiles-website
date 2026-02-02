
import React from 'react';
// FIX: Use namespace import for react-router-dom to fix "no exported member" errors.
import * as ReactRouterDOM from 'react-router-dom';

const PolicySummary: React.FC = () => {
  return (
    <div className="mt-6 text-gray-600 border border-gray-200/50 rounded-lg p-4 sm:p-6 bg-gray-50 hover:shadow-md transition-shadow duration-300">
      <div className="mb-6 pb-6 border-b border-gray-200/50">
        <h3 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base hover:text-primary-blue transition-colors duration-300">Returns, Refunds & Exchanges</h3>
        <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm">
          <li className="text-gray-700 hover:text-gray-900 transition-colors duration-300">Returns or exchanges accepted only for defective, damaged, or incorrect items.</li>
          <li className="text-gray-700 hover:text-gray-900 transition-colors duration-300">Clear, uncut opening video required for verification.</li>
          <li className="text-gray-700 hover:text-gray-900 transition-colors duration-300">Issues must be reported within 48 hours of delivery.</li>
          <li className="text-gray-700 hover:text-gray-900 transition-colors duration-300">Fabric must be unused, unwashed, uncut, and unaltered.</li>
          <li className="text-gray-700 hover:text-gray-900 transition-colors duration-300">Change of mind is not eligible.</li>
          <li className="text-gray-700 hover:text-gray-900 transition-colors duration-300">Refunds processed within 5–7 working days after inspection.</li>
          <li className="hover:translate-x-1 transition-transform duration-300">Read our <ReactRouterDOM.Link to="/returns-policy" className="font-medium text-primary-blue hover:text-blue-800 hover:underline transition-all duration-250 ease-out">Returns, Refunds & Exchange Policy</ReactRouterDOM.Link>.</li>
        </ul>
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base hover:text-primary-blue transition-colors duration-300">Shipping & Cancellation</h3>
        <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm">
          <li className="text-gray-700 hover:text-gray-900 transition-colors duration-300">Orders dispatched within estimated timelines after payment.</li>
          <li className="text-gray-700 hover:text-gray-900 transition-colors duration-300">Delivery times depend on courier partners and external factors.</li>
          <li className="text-gray-700 hover:text-gray-900 transition-colors duration-300">Shipping charges are non-refundable.</li>
          <li className="text-gray-700 hover:text-gray-900 transition-colors duration-300">Orders cannot be cancelled once dispatched.</li>
          <li className="text-gray-700 hover:text-gray-900 transition-colors duration-300">Provide accurate delivery details to avoid delays.</li>
          <li className="hover:translate-x-1 transition-transform duration-300">Read our <ReactRouterDOM.Link to="/shipping-policy" className="font-medium text-primary-blue hover:text-blue-800 hover:underline transition-all duration-250 ease-out">Shipping & Cancellation Policy</ReactRouterDOM.Link>.</li>
        </ul>
      </div>
    </div>
  );
};

export default PolicySummary;
