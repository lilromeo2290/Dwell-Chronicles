'use client';

import { useState, useEffect } from 'react';
import { Send, Eye, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

export function SendTab({ onSent }: { onSent: () => void }) {
  const [groups, setGroups] = useState<any[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [type, setType] = useState('manual');
  const [scheduledAt, setScheduledAt] = useState('');
  const [sending, setSending] = useState(false);
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    fetch('/api/marketing/groups').then((r) => r.json()).then((d) => setGroups(d.groups || []));
  }, []);

  const handleSend = async () => {
    if (!message.trim()) { toast.error('Message is required'); return; }
    setSending(true);
    try {
      const res = await fetch('/api/marketing/notifications', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, title, mediaUrl, type, scheduledAt: scheduledAt || null, targetGroupIds: selectedGroups }),
      });
      const data = await res.json();
      if (data.error) { toast.error(data.error); return; }
      if (data.duplicate) { toast.warning(data.error); return; }
      toast.success('Sent: ' + data.sent + ' | Queued: ' + data.queued + (data.demoMode ? ' (Demo Mode)' : ''));
      setMessage(''); setTitle(''); setMediaUrl(''); setSelectedGroups([]); onSent();
    } catch { toast.error('Failed to send'); }
    finally { setSending(false); }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="border-0 shadow-sm">
        <CardHeader><CardTitle className="text-base">Compose Notification</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div><Label>Title</Label><Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New Property Alert" /></div>
          <div><Label>Type</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="manual">Manual</SelectItem><SelectItem value="property">Property</SelectItem><SelectItem value="video">Video</SelectItem></SelectContent>
            </Select>
          </div>
          <div><Label>Target Groups</Label>
            <div className="flex flex-wrap gap-2 mt-1">
              {groups.length === 0 && <span className="text-xs text-gray-400">No groups yet</span>}
              {groups.map((g: any) => (
                <Badge key={g.id} variant={selectedGroups.includes(g.id) ? 'default' : 'outline'} className="cursor-pointer"
                  onClick={() => setSelectedGroups(selectedGroups.includes(g.id) ? selectedGroups.filter((id: string) => id !== g.id) : [...selectedGroups, g.id])}>{g.name}</Badge>
              ))}
              {selectedGroups.length === 0 && groups.length > 0 && <span className="text-xs text-gray-400">None selected = all active subscribers</span>}
            </div>
          </div>
          <div><Label>Message</Label><Textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={10} placeholder="Type your WhatsApp message here..." /></div>
          <div><Label>Media URL (optional image)</Label><Input value={mediaUrl} onChange={(e) => setMediaUrl(e.target.value)} placeholder="https://example.com/image.jpg" /></div>
          <div><Label>Schedule (optional)</Label><Input type="datetime-local" value={scheduledAt} onChange={(e) => setScheduledAt(e.target.value)} /></div>
          <div className="flex gap-3">
            <Button onClick={handleSend} disabled={sending} className="flex-1 bg-[#5F8768] hover:bg-[#4A6B52] gap-2">
              {sending ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              {sending ? 'Sending...' : 'Send Now'}
            </Button>
            <Button variant="outline" onClick={() => setPreview(!preview)} className="gap-1.5"><Eye className="w-4 h-4" /> Preview</Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {preview && (
          <Card className="border-0 shadow-sm">
            <CardHeader><CardTitle className="text-base">WhatsApp Preview</CardTitle></CardHeader>
            <CardContent>
              <div className="bg-[#ECE5DD] rounded-xl p-4 max-w-sm mx-auto">
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <p className="text-sm text-[#2F3A33] whitespace-pre-wrap leading-relaxed">{message || 'Your message...'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        <Card className="border-0 shadow-sm">
          <CardHeader><CardTitle className="text-base">Quick Templates</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {TEMPLATES.map((tmpl) => (
              <div key={tmpl.label} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">{tmpl.label}</span>
                <Button size="sm" variant="outline" onClick={() => setMessage(tmpl.msg)}>Use</Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

const TEMPLATES = [
  { label: 'Property Alert', msg: '\ud83c\udfe1 NEW PROPERTY ALERT\n\nA beautiful property is now available for sale.\n\n\ud83d\udccd Location: [Location]\n\ud83d\udcb0 Price: [Price]\n\nView full details: [Property Link]\n\n\ud83d\udcde Dwell Chronicles\n\ud83c\udf10 https://dwellchroniclesgh.com' },
  { label: 'Video Alert', msg: '\ud83d\udfa5 NEW PROPERTY VIDEO\n\nTake a virtual tour of our latest property.\n\n\ud83c\udfe1 [Property Title]\n\nWatch: [YouTube Link]\n\nhttps://dwellchroniclesgh.com' },
  { label: 'Welcome Message', msg: '\ud83d\udce3 Welcome to Dwell Chronicles!\n\nThank you for subscribing. You will receive notifications about new listings and exclusive offers.\n\nBrowse: https://dwellchroniclesgh.com\n\ud83d\udcde +233 20 470 0023' },
];
