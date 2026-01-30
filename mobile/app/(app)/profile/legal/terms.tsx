import { LegalPageLayout } from '@/components/profile/LegalPageLayout';

const lastUpdated = '19 November 2025';

const sections = [
  {
    title: '1. Eligibility & Accounts',
    body: [
      'By accessing the SkipQ College Canteen Portal you confirm that you are at least 13 years old and authorized to accept these Terms.',
      'You must keep credentials confidential and remain responsible for all actions performed through your account.'
    ]
  },
  {
    title: '2. Platform Role',
    body: [
      'SkipQ offers the ordering interface, vendor dashboards, and payment link generation for campus canteens.',
      'Food preparation, availability, and service quality are managed solely by the participating vendor.'
    ]
  },
  {
    title: '3. Ordering & Payments',
    body: [
      'Orders are confirmed after payment authorization via supported gateways (UPI, cards, net banking).',
      'Payment disputes, chargebacks, or settlement timelines remain subject to the relevant banking partners.'
    ]
  },
  {
    title: '4. Fees & Taxes',
    body: [
      'Menu pricing may include campus taxes or convenience fees which are disclosed before checkout.',
      'SkipQ service/convenience fees support infrastructure costs and are non-refundable unless a platform error is validated.'
    ]
  },
  {
    title: '5. Cancellations & Refunds',
    body: [
      'Cancellation requests must reach the vendor before the order is marked Preparing, Ready, or Dispatched.',
      'Refund decisions and timelines follow the standalone Cancellation & Refund Policy.'
    ]
  },
  {
    title: '6. Vendor Obligations',
    body: [
      'Vendors must maintain accurate menus, allergen info, and prep times visible to students.',
      'Vendors are solely responsible for hygiene, fulfilment, and resolving product-quality issues.'
    ]
  },
  {
    title: '7. User Conduct',
    body: [
      'Users must not attempt unauthorized access, exploit vulnerabilities, or automate abusive traffic.',
      'Harassment of vendors, admins, or support staff through chat/notes may result in immediate suspension.'
    ]
  },
  {
    title: '8. Data & Privacy',
    body: [
      'Operational data (queue status, wait times) may be shared with vendors to improve service.',
      'Personal information is collected and processed in line with the SkipQ Privacy Policy.'
    ]
  },
  {
    title: '9. Downtime & Liability',
    body: [
      'SkipQ targets >99% uptime but may schedule maintenance or experience outages beyond its control.',
      'SkipQ is not liable for indirect or consequential damages; liability is capped at the amount paid for the affected order.'
    ]
  },
  {
    title: '10. Updates & Governing Law',
    body: [
      'We may update these Terms when regulations change or when new product capabilities launch; continued use means acceptance.',
      'These Terms are governed by the laws of India with disputes subject to competent courts in Ghaziabad, Uttar Pradesh.'
    ]
  },
  {
    title: '11. Contact',
    body: [
      'Support email: skipq39@gmail.com',
      'Phone: +91 83839 34397'
    ]
  }
];

export default function TermsScreen() {
    return (
        <LegalPageLayout 
            title="Terms & Conditions"
            lastUpdated={lastUpdated}
            intro="These Terms explain the obligations of students, vendors, and administrators when they access ordering, billing, and fulfilment tools on SkipQ."
            sections={sections}
            footerText="Contact skipq39@gmail.com for questions."
        />
    );
}
