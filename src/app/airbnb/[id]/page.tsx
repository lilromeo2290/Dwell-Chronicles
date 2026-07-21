'use client';

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  isSameMonth,
  isBefore,
  isToday,
  parseISO,
  differenceInDays,
  isAfter,
  startOfDay,
} from 'date-fns';
import {
  ArrowLeft,
  MapPin,
  Star,
  BedDouble,
  Bath,
  Users,
  Wifi,
  Tv,
  Snowflake,
  CookingPot,
  Refrigerator,
  Shirt,
  Droplets,
  Car,
  Sun,
  Waves,
  ShieldCheck,
  Zap,
  Laptop,
  ChevronLeft,
  ChevronRight,
  X,
  MessageCircle,
  Send,
  Check,
  AlertCircle,
  CalendarDays,
  Image as ImageIcon,
  Phone,
  Mail,
  User,
  Loader2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

// ─── Types ───────────────────────────────────────────────────────────────────

interface ApartmentImage {
  id: string;
  url: string;
  alt: string | null;
  sortOrder: number;
}

interface AvailabilityDate {
  id: string;
  apartmentId: string;
  date: string;
  status: string;
}

interface Apartment {
  id: string;
  name: string;
  code: string;
  description: string;
  address: string;
  city: string;
  area: string;
  latitude: string | null;
  longitude: string | null;
  pricePerNight: number;
  weeklyPrice: number | null;
  monthlyPrice: number | null;
  cleaningFee: number | null;
  securityDeposit: number | null;
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
  availabilityDates: AvailabilityDate[];
}

interface RelatedApartment {
  id: string;
  name: string;
  city: string;
  area: string;
  pricePerNight: number;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  rating: number;
  status: string;
  category: string;
  images: ApartmentImage[];
}

// ─── Constants ───────────────────────────────────────────────────────────────

const WHATSAPP_NUMBER = '233204700023';

const AMENITY_ICON_MAP: Record<string, React.ElementType> = {
  'Wi-Fi': Wifi,
  'Smart TV': Tv,
  'Air Conditioning': Snowflake,
  'Kitchen': CookingPot,
  'Refrigerator': Refrigerator,
  'Microwave': Zap,
  'Washing Machine': Shirt,
  'Hot Water': Droplets,
  'Parking': Car,
  'Balcony': Sun,
  'Swimming Pool': Waves,
  'Security': ShieldCheck,
  'Generator': Zap,
  'Workspace': Laptop,
};

const LANDMARKS = [
  { name: 'Ho Central Market', distance: '0.5 km' },
  { name: 'Volta Regional Hospital', distance: '1.2 km' },
  { name: 'Ho Airport', distance: '3.0 km' },
  { name: 'University of Health & Allied Sciences', distance: '2.8 km' },
];

const CATEGORY_COLORS: Record<string, string> = {
  luxury: 'bg-amber-100 text-amber-800 border-amber-200',
  executive: 'bg-purple-100 text-purple-800 border-purple-200',
  standard: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  budget: 'bg-blue-100 text-blue-800 border-blue-200',
};

const STATUS_COLORS: Record<string, string> = {
  available: 'bg-emerald-100 text-emerald-800',
  reserved: 'bg-amber-100 text-amber-800',
  booked: 'bg-red-100 text-red-800',
  maintenance: 'bg-gray-100 text-gray-500',
};

const STATUS_CALENDAR_COLORS: Record<string, string> = {
  available: 'bg-white text-[#2F3A33] hover:bg-emerald-50',
  booked: 'bg-red-100 text-red-800 line-through',
  reserved: 'bg-amber-100 text-amber-800',
  maintenance: 'bg-gray-100 text-gray-400',
};

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

// ─── Zod Schema ──────────────────────────────────────────────────────────────

const enquirySchema = z.object({
  fullName: z.string().min(2, 'Full name is required (at least 2 characters)'),
  phoneNumber: z.string().min(8, 'Phone number must be at least 8 digits'),
  email: z.email('Please enter a valid email address'),
  checkIn: z.string().min(1, 'Check-in date is required'),
  checkOut: z.string().min(1, 'Check-out date is required'),
  guests: z.coerce.number().min(1, 'At least 1 guest is required'),
  specialRequests: z.string().optional(),
});

type EnquiryFormData = z.infer<typeof enquirySchema>;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatDateLong(dateStr: string): string {
  try {
    const d = parseISO(dateStr);
    return format(d, 'd MMMM yyyy');
  } catch {
    return dateStr;
  }
}

function formatCurrency(amount: number): string {
  return `GH₵ ${amount.toLocaleString()}`;
}

function getAmenityIcon(name: string): React.ElementType {
  return AMENITY_ICON_MAP[name] || Zap;
}

function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    available: 'Available',
    reserved: 'Reserved',
    booked: 'Booked',
    maintenance: 'Maintenance',
  };
  return labels[status] || status;
}

function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    luxury: 'Luxury',
    executive: 'Executive',
    standard: 'Standard',
    budget: 'Budget',
  };
  return labels[category] || category;
}

