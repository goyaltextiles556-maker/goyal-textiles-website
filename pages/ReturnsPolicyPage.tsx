import React from 'react';

const ReturnsPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-display font-bold text-primary-blue text-center mb-12">
        Returns, Refunds & Exchange Policy
      </h1>

      <div className="space-y-6 text-gray-700 leading-relaxed">
        <p className="font-medium text-gray-500">
          Last Updated: 29 January 2026
        </p>

        <p>
          At Goyal Textiles, all fabric orders are carefully checked, measured,
          and packed before dispatch. Due to the nature of fabric products,
          returns, refunds, or exchanges are permitted only in limited and
          verified cases, as outlined below.
        </p>

        <h2 className="text-2xl font-display font-bold text-primary-blue pt-4">
          1. Eligibility for Returns, Refunds & Exchanges
        </h2>
        <p>
          Returns, refunds, or exchanges are considered only in the following
          cases:
        </p>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>Defective or damaged fabric received at the time of delivery</li>
          <li>Incorrect fabric delivered, materially different from the order placed</li>
        </ul>
        <p>
          No other reasons, including change of mind or subjective dissatisfaction,
          are eligible.
        </p>

        <h2 className="text-2xl font-display font-bold text-primary-blue pt-4">
          2. Mandatory Verification Requirements
        </h2>
        <p>
          To be eligible for any return, refund, or exchange, all of the
          following conditions must be satisfied:
        </p>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>
            A clear, continuous, uncut opening video of the sealed package,
            showing the package from all sides, the opening process, and the
            fabric clearly visible after opening
          </li>
          <li>The issue must be reported within 48 hours of delivery</li>
          <li>
            The fabric must be unused, unwashed, uncut, unaltered, and in its
            original condition
          </li>
        </ul>
        <p>
          The opening video is the primary and most reliable form of evidence for
          verification. In the absence of a clear opening video, claims are very
          likely to be rejected, as independent verification may not be possible.
        </p>

        <h2 className="text-2xl font-display font-bold text-primary-blue pt-4">
          3. Reporting Timeline
        </h2>
        <p>
          All issues must be reported within 48 hours of delivery. Requests
          raised after this period may be rejected, except where required under
          applicable law.
        </p>

        <h2 className="text-2xl font-display font-bold text-primary-blue pt-4">
          4. What Is Covered Under Defect or Damage
        </h2>
        <p>
          Defects or damage eligible for consideration include, but are not
          limited to:
        </p>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>Fabric that is torn, ripped, or unusable at the time of delivery</li>
          <li>Fabric that is visibly damaged or defective upon receipt</li>
        </ul>

        <h2 className="text-2xl font-display font-bold text-primary-blue pt-4">
          5. What Is Not Covered
        </h2>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>Minor color variation due to screen resolution or lighting</li>
          <li>Color bleeding or shrinkage after washing or use</li>
          <li>Fabric that has been cut, stitched, altered, washed, or processed</li>
          <li>
            Subjective dissatisfaction related to feel, thickness, or texture,
            where the product matches the website description
          </li>
        </ul>

        <h2 className="text-2xl font-display font-bold text-primary-blue pt-4">
          6. Refunds
        </h2>
        <p>
          Once the returned fabric is received, inspected, and the claim is
          approved, a refund will be issued to the original payment method within
          5–7 working days from approval after inspection.
        </p>
        <p>
          Shipping charges, if any, are non-refundable unless required under
          applicable law.
        </p>

        <h2 className="text-2xl font-display font-bold text-primary-blue pt-4">
          7. Exchanges
        </h2>
        <p>
          Exchanges are permitted only for verified cases of defect, damage, or
          incorrect delivery and are subject to product availability.
        </p>
        <p>
          If a replacement product is unavailable, a refund may be issued
          instead. Any price difference between the original and replacement
          product may be payable or refundable, as applicable.
        </p>

        <h2 className="text-2xl font-display font-bold text-primary-blue pt-4">
          8. Return Shipping
        </h2>
        <p>
          We do not offer reverse pickup services. Customers are required to
          securely package and courier the product back to us at their own cost.
        </p>
        <p>
          Risk during return transit remains with the customer unless the return
          is due to a verified defect, damage, or error attributable to us. We
          strongly recommend using a reliable, trackable courier service.
        </p>

        <h2 className="text-2xl font-display font-bold text-primary-blue pt-4">
          9. Right to Review and Reject Claims
        </h2>
        <p>
          All return, refund, and exchange requests are subject to verification.
          We reserve the right to reject any claim that does not meet the
          conditions outlined in this Policy or where verification is not
          reasonably possible, subject to applicable law.
        </p>

        <h2 className="text-2xl font-display font-bold text-primary-blue pt-4">
          10. How to Initiate a Return or Refund
        </h2>
        <p>
          All requests must be initiated by contacting us at:
        </p>
        <p className="pl-4">
          Email: me@veeren.in
        </p>

        <h2 className="text-2xl font-display font-bold text-primary-blue pt-4">
          11. Governing Law
        </h2>
        <p>
          This Policy shall be governed by and construed in accordance with the
          laws of India, subject to applicable consumer protection laws.
        </p>
      </div>
    </div>
  );
};

export default ReturnsPolicyPage;
