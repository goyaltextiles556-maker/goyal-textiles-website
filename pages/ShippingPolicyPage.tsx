import React from 'react';

const ShippingPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-display font-bold text-primary-blue text-center mb-12">
        Shipping & Cancellation Policy
      </h1>

      <div className="space-y-6 text-gray-700 leading-relaxed">
        <p className="font-medium text-gray-500">Last Updated: 29 January 2026</p>
        
        <h2 className="text-2xl font-display font-bold text-primary-blue pt-4">
          1. Shipping & Processing
        </h2>
        <p>
          Orders are processed after successful payment confirmation. Processing and
          dispatch timelines may vary based on product availability and order volume.
          Any timelines communicated are estimates only and not guaranteed.
        </p>
        <p>
          Orders are not dispatched on Sundays or public holidays. Delays may occur due
          to factors beyond our control, including courier delays, weather conditions,
          strikes, regulatory restrictions, or other force majeure events.
        </p>
        
        <h2 className="text-2xl font-display font-bold text-primary-blue pt-4">
          2. Shipping Rates & Delivery Estimates
        </h2>
        <p>
          Shipping charges, if applicable, are calculated and displayed at checkout.
          Shipping charges are non-refundable except where required by applicable law.
        </p>
        <p>
          Delivery timelines depend on the destination, courier partner, and external
          factors. We partner with third-party courier services, and delivery estimates
          provided by such partners are indicative only.
        </p>
        <p>
          Goyal Textiles shall not be liable for delays once the order has been handed
          over to the courier partner.
        </p>

        <h2 className="text-2xl font-display font-bold text-primary-blue pt-4">
          3. Delivery Responsibility
        </h2>
        <p>
          Risk of loss or damage passes to the customer once the order is handed over to
          the courier service. Courier delivery confirmation shall be treated as
          conclusive proof of delivery.
        </p>
        <p>
          Customers are responsible for providing accurate and complete shipping
          details. We are not liable for non-delivery or delays caused due to incorrect
          or incomplete address information.
        </p>

        <h2 className="text-2xl font-display font-bold text-primary-blue pt-4">
          4. Failed Delivery or Return to Origin
        </h2>
        <p>
          If an order is returned to us due to incorrect address details, customer
          unavailability, refusal to accept delivery, or repeated failed delivery
          attempts, additional shipping charges may apply for re-dispatch.
        </p>
        <p>
          Refunds are not guaranteed in such cases and will be handled at our sole
          discretion, subject to applicable law.
        </p>

        <h2 className="text-2xl font-display font-bold text-primary-blue pt-4">
          5. Order Cancellation
        </h2>
        <p>
          Orders cannot be cancelled once they have been dispatched. Dispatch is defined
          as the point at which the order is handed over to the courier partner.
        </p>
        <p>
          Cancellation requests before dispatch may be considered at our sole
          discretion and are not guaranteed. Refusal to accept delivery does not qualify
          as cancellation and will not entitle the customer to a refund.
        </p>

        <h2 className="text-2xl font-display font-bold text-primary-blue pt-4">
          6. Governing Law
        </h2>
        <p>
          This policy is governed by the laws of India. Courts located in New Delhi shall
          have exclusive jurisdiction.
        </p>
      </div>
    </div>
  );
};

export default ShippingPolicyPage;
