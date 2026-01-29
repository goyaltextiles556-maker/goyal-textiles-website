import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-display font-bold text-primary-blue text-center mb-12">
        Privacy Policy
      </h1>

      <div className="space-y-6 text-gray-700 leading-relaxed">
        <p className="font-medium text-gray-500">
          Last Updated: 29 January 2026
        </p>

        <p>
          This Privacy Policy explains how Goyal Textiles, a sole proprietorship
          owned and operated by Nitin Kumar, collects, uses,
          processes, stores, and protects personal data when you access or use
          our website. This policy is issued in accordance with applicable Indian
          laws, including the Information Technology Act, 2000 and the Digital
          Personal Data Protection Act, 2023.
        </p>

        <h2 className="text-2xl font-display font-bold text-primary-blue pt-4">
          1. Information We Collect
        </h2>
        <p>
          We may collect the following categories of personal data when you use
          our website or place an order:
        </p>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>Name, email address, and phone number</li>
          <li>Billing and shipping address</li>
          <li>Order details, transaction history, and payment reference information</li>
          <li>Communications sent to us, such as emails or support requests</li>
          <li>
            Technical information such as IP address, browser type, device
            information, and basic usage data
          </li>
        </ul>

        <h2 className="text-2xl font-display font-bold text-primary-blue pt-4">
          2. Purpose of Collection and Use
        </h2>
        <p>
          We collect and process personal data only for lawful and necessary
          purposes, including:
        </p>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>Processing and fulfilling orders</li>
          <li>Customer communication and support</li>
          <li>Shipping, delivery, returns, and refunds</li>
          <li>Fraud prevention, security, and abuse detection</li>
          <li>Compliance with legal, accounting, and regulatory obligations</li>
          <li>Basic website analytics and performance improvement</li>
        </ul>

        <h2 className="text-2xl font-display font-bold text-primary-blue pt-4">
          3. Lawful Basis for Processing
        </h2>
        <p>
          Personal data is processed on one or more lawful bases, including
          performance of a contract, compliance with legal obligations, consent
          where required, and legitimate uses such as security and fraud
          prevention, as permitted under applicable law.
        </p>

        <h2 className="text-2xl font-display font-bold text-primary-blue pt-4">
          4. Sharing of Personal Data
        </h2>
        <p>
          We do not sell or rent personal data. Personal data may be shared only
          with trusted third parties to the extent necessary, including payment
          gateways, courier and logistics partners, and technology or
          infrastructure service providers used for hosting, security, database
          storage, and code deployment.
        </p>
        <p>
          Such third parties process personal data only on our instructions and
          are required to maintain appropriate confidentiality and security
          safeguards.
        </p>

        <h2 className="text-2xl font-display font-bold text-primary-blue pt-4">
          5. Data Storage and Security
        </h2>
        <p>
          Our website uses third-party infrastructure and services, including
          Cloudflare, MongoDB, and GitHub. Personal data may be processed or
          stored on servers located within or outside India, in accordance with
          applicable law.
        </p>
        <p>
          We implement reasonable administrative, technical, and organizational
          security measures. However, no method of transmission or storage is
          completely secure, and absolute security cannot be guaranteed.
        </p>

        <h2 className="text-2xl font-display font-bold text-primary-blue pt-4">
          6. Data Retention
        </h2>
        <p>
          Personal data is retained only for as long as necessary to fulfill the
          purposes outlined in this Policy or as required by law, including tax,
          accounting, and dispute resolution requirements. Data is securely
          deleted or anonymized once it is no longer required.
        </p>

        <h2 className="text-2xl font-display font-bold text-primary-blue pt-4">
          7. Cookies and Similar Technologies
        </h2>
        <p>
          The website may use cookies or similar technologies that are necessary
          for basic functionality, security, and limited analytics. You may
          manage or disable cookies through your browser settings, though doing
          so may affect certain website features.
        </p>

        <h2 className="text-2xl font-display font-bold text-primary-blue pt-4">
          8. Children’s Data
        </h2>
        <p>
          This website is not intended for individuals below 18 years of age. We
          do not knowingly collect personal data from minors. If such data is
          identified, it will be deleted as soon as reasonably practicable.
        </p>

        <h2 className="text-2xl font-display font-bold text-primary-blue pt-4">
          9. Your Rights and Grievance Redressal
        </h2>
        <p>
          Subject to applicable law, you may request access, correction, or
          erasure of your personal data, or withdraw consent where processing is
          based on consent.
        </p>
        <p>
          Requests and grievances may be submitted to:
        </p>
        <p className="pl-4">
          Email: me@veeren.in
          <br />
          Address: Goyal Textiles, Guru Ravidas Marg, Pocket 52, J-Block, Rampuri,
          Kalkaji, New Delhi – 110019, India
        </p>
        <p>
          We will make reasonable efforts to respond within 14 business days,
          subject to legal and contractual requirements.
        </p>

        <h2 className="text-2xl font-display font-bold text-primary-blue pt-4">
          10. Changes to This Privacy Policy
        </h2>
        <p>
          We may update this Privacy Policy from time to time. Material changes
          will be communicated through the website where feasible. Continued use
          of the website constitutes acceptance of the updated policy.
        </p>

        <h2 className="text-2xl font-display font-bold text-primary-blue pt-4">
          11. Governing Law
        </h2>
        <p>
          This Privacy Policy shall be governed by and construed in accordance
          with the laws of India, subject to applicable data protection and
          consumer protection laws.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
