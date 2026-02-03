import React from 'react';
import { FiPhone, FiMail } from 'react-icons/fi';
import { SiWhatsapp } from 'react-icons/si';

const FAQPage: React.FC = () => {
  const faqs = [
    {
      q: 'What is your Return, Refund, and Exchange Policy?',
      a: 'Due to the nature of fabric products, returns, refunds, or exchanges are allowed only in limited and verified cases, such as when the fabric received is defective or damaged at the time of delivery, or when the fabric delivered is materially different from what was ordered. Fabric that has been cut, stitched, altered, washed, or used is not eligible for return, refund, or exchange under any circumstances. All claims must be raised within 48 hours of delivery and are subject to verification as per our Returns, Refunds & Exchange Policy.'
    },
    {
      q: 'Is an opening video required for returns or refunds?',
      a: 'Yes. A clear, continuous, uncut opening video of the package is strongly required for verification of any claim related to damage, defect, or incorrect delivery. The video should show the sealed package from all sides, the opening process, and the fabric clearly visible immediately after opening. In the absence of such a video, claims are very likely to be rejected, as independent verification may not be possible.'
    },
    {
      q: 'Why is the opening video so important?',
      a: 'Fabric is a sensitive product that can be damaged, cut, or altered after delivery. The opening video serves as the most reliable proof that any issue existed at the time of delivery and that the fabric was not altered after receipt. This helps prevent disputes and protects both the customer and the seller.'
    },
    {
      q: 'Are color or texture differences considered defects?',
      a: 'No. Minor variations in color, shade, texture, thickness, or weave may occur due to screen resolution, lighting conditions, or natural characteristics of fabric. Such variations are not considered defects and do not qualify for returns, refunds, or exchanges, provided the product matches the description on the website.'
    },
    {
      q: 'Do the fabrics come with any guarantee or warranty?',
      a: 'No. Fashion and suiting fabrics do not come with manufacturer warranties or guarantees. This is standard practice across fabric stores in India. Many fabrics involve delicate weaves or finishes that depend on usage, cutting, stitching, and washing, which are beyond our control. However, we source fabrics from reliable manufacturers and inspect all orders before dispatch.'
    },
    {
      q: 'What if the fabric shrinks or bleeds color after washing?',
      a: 'Shrinkage, color bleeding, or texture changes after washing are not considered defects and are not eligible for return or refund. Customers are advised to follow appropriate fabric care instructions and test a small portion before full processing.'
    },
    {
      q: 'Do you check fabrics before shipping?',
      a: 'Yes. All fabrics are checked, measured, and packed carefully before dispatch to ensure accuracy and quality. While this minimizes issues, rare problems may still occur due to transit handling, which is why the opening video requirement is important.'
    },
    {
      q: 'Do you offer Cash on Delivery (COD)?',
      a: 'Yes, we offer Partial Cash on Delivery (COD). Under this option, 20% of the order value must be paid upfront, and the remaining amount is payable at the time of delivery.'
    },
    {
      q: 'Why is a 20% advance required for COD orders?',
      a: 'Fabric orders are often cut or prepared specifically as per customer requirements and cannot be easily resold. The 20% advance confirms order intent, reduces refused deliveries, and helps cover handling and wastage costs in case of non-acceptance.'
    },
    {
      q: 'What happens if I refuse to accept delivery?',
      a: 'Refusal to accept delivery does not qualify as cancellation and does not automatically entitle the customer to a refund. If an order is returned due to refusal, incorrect address, or repeated failed delivery attempts, additional shipping or handling charges may apply. Refunds, if any, will be processed after deduction of applicable costs and subject to policy review.'
    },
    {
      q: 'How can I contact you for support or issues?',
      a: 'For any order-related questions, return requests, or clarifications, please contact us at goyaltextiles556@gmail.com. Please include your order ID, a clear description of the issue, and the opening video (if applicable) to help us assist you efficiently.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-display font-bold text-primary-blue text-center mb-8">
        Frequently Asked Questions
      </h1>

      <div className="space-y-8 mb-16">
        {faqs.map((faq, index) => (
          <div key={index}>
            <h2 className="text-xl font-display font-bold text-primary-blue mb-2">
              {faq.q}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {faq.a}
            </p>
          </div>
        ))}
      </div>

      <div className="py-12 px-6 sm:px-10 bg-gradient-to-br from-off-white/40 to-off-white/20 rounded-2xl border border-gray-200/50">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-display font-bold text-primary-blue mb-3">
            Still Have Questions?
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            We're here to help! Reach out to our team via phone or email, and we'll get back to you promptly.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <a
            href="tel:+919810777391"
            className="group block p-6 bg-white rounded-xl border border-gray-200/70 hover:border-primary-blue hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-3">
              <FiPhone className="text-primary-blue flex-shrink-0 group-hover:scale-110 transition-transform duration-300" size={24} />
              <h3 className="text-lg font-bold text-primary-blue group-hover:text-blue-900 transition-colors duration-300">
                Call Us
              </h3>
            </div>
            <p className="text-gray-600 font-medium">
              +91 98107 77391
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Mon - Sat: 10:00 AM - 8:00 PM
            </p>
          </a>

          <a
            href="mailto:goyaltextiles556@gmail.com"
            className="group block p-6 bg-white rounded-xl border border-gray-200/70 hover:border-primary-blue hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-3">
              <FiMail className="text-primary-blue flex-shrink-0 group-hover:scale-110 transition-transform duration-300" size={24} />
              <h3 className="text-lg font-bold text-primary-blue group-hover:text-blue-900 transition-colors duration-300">
                Email Us
              </h3>
            </div>
            <p className="text-gray-600 font-medium break-all">
              goyaltextiles556@gmail.com
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Response within 24 hours
            </p>
          </a>

          <a
            href="https://wa.me/919810777391"
            target="_blank"
            rel="noopener noreferrer"
            className="group block p-6 bg-white rounded-xl border border-gray-200/70 hover:border-primary-blue hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-3">
              <SiWhatsapp className="text-primary-blue flex-shrink-0 group-hover:scale-110 transition-transform duration-300" size={24} />
              <h3 className="text-lg font-bold text-primary-blue group-hover:text-blue-900 transition-colors duration-300">
                WhatsApp
              </h3>
            </div>
            <p className="text-gray-600 font-medium">
              +91 98107 77391
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Quick responses
            </p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
