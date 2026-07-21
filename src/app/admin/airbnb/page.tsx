'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import Link from 'next/link';
import {
  Plus,
  Edit,
  Trash2,
  Calendar,
  Save,
  X,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Download,
  Phone,
  Mail,
  MapPin,
  Star,
  Home,
  Settings,
  MessageCircle,
  ArrowUp,
  ArrowDown,
  Loader2,
  ChevronUp,
  ChevronDown,
  Users,
  Wrench,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  Building2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';

// ─── Constants ────────────────────────────────────────────────────────────────

const BRAND = {
  sage: '#5F8768',
  lightStone: '#D8D5CC',
  offWhite: '#F8F7F3',
  charcoal: '#2F3A33',
} as const;

const CITIES = ['Ho', 'Accra'] as const;

const AMENITIES_LIST = [
  'Wi-Fi',
  'Smart TV',
  'Air Conditioning',
  'Kitchen',
  'Refrigerator',
  'Microwave',
  'Washing Machine',
  'Hot Water',
  'Parking',
  'Balcony',
  'Swimming Pool',
  'Security',
  'Generator',
  'Workspace',
] as const;

const STATUS_OPTIONS = ['available', 'reserved', 'booked', 'maintenance'] as const;
const CATEGORY_OPTIONS = ['standard', 'luxury', 'executive', 'budget'] as const;

const STATUS_CONFIG: Record<
  string,
  { label: string; bg: string; text: string; dot: string }
> = {
  available: {
    label: 'Available',
    bg: 'bg-emerald-100',
    text: 'text-emerald-800',
    dot: 'bg-emerald-500',
  },
  reserved: {
    label: 'Reserved',
    bg: 'bg-amber-100',
    text: 'text-amber-800',
    dot: 'bg-amber-500',
  },
  booked: {
    label: 'Booked',
    bg: 'bg-red-100',
    text: 'text-red-800',
    dot: 'bg-red-500',
  },
  maintenance: {
    label: 'Maintenance',
    bg: 'bg-gray-100',
    text: 'text-gray-700',
    dot: 'bg-gray-500',
  },
};

const ENQUIRY_STATUS_CONFIG: Record<
  string,
  { label: string; bg: string; text: string }
> = {
  new: { label: 'New', bg: 'bg-blue-100', text: 'text-blue-800' },
  confirmed: { label: 'Confirmed', bg: 'bg-emerald-100', text: 'text-emerald-800' },
  cancelled: { label: 'Cancelled', bg: 'bg-red-100', text: 'text-red-800' },
};

const AVAIL_COLORS: Record<string, { bg: string; hover: string; label: string }> = {
  available: { bg: 'bg-emerald-500', hover: 'hover:bg-emerald-600', label: 'Available' },
  booked: { bg: 'bg-red-500', hover: 'hover:bg-red-600', label: 'Booked' },
  reserved: { bg: 'bg-amber-400', hover: 'hover:bg-amber-500', label: 'Reserved' },
  maintenance: { bg: 'bg-gray-400', hover: 'hover:bg-gray-500', label: 'Maintenance' },
};

// ─── Types ────────────────────────────────────────────────────────────────────

interface ApartmentImage {
  id?: string;
  url: string;
  alt?: string;
  sortOrder?: number;
}

interface Apartment {
  id: string;
  name: string;
  code: string;
  description: string;
  address: string;
  city: string;
  area: string;
  latitude?: string | null;
  longitude?: string | null;
  pricePerNight: number;
  weeklyPrice?: number | null;
  monthlyPrice?: number | null;
  cleaningFee?: number | null;
  securityDeposit?: number | null;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  rating: number;
  status: string;
  category: string;
  featured: boolean;
  newlyAdded: boolean;
  amenities: string;
  whatsappNumber: string;
  images: ApartmentImage[];
  createdAt: string;
}

interface Enquiry {
  id: string;
  apartmentId: string;
  apartment: { id: string; name: string; code: string };
  fullName: string;
  phoneNumber: string;
  email: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  specialRequests?: string | null;
  status: string;
  createdAt: string;
}

interface AvailabilityDate {
  date: string;
  status: string;
}

// ─── Zod Schema ───────────────────────────────────────────────────────────────

const apartmentSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  code: z.string().min(1, 'Code is required'),
  description: z.string().min(1, 'Description is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  area: z.string().min(1, 'Area is required'),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  pricePerNight: z.coerce.number().min(0, 'Price must be positive'),
  weeklyPrice: z.coerce.number().optional().nullable(),
  monthlyPrice: z.coerce.number().optional().nullable(),
  cleaningFee: z.coerce.number().optional().nullable(),
  securityDeposit: z.coerce.number().optional().nullable(),
  bedrooms: z.coerce.number().int().min(0),
  bathrooms: z.coerce.number().int().min(0),
  maxGuests: z.coerce.number().int().min(1),
  rating: z.coerce.number().min(0).max(5),
  status: z.string(),
  category: z.string(),
  featured: z.boolean(),
  newlyAdded: z.boolean(),
  whatsappNumber: z.string(),
  amenities: z.array(z.string()),
  images: z
    .array(
      z.object({
        url: z.string().min(1, 'Image URL is required'),
        alt: z.string().optional(),
        sortOrder: z.number().optional(),
      })
    )
    .min(1, 'At least one image is required'),
});

type ApartmentFormValues = z.infer<typeof apartmentSchema>;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatCurrency(amount: number | null | undefined): string {
  if (amount === null || amount === undefined) return '—';
  return `GH\u20B5${amount.toLocaleString()}`;
}

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

function formatDateTime(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return dateStr;
  }
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function getMonthName(year: number, month: number): string {
  return new Date(year, month, 1).toLocaleString('en-US', {
    month: 'long',
    year: 'numeric',
  });
}

function parseAmenities(amenitiesStr: string): string[] {
  try {
    const parsed = JSON.parse(amenitiesStr);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeInUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.25 },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.05 } },
};

// ─── Sub-Components ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.available;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${cfg.bg} ${cfg.text}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

