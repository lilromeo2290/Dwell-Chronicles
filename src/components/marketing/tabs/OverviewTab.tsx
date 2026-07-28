'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Users, Send, MessageSquare, XCircle, TrendingUp, UserPlus,
  Clock,
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';
import type { DashboardStats } from '../types';

const PIE_COLORS = ['#5F8768', '#EF4444', '#2F3A33'];

export function OverviewTab({ stats }: { stats: DashboardStats }) {
  const kpis = [
    { label: 'Total Subscribers', value: stats.totalSubscribers, icon: Users, color: 'text-[#5F8768]', bg: 'bg-[#5F8768]/10' },
    { label: 'Active', value: stats.activeSubscribers, icon: UserPlus, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Sent Today', value: stats.todaySent, icon: Send, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Total Sent', value: stats.totalSent, icon: MessageSquare, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Failed', value: stats.totalFailed, icon: XCircle, color: 'text-red-500', bg: 'bg-red-50' },
    { label: 'Delivery Rate', value: stats.successRate + '%', icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Pending Queue', value: stats.pendingQueue, icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'New (7 days)', value: stats.subscriberGrowth7d, icon: UserPlus, color: 'text-teal-600', bg: 'bg-teal-50' },
  ];

  const manualNotifs = Math.max(0, stats.totalSent - stats.propertyNotifs - stats.videoNotifs);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-500">{kpi.label}</span>
                <div className={"w-8 h-8 rounded-lg flex items-center justify-center " + kpi.bg}>
                  <kpi.icon className={"w-4 h-4 " + kpi.color} />
                </div>
              </div>
              <p className="text-2xl font-bold text-[#2F3A33]">{kpi.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-0 shadow-sm">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Daily Notifications (Last 7 Days)</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={stats.dailyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="sent" name="Sent" fill="#5F8768" radius={[4, 4, 0, 0]} />
                <Bar dataKey="failed" name="Failed" fill="#EF4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Notification Types</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={[
                  { name: 'Property', value: stats.propertyNotifs },
                  { name: 'Video', value: stats.videoNotifs },
                  { name: 'Manual', value: manualNotifs },
                ]} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value"
                  label={({ name, value }) => value > 0 ? name : ''} labelLine={false}
                >
                  {PIE_COLORS.map((c, i) => <Cell key={i} fill={c} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-0 shadow-sm">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Monthly Trend</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={stats.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line type="monotone" dataKey="sent" name="Sent" stroke="#5F8768" strokeWidth={2} dot={{ r: 4, fill: '#5F8768' }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Top Subscriber Regions</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.topRegions.length === 0 && <p className="text-sm text-gray-400">No region data yet</p>}
              {stats.topRegions.map((r, i) => (
                <div key={r.region} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#5F8768]/10 flex items-center justify-center text-xs font-bold text-[#5F8768]">{i + 1}</div>
                    <span className="text-sm font-medium text-[#2F3A33]">{r.region || 'Unspecified'}</span>
                  </div>
                  <Badge variant="secondary" className="bg-[#F8F7F3] text-[#2F3A33]">{r.count}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <Card key={i} className="border-0 shadow-sm"><CardContent className="p-4"><Skeleton className="h-16 w-full" /></CardContent></Card>
      ))}
    </div>
  );
}
