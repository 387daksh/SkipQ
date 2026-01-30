import { LegalPageLayout } from '@/components/profile/LegalPageLayout';

const lastUpdated = '18 November 2025';

const sections = [
  {
    title: '1. Information We Collect',
    body: [
      'Personal Information: Name, email address, phone number, or any details you provide through contact forms.',
      'Automatic Data: IP address, browser type, device information, and pages visited.'
    ]
  },
  {
    title: '2. How We Use Your Information',
    body: [
      'Respond to your inquiries or messages.',
      'Improve our website and user experience.',
      'Provide updates, if you subscribe to them.',
      'Maintain security and prevent fraud.'
    ]
  },
  {
    title: '3. Sharing of Information',
    body: [
      'We do not sell, trade, or rent your personal information.',
      'We may share data only with trusted service providers (hosting, analytics) or authorities if required by law.'
    ]
  },
  {
    title: '4. Cookies',
    body: [
      'Our website/app uses local storage and cookies to improve loading speed, remember user preferences, and analyze traffic.',
      'You can clear your app data at any time.'
    ]
  },
  {
    title: '5. Data Protection',
    body: [
      'We follow industry-standard security measures to protect your information.',
      'However, no internet transmission is 100% secure, so we cannot guarantee absolute safety.'
    ]
  },
  {
    title: '6. Your Rights',
    body: [
      'You can request to access your personal data, correct inaccurate information, or delete your information.',
      'Contact us at skipq39@gmail.com for any such requests.'
    ]
  },
  {
    title: '7. Changes to This Policy',
    body: [
      'We may update this Privacy Policy occasionally.',
      'Changes will be posted on this page with the updated date.'
    ]
  },
  {
    title: '8. Contact Us',
    body: ['If you have questions about this Privacy Policy, contact us at skipq39@gmail.com.']
  }
];

export default function PrivacyScreen() {
    return (
        <LegalPageLayout 
            title="Privacy Policy"
            lastUpdated={lastUpdated}
            intro="This Privacy Policy explains how we collect, use, and protect your information when you use our services."
            sections={sections}
        />
    );
}
