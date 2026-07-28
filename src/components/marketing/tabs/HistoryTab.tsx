'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, CheckCircle2, XCircle, Clock, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

export function HistoryTab() {
  const [history, setHistory] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchHistory = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: '20', search, type: typeFilter, status: statusFilter });
      const res = await fetch('/api/marketing/history?' + params);
      const data = await res.json();
      setHistory(data.history || []);
      setTotal(data.total || 0);
    } catch { toast.error('Failed'); }
    finally { setLoading(false); }
  }, [page, search, typeFilter, statusFilter]);

  useEffect(() => { fetchHistory(); }, [fetchHistory]);

  const statusIcon = (s: string) => {
    if (s === 'sent') return <CheckCircle2 className="w-4 h-4 text-green-500" />;
    if (s === 'delivered') return <CheckCircle2 className="w-4 h-4 text-blue-500" />;
    if (s === 'read') return <CheckCircle2 className="w-4 h-4 text-[#5F8768]" />;
    if (s === 'failed') return <XCircle className="w-4 h-4 text-red-500" />;
    return <Clock className="w-4 h-4 text-gray-400" />;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input placeholder="Search by name, phone, title..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="pl-9" />
        </div>
        <Select value={typeFilter} onValueChange={(v) => { setTypeFilter(v); setPage(1); }}>
          <SelectTrigger className="w-[130px]"><SelectValue placeholder="All Types" /></SelectTrigger>
          <SelectContent><SelectItem value="">All</SelectItem><SelectItem value="property">Property</SelectItem><SelectItem value="video">Video</SelectItem><SelectItem value="manual">Manual</SelectItem></SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(1); }}>
          <SelectTrigger className="w-[130px]"><SelectValue placeholder="All Status" /></SelectTrigger>
          <SelectContent><SelectItem value="">All</SelectItem><SelectItem value="sent">Sent</SelectItem><SelectItem value="delivered">Delivered</SelectItem><SelectItem value="read">Read</SelectItem><SelectItem value="failed">Failed</SelectItem></SelectContent>
        </Select>
      </div>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-4 py-3 font-medium text-gray-500 w-12">Status</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500">Title</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500 hidden md:table-cell">Recipient</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500 hidden lg:table-cell">Type</th>
                <th className="text-left px-4 py-3 font-medium text-gray-500 hidden lg:table-cell">Date</th>
                <th className="text-right px-4 py-3 font-medium text-gray-500 w-16">View</th>
              </tr>
            </thead>
            <tbody>
              {loading && Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-b border-gray-50"><td colSpan={6} className="px-4 py-3"><Skeleton className="h-8 w-full" /></td></tr>
              ))}
              {!loading && history.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-12 text-center text-gray-400">No notification history yet.</td></tr>
              )}
              {history.map((h: any) => (
                <tr key={h.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="px-4 py-3">{statusIcon(h.status)}</td>
                  <td className="px-4 py-3 font-medium text-[#2F3A33] max-w-[200px] truncate">{h.title}</td>
                  <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{h.recipientName || h.recipientPhone}</td>
                  <td className="px-4 py-3 hidden lg:table-cell"><Badge variant="secondary">{h.type}</Badge></td>
                  <td className="px-4 py-3 text-gray-500 text-xs hidden lg:table-cell">{h.sentAt ? new Date(h.sentAt).toLocaleString() : '-'}</td>
                  <td className="px-4 py-3 text-right">
                    <Dialog>
                      <DialogTrigger asChild><Button size="sm" variant="ghost"><Eye className="w-3.5 h-3.5" /></Button></DialogTrigger>
                      <DialogContent>
                        <DialogHeader><DialogTitle>Notification Details</DialogTitle></DialogHeader>
                        <div className="space-y-3 text-sm">
                          <div className="flex items-center gap-2"><span className="font-medium">Status:</span><Badge className={h.status === 'failed' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}>{h.status}</Badge></div>
                          <div><span className="font-medium">Recipient:</span> {h.recipientName} ({h.recipientPhone})</div>
                          {h.errorMessage && <div><span className="font-medium">Error:</span> <span className="text-red-600">{h.errorMessage}</span></div>}
                          <Separator />
                          <div><span className="font-medium">Message:</span><div className="mt-2 bg-gray-50 rounded-lg p-3 whitespace-pre-wrap text-xs max-h-64 overflow-y-auto">{h.message}</div></div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {total > 20 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">{total} records</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</Button>
            <Button variant="outline" size="sm" disabled={page * 20 >= total} onClick={() => setPage(page + 1)}>Next</Button>
          </div>
        </div>
      )}
    </div>
  );
}