function EnquiryStatusBadge({ status }: { status: string }) {
  const cfg = ENQUIRY_STATUS_CONFIG[status] || ENQUIRY_STATUS_CONFIG.new;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${cfg.bg} ${cfg.text}`}
    >
      {cfg.label}
    </span>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <motion.div {...fadeInUp}>
      <Card className="border border-gray-200/80 shadow-sm">
        <CardContent className="flex items-center gap-3 p-4">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
            style={{ backgroundColor: `${color}15` }}
          >
            <Icon className="h-5 w-5" style={{ color }} />
          </div>
          <div>
            <p className="text-2xl font-bold tracking-tight" style={{ color }}>
              {value}
            </p>
            <p className="text-xs text-gray-500 font-medium">{label}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-24 flex-1 rounded-xl" />
        ))}
      </div>
      <Skeleton className="h-10 w-full rounded-lg" />
      <Skeleton className="h-64 w-full rounded-xl" />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AdminDashboard() {
  // Tab state
  const [activeTab, setActiveTab] = useState('apartments');

  // Data state
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [enquiriesLoading, setEnquiriesLoading] = useState(true);

  // Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [enquiryStatusFilter, setEnquiryStatusFilter] = useState('all');

  // Apartment form sheet state
  const [formSheetOpen, setFormSheetOpen] = useState(false);
  const [editingApartment, setEditingApartment] = useState<Apartment | null>(null);
  const [formSubmitting, setFormSubmitting] = useState(false);

  // Availability sheet state
  const [availSheetOpen, setAvailSheetOpen] = useState(false);
  const [availApartment, setAvailApartment] = useState<Apartment | null>(null);
  const [availMonth, setAvailMonth] = useState(new Date().getMonth());
  const [availYear, setAvailYear] = useState(new Date().getFullYear());
  const [availDates, setAvailDates] = useState<AvailabilityDate[]>([]);
  const [selectedDates, setSelectedDates] = useState<Set<string>>(new Set());
  const [availLoading, setAvailLoading] = useState(false);
  const [availSaving, setAvailSaving] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<string | null>(null);

  // Delete dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingApartment, setDeletingApartment] = useState<Apartment | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Enquiry delete dialog
  const [enquiryDeleteDialogOpen, setEnquiryDeleteDialogOpen] = useState(false);
  const [deletingEnquiry, setDeletingEnquiry] = useState<Enquiry | null>(null);
  const [enquiryDeleteLoading, setEnquiryDeleteLoading] = useState(false);

  // Settings state
  const [whatsappNumber, setWhatsappNumber] = useState('233204700023');
  const [updateWhatsappLoading, setUpdateWhatsappLoading] = useState(false);

  // ─── Form Setup ─────────────────────────────────────────────────────────────

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ApartmentFormValues>({
    resolver: zodResolver(apartmentSchema),
    defaultValues: {
      name: '',
      code: '',
      description: '',
      address: '',
      city: 'Ho',
      area: '',
      latitude: '',
      longitude: '',
      pricePerNight: 0,
      weeklyPrice: null,
      monthlyPrice: null,
      cleaningFee: null,
      securityDeposit: null,
      bedrooms: 1,
      bathrooms: 1,
      maxGuests: 2,
      rating: 4.5,
      status: 'available',
      category: 'standard',
      featured: false,
      newlyAdded: true,
      whatsappNumber: '233204700023',
      amenities: [],
      images: [{ url: '', alt: '', sortOrder: 0 }],
    },
  });

  const formImages = watch('images');
  const formAmenities = watch('amenities');

  // ─── Data Fetching ──────────────────────────────────────────────────────────

  const fetchApartments = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({ limit: '50' });
      if (searchQuery) params.set('search', searchQuery);
      if (statusFilter !== 'all') params.set('status', statusFilter);
      if (categoryFilter !== 'all') params.set('category', categoryFilter);
      const res = await fetch(`/api/apartments?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch apartments');
      const data = await res.json();
      setApartments(data.apartments || []);
    } catch (err) {
      toast.error('Failed to load apartments');
    } finally {
      setLoading(false);
    }
  }, [searchQuery, statusFilter, categoryFilter]);

  const fetchEnquiries = useCallback(async () => {
    try {
      setEnquiriesLoading(true);
      const res = await fetch('/api/enquiries');
      if (!res.ok) throw new Error('Failed to fetch enquiries');
      const data = await res.json();
      setEnquiries(data.enquiries || []);
    } catch {
      toast.error('Failed to load enquiries');
    } finally {
      setEnquiriesLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApartments();
  }, [fetchApartments]);

  useEffect(() => {
    if (activeTab === 'enquiries') fetchEnquiries();
  }, [activeTab, fetchEnquiries]);

  // ─── Availability Fetching ──────────────────────────────────────────────────

  const fetchAvailability = useCallback(async () => {
    if (!availApartment) return;
    try {
      setAvailLoading(true);
      const monthStr = `${availYear}-${String(availMonth + 1).padStart(2, '0')}`;
      const res = await fetch(
        `/api/apartments/${availApartment.id}/availability?month=${monthStr}`
      );
      if (!res.ok) throw new Error('Failed to fetch availability');
      const data = await res.json();
      setAvailDates(data.dates || []);
      setSelectedDates(new Set());
    } catch {
      toast.error('Failed to load availability');
    } finally {
      setAvailLoading(false);
    }
  }, [availApartment, availMonth, availYear]);

  useEffect(() => {
    if (availSheetOpen && availApartment) fetchAvailability();
  }, [availSheetOpen, availApartment, fetchAvailability]);

  // ─── Stats Computation ──────────────────────────────────────────────────────

  const stats = {
    total: apartments.length,
    available: apartments.filter((a) => a.status === 'available').length,
    booked: apartments.filter((a) => a.status === 'booked').length,
    maintenance: apartments.filter((a) => a.status === 'maintenance').length,
  };

  // ─── Filtered Enquiries ────────────────────────────────────────────────────

  const filteredEnquiries =
    enquiryStatusFilter === 'all'
      ? enquiries
      : enquiries.filter((e) => e.status === enquiryStatusFilter);

  // ─── Apartment Form Handlers ────────────────────────────────────────────────

  const openAddForm = () => {
    setEditingApartment(null);
    reset({
      name: '',
      code: '',
      description: '',
      address: '',
      city: 'Ho',
      area: '',
      latitude: '',
      longitude: '',
      pricePerNight: 0,
      weeklyPrice: null,
      monthlyPrice: null,
      cleaningFee: null,
      securityDeposit: null,
      bedrooms: 1,
      bathrooms: 1,
      maxGuests: 2,
      rating: 4.5,
      status: 'available',
      category: 'standard',
      featured: false,
      newlyAdded: true,
      whatsappNumber: '233204700023',
      amenities: [],
      images: [{ url: '', alt: '', sortOrder: 0 }],
    });
    setFormSheetOpen(true);
  };

  const openEditForm = (apt: Apartment) => {
    setEditingApartment(apt);
    reset({
      name: apt.name,
      code: apt.code,
      description: apt.description,
      address: apt.address,
      city: apt.city,
      area: apt.area,
      latitude: apt.latitude || '',
      longitude: apt.longitude || '',
      pricePerNight: apt.pricePerNight,
      weeklyPrice: apt.weeklyPrice,
      monthlyPrice: apt.monthlyPrice,
      cleaningFee: apt.cleaningFee,
      securityDeposit: apt.securityDeposit,
      bedrooms: apt.bedrooms,
      bathrooms: apt.bathrooms,
      maxGuests: apt.maxGuests,
      rating: apt.rating,
      status: apt.status,
      category: apt.category,
      featured: apt.featured,
      newlyAdded: apt.newlyAdded,
      whatsappNumber: apt.whatsappNumber,
      amenities: parseAmenities(apt.amenities),
      images:
        apt.images.length > 0
          ? apt.images.map((img) => ({
              url: img.url,
              alt: img.alt || '',
              sortOrder: img.sortOrder || 0,
            }))
          : [{ url: '', alt: '', sortOrder: 0 }],
    });
    setFormSheetOpen(true);
  };

  const onFormSubmit = async (data: ApartmentFormValues) => {
    try {
      setFormSubmitting(true);
      const payload = {
        ...data,
        weeklyPrice: data.weeklyPrice || null,
        monthlyPrice: data.monthlyPrice || null,
        cleaningFee: data.cleaningFee || null,
        securityDeposit: data.securityDeposit || null,
        latitude: data.latitude || null,
        longitude: data.longitude || null,
        images: data.images.map((img, i) => ({
          ...img,
          sortOrder: img.sortOrder ?? i,
        })),
      };

      let res: Response;
      if (editingApartment) {
        res = await fetch(`/api/apartments/${editingApartment.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch('/api/apartments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to save apartment');
      }

      toast.success(
        editingApartment
          ? 'Apartment updated successfully'
          : 'Apartment created successfully'
      );
      setFormSheetOpen(false);
      fetchApartments();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to save apartment');
    } finally {
      setFormSubmitting(false);
    }
  };

  // ─── Image Management ───────────────────────────────────────────────────────

  const addImageField = () => {
    const current = formImages || [];
    setValue('images', [
      ...current,
      { url: '', alt: '', sortOrder: current.length },
    ]);
  };

  const removeImageField = (index: number) => {
    const current = formImages || [];
    if (current.length <= 1) {
      toast.error('At least one image is required');
      return;
    }
    setValue(
      'images',
      current
        .filter((_, i) => i !== index)
        .map((img, i) => ({ ...img, sortOrder: i }))
    );
  };

  const moveImageUp = (index: number) => {
    if (index === 0) return;
    const current = formImages || [];
    const newImages = [...current];
    const temp = newImages[index];
    newImages[index] = newImages[index - 1];
    newImages[index - 1] = temp;
    newImages.forEach((img, i) => (img.sortOrder = i));
    setValue('images', newImages);
  };

  const moveImageDown = (index: number) => {
    const current = formImages || [];
    if (index >= current.length - 1) return;
    const newImages = [...current];
    const temp = newImages[index];
    newImages[index] = newImages[index + 1];
    newImages[index + 1] = temp;
    newImages.forEach((img, i) => (img.sortOrder = i));
    setValue('images', newImages);
  };

  // ─── Amenity Toggle ─────────────────────────────────────────────────────────

  const toggleAmenity = (amenity: string) => {
    const current = formAmenities || [];
    if (current.includes(amenity)) {
      setValue(
        'amenities',
        current.filter((a) => a !== amenity)
      );
    } else {
      setValue('amenities', [...current, amenity]);
    }
  };

  // ─── Delete Handlers ────────────────────────────────────────────────────────

  const confirmDelete = (apt: Apartment) => {
    setDeletingApartment(apt);
    setDeleteDialogOpen(true);
  };

  const executeDelete = async () => {
    if (!deletingApartment) return;
    try {
      setDeleteLoading(true);
      const res = await fetch(`/api/apartments/${deletingApartment.id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete apartment');
      toast.success('Apartment deleted successfully');
      setDeleteDialogOpen(false);
      setDeletingApartment(null);
      fetchApartments();
    } catch {
      toast.error('Failed to delete apartment');
    } finally {
      setDeleteLoading(false);
    }
  };

  // ─── Availability Handlers ──────────────────────────────────────────────────

  const openAvailability = (apt: Apartment) => {
    setAvailApartment(apt);
    setAvailMonth(new Date().getMonth());
    setAvailYear(new Date().getFullYear());
    setAvailSheetOpen(true);
  };

  const getAvailStatus = (dateStr: string): string => {
    const found = availDates.find((d) => d.date === dateStr);
    return found?.status || 'available';
  };

  const cycleDateStatus = (dateStr: string) => {
    const current = getAvailStatus(dateStr);
    const statuses = ['available', 'booked', 'reserved', 'maintenance'];
    const idx = statuses.indexOf(current);
    const next = statuses[(idx + 1) % statuses.length];
    setAvailDates((prev) => {
      const existing = prev.find((d) => d.date === dateStr);
      if (existing) {
        return prev.map((d) => (d.date === dateStr ? { ...d, status: next } : d));
      }
      return [...prev, { date: dateStr, status: next }];
    });
  };

  const handleDateMouseDown = (dateStr: string, e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    dragStartRef.current = dateStr;
    setSelectedDates(new Set([dateStr]));
  };

  const handleDateMouseEnter = (dateStr: string) => {
    if (!isDragging) return;
    setSelectedDates((prev) => new Set(prev).add(dateStr));
  };

  const handleDateMouseUp = () => {
    setIsDragging(false);
    dragStartRef.current = null;
  };

  const markSelectedDates = (status: string) => {
    if (selectedDates.size === 0) {
      toast.info('No dates selected');
      return;
    }
    setAvailDates((prev) => {
      const updated = [...prev];
      selectedDates.forEach((dateStr) => {
        const idx = updated.findIndex((d) => d.date === dateStr);
        if (idx >= 0) {
          updated[idx] = { ...updated[idx], status };
        } else {
          updated.push({ date: dateStr, status });
        }
      });
      return updated;
    });
    setSelectedDates(new Set());
    toast.success(`${selectedDates.size} dates marked as ${status}`);
  };

  const blockNext7Days = () => {
    const today = new Date();
    const newDates: string[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      newDates.push(dateStr);
    }
    setAvailDates((prev) => {
      const updated = [...prev];
      newDates.forEach((dateStr) => {
        const idx = updated.findIndex((d) => d.date === dateStr);
        if (idx >= 0) {
          updated[idx] = { ...updated[idx], status: 'maintenance' };
        } else {
          updated.push({ date: dateStr, status: 'maintenance' });
        }
      });
      return updated;
    });
    toast.success('Next 7 days marked as maintenance');
  };

  const clearAllBookings = () => {
    setAvailDates((prev) => prev.map((d) => ({ ...d, status: 'available' })));
    toast.success('All dates set to available');
  };

  const saveAvailability = async () => {
    if (!availApartment) return;
    try {
      setAvailSaving(true);
      const res = await fetch(
        `/api/apartments/${availApartment.id}/availability`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ dates: availDates }),
        }
      );
      if (!res.ok) throw new Error('Failed to save availability');
      toast.success('Availability saved successfully');
      fetchApartments();
    } catch {
      toast.error('Failed to save availability');
    } finally {
      setAvailSaving(false);
    }
  };

  const prevMonth = () => {
    if (availMonth === 0) {
      setAvailMonth(11);
      setAvailYear((y) => y - 1);
    } else {
      setAvailMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (availMonth === 11) {
      setAvailMonth(0);
      setAvailYear((y) => y + 1);
    } else {
      setAvailMonth((m) => m + 1);
    }
  };

  // ─── Enquiry Handlers ───────────────────────────────────────────────────────

  const updateEnquiryStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error('Failed to update enquiry');
      toast.success(`Enquiry marked as ${status}`);
      fetchEnquiries();
    } catch {
      toast.error('Failed to update enquiry');
    }
  };

  const confirmDeleteEnquiry = (enq: Enquiry) => {
    setDeletingEnquiry(enq);
    setEnquiryDeleteDialogOpen(true);
  };

  const executeDeleteEnquiry = async () => {
    if (!deletingEnquiry) return;
    try {
      setEnquiryDeleteLoading(true);
      const res = await fetch(`/api/enquiries/${deletingEnquiry.id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete enquiry');
      toast.success('Enquiry deleted');
      setEnquiryDeleteDialogOpen(false);
      setDeletingEnquiry(null);
      fetchEnquiries();
    } catch {
      toast.error('Failed to delete enquiry');
    } finally {
      setEnquiryDeleteLoading(false);
    }
  };

  const exportCSV = () => {
    const headers = [
      'Date',
      'Guest Name',
      'Phone',
      'Email',
      'Apartment',
      'Code',
      'Check-In',
      'Check-Out',
      'Guests',
      'Status',
      'Special Requests',
    ];
    const rows = filteredEnquiries.map((e) => [
      e.createdAt,
      e.fullName,
      e.phoneNumber,
      e.email,
      e.apartment.name,
      e.apartment.code,
      e.checkIn,
      e.checkOut,
      e.guests,
      e.status,
      e.specialRequests || '',
    ]);
    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}",`)).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `enquiries-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('CSV exported successfully');
  };

  // ─── Settings Handlers ──────────────────────────────────────────────────────

  const updateAllWhatsapp = async () => {
    if (!whatsappNumber.trim()) {
      toast.error('Please enter a WhatsApp number');
      return;
    }
    try {
      setUpdateWhatsappLoading(true);
      let successCount = 0;
      let failCount = 0;
      const results = await Promise.allSettled(
        apartments.map((apt) =>
          fetch(`/api/apartments/${apt.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ whatsappNumber: whatsappNumber.trim() }),
          })
        )
      );
      results.forEach((r) => {
        if (r.status === 'fulfilled') successCount++;
        else failCount++;
      });
      if (failCount === 0) {
        toast.success(`Updated WhatsApp for all ${successCount} apartments`);
      } else {
        toast.warning(
          `Updated ${successCount} apartments, ${failCount} failed`
        );
      }
      fetchApartments();
    } catch {
      toast.error('Failed to update WhatsApp numbers');
    } finally {
      setUpdateWhatsappLoading(false);
    }
  };

  // ─── Calendar Rendering ─────────────────────────────────────────────────────

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(availYear, availMonth);
    const firstDay = getFirstDayOfMonth(availYear, availMonth);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const cells: React.ReactNode[] = [];

    // Day headers
    days.forEach((day) => {
      cells.push(
        <div
          key={`header-${day}`}
          className="text-xs font-semibold text-gray-500 text-center py-2"
        >
          {day}
        </div>
      );
    });

    // Empty cells before first day
    for (let i = 0; i < firstDay; i++) {
      cells.push(
        <div key={`empty-${i}`} className="aspect-square" />
      );
    }

    // Date cells
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${availYear}-${String(availMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const status = getAvailStatus(dateStr);
      const colorCfg = AVAIL_COLORS[status] || AVAIL_COLORS.available;
      const isSelected = selectedDates.has(dateStr);

      cells.push(
        <button
          key={dateStr}
          type="button"
          className={`
            relative aspect-square rounded-md text-xs font-medium flex items-center justify-center
            transition-all duration-150 cursor-pointer select-none
            ${colorCfg.bg} text-white ${colorCfg.hover}
            ${isSelected ? 'ring-2 ring-offset-2 ring-gray-800 scale-105' : 'opacity-90 hover:opacity-100'}
          `}
          onClick={() => cycleDateStatus(dateStr)}
          onMouseDown={(e) => handleDateMouseDown(dateStr, e)}
          onMouseEnter={() => handleDateMouseEnter(dateStr)}
          onMouseUp={handleDateMouseUp}
          title={`${dateStr} - ${colorCfg.label}`}
        >
          {d}
        </button>
      );
    }

    return cells;
  };

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: BRAND.offWhite }}
      onMouseUp={handleDateMouseUp}
      onMouseLeave={() => setIsDragging(false)}
    >
      {/* Top Bar */}
      <header
        className="sticky top-0 z-40 border-b backdrop-blur-md"
        style={{
          backgroundColor: `${BRAND.charcoal}ee`,
          borderColor: `${BRAND.sage}30`,
        }}
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Building2 className="h-5 w-5" style={{ color: BRAND.sage }} />
            <h1 className="text-sm sm:text-base font-semibold text-white truncate">
              Dwell Chronicles Admin — Apartment Management
            </h1>
          </div>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-300 hover:text-white transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Site
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 py-6">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          {/* Tab Navigation */}
          <TabsList
            className="mb-6 h-10 p-1 rounded-lg border"
            style={{
              backgroundColor: 'white',
              borderColor: `${BRAND.lightStone}`,
            }}
          >
            <TabsTrigger
              value="apartments"
              className="data-[state=active]:shadow-sm rounded-md px-4 gap-2"
              style={{
                ['--tw-ring-color' as string]: `${BRAND.sage}50`,
              }}
            >
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Apartments</span>
            </TabsTrigger>
            <TabsTrigger
              value="enquiries"
              className="data-[state=active]:shadow-sm rounded-md px-4 gap-2"
            >
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">Enquiries</span>
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:shadow-sm rounded-md px-4 gap-2"
            >
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          {/* ── TAB 1: APARTMENTS ── */}
          <TabsContent value="apartments">
            <AnimatePresence mode="wait">
              <motion.div
                key="apartments"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                {loading ? (
                  <LoadingSkeleton />
                ) : (
                  <div className="space-y-6">
                    {/* Add Button */}
                    <div className="flex justify-end">
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          onClick={openAddForm}
                          className="gap-2 text-white shadow-md hover:shadow-lg transition-shadow"
                          style={{ backgroundColor: BRAND.sage }}
                        >
                          <Plus className="h-4 w-4" />
                          Add New Apartment
                        </Button>
                      </motion.div>
                    </div>

                    {/* Stats Cards */}
                    <motion.div
                      className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
                      variants={staggerContainer}
                      initial="initial"
                      animate="animate"
                    >
                      <StatCard
                        icon={Home}
                        label="Total Apartments"
                        value={stats.total}
                        color={BRAND.charcoal}
                      />
                      <StatCard
                        icon={CheckCircle2}
                        label="Available"
                        value={stats.available}
                        color="#16a34a"
                      />
                      <StatCard
                        icon={Clock}
                        label="Booked"
                        value={stats.booked}
                        color="#dc2626"
                      />
                      <StatCard
                        icon={Wrench}
                        label="Under Maintenance"
                        value={stats.maintenance}
                        color="#6b7280"
                      />
                    </motion.div>

                    {/* Filters */}
                    <motion.div
                      {...fadeInUp}
                      className="flex flex-col sm:flex-row gap-3"
                    >
                      <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                          placeholder="Search apartments..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-9 h-10 bg-white border-gray-200"
                        />
                      </div>
                      <Select
                        value={statusFilter}
                        onValueChange={setStatusFilter}
                      >
                        <SelectTrigger className="w-full sm:w-44 h-10 bg-white border-gray-200">
                          <Filter className="h-4 w-4 mr-1 text-gray-400" />
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Statuses</SelectItem>
                          {STATUS_OPTIONS.map((s) => (
                            <SelectItem key={s} value={s}>
                              {STATUS_CONFIG[s]?.label || s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select
                        value={categoryFilter}
                        onValueChange={setCategoryFilter}
                      >
                        <SelectTrigger className="w-full sm:w-44 h-10 bg-white border-gray-200">
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          {CATEGORY_OPTIONS.map((c) => (
                            <SelectItem key={c} value={c}>
                              {c.charAt(0).toUpperCase() + c.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </motion.div>

                    {/* Apartments List - Desktop Table */}
                    <motion.div {...fadeInUp} className="hidden md:block">
                      <Card className="border-gray-200/80 shadow-sm overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow className="hover:bg-gray-50/50" style={{ backgroundColor: `${BRAND.offWhite}` }}>
                              <TableHead className="w-16">Image</TableHead>
                              <TableHead>Name</TableHead>
                              <TableHead>City</TableHead>
                              <TableHead>Category</TableHead>
                              <TableHead className="text-right">Price/Night</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {apartments.length === 0 ? (
                              <TableRow>
                                <TableCell
                                  colSpan={7}
                                  className="text-center py-12 text-gray-400"
                                >
                                  <Home className="h-8 w-8 mx-auto mb-2 opacity-40" />
                                  No apartments found.
                                  <br />
                                  <Button
                                    variant="link"
                                    onClick={openAddForm}
                                    className="text-sm mt-1"
                                    style={{ color: BRAND.sage }}
                                  >
                                    Add your first apartment
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ) : (
                              apartments.map((apt, idx) => (
                                <motion.tr
                                  key={apt.id}
                                  initial={{ opacity: 0, x: -8 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.03 }}
                                  className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors group"
                                >
                                  <TableCell className="py-3">
                                    <div className="h-10 w-[60px] rounded-md overflow-hidden bg-gray-100">
                                      {apt.images[0]?.url ? (
                                        <img
                                          src={apt.images[0].url}
                                          alt={apt.images[0].alt || apt.name}
                                          className="h-full w-full object-cover"
                                        />
                                      ) : (
                                        <div className="h-full w-full flex items-center justify-center">
                                          <Home className="h-4 w-4 text-gray-300" />
                                        </div>
                                      )}
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div>
                                      <p className="font-medium text-sm text-gray-900">
                                        {apt.name}
                                      </p>
                                      <p className="text-xs text-gray-400">
                                        {apt.code}
                                      </p>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <span className="flex items-center gap-1 text-sm text-gray-600">
                                      <MapPin className="h-3 w-3" />
                                      {apt.city}
                                    </span>
                                  </TableCell>
                                  <TableCell>
                                    <Badge
                                      variant="secondary"
                                      className="text-xs font-normal capitalize"
                                    >
                                      {apt.category}
                                    </Badge>
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <span className="font-semibold text-sm">
                                      {formatCurrency(apt.pricePerNight)}
                                    </span>
                                  </TableCell>
                                  <TableCell>
                                    <StatusBadge status={apt.status} />
                                  </TableCell>
                                  <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-1">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 w-8 p-0 opacity-60 hover:opacity-100"
                                        onClick={() => openEditForm(apt)}
                                        title="Edit"
                                      >
                                        <Edit className="h-3.5 w-3.5" />
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 w-8 p-0 opacity-60 hover:opacity-100"
                                        onClick={() => openAvailability(apt)}
                                        title="Manage Availability"
                                      >
                                        <Calendar className="h-3.5 w-3.5" />
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 w-8 p-0 text-red-500 opacity-60 hover:opacity-100 hover:text-red-600 hover:bg-red-50"
                                        onClick={() => confirmDelete(apt)}
                                        title="Delete"
                                      >
                                        <Trash2 className="h-3.5 w-3.5" />
                                      </Button>
                                    </div>
                                  </TableCell>
                                </motion.tr>
                              ))
                            )}
                          </TableBody>
                        </Table>
                      </Card>
                    </motion.div>

                    {/* Apartments List - Mobile Cards */}
                    <div className="md:hidden space-y-3">
                      {apartments.length === 0 ? (
                        <Card className="p-8 text-center text-gray-400">
                          <Home className="h-8 w-8 mx-auto mb-2 opacity-40" />
                          No apartments found.
                        </Card>
                      ) : (
                        <AnimatePresence>
                          {apartments.map((apt) => (
                            <motion.div
                              key={apt.id}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                            >
                              <Card className="border-gray-200/80 shadow-sm overflow-hidden">
                                <CardContent className="p-4">
                                  <div className="flex gap-3">
                                    <div className="h-16 w-16 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                                      {apt.images[0]?.url ? (
                                        <img
                                          src={apt.images[0].url}
                                          alt={
                                            apt.images[0].alt || apt.name
                                          }
                                          className="h-full w-full object-cover"
                                        />
                                      ) : (
                                        <div className="h-full w-full flex items-center justify-center">
                                          <Home className="h-5 w-5 text-gray-300" />
                                        </div>
                                      )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-start justify-between gap-2">
                                        <div>
                                          <p className="font-medium text-sm text-gray-900 truncate">
                                            {apt.name}
                                          </p>
                                          <p className="text-xs text-gray-400">
                                            {apt.code} · {apt.city}
                                          </p>
                                        </div>
                                        <StatusBadge status={apt.status} />
                                      </div>
                                      <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center gap-2">
                                          <Badge variant="secondary" className="text-xs capitalize">
                                            {apt.category}
                                          </Badge>
                                          <span className="text-sm font-semibold">
                                            {formatCurrency(apt.pricePerNight)}
                                            <span className="text-xs text-gray-400 font-normal">
                                              /night
                                            </span>
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <Separator className="my-3" />
                                  <div className="flex gap-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="flex-1 h-8 text-xs gap-1"
                                      onClick={() => openEditForm(apt)}
                                    >
                                      <Edit className="h-3 w-3" />
                                      Edit
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="flex-1 h-8 text-xs gap-1"
                                      onClick={() => openAvailability(apt)}
                                    >
                                      <Calendar className="h-3 w-3" />
                                      Availability
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="h-8 text-xs text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200"
                                      onClick={() => confirmDelete(apt)}
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </TabsContent>

          {/* ── TAB 2: ENQUIRIES ── */}
          <TabsContent value="enquiries">
            <AnimatePresence mode="wait">
              <motion.div
                key="enquiries"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Booking Enquiries
                      <span className="ml-2 text-sm font-normal text-gray-400">
                        ({filteredEnquiries.length})
                      </span>
                    </h2>
                    <div className="flex gap-2">
                      <Select
                        value={enquiryStatusFilter}
                        onValueChange={setEnquiryStatusFilter}
                      >
                        <SelectTrigger className="w-40 h-9 bg-white border-gray-200 text-sm">
                          <SelectValue placeholder="Filter status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Statuses</SelectItem>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-9 gap-1.5"
                        onClick={exportCSV}
                      >
                        <Download className="h-3.5 w-3.5" />
                        Export CSV
                      </Button>
                    </div>
                  </div>

                  {/* Enquiries Table - Desktop */}
                  {enquiriesLoading ? (
                    <div className="space-y-3">
                      <Skeleton className="h-10 w-full rounded-lg" />
                      <Skeleton className="h-64 w-full rounded-xl" />
                    </div>
                  ) : (
                    <>
                      {/* Desktop Table */}
                      <div className="hidden lg:block">
                        <Card className="border-gray-200/80 shadow-sm overflow-hidden">
                          <Table>
                            <TableHeader>
                              <TableRow
                                className="hover:bg-gray-50/50"
                                style={{ backgroundColor: BRAND.offWhite }}
                              >
                                <TableHead>Date</TableHead>
                                <TableHead>Guest</TableHead>
                                <TableHead>Apartment</TableHead>
                                <TableHead>Check-In</TableHead>
                                <TableHead>Check-Out</TableHead>
                                <TableHead>Guests</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {filteredEnquiries.length === 0 ? (
                                <TableRow>
                                  <TableCell
                                    colSpan={8}
                                    className="text-center py-12 text-gray-400"
                                  >
                                    <Mail className="h-8 w-8 mx-auto mb-2 opacity-40" />
                                    No enquiries found.
                                  </TableCell>
                                </TableRow>
                              ) : (
                                filteredEnquiries.map((enq, idx) => (
                                  <motion.tr
                                    key={enq.id}
                                    initial={{ opacity: 0, x: -8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.03 }}
                                    className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
                                  >
                                    <TableCell className="py-3 text-xs text-gray-500">
                                      {formatDateTime(enq.createdAt)}
                                    </TableCell>
                                    <TableCell>
                                      <div>
                                        <p className="text-sm font-medium text-gray-900">
                                          {enq.fullName}
                                        </p>
                                        <div className="flex items-center gap-3 text-xs text-gray-400">
                                          <span className="flex items-center gap-1">
                                            <Phone className="h-3 w-3" />
                                            {enq.phoneNumber}
                                          </span>
                                          <span className="flex items-center gap-1 truncate max-w-[160px]">
                                            <Mail className="h-3 w-3" />
                                            {enq.email}
                                          </span>
                                        </div>
                                      </div>
                                    </TableCell>
                                    <TableCell>
                                      <div>
                                        <p className="text-sm font-medium">
                                          {enq.apartment.name}
                                        </p>
                                        <p className="text-xs text-gray-400">
                                          {enq.apartment.code}
                                        </p>
                                      </div>
                                    </TableCell>
                                    <TableCell className="text-sm">
                                      {formatDate(enq.checkIn)}
                                    </TableCell>
                                    <TableCell className="text-sm">
                                      {formatDate(enq.checkOut)}
                                    </TableCell>
                                    <TableCell className="text-sm">
                                      {enq.guests}
                                    </TableCell>
                                    <TableCell>
                                      <EnquiryStatusBadge status={enq.status} />
                                    </TableCell>
                                    <TableCell className="text-right">
                                      <div className="flex items-center justify-end gap-1">
                                        {enq.status !== 'confirmed' && (
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 px-2 text-xs text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                                            onClick={() =>
                                              updateEnquiryStatus(enq.id, 'confirmed')
                                            }
                                          >
                                            <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                                            Confirm
                                          </Button>
                                        )}
                                        {enq.status !== 'cancelled' && (
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 px-2 text-xs text-red-500 hover:text-red-600 hover:bg-red-50"
                                            onClick={() =>
                                              updateEnquiryStatus(enq.id, 'cancelled')
                                            }
                                          >
                                            <XCircle className="h-3.5 w-3.5 mr-1" />
                                            Cancel
                                          </Button>
                                        )}
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          className="h-8 w-8 p-0 text-red-400 hover:text-red-600 hover:bg-red-50"
                                          onClick={() => confirmDeleteEnquiry(enq)}
                                        >
                                          <Trash2 className="h-3.5 w-3.5" />
                                        </Button>
                                      </div>
                                    </TableCell>
                                  </motion.tr>
                                ))
                              )}
                            </TableBody>
                          </Table>
                        </Card>
                      </div>

                      {/* Mobile Cards */}
                      <div className="lg:hidden space-y-3">
                        {filteredEnquiries.length === 0 ? (
                          <Card className="p-8 text-center text-gray-400">
                            <Mail className="h-8 w-8 mx-auto mb-2 opacity-40" />
                            No enquiries found.
                          </Card>
                        ) : (
                          <AnimatePresence>
                            {filteredEnquiries.map((enq) => (
                              <motion.div
                                key={enq.id}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                              >
                                <Card className="border-gray-200/80 shadow-sm overflow-hidden">
                                  <CardContent className="p-4">
                                    <div className="flex items-start justify-between gap-2 mb-3">
                                      <div>
                                        <p className="font-medium text-sm">
                                          {enq.fullName}
                                        </p>
                                        <p className="text-xs text-gray-400">
                                          {formatDateTime(enq.createdAt)}
                                        </p>
                                      </div>
                                      <EnquiryStatusBadge status={enq.status} />
                                    </div>
                                    <div className="space-y-1.5 text-xs text-gray-600 mb-3">
                                      <p className="flex items-center gap-1.5">
                                        <Phone className="h-3 w-3 text-gray-400" />
                                        {enq.phoneNumber}
                                      </p>
                                      <p className="flex items-center gap-1.5">
                                        <Mail className="h-3 w-3 text-gray-400" />
                                        {enq.email}
                                      </p>
                                      <p className="flex items-center gap-1.5">
                                        <Home className="h-3 w-3 text-gray-400" />
                                        {enq.apartment.name} ({enq.apartment.code})
                                      </p>
                                      <p className="flex items-center gap-1.5">
                                        <Calendar className="h-3 w-3 text-gray-400" />
                                        {formatDate(enq.checkIn)} → {formatDate(enq.checkOut)}
                                        <span className="ml-auto flex items-center gap-1 text-gray-400">
                                          <Users className="h-3 w-3" />
                                          {enq.guests}
                                        </span>
                                      </p>
                                    </div>
                                    {enq.specialRequests && (
                                      <p className="text-xs text-gray-400 italic mb-3 bg-gray-50 rounded px-2 py-1.5">
                                        &quot;{enq.specialRequests}&quot;
                                      </p>
                                    )}
                                    <Separator className="my-2" />
                                    <div className="flex gap-2">
                                      {enq.status !== 'confirmed' && (
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          className="flex-1 h-8 text-xs gap-1 text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                                          onClick={() =>
                                            updateEnquiryStatus(enq.id, 'confirmed')
                                          }
                                        >
                                          <CheckCircle2 className="h-3 w-3" />
                                          Confirm
                                        </Button>
                                      )}
                                      {enq.status !== 'cancelled' && (
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          className="flex-1 h-8 text-xs gap-1 text-red-500 border-red-200 hover:bg-red-50"
                                          onClick={() =>
                                            updateEnquiryStatus(enq.id, 'cancelled')
                                          }
                                        >
                                          <XCircle className="h-3 w-3" />
                                          Cancel
                                        </Button>
                                      )}
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-8 text-xs text-red-400 hover:text-red-600 hover:bg-red-50 border-red-200"
                                        onClick={() => confirmDeleteEnquiry(enq)}
                                      >
                                        <Trash2 className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  </CardContent>
                                </Card>
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </TabsContent>

          {/* ── TAB 3: SETTINGS ── */}
          <TabsContent value="settings">
            <AnimatePresence mode="wait">
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <div className="max-w-lg space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      Settings
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Manage global settings for your apartment listings.
                    </p>
                  </div>

                  <Card className="border-gray-200/80 shadow-sm">
                    <CardContent className="p-6 space-y-5">
                      {/* Site Info */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700">
                          Site Name
                        </Label>
                        <p className="text-sm text-gray-500 mt-1">
                          Dwell Chronicles
                        </p>
                      </div>

                      <Separator />

                      {/* WhatsApp Number */}
                      <div className="space-y-3">
                        <Label
                          htmlFor="whatsapp-setting"
                          className="text-sm font-medium text-gray-700 flex items-center gap-2"
                        >
                          <MessageCircle className="h-4 w-4" style={{ color: BRAND.sage }} />
                          WhatsApp Number
                        </Label>
                        <Input
                          id="whatsapp-setting"
                          value={whatsappNumber}
                          onChange={(e) => setWhatsappNumber(e.target.value)}
                          placeholder="e.g. 233204700023"
                          className="h-10 border-gray-200"
                        />\n                        <p className="text-xs text-gray-400">
                          This number will be set on all apartment listings.
                          Include country code without + sign.
                        </p>

                        <Button
                          onClick={updateAllWhatsapp}
                          disabled={updateWhatsappLoading}
                          className="gap-2 text-white"
                          style={{ backgroundColor: BRAND.sage }}
                        >
                          {updateWhatsappLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Phone className="h-4 w-4" />
                          )}
                          Update All Apartments WhatsApp
                        </Button>
                      </div>

                      <Separator />

                      {/* Stats Summary */}
                      <div>
                        <Label className="text-sm font-medium text-gray-700">
                          Dashboard Summary
                        </Label>
                        <div className="mt-3 grid grid-cols-2 gap-3">
                          <div className="rounded-lg border border-gray-100 p-3">
                            <p className="text-2xl font-bold" style={{ color: BRAND.sage }}>
                              {apartments.length}
                            </p>
                            <p className="text-xs text-gray-500">Apartments</p>
                          </div>
                          <div className="rounded-lg border border-gray-100 p-3">
                            <p className="text-2xl font-bold" style={{ color: BRAND.sage }}>
                              {enquiries.length}
                            </p>
                            <p className="text-xs text-gray-500">Enquiries</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </AnimatePresence>
          </TabsContent>
        </Tabs>
      </main>

      {/* ── APARTMENT FORM SHEET ── */}
      <Sheet open={formSheetOpen} onOpenChange={setFormSheetOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-2xl overflow-y-auto p-0"
        >
          <SheetHeader className="sticky top-0 z-10 bg-white border-b px-6 py-4 rounded-none">
            <SheetTitle className="text-base font-semibold">
              {editingApartment ? 'Edit Apartment' : 'Add New Apartment'}
            </SheetTitle>
            <SheetDescription className="text-xs">
              {editingApartment
                ? `Editing ${editingApartment.name}`
                : 'Fill in the details to create a new apartment listing.'}
            </SheetDescription>
          </SheetHeader>

          <form
            onSubmit={handleSubmit(onFormSubmit)}
            className="px-6 py-4 space-y-5"
          >
            {/* Basic Info Section */}
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Basic Information
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-sm">
                      Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      {...register('name')}
                      placeholder="e.g. Serene Haven"
                      className="h-9 border-gray-200"
                    />
                    {errors.name && (
                      <p className="text-xs text-red-500">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="code" className="text-sm">
                      Code <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="code"
                      {...register('code')}
                      placeholder="DH-XXX-NNN"
                      className="h-9 border-gray-200"
                    />
                    <p className="text-xs text-gray-400">
                      Format: DH-CITY-NNN (e.g., DH-HO-001)
                    </p>
                    {errors.code && (
                      <p className="text-xs text-red-500">
                        {errors.code.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="description" className="text-sm">
                    Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    {...register('description')}
                    placeholder="Describe the apartment..."
                    rows={3}
                    className="border-gray-200 resize-none"
                  />
                  {errors.description && (
                    <p className="text-xs text-red-500">
                      {errors.description.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            {/* Location Section */}
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Location
              </h3>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="address" className="text-sm">
                    Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="address"
                    {...register('address')}
                    placeholder="Street address"
                    className="h-9 border-gray-200"
                  />
                  {errors.address && (
                    <p className="text-xs text-red-500">
                      {errors.address.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-sm">
                      City <span className="text-red-500">*</span>
                    </Label>
                    <Controller
                      name="city"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="h-9 border-gray-200">
                            <SelectValue placeholder="Select city" />
                          </SelectTrigger>
                          <SelectContent>
                            {CITIES.map((city) => (
                              <SelectItem key={city} value={city}>
                                {city}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.city && (
                      <p className="text-xs text-red-500">
                        {errors.city.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="area" className="text-sm">
                      Area <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="area"
                      {...register('area')}
                      placeholder="Neighborhood or area"
                      className="h-9 border-gray-200"
                    />
                    {errors.area && (
                      <p className="text-xs text-red-500">
                        {errors.area.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="latitude" className="text-sm">
                      Latitude
                    </Label>
                    <Input
                      id="latitude"
                      {...register('latitude')}
                      placeholder="e.g. 6.6100"
                      className="h-9 border-gray-200"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="longitude" className="text-sm">
                      Longitude
                    </Label>
                    <Input
                      id="longitude"
                      {...register('longitude')}
                      placeholder="e.g. 0.4700"
                      className="h-9 border-gray-200"
                    />
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Pricing Section */}
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Pricing (GH\u20B5)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="pricePerNight" className="text-sm">
                    Per Night <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="pricePerNight"
                    type="number"
                    step="0.01"
                    {...register('pricePerNight')}
                    className="h-9 border-gray-200"
                  />
                  {errors.pricePerNight && (
                    <p className="text-xs text-red-500">
                      {errors.pricePerNight.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="weeklyPrice" className="text-sm">
                    Weekly
                  </Label>
                  <Input
                    id="weeklyPrice"
                    type="number"
                    step="0.01"
                    {...register('weeklyPrice')}
                    className="h-9 border-gray-200"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="monthlyPrice" className="text-sm">
                    Monthly
                  </Label>
                  <Input
                    id="monthlyPrice"
                    type="number"
                    step="0.01"
                    {...register('monthlyPrice')}
                    className="h-9 border-gray-200"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="cleaningFee" className="text-sm">
                    Cleaning Fee
                  </Label>
                  <Input
                    id="cleaningFee"
                    type="number"
                    step="0.01"
                    {...register('cleaningFee')}
                    className="h-9 border-gray-200"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="securityDeposit" className="text-sm">
                    Security Deposit
                  </Label>
                  <Input
                    id="securityDeposit"
                    type="number"
                    step="0.01"
                    {...register('securityDeposit')}
                    className="h-9 border-gray-200"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Property Details Section */}
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Property Details
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="bedrooms" className="text-sm">Bedrooms</Label>
                  <Input
                    id="bedrooms"
                    type="number"
                    {...register('bedrooms')}
                    className="h-9 border-gray-200"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="bathrooms" className="text-sm">Bathrooms</Label>
                  <Input
                    id="bathrooms"
                    type="number"
                    {...register('bathrooms')}
                    className="h-9 border-gray-200"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="maxGuests" className="text-sm">
                    Max Guests
                  </Label>
                  <Input
                    id="maxGuests"
                    type="number"
                    {...register('maxGuests')}
                    className="h-9 border-gray-200"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="rating" className="text-sm">
                    Rating (0-5)
                  </Label>
                  <Input
                    id="rating"
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    {...register('rating')}
                    className="h-9 border-gray-200"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Status & Category Section */}
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Status & Category
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-sm">Status</Label>
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="h-9 border-gray-200">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {STATUS_OPTIONS.map((s) => (
                            <SelectItem key={s} value={s}>
                              {STATUS_CONFIG[s]?.label || s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm">Category</Label>
                  <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="h-9 border-gray-200">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {CATEGORY_OPTIONS.map((c) => (
                            <SelectItem key={c} value={c}>
                              {c.charAt(0).toUpperCase() + c.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>

              <div className="flex gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <Controller
                    name="featured"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                  <Label className="text-sm cursor-pointer" onClick={() => setValue('featured', !watch('featured'))}>
                    Featured
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Controller
                    name="newlyAdded"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                  <Label className="text-sm cursor-pointer" onClick={() => setValue('newlyAdded', !watch('newlyAdded'))}>
                    Newly Added
                  </Label>
                </div>
              </div>
            </div>

            <Separator />

            {/* WhatsApp Number */}
            <div className="space-y-1.5">
              <Label htmlFor="whatsappNumber" className="text-sm flex items-center gap-2">
                <MessageCircle className="h-4 w-4" style={{ color: BRAND.sage }} />
                WhatsApp Number
              </Label>
              <Input
                id="whatsappNumber"
                {...register('whatsappNumber')}
                placeholder="233204700023"
                className="h-9 border-gray-200"
              />
            </div>

            <Separator />

            {/* Amenities Section */}
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Amenities
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {AMENITIES_LIST.map((amenity) => (
                  <div
                    key={amenity}
                    className={`
                      flex items-center gap-2 rounded-lg border px-3 py-2 cursor-pointer transition-all text-sm
                      ${(formAmenities || []).includes(amenity)
                        ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                      }
                    `}
                    onClick={() => toggleAmenity(amenity)}
                  >
                    <Checkbox
                      checked={(formAmenities || []).includes(amenity)}
                      onCheckedChange={() => toggleAmenity(amenity)}
                      className="pointer-events-none"
                    />
                    {amenity}
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Images Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Images <span className="text-red-500">*</span>
                </h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs gap-1"
                  onClick={addImageField}
                >
                  <Plus className="h-3 w-3" />
                  Add Image
                </Button>
              </div>

              {errors.images && (
                <p className="text-xs text-red-500 mb-2">
                  {errors.images.message}
                </p>
              )}

              <div className="space-y-2">
                <AnimatePresence>
                  {(formImages || []).map((img, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-start gap-2"
                    >
                      {/* Thumbnail preview */}
                      <div className="h-10 w-14 shrink-0 rounded border border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center mt-0.5">
                        {img.url ? (
                          <img
                            src={img.url}
                            alt={img.alt || ''}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-300" />
                        )}
                      </div>

                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <Input
                          placeholder="Image URL"
                          value={img.url}
                          onChange={(e) => {
                            const newImages = [...(formImages || [])];
                            newImages[idx] = { ...newImages[idx], url: e.target.value };
                            setValue('images', newImages);
                          }}
                          className="h-8 text-xs border-gray-200"
                        />
                        <Input
                          placeholder="Alt text"
                          value={img.alt || ''}
                          onChange={(e) => {
                            const newImages = [...(formImages || [])];
                            newImages[idx] = {
                              ...newImages[idx],
                              alt: e.target.value,
                            };
                            setValue('images', newImages);
                          }}
                          className="h-8 text-xs border-gray-200"
                        />
                      </div>

                      {/* Reorder & Remove buttons */}
                      <div className="flex flex-col gap-0.5 shrink-0">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => moveImageUp(idx)}
                          disabled={idx === 0}
                        >
                          <ChevronUp className="h-3 w-3" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => moveImageDown(idx)}
                          disabled={idx === (formImages || []).length - 1}
                        >
                          <ChevronDown className="h-3 w-3" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-red-400 hover:text-red-600"
                          onClick={() => removeImageField(idx)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            <Separator />

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-3 pb-8">
              <Button
                type="button"
                variant="outline"
                onClick={() => setFormSheetOpen(false)}
                className="h-9"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={formSubmitting}
                className="h-9 gap-2 text-white"
                style={{ backgroundColor: BRAND.sage }}
              >
                {formSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {editingApartment ? 'Update Apartment' : 'Create Apartment'}
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>

      {/* ── AVAILABILITY SHEET ── */}
      <Sheet open={availSheetOpen} onOpenChange={setAvailSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-xl p-0">
          <SheetHeader className="sticky top-0 z-10 bg-white border-b px-6 py-4 rounded-none">
            <SheetTitle className="text-base font-semibold flex items-center gap-2">
              <Calendar className="h-4 w-4" style={{ color: BRAND.sage }} />
              Manage Availability
            </SheetTitle>
            <SheetDescription className="text-xs">
              {availApartment?.name} ({availApartment?.code})
            </SheetDescription>
          </SheetHeader>

          <div className="px-6 py-4 space-y-4">
            {/* Month Navigation */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={prevMonth}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h3 className="text-sm font-semibold text-gray-900">
                {getMonthName(availYear, availMonth)}
              </h3>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={nextMonth}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
              {Object.entries(AVAIL_COLORS).map(([key, cfg]) => (
                <div key={key} className="flex items-center gap-1.5">
                  <span className={`h-3 w-3 rounded ${cfg.bg}`} />
                  {cfg.label}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            {availLoading ? (
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 35 }).map((_, i) => (
                  <Skeleton key={i} className="aspect-square rounded-md" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-7 gap-1">
                {renderCalendar()}
              </div>
            )}

            {/* Selection Info */}
            {selectedDates.size > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-50 rounded-lg p-3"
              >
                <p className="text-xs font-medium text-gray-600 mb-2">
                  {selectedDates.size} date(s) selected — set status:
                </p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(AVAIL_COLORS).map(([key, cfg]) => (
                    <Button
                      key={key}
                      type="button"
                      size="sm"
                      className={`h-7 text-xs text-white ${cfg.bg} ${cfg.hover}`}
                      onClick={() => markSelectedDates(key)}
                    >
                      {cfg.label}
                    </Button>
                  ))}
                </div>
              </motion.div>
            )}

            <Separator />

            {/* Quick Actions */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Quick Actions
              </h4>
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs gap-1.5 border-gray-400"
                  onClick={blockNext7Days}
                >
                  <Wrench className="h-3 w-3" />
                  Block Next 7 Days
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs gap-1.5 border-gray-400"
                  onClick={clearAllBookings}
                >
                  <Eye className="h-3 w-3" />
                  Clear All Bookings
                </Button>
              </div>
            </div>

            <Separator />

            {/* Save Button */}
            <Button
              type="button"
              className="w-full h-10 gap-2 text-white"
              style={{ backgroundColor: BRAND.sage }}
              disabled={availSaving}
              onClick={saveAvailability}
            >
              {availSaving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              Save Availability Changes
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* ── DELETE APARTMENT DIALOG ── */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Apartment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{deletingApartment?.name}&quot;? This action
              cannot be undone. All associated images, availability data, and enquiries
              will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={executeDelete}
              disabled={deleteLoading}
              className="bg-red-600 hover:bg-red-700 text-white focus:ring-red-600"
            >
              {deleteLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Deleting...
                </span>
              ) : (
                'Delete'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ── DELETE ENQUIRY DIALOG ── */}
      <AlertDialog
        open={enquiryDeleteDialogOpen}
        onOpenChange={setEnquiryDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Enquiry</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the enquiry from &quot;{deletingEnquiry?.fullName}&quot;?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={enquiryDeleteLoading}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={executeDeleteEnquiry}
              disabled={enquiryDeleteLoading}
              className="bg-red-600 hover:bg-red-700 text-white focus:ring-red-600"
            >
              {enquiryDeleteLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Deleting...
                </span>
              ) : (
                'Delete'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
