export interface DashboardStats {
  totalSubscribers: number;
  activeSubscribers: number;
  todaySent: number;
  totalSent: number;
  totalFailed: number;
  totalDelivered: number;
  totalRead: number;
  propertyNotifs: number;
  videoNotifs: number;
  pendingQueue: number;
  subscriberGrowth7d: number;
  successRate: number;
  dailyData: { date: string; sent: number; failed: number }[];
  monthlyData: { month: string; sent: number }[];
  topRegions: { region: string; count: number }[];
  topTypes: { type: string; count: number }[];
}

export type Tab = 'overview' | 'subscribers' | 'send' | 'history' | 'queue' | 'templates' | 'automation' | 'settings';
