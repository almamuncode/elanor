/**
 * Draft policy pages. These are placeholders that describe what each policy will cover.
 * They contain no enforceable terms and must be replaced with policies approved by the business.
 */
export interface Policy {
  slug: string;
  title: string;
  intro: string;
  sections: { heading: string; body: string }[];
}

export const POLICIES: readonly Policy[] = [
  {
    slug: "delivery",
    title: "Delivery",
    intro: "Delivery options have not been set up yet. This page shows what the final policy will need to cover.",
    sections: [
      { heading: "Where we deliver", body: "Delivery areas will be listed here once confirmed." },
      { heading: "Costs and timings", body: "Delivery charges and estimated timings will be published before launch. No delivery times are promised in this demo." },
      { heading: "Tracking", body: "How orders are tracked will be added when a delivery partner is chosen." },
    ],
  },
  {
    slug: "returns",
    title: "Returns",
    intro: "A returns policy has not been agreed yet. This page shows what the final policy will need to cover.",
    sections: [
      { heading: "Return window", body: "The number of days for returns and the condition items must be in will be confirmed before launch." },
      { heading: "How to return", body: "Step-by-step return instructions will be added here." },
      { heading: "Refunds and exchanges", body: "Refund methods and exchange options will be confirmed before any sales." },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy",
    intro: "This concept demo does not collect personal data. Your bag and saved pieces are stored only in your own browser.",
    sections: [
      { heading: "What this demo stores", body: "Bag contents and saved pieces are kept in your browser's local storage on this device. Nothing is sent to a server." },
      { heading: "Newsletter", body: "The newsletter form checks the email format only. Emails are not submitted, stored or shared." },
      { heading: "Before launch", body: "A full privacy policy covering accounts, orders, payments and analytics will be written when those services exist." },
    ],
  },
  {
    slug: "terms",
    title: "Terms",
    intro: "Terms of sale have not been written yet. Nothing on this site can be ordered.",
    sections: [
      { heading: "Sample products", body: "Products, prices and sizes on this site are samples for demonstration. They are not offers for sale." },
      { heading: "Before launch", body: "Terms covering orders, pricing, payment and liability will be added once the business details are confirmed." },
    ],
  },
];

export function getPolicy(slug: string): Policy | undefined {
  return POLICIES.find((p) => p.slug === slug);
}
