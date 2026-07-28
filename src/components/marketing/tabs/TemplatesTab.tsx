'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, Copy } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

export function TemplatesTab() {
  const [templates, setTemplates] = useState<any[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ name: '', type: 'custom', content: '', description: '' });

  const fetchTemplates = useCallback(async () => {
    try {
      const res = await fetch('/api/marketing/templates');
      const data = await res.json();
      setTemplates(data.templates || []);
    } catch { /* ignore */ }
  }, []);

  useEffect(() => { fetchTemplates(); }, [fetchTemplates]);

  const handleCreate = async () => {
    if (!form.name || !form.content) { toast.error('Name and content required'); return; }
    try {
      const res = await fetch('/api/marketing/templates', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json();
      if (data.error) { toast.error(data.error); return; }
      toast.success('Template created');
      setShowCreate(false); setForm({ name: '', type: 'custom', content: '', description: '' }); fetchTemplates();
    } catch { toast.error('Failed'); }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{templates.length} templates</p>
        <Button onClick={() => setShowCreate(true)} className="bg-[#5F8768] hover:bg-[#4A6B52] gap-1.5"><Plus className="w-4 h-4" /> New Template</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((tmpl: any) => (
          <Card key={tmpl.id} className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">{tmpl.name}</CardTitle>
                <Badge variant="secondary">{tmpl.type}</Badge>
              </div>
              {tmpl.description && <CardDescription>{tmpl.description}</CardDescription>}
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 rounded-lg p-3 max-h-40 overflow-y-auto">
                <p className="text-xs text-gray-600 whitespace-pre-wrap">{tmpl.content.slice(0, 200)}{tmpl.content.length > 200 ? '...' : ''}</p>
              </div>
              <Button size="sm" variant="outline" className="mt-3 gap-1" onClick={() => { navigator.clipboard.writeText(tmpl.content); toast.success('Copied'); }}><Copy className="w-3 h-3" /> Copy</Button>
            </CardContent>
          </Card>
        ))}
        {templates.length === 0 && <p className="text-sm text-gray-400 col-span-3 text-center py-12">No templates yet.</p>}
      </div>

      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Create Template</DialogTitle></DialogHeader>
          <div className="grid gap-4">
            <div><Label>Name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div><Label>Type</Label>
              <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="property">Property</SelectItem><SelectItem value="video">Video</SelectItem><SelectItem value="welcome">Welcome</SelectItem><SelectItem value="custom">Custom</SelectItem></SelectContent>
              </Select>
            </div>
            <div><Label>Description</Label><Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
            <div><Label>Content</Label><Textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={8} /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button><Button onClick={handleCreate} className="bg-[#5F8768] hover:bg-[#4A6B52]">Create</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
