'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Search, Upload, Trash2, Edit, UserPlus, Plus,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

export function SubscribersTab() {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [groups, setGroups] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [showAdd, setShowAdd] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [editSub, setEditSub] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchSubscribers = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: '15', search });
      const res = await fetch('/api/marketing/subscribers?' + params);
      const data = await res.json();
      setSubscribers(data.subscribers || []);
      setTotal(data.total || 0);
    } catch { toast.error('Failed to load subscribers'); }
    finally { setLoading(false); }
  }, [page, search]);

  const fetchGroups = useCallback(async () => {
    try {
      const res = await fetch('/api/marketing/groups');
      const data = await res.json();
      setGroups(data.groups || []);
    } catch { /* ignore */ }
  }, []);

  useEffect(() => { fetchSubscribers(); fetchGroups(); }, [fetchSubscribers, fetchGroups]);

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append('file', file);
    try {
      const res = await fetch('/api/marketing/import', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.error) { toast.error(data.error); return; }
      toast.success('Imported ' + data.imported + '. Duplicates: ' + data.duplicates + '. Errors: ' + data.errors);
      setShowImport(false);
      fetchSubscribers();
    } catch { toast.error('Import failed'); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this subscriber?')) return;
    try {
      await fetch('/api/marketing/subscribers/' + id, { method: 'DELETE' });
      toast.success('Deleted');
      fetchSubscribers();
    } catch { toast.error('Delete failed'); }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input placeholder="Search subscribers..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="pl-9" />
        </div>
        <Button onClick={() => setShowAdd(true)} className="bg-[#5F8768] hover:bg-[#4A6B52] gap-1.5"><UserPlus className="w-4 h-4" /> Add</Button>
        <Button variant="outline" onClick={() => setShowImport(true)} className="gap-1.5"><Upload className="w-4 h-4" /> Import CSV</Button>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge variant="outline" className="cursor-pointer">All ({total})</Badge>
        {groups.map((g: any) => (
          <Badge key={g.id} variant="outline" className="cursor-pointer" style={{ borderColor: g.color }}>{g.name} ({g._count.members})</Badge>
        ))}
        <CreateGroupDialog onCreated={fetchGroups} />
      </div>

      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Name</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500 hidden md:table-cell">Phone</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500 hidden lg:table-cell">Region</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500 hidden lg:table-cell">Preference</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">Status</th>
                  <th className="text-right px-4 py-3 font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading && Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-gray-50"><td colSpan={6} className="px-4 py-3"><Skeleton className="h-8 w-full" /></td></tr>
                ))}
                {!loading && subscribers.length === 0 && (
                  <tr><td colSpan={6} className="px-4 py-12 text-center text-gray-400">No subscribers yet. Add or import contacts.</td></tr>
                )}
                {subscribers.map((sub: any) => (
                  <tr key={sub.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#5F8768]/10 flex items-center justify-center text-xs font-bold text-[#5F8768]">
                          {sub.fullName.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                        </div>
                        <p className="font-medium text-[#2F3A33]">{sub.fullName}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{sub.phone}</td>
                    <td className="px-4 py-3 text-gray-600 hidden lg:table-cell">{sub.preferredRegion || '-'}</td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {sub.preferredPropertyType && <Badge variant="secondary" className="text-xs">{sub.preferredPropertyType}</Badge>}
                        {sub.preferredStatus && <Badge variant="secondary" className="text-xs">{sub.preferredStatus}</Badge>}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge className={sub.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}>
                        {sub.active ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setEditSub(sub)}><Edit className="w-3.5 h-3.5" /></Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-red-500" onClick={() => handleDelete(sub.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {total > 15 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">{(page - 1) * 15 + 1}-{Math.min(page * 15, total)} of {total}</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</Button>
            <Button variant="outline" size="sm" disabled={page * 15 >= total} onClick={() => setPage(page + 1)}>Next</Button>
          </div>
        </div>
      )}

      <AddSubscriberDialog open={showAdd} onClose={() => setShowAdd(false)} onSaved={fetchSubscribers} groups={groups} />
      {editSub && <EditSubscriberDialog subscriber={editSub} onClose={() => setEditSub(null)} onSaved={fetchSubscribers} />}

      <Dialog open={showImport} onOpenChange={setShowImport}>
        <DialogContent>
          <DialogHeader><DialogTitle>Import Contacts from CSV</DialogTitle></DialogHeader>
          <div className="text-sm text-gray-500 mb-4">Upload a CSV with columns: name/fullName, phone/whatsapp, email, location. Duplicates are skipped.</div>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
            <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
            <p className="text-sm text-gray-500 mb-3">Select a CSV file</p>
            <Input type="file" accept=".csv" onChange={handleImport} className="max-w-xs mx-auto" />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function AddSubscriberDialog({ open, onClose, onSaved, groups }: { open: boolean; onClose: () => void; onSaved: () => void; groups: any[] }) {
  const [form, setForm] = useState({ fullName: '', phone: '', email: '', location: '', preferredPropertyType: '', preferredBudget: '', preferredRegion: '', preferredDistrict: '', preferredStatus: '', groupIds: [] as string[] });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!form.fullName || !form.phone) { toast.error('Name and phone are required'); return; }
    setSaving(true);
    try {
      const res = await fetch('/api/marketing/subscribers', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json();
      if (data.error) { toast.error(data.error); return; }
      toast.success(data.updated ? 'Subscriber updated' : 'Subscriber added');
      onClose(); onSaved();
    } catch { toast.error('Failed'); }
    finally { setSaving(false); }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>Add Subscriber</DialogTitle></DialogHeader>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Full Name *</Label><Input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} placeholder="Kwame Mensah" /></div>
            <div><Label>Phone *</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+233241234567" /></div>
          </div>
          <div><Label>Email</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
          <div><Label>Location</Label><Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Preferred Type</Label>
              <Select value={form.preferredPropertyType} onValueChange={(v) => setForm({ ...form, preferredPropertyType: v })}>
                <SelectTrigger><SelectValue placeholder="Any" /></SelectTrigger>
                <SelectContent><SelectItem value="">Any</SelectItem><SelectItem value="house">House</SelectItem><SelectItem value="apartment">Apartment</SelectItem><SelectItem value="land">Land</SelectItem><SelectItem value="commercial">Commercial</SelectItem></SelectContent>
              </Select>
            </div>
            <div><Label>Status</Label>
              <Select value={form.preferredStatus} onValueChange={(v) => setForm({ ...form, preferredStatus: v })}>
                <SelectTrigger><SelectValue placeholder="Any" /></SelectTrigger>
                <SelectContent><SelectItem value="">Any</SelectItem><SelectItem value="sale">For Sale</SelectItem><SelectItem value="rent">For Rent</SelectItem></SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Region</Label><Input value={form.preferredRegion} onChange={(e) => setForm({ ...form, preferredRegion: e.target.value })} /></div>
            <div><Label>Budget</Label><Input value={form.preferredBudget} onChange={(e) => setForm({ ...form, preferredBudget: e.target.value })} /></div>
          </div>
          <div><Label>Groups</Label>
            <div className="flex flex-wrap gap-2 mt-1">
              {groups.map((g: any) => (
                <Badge key={g.id} variant={form.groupIds.includes(g.id) ? 'default' : 'outline'} className="cursor-pointer"
                  onClick={() => setForm({ ...form, groupIds: form.groupIds.includes(g.id) ? form.groupIds.filter((id: string) => id !== g.id) : [...form.groupIds, g.id] })}>{g.name}</Badge>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter><Button variant="outline" onClick={onClose}>Cancel</Button><Button onClick={handleSave} disabled={saving} className="bg-[#5F8768] hover:bg-[#4A6B52]">Add</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function EditSubscriberDialog({ subscriber, onClose, onSaved }: { subscriber: any; onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState({
    fullName: subscriber.fullName, phone: subscriber.phone, whatsappNumber: subscriber.whatsappNumber || '',
    email: subscriber.email || '', location: subscriber.location || '',
    preferredPropertyType: subscriber.preferredPropertyType || '', preferredBudget: subscriber.preferredBudget || '',
    preferredRegion: subscriber.preferredRegion || '', preferredDistrict: subscriber.preferredDistrict || '',
    preferredStatus: subscriber.preferredStatus || '', active: subscriber.active, whatsappConsent: subscriber.whatsappConsent,
    notes: subscriber.notes || '',
  });

  const handleSave = async () => {
    try {
      const res = await fetch('/api/marketing/subscribers/' + subscriber.id, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json();
      if (data.error) { toast.error(data.error); return; }
      toast.success('Updated'); onClose(); onSaved();
    } catch { toast.error('Failed'); }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>Edit Subscriber</DialogTitle></DialogHeader>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Full Name</Label><Input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} /></div>
            <div><Label>Phone</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label>WhatsApp</Label><Input value={form.whatsappNumber} onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })} /></div>
            <div><Label>Email</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
          </div>
          <div><Label>Location</Label><Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Preferred Type</Label>
              <Select value={form.preferredPropertyType} onValueChange={(v) => setForm({ ...form, preferredPropertyType: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="">Any</SelectItem><SelectItem value="house">House</SelectItem><SelectItem value="apartment">Apartment</SelectItem><SelectItem value="land">Land</SelectItem><SelectItem value="commercial">Commercial</SelectItem></SelectContent>
              </Select>
            </div>
            <div><Label>Status</Label>
              <Select value={form.preferredStatus} onValueChange={(v) => setForm({ ...form, preferredStatus: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="">Any</SelectItem><SelectItem value="sale">For Sale</SelectItem><SelectItem value="rent">For Rent</SelectItem></SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><Label>Region</Label><Input value={form.preferredRegion} onChange={(e) => setForm({ ...form, preferredRegion: e.target.value })} /></div>
            <div><Label>Budget</Label><Input value={form.preferredBudget} onChange={(e) => setForm({ ...form, preferredBudget: e.target.value })} /></div>
          </div>
          <div><Label>Notes</Label><Textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3} /></div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3"><Switch checked={form.active} onCheckedChange={(v) => setForm({ ...form, active: v })} /><Label>Active</Label></div>
            <div className="flex items-center gap-3"><Switch checked={form.whatsappConsent} onCheckedChange={(v) => setForm({ ...form, whatsappConsent: v })} /><Label>WhatsApp Consent</Label></div>
          </div>
        </div>
        <DialogFooter><Button variant="outline" onClick={onClose}>Cancel</Button><Button onClick={handleSave} className="bg-[#5F8768] hover:bg-[#4A6B52]">Save</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function CreateGroupDialog({ onCreated }: { onCreated: () => void }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [color, setColor] = useState('#5F8768');

  const handleSave = async () => {
    if (!name) return;
    try {
      const res = await fetch('/api/marketing/groups', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, description: desc, color }) });
      const data = await res.json();
      if (data.error) { toast.error(data.error); return; }
      toast.success('Group created');
      setOpen(false); setName(''); setDesc(''); onCreated();
    } catch { toast.error('Failed'); }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild><Badge variant="outline" className="cursor-pointer hover:bg-[#5F8768] hover:text-white transition-colors gap-1"><Plus className="w-3 h-3" /> New Group</Badge></DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Create Group</DialogTitle></DialogHeader>
        <div className="grid gap-4">
          <div><Label>Name</Label><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Buyers" /></div>
          <div><Label>Description</Label><Textarea value={desc} onChange={(e) => setDesc(e.target.value)} rows={2} /></div>
          <div><Label>Color</Label><Input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-16 h-8" /></div>
        </div>
        <DialogFooter><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={handleSave} className="bg-[#5F8768] hover:bg-[#4A6B52]">Create</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}