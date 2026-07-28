'use client';

import { useState, useEffect, useCallback } from 'react';
import { RefreshCw, Pause, Play } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

export function QueueTab() {
  const [queue, setQueue] = useState<any[]>([]);
  const [statusCounts, setStatusCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  const fetchQueue = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/marketing/queue');
      const data = await res.json();
      setQueue(data.queue || []);
      setStatusCounts(data.statusCounts || {});
    } catch { toast.error('Failed'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchQueue(); }, [fetchQueue]);

  const handleAction = async (action: string) => {
    try {
      const res = await fetch('/api/marketing/queue', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action }) });
      const data = await res.json();
      if (data.error) { toast.error(data.error); return; }
      toast.success(action === 'retry' ? 'Retried ' + data.retried + ' notifications' : 'Done');
      fetchQueue();
    } catch { toast.error('Failed'); }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <Button onClick={() => handleAction('retry')} className="gap-1.5 bg-amber-500 hover:bg-amber-600"><RefreshCw className="w-4 h-4" /> Retry Failed</Button>
        <Button variant="outline" onClick={() => handleAction('pause')} className="gap-1.5"><Pause className="w-4 h-4" /> Pause All</Button>
        <Button variant="outline" onClick={() => handleAction('resume')} className="gap-1.5"><Play className="w-4 h-4" /> Resume All</Button>
        <div className="flex-1" />
        <Badge variant="outline">Pending: {statusCounts['pending'] || 0}</Badge>
        <Badge variant="outline">Failed: {statusCounts['failed'] || 0}</Badge>
      </div>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-4 py-3 font-medium text-gray-500">Recipient</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500 hidden md:table-cell">Title</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Status</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500 hidden lg:table-cell">Scheduled</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500 hidden lg:table-cell">Retries</th>
              </tr>
            </thead>
            <tbody>
              {loading && Array.from({ length: 3 }).map((_, i) => (
                <tr key={i} className="border-b border-gray-50"><td colSpan={5} className="px-4 py-3"><Skeleton className="h-8 w-full" /></td></tr>
              ))}
              {!loading && queue.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-12 text-center text-gray-400">Queue is empty.</td></tr>
              )}
              {queue.map((q: any) => (
                <tr key={q.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="px-4 py-3 font-medium text-[#2F3A33]">{q.subscriber?.fullName || q.recipientPhone}</td>
                  <td className="px-4 py-3 text-gray-600 hidden md:table-cell max-w-[200px] truncate">{q.title}</td>
                  <td className="px-4 py-3">
                    <Badge className={q.status === 'pending' ? 'bg-blue-100 text-blue-700' : q.status === 'failed' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'}>{q.status}</Badge>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs hidden lg:table-cell">{q.scheduledAt ? new Date(q.scheduledAt).toLocaleString() : '-'}</td>
                  <td className="px-4 py-3 text-gray-500 hidden lg:table-cell">{q.retryCount}/{q.maxRetries}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
