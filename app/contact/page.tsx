import type { Metadata } from 'next';
import ContactContent from './ContactContent';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Leny Pascal IHIRWE about full-time opportunities, freelance projects, technical consultations, and open source collaborations.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return <ContactContent />;
}
