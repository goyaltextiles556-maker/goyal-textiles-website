
export interface FAQItem {
  question: string;
  answer: string[]; // Using an array of strings to allow for multi-paragraph answers.
}

export const faqs: FAQItem[] = [
  {
    question: "What is the minimum cut for fabric?",
    answer: [
      "The minimum cut for all our fabrics sold by the meter is 1 meter. We do not offer half-meter cuts at this time."
    ]
  },
  {
    question: "How do I care for my fabric?",
    answer: [
      "Care instructions vary depending on the material. Each product page has a 'Material Details' section with specific recommendations (e.g., 'Dry clean only', 'Machine washable').",
      "As a general rule, we recommend gentle washing and line drying to preserve the quality and color of the fabric."
    ]
  },
  {
    question: "Do you offer international shipping?",
    answer: [
      "Currently, we only ship within India. We are working on expanding our services to include international shipping in the future. Please check back for updates."
    ]
  },
  {
    question: "Can I get a sample of a fabric?",
    answer: [
      "We do not offer a sample service at this time. We strive to provide high-quality, color-accurate photos on our product pages to help you make an informed decision."
    ]
  },
  {
    question: "My order hasn't arrived. What should I do?",
    answer: [
      "Please refer to our Shipping & Cancellation Policy for delivery estimates. If your order is significantly delayed, please contact us with your order number, and we will look into it immediately."
    ]
  }
];
