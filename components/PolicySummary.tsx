
import React from 'react';
// FIX: Use namespace import for react-router-dom to fix "no exported member" errors.
import * as ReactRouterDOM from 'react-router-dom';

const PolicySummary: React.FC = () => {
  return (
    <div className="mt-8 text-sm text-gray-600 border border-gray-200/80 rounded-lg p-4 bg-white">
      <div className="mb-4">
        <h3 className="font-semibold text-gray-800 mb-2">Returns, Refunds & Exchanges</h3>
        <ul className="list-disc list-inside space-y-1 text-xs">
          <li>Returns or exchanges are accepted only for defective, damaged, or incorrect items.</li>
          <li>A clear, uncut opening video of the package is mandatory for verification.</li>
          <li>Issues must be reported within 48 hours of delivery.</li>
          <li>Fabric must be unused, unwashed, uncut, and unaltered.</li>
          <li>Change of mind or subjective dissatisfaction is not eligible.</li>
          <li>Refunds (if approved) are processed to the original payment method within 5–7 working days after inspection.</li>
          <li>For full details, please read our <ReactRouterDOM.Link to="/returns-policy" className="font-medium text-primary-blue hover:underline">Returns, Refunds & Exchange Policy</ReactRouterDOM.Link>.</li>
        </ul>
      </div>
      <div>
        <h3 className="font-semibold text-gray-800 mb-2">Shipping & Cancellation</h3>
        <ul className="list-disc list-inside space-y-1 text-xs">
          <li>Orders are processed after successful payment and dispatched within estimated timelines.</li>
          <li>Delivery timelines are indicative and depend on courier partners and external factors.</li>
          <li>Shipping charges (if any) are non-refundable.</li>
          <li>Orders cannot be cancelled once dispatched.</li>
          <li>Failed or refused deliveries may incur additional shipping charges.</li>
          <li>Customers are responsible for providing accurate delivery details.</li>
          <li>For complete information, please read our <ReactRouterDOM.Link to="/shipping-policy" className="font-medium text-primary-blue hover:underline">Shipping & Cancellation Policy</ReactRouterDOM.Link>.</li>
        </ul>
      </div>
    </div>
  );
};

export default PolicySummary;
