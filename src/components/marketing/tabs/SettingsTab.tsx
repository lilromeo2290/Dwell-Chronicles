'use client';

import { useState, useEffect, useCallback } from 'react';
import { MessageSquare, Youtube, Save, RefreshCw, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export function SettingsTab() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [ytStatus, setYtStatus] = useState('');

  const fetchSettings = useCallback(async () => {
    try {
      const res = await fetch('/api/marketing/settings');
      const data = await res.json();
      setSettings(data.settings || {});
    } catch { /* ignore */ }
  }, []);

  useEffect(() => { fetchSettings(); }, [fetchSettings]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/marketing/settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ settings }) });
      const data = await res.json();
      if (data.error) { toast.error(data.error); return; }
      toast.success('Settings saved');
    } catch { toast.error('Failed'); }
    finally { setSaving(false); }
  };

  const checkYouTube = async () => {
    setYtStatus('Checking...');
    try {
      const res = await fetch('/api/marketing/youtube?action=check');
      const data = await res.json();
      if (data.newVideos && data.newVideos.length > 0) setYtStatus('Found ' + data.newVideos.length + ' new video(s)!');
      else setYtStatus(data.message || 'No new videos found.');
    } catch { setYtStatus('Connection failed'); }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2"><MessageSquare className="w-5 h-5 text-[#5F8768]" /> WhatsApp Business API</CardTitle>
          <CardDescription>Set your credentials to enable real WhatsApp sending. Without tokens, the system runs in demo mode (simulated sends).</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div><Label>Access Token</Label><Input type="password" value={settings['wa_access_token'] || ''} onChange={(e) => setSettings({ ...settings, 'wa_access_token': e.target.value })} placeholder="EAAx..." /></div>
          <div><Label>Phone Number ID</Label><Input value={settings['wa_phone_number_id'] || ''} onChange={(e) => setSettings({ ...settings, 'wa_phone_number_id': e.target.value })} placeholder="1234567890" /></div>
          <div><Label>Business Account ID</Label><Input value={settings['wa_business_account_id'] || ''} onChange={(e) => setSettings({ ...settings, 'wa_business_account_id': e.target.value })} placeholder="Optional" /></div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2"><Youtube className="w-5 h-5 text-red-500" /> YouTube API</CardTitle>
          <CardDescription>Configure to auto-detect new videos from your channel.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div><Label>YouTube API Key</Label><Input type="password" value={settings['youtube_api_key'] || ''} onChange={(e) => setSettings({ ...settings, 'youtube_api_key': e.target.value })} placeholder="AIza..." /></div>
          <div><Label>Channel ID</Label><Input value={settings['youtube_channel_id'] || ''} onChange={(e) => setSettings({ ...settings, 'youtube_channel_id': e.target.value })} placeholder="UC..." /></div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={checkYouTube} className="gap-1.5"><RefreshCw className="w-4 h-4" /> Check for New Videos</Button>
            {ytStatus && <span className="text-sm text-gray-600">{ytStatus}</span>}
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2"><Shield className="w-5 h-5 text-gray-500" /> Security</CardTitle>
          <CardDescription>API authentication and rate limiting settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div><Label>Rate Limit (messages/minute)</Label><Input type="number" value={settings['rate_limit'] || '30'} onChange={(e) => setSettings({ ...settings, 'rate_limit': e.target.value })} /></div>
          <div><Label>Max Retries per Notification</Label><Input type="number" value={settings['max_retries'] || '3'} onChange={(e) => setSettings({ ...settings, 'max_retries': e.target.value })} /></div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} disabled={saving} className="bg-[#5F8768] hover:bg-[#4A6B52] gap-2 w-full sm:w-auto">
        <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save All Settings'}
      </Button>
    </div>
  );
}
