import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-display font-bold text-primary-blue text-center mb-12">
        Privacy Policy
      </h1>

      <div className="space-y-6 text-gray-700 leading-relaxed">
        <p className="font-medium text-gray-500">Last Updated: 29 January 2026</p>

        <p>
          This Privacy Policy describes how <strong>Goyal Textiles</strong> (“we”, “us”, “our”),
          a sole proprietorship operating under the laws of India, collects, uses, processes,
          stores, and protects personal data when you access or use our website.
        </p>

        <p>
          By using this website, you agree to the collection and processing of your personal
          data in accordance with this Privacy Policy and applicable Indian laws, including
          the Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023.
        </p>

        <h2 className="text-2xl font-display font-bold text-primary-blue pt-4">
          1. Definitions
        </h2>
        <p>
          “Personal Data” means any data about an identifiable individual. “Data Principal”
          refers to the individual to whom the data relates. “Data Fiduciary” refers to
          Goyal Textiles, which determines the purpose and means of processing personal data.
        </p>

        <h2 className="text-2xl font-display font-bold text-primary-blue pt-4">
          2. Information We Collect
        </h2>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>Name, email address, phone number</li>
          <li>Billing and shipping address</li>
          <li>Order, transaction, and payment reference details</li>
          <li>Communications sent to us</li>
          <li>IP address, browser type, device and usage data</li>
        </ul>

        <h2 className="text-2xl font-display font-bold text-primary-blue pt-4">
          3. Purpose of Collection
        </h2>
        <p>
          We collect and process personal data strictly for lawful purposes, including:
        </p>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>Processing and fulfilling orders</li>
          <li>Customer support and communication</li>
          <li>Delivery, returns, and refunds</li>
          <li>Fraud prevention and website security</li>
          <li>Legal, accounting, and regulatory compliance</li>
          <li>Website analytics and performance improvement</li>
        </ul>

        <h2 className="text-2xl font-display font-bold text-primary-blue pt-4">
          4. Consent and Lawful Basis
        </h2>
        <p>
          Personal data is processed based on your consent or other lawful grounds permitted
          under Indian law, including performance of a contract, compliance with legal
          obligations, and prevention of fraud.
        </p>
        <p>
          You may withdraw consent at any time, subject to legal or contractual restrictions.
        </p>

        <h2 className="text-2xl font-display font-bold text-primary-blue pt-4">
          5. Disclosure of Information
        </h2>
        <p>
          We do not sell or rent personal data. Personal data may be shared only with:
        </p>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>Payment gateways and financial service providers</li>
          <li>Courier and logistics partners</li>
          <li>Technology and hosting service providers</li>
          <li>Government or legal authorities when required by law</li>
        </ul>

        <h2 className="text-2xl font-display font-bold text-primary-blue pt-4">
          6. Data Storage and Security
        </h2>
        <p>
          Our website uses Cloudflare for security and performance. When implemented, customer
          data may be stored using secure database infrastructure such as MongoDB.
        </p>
        <p>
          We implement reasonable administrative, technical, and organizational safeguards,
          including encryption and restricted access controls. However, no system is
          completely secure.
        </p>

        <h2 className="text-2xl font-display font-bold text-primary-blue pt-4">
          7. Data Retention
        </h2>
        <p>
          Personal data is retained only for as long as necessary to fulfill the stated
          purposes or as required by applicable law. Data is securely deleted or anonymized
          once no longer required.
        </p>

        <h2 className="text-2xl font-display font-bold text-primary-blue pt-4">
          8. Cookies and Tracking Technologies
        </h2>
        <p>
          We use cookies and similar technologies for essential website functionality,
          analytics, and security. You may manage or disable cookies through your browser
          settings. Disabling cookies may affect site functionality.
        </p>

        <h2 className="text-2xl font-display font-bold text-primary-blue pt-4">
          9. Children’s Data
        </h2>
        <p>
          This website is not intended for individuals below 18 years of age. We do not
          knowingly collect personal data from minors.
        </p>

        <h2 className="text-2xl font-display font-bold text-primary-blue pt-4">
          10. Your Rights
        </h2>
        <p>
          You have the right to request access, correction, erasure, or withdrawal of consent
          regarding your personal data, subject to applicable law.
        </p>

        <p>
          Requests may be made by contacting:
        </p>
        <p className="pl-4">
          <strong>Email:</strong> me@veeren.in<br />
          <strong>Address:</strong> Goyal Textiles, Guru Ravidas Marg, Pocket 52, J-Block,
          Rampuri, Kalkaji, New Delhi – 110019, India
        </p>

        <h2 className="text-2xl font-display font-bold text-primary-blue pt-4">
          11. Changes to This Policy
        </h2>
        <p>
          We reserve the right to modify this Privacy Policy at any time. Changes take effect
          immediately upon posting. Continued use of the website constitutes acceptance of
          the updated policy.
        </p>

        <h2 className="text-2xl font-display font-bold text-primary-blue pt-4">
          12. Governing Law
        </h2>
        <p>
          This Privacy Policy is governed by the laws of India. Courts located in New Delhi
          shall have exclusive jurisdiction.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
