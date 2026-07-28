'use client';

import { useState, useEffect, useCallback } from 'react';
import { Zap, Plus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

export function AutomationTab() {
  const [rules, setRules] = useState<any[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ name: '', triggerType: 'new_property', targetType: 'all' });

  const fetchRules = useCallback(async () => {
    try {
      const res = await fetch('/api/marketing/automation');
      const data = await res.json();
      setRules(data.rules || []);
    } catch { /* ignore */ }
  }, []);

  useEffect(() => { fetchRules(); }, [fetchRules]);

  const handleCreate = async () => {
    if (!form.name) { toast.error('Name required'); return; }
    try {
      const res = await fetch('/api/marketing/automation', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json();
      if (data.error) { toast.error(data.error); return; }
      toast.success('Rule created');
      setShowCreate(false); setForm({ name: '', triggerType: 'new_property', targetType: 'all' }); fetchRules();
    } catch { toast.error('Failed'); }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{rules.length} rules</p>
        <Button onClick={() => setShowCreate(true)} className="bg-[#5F8768] hover:bg-[#4A6B52] gap-1.5"><Plus className="w-4 h-4" /> New Rule</Button>
      </div>

      <div className="space-y-3">
        {rules.length === 0 && (
          <Card className="border-0 shadow-sm">
            <CardContent className="py-12 text-center text-gray-400">
              <Zap className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p>No automation rules yet.</p>
            </CardContent>
          </Card>
        )}
        {rules.map((rule: any) => (
          <Card key={rule.id} className="border-0 shadow-sm">
            <CardContent className="p-4 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#5F8768]/10 flex items-center justify-center"><Zap className="w-5 h-5 text-[#5F8768]" /></div>
                <div>
                  <p className="font-medium text-[#2F3A33]">{rule.name}</p>
                  <p className="text-xs text-gray-500">IF {rule.triggerType === 'new_property' ? 'New Property Published' : 'New YouTube Video'} THEN notify {rule.targetType === 'all' ? 'All' : 'Group'}</p>
                </div>
              </div>
              <Badge className={rule.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}>{rule.isActive ? 'Active' : 'Disabled'}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent>
          <DialogHeader><DialogTitle>Create Automation Rule</DialogTitle></DialogHeader>
          <div className="grid gap-4">
            <div><Label>Rule Name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div><Label>Trigger</Label>
              <Select value={form.triggerType} onValueChange={(v) => setForm({ ...form, triggerType: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="new_property">New Property Published</SelectItem><SelectItem value="new_video">New YouTube Video</SelectItem></SelectContent>
              </Select>
            </div>
            <div><Label>Target</Label>
              <Select value={form.targetType} onValueChange={(v) => setForm({ ...form, targetType: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="all">All Subscribers</SelectItem><SelectItem value="group">Specific Group</SelectItem><SelectItem value="consented">WhatsApp Consented</SelectItem></SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button><Button onClick={handleCreate} className="bg-[#5F8768] hover:bg-[#4A6B52]">Create</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}