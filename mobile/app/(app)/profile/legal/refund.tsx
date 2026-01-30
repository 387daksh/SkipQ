import { LegalPageLayout } from '@/components/profile/LegalPageLayout';

const lastUpdated = '18 November 2025';

const sections = [
  {
    title: '1. Scope',
    body: [
      'This policy covers orders placed through the College Canteen Portal web and mobile experiences.',
      'The vendor is responsible for order preparation while SkipQ facilitates ordering, payments and notifications.'
    ]
  },
  {
    title: '2. Cancellation Window',
    body: [
      'Cancellations are allowed only before the vendor begins preparing the order.',
      'Once an order is marked as “Preparing”, “Ready” or “Dispatched”, the vendor may reject cancellation requests.'
    ]
  },
  {
    title: '3. Refund Eligibility',
    body: [
      'If the vendor approves the cancellation before preparation, the item amount becomes eligible for refund.',
      'Refunds are processed to the original payment method. Bank or payment gateway processing times (typically 5–7 business days) may apply.'
    ]
  },
  {
    title: '4. Service & Convenience Fees',
    body: [
      'Platform convenience or processing fees cover payment handling and notification costs and are non-refundable once the order is placed.',
      'Refunds cover only the vendor-collected portion unless a system error is confirmed by SkipQ support.'
    ]
  },
  {
    title: '5. Order Issues',
    body: [
      'If an order is not fulfilled after payment, contact SkipQ support within 24 hours with the order ID for investigation.',
      'In cases of duplicate charges or payment failures, proof of charge (transaction reference or screenshot) may be requested to expedite refunds.'
    ]
  },
  {
    title: '6. Contact',
    body: [
      'Email support: skipq39@gmail.com',
      'Phone support: +91 83839 34397'
    ]
  }
];


export default function RefundScreen() {
    return (
        <LegalPageLayout 
            title="Cancellation Policy"
            lastUpdated={lastUpdated}
            intro="These rules explain how cancellations are handled and when refunds are issued for orders placed via SkipQ."
            sections={sections}
            footerText="Raise a ticket at skipq39@gmail.com for disputes."
        />
    );
}
