
import React from 'react';
// FIX: Use namespace import for react-router-dom to fix "no exported member" errors.
import * as ReactRouterDOM from 'react-router-dom';

const PolicySummary: React.FC = () => {
  return (
    <div className="mt-6 text-gray-600 border border-gray-200 rounded-lg p-4 sm:p-6 bg-gray-50">
      <div className="mb-6 pb-6 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Returns, Refunds & Exchanges</h3>
        <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm">
          <li className="text-gray-700">Returns or exchanges accepted only for defective, damaged, or incorrect items.</li>
          <li className="text-gray-700">Clear, uncut opening video required for verification.</li>
          <li className="text-gray-700">Issues must be reported within 48 hours of delivery.</li>
          <li className="text-gray-700">Fabric must be unused, unwashed, uncut, and unaltered.</li>
          <li className="text-gray-700">Change of mind is not eligible.</li>
          <li className="text-gray-700">Refunds processed within 5–7 working days after inspection.</li>
          <li>Read our <ReactRouterDOM.Link to="/returns-policy" className="font-medium text-primary-blue hover:underline transition-colors duration-250 ease-out">Returns, Refunds & Exchange Policy</ReactRouterDOM.Link>.</li>
        </ul>
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Shipping & Cancellation</h3>
        <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm">
          <li className="text-gray-700">Orders dispatched within estimated timelines after payment.</li>
          <li className="text-gray-700">Delivery times depend on courier partners and external factors.</li>
          <li className="text-gray-700">Shipping charges are non-refundable.</li>
          <li className="text-gray-700">Orders cannot be cancelled once dispatched.</li>
          <li className="text-gray-700">Provide accurate delivery details to avoid delays.</li>
          <li>Read our <ReactRouterDOM.Link to="/shipping-policy" className="font-medium text-primary-blue hover:underline transition-colors duration-250 ease-out">Shipping & Cancellation Policy</ReactRouterDOM.Link>.</li>
        </ul>
      </div>
    </div>
  );
};

export default PolicySummary;