function getDayOfWeekMondayBased(date: Date): number {
  const day = getDay(date); // 0=Sun, 1=Mon, ..., 6=Sat
  return day === 0 ? 6 : day - 1;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-[#F8F7F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Skeleton className="h-6 w-48 mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Skeleton className="aspect-[16/9] w-full rounded-2xl mb-4" />
            <div className="flex gap-2 mb-8">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-20 w-20 rounded-lg flex-shrink-0" />
              ))}
            </div>
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-32 mb-4" />
            <Skeleton className="h-4 w-48 mb-6" />
            <div className="space-y-3 mb-8">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
          <div>
            <Skeleton className="h-[500px] w-full rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

function NotFoundState() {
  return (
    <div className="min-h-screen bg-[#F8F7F3] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center p-8"
      >
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
          <AlertCircle className="w-12 h-12 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-[#2F3A33] mb-2">Apartment Not Found</h1>
        <p className="text-gray-500 mb-6">
          The apartment you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Link href="/airbnb">
          <Button className="bg-[#5F8768] hover:bg-[#4A6B52] text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Apartments
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}

// ─── Custom Calendar Component ───────────────────────────────────────────────

function CustomCalendar({
  availabilityDates,
  checkIn,
  checkOut,
  onSelectDate,
  onMonthChange,
}: {
  availabilityDates: AvailabilityDate[];
  checkIn: Date | null;
  checkOut: Date | null;
  onSelectDate: (date: Date) => void;
  onMonthChange: (monthStr: string) => void;
}) {
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));
  const isMobile = useIsMobile();

  // Notify parent of month changes for data fetching
  const handleMonthChange = (newMonth: Date) => {
    setCurrentMonth(newMonth);
    onMonthChange(format(newMonth, 'yyyy-MM'));
  };

  const prevMonth = () => handleMonthChange(subMonths(currentMonth, 1));
  const nextMonth = () => handleMonthChange(addMonths(currentMonth, 1));

  const availabilityMap = useMemo(() => {
    const map = new Map<string, string>();
    availabilityDates.forEach((d) => map.set(d.date, d.status));
    return map;
  }, [availabilityDates]);

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const firstDayOffset = getDayOfWeekMondayBased(startOfMonth(currentMonth));



  const isDateInRange = (date: Date) => {
    if (!checkIn || !checkOut) return false;
    const d = startOfDay(date);
    const ci = startOfDay(checkIn);
    const co = startOfDay(checkOut);
    return (d > ci && d < co);
  };

  const isCheckInDate = (date: Date) => {
    if (!checkIn) return false;
    return date.toDateString() === checkIn.toDateString();
  };

  const isCheckOutDate = (date: Date) => {
    if (!checkOut) return false;
    return date.toDateString() === checkOut.toDateString();
  };

  const handleDateClick = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const status = availabilityMap.get(dateStr) || 'available';
    if (status !== 'available') return;
    if (isBefore(startOfDay(date), startOfDay(new Date()))) return;
    onSelectDate(date);
  };

  const isDateDisabled = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const status = availabilityMap.get(dateStr) || 'available';
    return status !== 'available' || isBefore(startOfDay(date), startOfDay(new Date()));
  };

  return (
    <div className="w-full">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="p-2 rounded-lg hover:bg-[#D8D5CC]/50 transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-5 h-5 text-[#2F3A33]" />
        </button>
        <h3 className="text-lg font-semibold text-[#2F3A33]">
          {MONTH_NAMES[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <button
          onClick={nextMonth}
          className="p-2 rounded-lg hover:bg-[#D8D5CC]/50 transition-colors"
          aria-label="Next month"
        >
          <ChevronRight className="w-5 h-5 text-[#2F3A33]" />
        </button>
      </div>

      {/* Day Names */}
      <div className="grid grid-cols-7 mb-1">
        {DAY_NAMES.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-gray-400 py-2"
          >
            {isMobile ? day.charAt(0) : day}
          </div>
        ))}
      </div>

      {/* Date Cells */}
      <div className="grid grid-cols-7 gap-0.5">
        {/* Empty cells for offset */}
        {Array.from({ length: firstDayOffset }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}

        {/* Date cells */}
        {daysInMonth.map((date) => {
          const dateStr = format(date, 'yyyy-MM-dd');
          const status = availabilityMap.get(dateStr) || 'available';
          const disabled = isDateDisabled(date);
          const inRange = isDateInRange(date);
          const isCI = isCheckInDate(date);
          const isCO = isCheckOutDate(date);
          const today = isToday(date);

          return (
            <button
              key={dateStr}
              onClick={() => handleDateClick(date)}
              disabled={disabled}
              className={`
                relative aspect-square flex items-center justify-center text-sm rounded-lg
                transition-all duration-150 font-medium
                ${disabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'}
                ${isCI ? 'bg-[#5F8768] text-white rounded-lg font-bold shadow-md' : ''}
                ${isCO ? 'bg-[#5F8768] text-white rounded-lg font-bold shadow-md' : ''}
                ${inRange && !isCI && !isCO ? 'bg-[#5F8768]/15 text-[#2F3A33]' : ''}
                ${!disabled && !isCI && !isCO && !inRange ? STATUS_CALENDAR_COLORS[status] || 'bg-white' : ''}
                ${today && !isCI && !isCO ? 'ring-2 ring-[#5F8768] ring-offset-1' : ''}
                hover:scale-105
              `}
              aria-label={`${format(date, 'MMM d, yyyy')} - ${status}`}
            >
              {format(date, 'd')}
              {status === 'booked' && !isCI && !isCO && (
                <span className="absolute text-[8px] font-bold text-red-500">×</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-4 text-xs text-gray-500">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-emerald-100 border border-emerald-200" />
          Available
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-red-100 border border-red-200" />
          Booked
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-amber-100 border border-amber-200" />
          Reserved
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-gray-100 border border-gray-200" />
          Maintenance
        </div>
      </div>
    </div>
  );
}

// ─── Full Screen Gallery ─────────────────────────────────────────────────────

function FullscreenGallery({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: {
  images: ApartmentImage[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const touchStartX = useRef(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) onNext();
      else onPrev();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        aria-label="Close gallery"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-4 z-10 text-white/80 text-sm font-medium bg-black/40 px-3 py-1.5 rounded-full">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Navigation arrows - desktop */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Image */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="w-full h-full flex items-center justify-center p-8 md:p-16"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={images[currentIndex]?.url}
          alt={images[currentIndex]?.alt || 'Apartment image'}
          className="max-w-full max-h-full object-contain rounded-lg"
        />
      </motion.div>
    </motion.div>
  );
}

// ─── Main Page Component ─────────────────────────────────────────────────────

export default function ApartmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const id = params.id as string;

  // State
  const [apartment, setApartment] = useState<Apartment | null>(null);
  const [relatedApartments, setRelatedApartments] = useState<RelatedApartment[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [calendarAvailability, setCalendarAvailability] = useState<AvailabilityDate[]>([]);
  const [loadingAvailability, setLoadingAvailability] = useState(false);
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [availabilityResult, setAvailabilityResult] = useState<{
    available: boolean;
    unavailableDates: string[];
    message: string;
  } | null>(null);
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const [submittingEnquiry, setSubmittingEnquiry] = useState(false);

  // Fetch apartment data
  useEffect(() => {
    async function fetchApartment() {
      try {
        const res = await fetch(`/api/apartments/${id}`);
        if (!res.ok) {
          setNotFound(true);
          return;
        }
        const data = await res.json();
        setApartment(data);
        setCalendarAvailability(data.availabilityDates || []);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchApartment();
  }, [id]);

  // Fetch related apartments
  useEffect(() => {
    if (!apartment) return;
    async function fetchRelated() {
      try {
        const res = await fetch(
          `/api/apartments?city=${encodeURIComponent(apartment.city)}&limit=3&excludeId=${id}`
        );
        if (res.ok) {
          const data = await res.json();
          setRelatedApartments(
            data.apartments.filter((a: RelatedApartment) => a.id !== id).slice(0, 3)
          );
        }
      } catch {
        // silently fail
      }
    }
    fetchRelated();
  }, [apartment, id]);

  // Fetch calendar availability when month changes
  const [calendarMonth, setCalendarMonth] = useState(format(new Date(), 'yyyy-MM'));
  useEffect(() => {
    if (!apartment) return;
    async function fetchAvailability() {
      setLoadingAvailability(true);
      try {
        const res = await fetch(`/api/apartments/${id}/availability?month=${calendarMonth}`);
        if (res.ok) {
          const data = await res.json();
          setCalendarAvailability(data.dates || []);
        }
      } catch {
        // silently fail
      } finally {
        setLoadingAvailability(false);
      }
    }
    fetchAvailability();
  }, [apartment, id, calendarMonth]);

  // Gallery navigation
  const nextImage = useCallback(() => {
    if (!apartment) return;
    setHeroIndex((i) => (i + 1) % apartment.images.length);
  }, [apartment]);

  const prevImage = useCallback(() => {
    if (!apartment) return;
    setHeroIndex((i) => (i - 1 + apartment.images.length) % apartment.images.length);
  }, [apartment]);

  // Calendar date selection
  const handleSelectDate = useCallback(
    (date: Date) => {
      if (!checkIn || (checkIn && checkOut)) {
        // Start new selection
        setCheckIn(date);
        setCheckOut(null);
        setAvailabilityResult(null);
      } else {
        // Set check-out
        if (isAfter(date, checkIn) || date.toDateString() === checkIn.toDateString()) {
          setCheckOut(date);
          setAvailabilityResult(null);
        } else {
          // If date is before check-in, reset
          setCheckIn(date);
          setCheckOut(null);
          setAvailabilityResult(null);
        }
      }
    },
    [checkIn, checkOut]
  );

  // Check availability
  const checkAvailability = useCallback(async () => {
    if (!checkIn || !checkOut || !apartment) return;
    setCheckingAvailability(true);
    try {
      const res = await fetch(`/api/apartments/${id}/availability`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          checkIn: format(checkIn, 'yyyy-MM-dd'),
          checkOut: format(checkOut, 'yyyy-MM-dd'),
        }),
      });
      const data = await res.json();
      setAvailabilityResult(data);
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to check availability. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setCheckingAvailability(false);
    }
  }, [checkIn, checkOut, apartment, id, toast]);

  // Auto-check availability when both dates selected
  useEffect(() => {
    if (checkIn && checkOut) {
      const timer = setTimeout(checkAvailability, 300);
      return () => clearTimeout(timer);
    }
  }, [checkIn, checkOut, checkAvailability]);

  // Price calculation
  const priceCalc = useMemo(() => {
    if (!apartment || !checkIn || !checkOut) return null;
    const nights = differenceInDays(checkOut, checkIn);
    if (nights <= 0) return null;
    const baseTotal = nights * apartment.pricePerNight;
    let weeklyDiscount = 0;
    if (apartment.weeklyPrice && nights >= 7) {
      const fullWeeklyRate = apartment.weeklyPrice * Math.floor(nights / 7);
      const remainingNights = nights % 7;
      const remainingRate = remainingNights * apartment.pricePerNight;
      weeklyDiscount = baseTotal - (fullWeeklyRate + remainingRate);
    }
    return {
      nights,
      baseTotal,
      weeklyDiscount,
      finalTotal: baseTotal - weeklyDiscount,
      cleaningFee: apartment.cleaningFee || 0,
      securityDeposit: apartment.securityDeposit || 0,
      grandTotal: baseTotal - weeklyDiscount + (apartment.cleaningFee || 0) + (apartment.securityDeposit || 0),
    };
  }, [apartment, checkIn, checkOut]);

  // WhatsApp URL construction
  const whatsappUrl = useMemo(() => {
    if (!apartment || !checkIn || !checkOut) return null;
    const message = `Hello Dwell Chronicles,

I would like to book the following apartment:

Apartment: ${apartment.name}
Location: ${apartment.city}, Volta Region
Check-in: ${formatDateLong(format(checkIn, 'yyyy-MM-dd'))}
Check-out: ${formatDateLong(format(checkOut, 'yyyy-MM-dd'))}
Guests: ${apartment.maxGuests}

Kindly confirm if it is still available.

Thank you.`;
    return `https://wa.me/${apartment.whatsappNumber || WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }, [apartment, checkIn, checkOut]);

  // Enquiry form
  const enquiryForm = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      fullName: '',
      phoneNumber: '',
      email: '',
      checkIn: '',
      checkOut: '',
      guests: apartment?.maxGuests || 1,
      specialRequests: '',
    },
  });

  // Sync calendar dates to enquiry form
  useEffect(() => {
    if (checkIn) {
      enquiryForm.setValue('checkIn', format(checkIn, 'yyyy-MM-dd'));
    }
    if (checkOut) {
      enquiryForm.setValue('checkOut', format(checkOut, 'yyyy-MM-dd'));
    }
    if (apartment) {
      enquiryForm.setValue('guests', apartment.maxGuests);
    }
  }, [checkIn, checkOut, apartment, enquiryForm]);

  const onEnquirySubmit = async (data: EnquiryFormData) => {
    if (!apartment) return;
    setSubmittingEnquiry(true);
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, apartmentId: apartment.id }),
      });
      if (res.ok) {
        toast({
          title: 'Inquiry Sent!',
          description: 'We will get back to you shortly.',
        });
        enquiryForm.reset();
      } else {
        const err = await res.json();
        toast({
          title: 'Error',
          description: err.error || 'Failed to send inquiry.',
          variant: 'destructive',
        });
      }
    } catch {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSubmittingEnquiry(false);
    }
  };

  // Parse amenities
  const amenitiesList: string[] = useMemo(() => {
    if (!apartment) return [];
    try {
      const parsed = JSON.parse(apartment.amenities);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return apartment.amenities.split(',').map((a) => a.trim());
    }
  }, [apartment]);

  // ─── Render States ───────────────────────────────────────────────────────

  if (loading) return <LoadingSkeleton />;
  if (notFound || !apartment) return <NotFoundState />;
  if (apartment.images.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8F7F3] flex items-center justify-center">
        <div className="text-center p-8">
          <ImageIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h1 className="text-2xl font-bold text-[#2F3A33] mb-2">No Images Available</h1>
          <p className="text-gray-500 mb-6">This apartment has no photos yet.</p>
          <Link href="/airbnb">
            <Button className="bg-[#5F8768] hover:bg-[#4A6B52] text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Apartments
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const currentImage = apartment.images[heroIndex];

  return (
    <div className="min-h-screen bg-[#F8F7F3]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20"
      >
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Link
            href="/airbnb"
            className="inline-flex items-center gap-2 text-sm text-[#5F8768] hover:text-[#4A6B52] transition-colors mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Apartments
          </Link>
        </motion.div>

        {/* ─── 1. Image Gallery Section ──────────────────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-8"
        >
          {/* Hero Image */}
          <div
            className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden cursor-pointer group"
            onClick={() => setShowGallery(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setShowGallery(true)}
            aria-label="Open full gallery"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={heroIndex}
                src={currentImage?.url}
                alt={currentImage?.alt || `${apartment.name} - Image ${heroIndex + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-4 right-4 bg-black/60 text-white text-sm px-3 py-1.5 rounded-full flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <ImageIcon className="w-4 h-4" />
              {apartment.images.length} photos
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2 mt-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {apartment.images.map((img, idx) => (
              <button
                key={img.id}
                onClick={() => setHeroIndex(idx)}
                className={`
                  flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all duration-200
                  ${idx === heroIndex
                    ? 'ring-2 ring-[#5F8768] ring-offset-2 shadow-md'
                    : 'opacity-70 hover:opacity-100'
                  }
                `}
                aria-label={`View image ${idx + 1}`}
              >
                <img
                  src={img.url}
                  alt={img.alt || `Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </motion.section>

        {/* ─── 2. Apartment Info Section ─────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Badges + Title */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge
                  className={`${CATEGORY_COLORS[apartment.category] || 'bg-gray-100 text-gray-600'} text-xs font-medium px-3 py-1 rounded-full border`}
                >
                  {getCategoryLabel(apartment.category)}
                </Badge>
                <Badge
                  className={`${STATUS_COLORS[apartment.status] || 'bg-gray-100 text-gray-600'} text-xs font-medium px-3 py-1 rounded-full`}
                >
                  {getStatusLabel(apartment.status)}
                </Badge>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#2F3A33] leading-tight">
                {apartment.name}
              </h1>
              <p className="text-sm text-gray-400 mt-1">Property ID: {apartment.code}</p>
              <div className="flex items-center gap-1.5 mt-2 text-gray-600">
                <MapPin className="w-4 h-4 text-[#5F8768]" />
                <span className="text-sm">
                  {apartment.area}, {apartment.city}, Volta Region, Ghana
                </span>
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h2 className="text-lg font-semibold text-[#2F3A33] mb-3">About this place</h2>
              <div className="relative">
                <p
                  className={`text-gray-700 leading-relaxed whitespace-pre-line ${
                    !showDescription && apartment.description.length > 300
                      ? 'line-clamp-3'
                      : ''
                  }`}
                >
                  {apartment.description}
                </p>
                {apartment.description.length > 300 && (
                  <button
                    onClick={() => setShowDescription(!showDescription)}
                    className="mt-2 text-[#5F8768] font-medium text-sm flex items-center gap-1 hover:underline"
                  >
                    {showDescription ? (
                      <>
                        Show Less <ChevronUp className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        Show More <ChevronDown className="w-4 h-4" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Address Details */}
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 mt-0.5 text-[#5F8768] flex-shrink-0" />
                <span>{apartment.address}, {apartment.city}, Volta Region, Ghana</span>
              </div>
              <p className="text-sm text-gray-400 ml-6">
                Approximately 2.5 km from city centre
              </p>
            </div>

            {/* Google Maps Embed */}
            {apartment.latitude && apartment.longitude && (
              <div className="rounded-xl overflow-hidden border border-[#D8D5CC]">
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d${apartment.longitude}!3d${apartment.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMzYnMzYuMCJOIDDCsDI4JzEyLjAiRQ!5e0!3m2!1sen!2sgh!4v1234567890`}
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Apartment Location"
                  className="w-full"
                />
              </div>
            )}

            {/* Nearby Landmarks */}
            <div>
              <h3 className="text-lg font-semibold text-[#2F3A33] mb-3">Nearby Landmarks</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {LANDMARKS.map((landmark) => (
                  <div
                    key={landmark.name}
                    className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#D8D5CC]/60"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#5F8768]/10 flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-[#5F8768]" />
                      </div>
                      <span className="text-sm font-medium text-[#2F3A33]">
                        {landmark.name}
                      </span>
                    </div>
                    <span className="text-xs font-medium text-[#5F8768] bg-[#5F8768]/10 px-2 py-1 rounded-full">
                      {landmark.distance}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* ─── 5. Amenities Section ──────────────────────────────────── */}
            <div>
              <h2 className="text-lg font-semibold text-[#2F3A33] mb-4">Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {amenitiesList.map((amenity) => {
                  const IconComponent = getAmenityIcon(amenity);
                  return (
                    <motion.div
                      key={amenity}
                      whileHover={{ y: -2 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white border border-[#D8D5CC]/60 hover:border-[#5F8768]/30 transition-colors"
                    >
                      <div className="w-9 h-9 rounded-lg bg-[#5F8768]/10 flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-4.5 h-4.5 text-[#5F8768]" />
                      </div>
                      <span className="text-sm text-[#2F3A33] font-medium">{amenity}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <Separator />

            {/* ─── 3. Availability Calendar Section ──────────────────────── */}
            <div>
              <h2 className="text-lg font-semibold text-[#2F3A33] mb-4 flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-[#5F8768]" />
                Check Availability
              </h2>

              <div className="bg-white rounded-2xl border border-[#D8D5CC]/60 p-5 sm:p-6">
                {loadingAvailability ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 text-[#5F8768] animate-spin" />
                  </div>
                ) : (
                  <CustomCalendar
                    availabilityDates={calendarAvailability}
                    checkIn={checkIn}
                    checkOut={checkOut}
                    onSelectDate={handleSelectDate}
                    onMonthChange={setCalendarMonth}
                  />
                )}

                {/* Selected dates display */}
                <div className="mt-4 flex flex-wrap gap-3">
                  <div className="flex-1 min-w-[140px]">
                    <label className="text-xs text-gray-400 block mb-1">Check-in</label>
                    <div className="text-sm font-medium text-[#2F3A33] bg-[#F8F7F3] rounded-lg px-3 py-2">
                      {checkIn ? format(checkIn, 'dd MMM yyyy') : 'Select date'}
                    </div>
                  </div>
                  <div className="flex-1 min-w-[140px]">
                    <label className="text-xs text-gray-400 block mb-1">Check-out</label>
                    <div className="text-sm font-medium text-[#2F3A33] bg-[#F8F7F3] rounded-lg px-3 py-2">
                      {checkOut ? format(checkOut, 'dd MMM yyyy') : 'Select date'}
                    </div>
                  </div>
                </div>

                {/* Availability Result */}
                {checkingAvailability && (
                  <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Checking availability...
                  </div>
                )}

                {availabilityResult && !checkingAvailability && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4"
                  >
                    {availabilityResult.available ? (
                      <div className="flex items-start gap-2 p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                        <Check className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-emerald-800">
                            ✓ This apartment is available for your selected dates.
                          </p>
                          {priceCalc && (
                            <div className="mt-2 text-sm text-emerald-700 space-y-1">
                              <p>
                                {priceCalc.nights} night{priceCalc.nights !== 1 ? 's' : ''} ×{' '}
                                {formatCurrency(apartment.pricePerNight)} ={' '}
                                <span className="font-semibold">
                                  {formatCurrency(priceCalc.finalTotal)}
                                </span>
                              </p>
                              {apartment.cleaningFee && (
                                <p className="text-xs">
                                  + Cleaning fee: {formatCurrency(apartment.cleaningFee)}
                                </p>
                              )}
                              {apartment.securityDeposit && (
                                <p className="text-xs">
                                  + Security deposit: {formatCurrency(apartment.securityDeposit)}
                                </p>
                              )}
                              <Separator className="my-2 !bg-emerald-200" />
                              <p className="font-bold text-emerald-900">
                                Total: {formatCurrency(priceCalc.grandTotal)}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start gap-2 p-4 rounded-xl bg-red-50 border border-red-200">
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-red-800">
                            Sorry, this apartment is unavailable for the selected dates.
                          </p>
                          {availabilityResult.unavailableDates.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              {availabilityResult.unavailableDates.map((d) => (
                                <span
                                  key={d}
                                  className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full"
                                >
                                  {formatDateLong(d)}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            </div>

            <Separator />

            {/* ─── 6. Inquiry Form Section ───────────────────────────────── */}
            <div>
              <h2 className="text-lg font-semibold text-[#2F3A33] mb-4">Send an Inquiry</h2>
              <form
                onSubmit={enquiryForm.handleSubmit(onEnquirySubmit)}
                className="bg-white rounded-2xl border border-[#D8D5CC]/60 p-5 sm:p-6 space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <Label htmlFor="fullName" className="text-sm text-[#2F3A33]">
                      Full Name *
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="fullName"
                        placeholder="John Doe"
                        className="pl-9 border-[#D8D5CC] focus-visible:border-[#5F8768]"
                        {...enquiryForm.register('fullName')}
                      />
                    </div>
                    {enquiryForm.formState.errors.fullName && (
                      <p className="text-xs text-red-500">
                        {enquiryForm.formState.errors.fullName.message}
                      </p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-1.5">
                    <Label htmlFor="phoneNumber" className="text-sm text-[#2F3A33]">
                      Phone Number *
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="phoneNumber"
                        placeholder="+233 XXX XXX XXX"
                        className="pl-9 border-[#D8D5CC] focus-visible:border-[#5F8768]"
                        {...enquiryForm.register('phoneNumber')}
                      />
                    </div>
                    {enquiryForm.formState.errors.phoneNumber && (
                      <p className="text-xs text-red-500">
                        {enquiryForm.formState.errors.phoneNumber.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <Label htmlFor="email" className="text-sm text-[#2F3A33]">
                      Email *
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        className="pl-9 border-[#D8D5CC] focus-visible:border-[#5F8768]"
                        {...enquiryForm.register('email')}
                      />
                    </div>
                    {enquiryForm.formState.errors.email && (
                      <p className="text-xs text-red-500">
                        {enquiryForm.formState.errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Check-in */}
                  <div className="space-y-1.5">
                    <Label htmlFor="enquiry-checkin" className="text-sm text-[#2F3A33]">
                      Check-in Date *
                    </Label>
                    <Input
                      id="enquiry-checkin"
                      type="date"
                      className="border-[#D8D5CC] focus-visible:border-[#5F8768]"
                      {...enquiryForm.register('checkIn')}
                    />
                    {enquiryForm.formState.errors.checkIn && (
                      <p className="text-xs text-red-500">
                        {enquiryForm.formState.errors.checkIn.message}
                      </p>
                    )}
                  </div>

                  {/* Check-out */}
                  <div className="space-y-1.5">
                    <Label htmlFor="enquiry-checkout" className="text-sm text-[#2F3A33]">
                      Check-out Date *
                    </Label>
                    <Input
                      id="enquiry-checkout"
                      type="date"
                      className="border-[#D8D5CC] focus-visible:border-[#5F8768]"
                      {...enquiryForm.register('checkOut')}
                    />
                    {enquiryForm.formState.errors.checkOut && (
                      <p className="text-xs text-red-500">
                        {enquiryForm.formState.errors.checkOut.message}
                      </p>
                    )}
                  </div>

                  {/* Guests */}
                  <div className="space-y-1.5">
                    <Label htmlFor="guests" className="text-sm text-[#2F3A33]">
                      Number of Guests *
                    </Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="guests"
                        type="number"
                        min={1}
                        max={apartment.maxGuests}
                        className="pl-9 border-[#D8D5CC] focus-visible:border-[#5F8768]"
                        {...enquiryForm.register('guests')}
                      />
                    </div>
                    {enquiryForm.formState.errors.guests && (
                      <p className="text-xs text-red-500">
                        {enquiryForm.formState.errors.guests.message}
                      </p>
                    )}
                  </div>

                  {/* Special Requests */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <Label htmlFor="specialRequests" className="text-sm text-[#2F3A33]">
                      Special Requests
                    </Label>
                    <Textarea
                      id="specialRequests"
                      placeholder="Any special requests or requirements..."
                      rows={3}
                      className="border-[#D8D5CC] focus-visible:border-[#5F8768] resize-none"
                      {...enquiryForm.register('specialRequests')}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={submittingEnquiry}
                  className="w-full sm:w-auto bg-[#5F8768] hover:bg-[#4A6B52] text-white px-8"
                >
                  {submittingEnquiry ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Inquiry
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* ─── 7. Related Apartments ─────────────────────────────────── */}
            {relatedApartments.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-[#2F3A33] mb-4">Similar Properties</h2>
                <div className="flex gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {relatedApartments.map((apt) => (
                    <Link
                      key={apt.id}
                      href={`/airbnb/${apt.id}`}
                      className="flex-shrink-0 w-72 bg-white rounded-xl border border-[#D8D5CC]/60 overflow-hidden hover:shadow-lg transition-shadow group"
                    >
                      <div className="aspect-[16/10] overflow-hidden">
                        {apt.images && apt.images.length > 0 ? (
                          <img
                            src={apt.images[0].url}
                            alt={apt.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-[#D8D5CC] flex items-center justify-center">
                            <ImageIcon className="w-8 h-8 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-sm text-[#2F3A33] truncate group-hover:text-[#5F8768] transition-colors">
                          {apt.name}
                        </h3>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {apt.area}, {apt.city}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm font-bold text-[#5F8768]">
                            {formatCurrency(apt.pricePerNight)}{' '}
                            <span className="font-normal text-xs text-gray-400">/ night</span>
                          </span>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            {apt.rating}
                          </div>
                        </div>
                        <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <BedDouble className="w-3 h-3" /> {apt.bedrooms}
                          </span>
                          <span className="flex items-center gap-1">
                            <Bath className="w-3 h-3" /> {apt.bathrooms}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" /> {apt.maxGuests}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* ─── Right Column (Pricing Card - Sticky) ─────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="lg:sticky lg:top-6 space-y-4">
              {/* Pricing Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-[#D8D5CC]/60 p-6">
                {/* Price */}
                <div className="mb-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-[#5F8768]">
                      {formatCurrency(apartment.pricePerNight)}
                    </span>
                    <span className="text-gray-500">/ night</span>
                  </div>
                  {apartment.weeklyPrice && (
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-gray-400 line-through">
                        {formatCurrency(apartment.pricePerNight * 7)} / week
                      </span>
                      <span className="text-sm font-medium text-[#5F8768]">
                        {formatCurrency(apartment.weeklyPrice)} / week
                      </span>
                    </div>
                  )}
                  {apartment.monthlyPrice && (
                    <p className="text-sm text-gray-500 mt-0.5">
                      {formatCurrency(apartment.monthlyPrice)} / month
                    </p>
                  )}
                </div>

                {/* Extra Fees */}
                {(apartment.cleaningFee || apartment.securityDeposit) && (
                  <div className="space-y-1.5 mb-4">
                    {apartment.cleaningFee && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Cleaning fee</span>
                        <span className="text-[#2F3A33] font-medium">
                          {formatCurrency(apartment.cleaningFee)} <span className="text-xs text-gray-400 font-normal">/ stay</span>
                        </span>
                      </div>
                    )}
                    {apartment.securityDeposit && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Security deposit</span>
                        <span className="text-[#2F3A33] font-medium">
                          {formatCurrency(apartment.securityDeposit)}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                <Separator className="mb-4" />

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(apartment.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'fill-gray-200 text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-[#2F3A33]">{apartment.rating}</span>
                  <span className="text-sm text-gray-400">({apartment.rating >= 4.5 ? 'excellent' : apartment.rating >= 4.0 ? 'very good' : 'good'})</span>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 rounded-xl bg-[#F8F7F3]">
                    <BedDouble className="w-5 h-5 mx-auto mb-1 text-[#5F8768]" />
                    <p className="text-lg font-bold text-[#2F3A33]">{apartment.bedrooms}</p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wide">Bedroom{apartment.bedrooms !== 1 ? 's' : ''}</p>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-[#F8F7F3]">
                    <Bath className="w-5 h-5 mx-auto mb-1 text-[#5F8768]" />
                    <p className="text-lg font-bold text-[#2F3A33]">{apartment.bathrooms}</p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wide">Bathroom{apartment.bathrooms !== 1 ? 's' : ''}</p>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-[#F8F7F3]">
                    <Users className="w-5 h-5 mx-auto mb-1 text-[#5F8768]" />
                    <p className="text-lg font-bold text-[#2F3A33]">{apartment.maxGuests}</p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wide">Guests</p>
                  </div>
                </div>

                {/* Price Summary when dates selected */}
                {priceCalc && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 pt-4 border-t border-[#D8D5CC]/60"
                  >
                    <h4 className="text-sm font-semibold text-[#2F3A33] mb-2">Price Summary</h4>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">
                          {formatCurrency(apartment.pricePerNight)} × {priceCalc.nights} night{priceCalc.nights !== 1 ? 's' : ''}
                        </span>
                        <span className="text-[#2F3A33]">{formatCurrency(priceCalc.baseTotal)}</span>
                      </div>
                      {priceCalc.weeklyDiscount > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-emerald-600">Weekly discount</span>
                          <span className="text-emerald-600">-{formatCurrency(priceCalc.weeklyDiscount)}</span>
                        </div>
                      )}
                      {priceCalc.cleaningFee > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Cleaning fee</span>
                          <span className="text-[#2F3A33]">{formatCurrency(priceCalc.cleaningFee)}</span>
                        </div>
                      )}
                      {priceCalc.securityDeposit > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Security deposit</span>
                          <span className="text-[#2F3A33]">{formatCurrency(priceCalc.securityDeposit)}</span>
                        </div>
                      )}
                      <Separator className="!bg-[#D8D5CC]/60" />
                      <div className="flex justify-between font-bold">
                        <span className="text-[#2F3A33]">Total</span>
                        <span className="text-[#5F8768] text-lg">{formatCurrency(priceCalc.grandTotal)}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* ─── 4. WhatsApp Booking Button ───────────────────────────── */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <Button
                        size="lg"
                        className={`
                          w-full rounded-xl py-4 text-lg font-semibold
                          ${checkIn && checkOut
                            ? 'bg-[#25D366] hover:bg-[#1FB855] text-white shadow-lg shadow-[#25D366]/25 cursor-pointer'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }
                        `}
                        disabled={!checkIn || !checkOut || !whatsappUrl}
                        onClick={() => {
                          if (whatsappUrl) window.open(whatsappUrl, '_blank');
                        }}
                      >
                        <MessageCircle className="w-5 h-5" />
                        {checkIn && checkOut ? 'Book via WhatsApp' : 'Select dates first'}
                      </Button>
                    </div>
                  </TooltipTrigger>
                  {(!checkIn || !checkOut) && (
                    <TooltipContent>
                      <p>Select check-in and check-out dates from the calendar above</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>

              {checkIn && checkOut && (
                <p className="text-center text-xs text-gray-400">
                  {format(checkIn, 'dd MMM')} → {format(checkOut, 'dd MMM yyyy')} ({differenceInDays(checkOut, checkIn)} nights)
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ─── Fullscreen Gallery Overlay ────────────────────────────────────── */}
      <AnimatePresence>
        {showGallery && (
          <FullscreenGallery
            images={apartment.images}
            currentIndex={heroIndex}
            onClose={() => setShowGallery(false)}
            onPrev={prevImage}
            onNext={nextImage}
          />
        )}
      </AnimatePresence>

      {/* Mobile WhatsApp sticky bar */}
      <AnimatePresence>
        {isMobile && checkIn && checkOut && whatsappUrl && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-white/90 backdrop-blur-lg border-t border-[#D8D5CC]/60"
          >
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <p className="text-sm font-bold text-[#5F8768]">
                  {formatCurrency(priceCalc?.finalTotal || 0)}
                </p>
                <p className="text-xs text-gray-400">
                  {priceCalc?.nights || 0} night{priceCalc?.nights !== 1 ? 's' : ''} total
                </p>
              </div>
              <Button
                onClick={() => window.open(whatsappUrl, '_blank')}
                className="bg-[#25D366] hover:bg-[#1FB855] text-white rounded-xl px-6 shadow-lg shadow-[#25D366]/25"
              >
                <MessageCircle className="w-5 h-5" />
                Book Now
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}