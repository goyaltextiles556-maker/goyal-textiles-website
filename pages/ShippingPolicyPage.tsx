import React from 'react';

const ShippingPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-display font-bold text-primary-blue text-center mb-12">
        Shipping & Cancellation Policy
      </h1>

      <div className="space-y-6 text-gray-700 leading-relaxed">
        <p className="font-medium text-gray-500">
          Last Updated: 29 January 2026
        </p>

        <h2 className="text-2xl font-display font-bold text-primary-blue pt-4">
          1. Order Processing & Dispatch
        </h2>
        <p>
          Orders are processed only after successful payment confirmation.
          Processing and dispatch timelines may vary depending on product
          availability, order volume, and operational factors. Any timelines
          communicated are estimates only and are not guaranteed.
        </p>
        <p>
          We make reasonable efforts to dispatch orders within the communicated
          timeframe. Orders are not dispatched on Sundays or public holidays.
        </p>
        <p>
          Delays may occur due to factors beyond our control, including courier
          delays, weather conditions, strikes, regulatory restrictions, or other
          force majeure events.
        </p>

        <h2 className="text-2xl font-display font-bold text-primary-blue pt-4">
          2. Shipping Rates & Delivery Estimates
        </h2>
        <p>
          Shipping charges, if applicable, are calculated and displayed at
          checkout. Shipping charges are non-refundable, except where required
          under applicable law.
        </p>
        <p>
          Delivery timelines depend on the destination, courier partner, and
          external factors. Delivery estimates provided by courier partners are
          indicative only.
        </p>
        <p>
          Goyal Textiles shall not be responsible for delays occurring after the
          order has been handed over to the courier partner, except where such
          delay is directly attributable to us.
        </p>

        <h2 className="text-2xl font-display font-bold text-primary-blue pt-4">
          3. Delivery, Risk & Responsibility
        </h2>
        <p>
          Orders are delivered through third-party courier services. Risk of loss
          or damage passes to the customer once the order is handed over to the
          courier partner, subject to the condition that any damage, defect, or
          incorrect delivery at the time of receipt is reported strictly in
          accordance with our Returns, Refunds & Exchange Policy.
        </p>
        <p>
          Courier delivery confirmation or tracking updates shall generally be
          treated as proof of delivery, unless credible evidence suggests
          otherwise.
        </p>
        <p>
          Customers are responsible for providing accurate and complete shipping
          details. We are not liable for non-delivery, delays, or losses arising
          from incorrect or incomplete address information provided by the
          customer.
        </p>

        <h2 className="text-2xl font-display font-bold text-primary-blue pt-4">
          4. Failed Delivery, Refusal & Return to Origin
        </h2>
        <p>
          If an order is returned to us due to incorrect or incomplete address
          details, customer unavailability, refusal to accept delivery, or
          repeated failed delivery attempts, additional shipping and handling
          charges may apply for re-dispatch.
        </p>
        <p>
          Refunds, if any, in such cases will be processed only after deducting
          applicable shipping and handling charges and will depend on the reason
          for return to origin, subject to applicable law.
        </p>
        <p>
          Refusal to accept delivery does not qualify as cancellation or return,
          except where refusal is due to a verified defect, damage, or error
          attributable to us and reported in accordance with our Returns Policy.
        </p>

        <h2 className="text-2xl font-display font-bold text-primary-blue pt-4">
          5. Order Cancellation
        </h2>
        <p>
          Orders cannot be cancelled once they have been dispatched. Dispatch is
          defined as the point at which the order is handed over to the courier
          partner.
        </p>
        <p>
          Cancellation requests received before dispatch may be considered based
          on the order’s processing stage and operational status and are not
          guaranteed.
        </p>
        <p>
          If an order is cancelled before dispatch, any applicable payment
          gateway or processing charges may be deducted from the refund, where
          permitted by law.
        </p>

        <h2 className="text-2xl font-display font-bold text-primary-blue pt-4">
          6. Governing Law
        </h2>
        <p>
          This Policy shall be governed by and construed in accordance with the
          laws of India, subject to applicable consumer protection laws.
        </p>
      </div>
    </div>
  );
};

export default ShippingPolicyPage;
