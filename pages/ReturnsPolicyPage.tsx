import React from 'react';

const ReturnsPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-display font-bold text-primary-blue text-center mb-8">
        Returns, Refunds & Exchange Policy
      </h1>

      <div className="space-y-6 text-gray-700 leading-relaxed">
        <p className="font-medium text-gray-500">
          Last Updated: 29 January 2026
        </p>

        <p>
          At <strong>Goyal Textiles</strong>, all fabric orders are checked and
          packed before dispatch. Due to the nature of fabric products, returns,
          refunds, or exchanges are allowed <strong>only in limited and verified
          cases</strong>, as set out below.
        </p>

        <h2 className="text-2xl font-display font-bold text-primary-blue pt-2">
          1. Eligibility
        </h2>

        <p>Returns, refunds, or exchanges are considered <strong>only</strong> if:</p>

        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>
            The fabric received is defective or damaged at the time of delivery, or
          </li>
          <li>
            The fabric delivered is materially different from the order placed
          </li>
        </ul>

        <p>
          No other reasons, including change of mind or subjective dissatisfaction,
          are eligible.
        </p>

        <h2 className="text-2xl font-display font-bold text-primary-blue pt-2">
          2. Mandatory Verification (Very Important)
        </h2>

        <p>To qualify for any return, refund, or exchange:</p>

        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>
            A clear, continuous, uncut opening <strong>video</strong> of the sealed
            package is required
          </li>
          <li>
            The issue must be reportedwithin  <strong>48 hours </strong>of delivery
          </li>
          <li>
            The fabric must be unused, unwashed, uncut, and unaltered
          </li>
        </ul>

        <p>
          The opening video is the primary evidencefor verification.
           In the absence of such a video, claims are very likely to be rejected,
          as independent verification may not be possible.
        </p>

        <h2 className="text-2xl font-display font-bold text-primary-blue pt-2">
          3. What Is and Is Not Covered
        </h2>

        <p><strong>Covered:</strong></p>

        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>Fabric that is torn, damaged, or unusable at delivery</li>
          <li>Fabric that is clearly defective upon receipt</li>
        </ul>

        <p className="pt-2"><strong>Not Covered:</strong></p>

        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>Minor color or shade variation due to screen or lighting</li>
          <li>Shrinkage or color bleeding after washing or use</li>
          <li>Fabric that has been cut, stitched, altered, washed, or processed</li>
          <li>
            Subjective dissatisfaction where the product matches the website description
          </li>
        </ul>

        <h2 className="text-2xl font-display font-bold text-primary-blue pt-2">
          4. Refunds and Exchanges
        </h2>

        <p>
          Approved refunds are issued to the original payment method
          <strong> within 5–7 working days</strong> after inspection and approval.
          Shipping charges are non-refundable unless required by law.
        </p>

        <p>
          Exchanges are allowed only for verified defects or incorrect delivery and
          are subject to availability. If unavailable, a refund may be issued instead.
        </p>

        <h2 className="text-2xl font-display font-bold text-primary-blue pt-2">
          5. Return Shipping
        </h2>

        <p>
          We do not offer reverse pickup. Return shipping must be arranged and paid
          for by the customer.
        </p>

        <p>
          Risk during return transit remains with the customer unless the return is
          due to a verified defect or error attributable to us. A trackable courier
          is strongly recommended.
        </p>

        <h2 className="text-2xl font-display font-bold text-primary-blue pt-2">
          6. Review and Governing Law
        </h2>

        <p>
          All claims are subject to verification. We reserve the right to reject
          claims that do not meet this Policy, subject to applicable law.
        </p>

        <p>
          This Policy is governed by the laws of India, subject to applicable
          consumer protection laws.
        </p>

        <h2 className="text-2xl font-display font-bold text-primary-blue pt-2">
          7. Contact
        </h2>

        <p>
          All requests must be initiated by email at: 
        </p>

        <p className="font-medium">
          goyaltextiles556@gmail.com
        </p>
      </div>
    </div>
  );
};

export default ReturnsPolicyPage;

