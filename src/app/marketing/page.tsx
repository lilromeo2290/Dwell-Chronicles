import type { Metadata } from 'next';
import MarketingDashboard from '@/components/marketing/MarketingDashboard';

export const metadata: Metadata = {
  title: 'Marketing Hub | Dwell Chronicles',
  description: 'Marketing automation dashboard for managing subscribers, notifications, and campaigns.',
  robots: { index: false, follow: false },
};

export default function MarketingPage() {
  return <MarketingDashboard />;
}
