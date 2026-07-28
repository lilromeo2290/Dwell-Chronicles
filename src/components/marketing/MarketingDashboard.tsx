'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  LayoutDashboard, UserCog, Send, History, ClipboardList,
  FileText, Zap, Settings, Megaphone, RefreshCw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { OverviewTab, DashboardSkeleton } from './tabs/OverviewTab';
import { SubscribersTab } from './tabs/SubscribersTab';
import { SendTab } from './tabs/SendTab';
import { HistoryTab } from './tabs/HistoryTab';
import { QueueTab } from './tabs/QueueTab';
import { TemplatesTab } from './tabs/TemplatesTab';
import { AutomationTab } from './tabs/AutomationTab';
import { SettingsTab } from './tabs/SettingsTab';
import type { DashboardStats, Tab } from './types';

export default function MarketingDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = useCallback(async () => {
    try {
      const res = await fetch('/api/marketing/dashboard');
      const data = await res.json();
      if (data.error) return;
      setStats(data);
    } catch { /* ignore */ }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchDashboard(); }, [fetchDashboard]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#5F8768] flex items-center justify-center">
              <Megaphone className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#2F3A33]">Marketing Automation</h1>
              <p className="text-xs text-gray-500 hidden sm:block">Dwell Chronicles Notification Hub</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={fetchDashboard} className="gap-1.5">
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </Button>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as Tab)}>
          <div className="overflow-x-auto -mx-4 px-4 mb-6">
            <TabsList className="inline-flex h-auto gap-1 bg-gray-100 p-1 rounded-xl">
              <TabBtn icon={LayoutDashboard} label="Overview" value="overview" />
              <TabBtn icon={UserCog} label="Subscribers" value="subscribers" />
              <TabBtn icon={Send} label="Send" value="send" />
              <TabBtn icon={History} label="History" value="history" />
              <TabBtn icon={ClipboardList} label="Queue" value="queue" />
              <TabBtn icon={FileText} label="Templates" value="templates" />
              <TabBtn icon={Zap} label="Automation" value="automation" />
              <TabBtn icon={Settings} label="Settings" value="settings" />
            </TabsList>
          </div>

          <TabsContent value="overview">
            {loading ? <DashboardSkeleton /> : stats && <OverviewTab stats={stats} />}
          </TabsContent>
          <TabsContent value="subscribers"><SubscribersTab /></TabsContent>
          <TabsContent value="send"><SendTab onSent={fetchDashboard} /></TabsContent>
          <TabsContent value="history"><HistoryTab /></TabsContent>
          <TabsContent value="queue"><QueueTab /></TabsContent>
          <TabsContent value="templates"><TemplatesTab /></TabsContent>
          <TabsContent value="automation"><AutomationTab /></TabsContent>
          <TabsContent value="settings"><SettingsTab /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function TabBtn({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <TabsTrigger
      value={value}
      className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#2F3A33] text-gray-500 whitespace-nowrap"
    >
      <Icon className="w-4 h-4" /> {label}
    </TabsTrigger>
  );
}