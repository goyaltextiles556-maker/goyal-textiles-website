import React from 'react';

const ReturnsPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-display font-bold text-primary-blue text-center mb-12">
        Returns, Refunds & Exchange Policy
      </h1>

      <div className="space-y-6 text-gray-700 leading-relaxed">
        <p className="font-medium text-gray-500">Last Updated: 29 January 2026</p>

        <p>
          At <strong>Goyal Textiles</strong>, every fabric is carefully checked before
          dispatch to ensure quality and accuracy. Due to the nature of fabric products,
          refunds, returns, or exchanges are permitted only in limited and verified cases
          as outlined below.
        </p>

        <h2 className="text-2xl font-display font-bold text-primary-blue pt-4">
          1. Eligibility for Returns, Refunds & Exchanges
        </h2>
        <p>
          Requests are strictly accepted only in the following cases:
        </p>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>Defective or damaged fabric received</li>
          <li>Incorrect fabric delivered (different from the order placed)</li>
        </ul>

        <p>
          Requests outside the above conditions will not be accepted.
        </p>

        <h2 className="text-2xl font-display font-bold text-primary-blue pt-4">
          2. Mandatory Conditions
        </h2>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>A clear, uncut opening video of the package is mandatory for verification</li>
          <li>The issue must be reported within <strong>48 hours</strong> of delivery</li>
          <li>The fabric must be unused, unwashed, uncut, and unaltered</li>
          <li>The fabric must be returned in original condition</li>
        </ul>

        <p>
          Requests raised after 48 hours of delivery will be automatically rejected,
          without exception.
        </p>

        <h2 className="text-2xl font-display font-bold text-primary-blue pt-4">
          3. Covered Under Defect or Damage
        </h2>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>Fabric that is torn and unusable at the time of delivery</li>
          <li>Fabric that is damaged or loosely woven in parts upon receipt</li>
        </ul>

        <h2 className="text-2xl font-display font-bold text-primary-blue pt-4">
          4. Not Covered Under Returns or Refunds
        </h2>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>Minor color variation due to screen or lighting differences</li>
          <li>Color bleeding or shrinkage after washing</li>
          <li>Fabric that has been cut, stitched, altered, or processed</li>
          <li>Subjective dissatisfaction related to feel, thickness, or texture</li>
        </ul>

        <h2 className="text-2xl font-display font-bold text-primary-blue pt-4">
          5. Refunds
        </h2>
        <p>
          Once the returned fabric is received and inspected, and the claim is approved,
          a refund will be issued to the original payment method within
          <strong> 5–7 working days</strong>.
        </p>
        <p>
          Shipping charges, if any, are non-refundable unless required by applicable law.
        </p>

        <h2 className="text-2xl font-display font-bold text-primary-blue pt-4">
          6. Exchanges
        </h2>
        <p>
          Exchanges are permitted only for defective, damaged, or incorrectly delivered
          fabric, subject to verification. Exchange requests are subject to product
          availability.
        </p>

        <h2 className="text-2xl font-display font-bold text-primary-blue pt-4">
          7. Return Shipping
        </h2>
        <p>
          We do not offer reverse pickup services. Customers are required to securely
          package and courier the product back to us at their own cost.
        </p>
        <p>
          Risk during return transit remains with the customer until the product is
          received by us. We recommend using a trackable courier service.
        </p>

        <h2 className="text-2xl font-display font-bold text-primary-blue pt-4">
          8. Right to Reject Claims
        </h2>
        <p>
          Goyal Textiles reserves the right to reject any claim that does not meet the
          conditions outlined in this policy. Decisions taken after verification shall
          be final and binding.
        </p>

        <h2 className="text-2xl font-display font-bold text-primary-blue pt-4">
          9. Contact for Returns & Refunds
        </h2>
        <p>
          All requests must be initiated by contacting:
        </p>
        <p className="pl-4">
          <strong>Email:</strong> me@veeren.in
        </p>

        <h2 className="text-2xl font-display font-bold text-primary-blue pt-4">
          10. Governing Law
        </h2>
        <p>
          This policy is governed by the laws of India. Courts located in New Delhi shall
          have exclusive jurisdiction.
        </p>
      </div>
    </div>
  );
};

export default ReturnsPolicyPage;
