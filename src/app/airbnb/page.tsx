'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  MapPin,
  BedDouble,
  Bath,
  Users,
  Star,
  Heart,
  ChevronDown,
  ArrowRight,
  SlidersHorizontal,
  Home,
  Sparkles,
  Clock,
  Crown,
  Building2,
  Wallet,
  X,
  MessageCircle,
  ArrowLeft,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';

// ─── Types ───────────────────────────────────────────────────────────────────

interface ApartmentImage {
  id: string;
  url: string;
  alt?: string;
  sortOrder: number;
}

interface Apartment {
  id: string;
  name: string;
  code: string;
  description: string;
  address: string;
  city: string;
  area: string;
  pricePerNight: number;
  weeklyPrice?: number | null;
  monthlyPrice?: number | null;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  rating: number;
  status: string;
  category: string;
  featured: boolean;
  newlyAdded: boolean;
  images: ApartmentImage[];
}

// ─── Constants ───────────────────────────────────────────────────────────────

const CITIES = [
  { label: 'All Cities', value: '' },
  { label: 'Ho', value: 'Ho' },
  { label: 'Accra', value: 'Accra' },
];

const BEDROOM_OPTIONS = [
  { label: 'Any', value: '' },
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3+', value: '3' },
];

const GUEST_OPTIONS = [
  { label: 'Any', value: '' },
  { label: '1-2', value: '1' },
  { label: '3-4', value: '3' },
  { label: '5-8', value: '5' },
];

const CATEGORY_TABS = [
  { label: 'All Apartments', icon: Home, category: '', featured: '', newlyAdded: '' },
  { label: 'Featured', icon: Sparkles, category: '', featured: 'true', newlyAdded: '' },
  { label: 'Newly Added', icon: Clock, category: '', featured: '', newlyAdded: 'true' },
  { label: 'Available Today', icon: Building2, category: '', featured: '', newlyAdded: '', status: 'available' },
  { label: 'Luxury', icon: Crown, category: 'luxury', featured: '', newlyAdded: '' },
  { label: 'Executive', icon: Star, category: 'executive', featured: '', newlyAdded: '' },
  { label: 'Budget', icon: Wallet, category: 'budget', featured: '', newlyAdded: '' },
];

const CATEGORY_COLORS: Record<string, string> = {
  luxury: 'bg-amber-100 text-amber-800 border-amber-200',
  executive: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  budget: 'bg-orange-100 text-orange-800 border-orange-200',
  standard: 'bg-slate-100 text-slate-700 border-slate-200',
};

const STATUS_CONFIG: Record<string, { label: string; dotColor: string; bgColor: string; textColor: string }> = {
  available: { label: 'Available', dotColor: 'bg-emerald-500', bgColor: 'bg-emerald-50', textColor: 'text-emerald-700' },
  limited: { label: 'Limited', dotColor: 'bg-amber-500', bgColor: 'bg-amber-50', textColor: 'text-amber-700' },
  reserved: { label: 'Reserved', dotColor: 'bg-yellow-500', bgColor: 'bg-yellow-50', textColor: 'text-yellow-700' },
  booked: { label: 'Booked', dotColor: 'bg-red-500', bgColor: 'bg-red-50', textColor: 'text-red-700' },
  maintenance: { label: 'Maintenance', dotColor: 'bg-gray-500', bgColor: 'bg-gray-50', textColor: 'text-gray-700' },
};

// ─── Custom Select Component ─────────────────────────────────────────────────

function FilterSelect({
  value,
  onChange,
  options,
  placeholder,
  className = '',
}: {
  value: string;
  onChange: (val: string) => void;
  options: { label: string; value: string; min?: string; max?: string }[];
  placeholder: string;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none w-full h-10 pl-3 pr-8 text-sm bg-white border border-[#E5E3DC] rounded-lg text-[#2F3A33] focus:outline-none focus:border-[#5F8768] focus:ring-2 focus:ring-[#5F8768]/20 transition-all cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt.label} value={`${opt.value}|${opt.min || ''}|${opt.max || ''}`}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 size-4 text-[#6B7A6F] pointer-events-none" />
    </div>
  );
}

// ─── Skeleton Card ───────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="rounded-xl bg-white shadow-sm overflow-hidden border border-[#E5E3DC]/50">
      <Skeleton className="w-full aspect-[4/3]" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-3 w-16" />
        <div className="border-t border-[#E5E3DC]" />
        <div className="flex gap-4">
          <Skeleton className="h-4 w-14" />
          <Skeleton className="h-4 w-14" />
          <Skeleton className="h-4 w-14" />
        </div>
        <div className="flex justify-between items-center">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-4 w-12" />
        </div>
        <Skeleton className="h-9 w-full" />
      </div>
    </div>
  );
}

// ─── Apartment Card ──────────────────────────────────────────────────────────

function ApartmentCard({ apartment, index }: { apartment: Apartment; index: number }) {
  const router = useRouter();
  const [liked, setLiked] = useState(false);
  const statusCfg = STATUS_CONFIG[apartment.status] || STATUS_CONFIG.available;
  const catColor = CATEGORY_COLORS[apartment.category] || CATEGORY_COLORS.standard;
  const firstImage = apartment.images?.[0]?.url;
  const imageCount = apartment.images?.length || 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.06, ease: 'easeOut' }}
      className="group cursor-pointer rounded-xl bg-white shadow-sm border border-[#E5E3DC]/50 overflow-hidden hover:shadow-lg hover:shadow-[#5F8768]/8 transition-shadow duration-300"
      onClick={() => router.push(`/airbnb/${apartment.id}`)}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] bg-[#F0EFE9] overflow-hidden">
        {firstImage ? (
          <img
            src={firstImage}
            alt={apartment.images[0]?.alt || apartment.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#5F8768]/10 to-[#D8D5CC]/50">
            <Building2 className="size-10 text-[#5F8768]/40" />
          </div>
        )}

        {/* Category Badge */}
        <span
          className={`absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md border ${catColor}`}
        >
          {apartment.category}
        </span>

        {/* Featured Badge */}
        {apartment.featured && (
          <span className="absolute top-3 left-[calc(3rem+8px+0.5rem)] flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-md bg-amber-400 text-amber-900 border border-amber-300">
            <Star className="size-3 fill-amber-500 text-amber-600" />
            Featured
          </span>
        )}

        {/* Status Badge */}
        <span
          className={`absolute top-3 right-3 flex items-center gap-1.5 text-[10px] font-semibold px-2 py-0.5 rounded-full ${statusCfg.bgColor} ${statusCfg.textColor}`}
        >
          <span className={`size-1.5 rounded-full ${statusCfg.dotColor}`} />
          {statusCfg.label}
        </span>

        {/* Heart / Favorite */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setLiked(!liked);
          }}
          className="absolute top-11 right-3 mt-1 p-1.5 rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white transition-colors"
          aria-label="Toggle favorite"
        >
          <Heart
            className={`size-4 transition-colors ${
              liked ? 'fill-red-500 text-red-500' : 'text-gray-500'
            }`}
          />
        </button>

        {/* Image Dots */}
        {imageCount > 1 && (
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-white shadow-sm" />
            {imageCount > 1 && <span className="size-1.5 rounded-full bg-white/50 shadow-sm" />}
            {imageCount > 2 && <span className="size-1.5 rounded-full bg-white/50 shadow-sm" />}
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-4 space-y-2">
        {/* Location */}
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <MapPin className="size-3.5 shrink-0" />
          <span className="truncate">{apartment.city}, {apartment.area}</span>
        </div>

        {/* Name */}
        <h3 className="font-semibold text-[15px] text-[#2F3A33] leading-snug truncate">
          {apartment.name}
        </h3>

        {/* Code */}
        <span className="text-xs text-gray-400 font-medium">{apartment.code}</span>

        {/* Divider */}
        <div className="border-t border-[#E5E3DC]" />

        {/* Amenities Row */}
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <BedDouble className="size-3.5 text-[#5F8768]" />
            {apartment.bedrooms} {apartment.bedrooms === 1 ? 'Bed' : 'Beds'}
          </span>
          <span className="flex items-center gap-1">
            <Bath className="size-3.5 text-[#5F8768]" />
            {apartment.bathrooms} {apartment.bathrooms === 1 ? 'Bath' : 'Baths'}
          </span>
          <span className="flex items-center gap-1">
            <Users className="size-3.5 text-[#5F8768]" />
            {apartment.maxGuests} Guests
          </span>
        </div>

        {/* Price + Rating Row */}
        <div className="flex items-center justify-between">
          <span className="font-bold text-[15px] text-[#5F8768]">
            GH₵ {apartment.pricePerNight.toLocaleString()}
            <span className="font-normal text-xs text-gray-400 ml-1">/ night</span>
          </span>
          <span className="flex items-center gap-1 text-sm text-gray-600">
            <Star className="size-3.5 fill-amber-400 text-amber-400" />
            {apartment.rating.toFixed(1)}
          </span>
        </div>

        {/* View Details Button */}
        <Button
          variant="default"
          className="w-full mt-2 bg-[#5F8768] hover:bg-[#4A6B52] text-white h-9 text-sm font-medium gap-2 rounded-lg"
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/airbnb/${apartment.id}`);
          }}
        >
          View Details
          <ArrowRight className="size-3.5" />
        </Button>
      </div>
    </motion.div>
  );
}

// ─── Mobile Filter Sheet ─────────────────────────────────────────────────────

function MobileFilterSheet({
  search,
  onSearchChange,
  city,
  onCityChange,
  area,
  onAreaChange,
  priceRange,
  onPriceRangeChange,
  bedrooms,
  onBedroomsChange,
  guests,
  onGuestsChange,
  onApply,
  areaOptions,
  priceOptions,
}: {
  search: string;
  onSearchChange: (v: string) => void;
  city: string;
  onCityChange: (v: string) => void;
  area: string;
  onAreaChange: (v: string) => void;
  priceRange: string;
  onPriceRangeChange: (v: string) => void;
  bedrooms: string;
  onBedroomsChange: (v: string) => void;
  guests: string;
  onGuestsChange: (v: string) => void;
  onApply: () => void;
  areaOptions: { label: string; value: string; min: string; max: string }[];
  priceOptions: { label: string; value: string; min: string; max: string }[];
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="h-10 gap-2 border-[#E5E3DC] text-[#2F3A33]">
          <SlidersHorizontal className="size-4" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="max-h-[85vh] overflow-y-auto rounded-t-2xl">
        <SheetHeader className="text-left">
          <SheetTitle className="text-lg font-semibold text-[#2F3A33]">Search & Filters</SheetTitle>
          <SheetDescription>Find your perfect short-stay apartment</SheetDescription>
        </SheetHeader>

        <div className="px-4 space-y-4 pb-4">
          {/* Search Input */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-[#2F3A33]">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#6B7A6F]" />
              <Input
                placeholder="Apartment name, keyword..."
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-9 h-10 border-[#E5E3DC] bg-white"
              />
            </div>
          </div>

          {/* City */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-[#2F3A33]">City</label>
            <FilterSelect
              value={city}
              onChange={onCityChange}
              options={CITIES.map((c) => ({ label: c.label, value: c.value, min: '', max: '' }))}
              placeholder="All Cities"
            />
          </div>

          {/* Area */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-[#2F3A33]">Area</label>
            <FilterSelect
              value={area}
              onChange={onAreaChange}
              options={areaOptions}
              placeholder="All Areas"
            />
          </div>

          {/* Price Range */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-[#2F3A33]">Price Range</label>
            <FilterSelect
              value={priceRange}
              onChange={onPriceRangeChange}
              options={priceOptions}
              placeholder="Any Price"
            />
          </div>

          {/* Bedrooms & Guests in a row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[#2F3A33]">Bedrooms</label>
              <FilterSelect
                value={bedrooms}
                onChange={onBedroomsChange}
                options={BEDROOM_OPTIONS.map((b) => ({ label: b.label, value: b.value, min: '', max: '' }))}
                placeholder="Any"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[#2F3A33]">Guests</label>
              <FilterSelect
                value={guests}
                onChange={onGuestsChange}
                options={GUEST_OPTIONS.map((g) => ({ label: g.label, value: g.value, min: '', max: '' }))}
                placeholder="Any"
              />
            </div>
          </div>
        </div>

        <SheetFooter className="border-t border-[#E5E3DC] pt-4 px-4 pb-6">
          <Button
            onClick={onApply}
            className="w-full h-11 bg-[#5F8768] hover:bg-[#4A6B52] text-white font-medium gap-2 text-sm"
          >
            <Search className="size-4" />
            Search Apartments
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

// ─── Main Page Component ─────────────────────────────────────────────────────

export default function AirbnbListingPage() {
  const router = useRouter();

  // Filter state
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [guests, setGuests] = useState('');

  // Tab state
  const [activeTab, setActiveTab] = useState(0);
  const [tabCategory, setTabCategory] = useState('');
  const [tabFeatured, setTabFeatured] = useState('');
  const [tabNewlyAdded, setTabNewlyAdded] = useState('');
  const [tabStatus, setTabStatus] = useState('');

  // Dynamic filter options derived from apartment data
  const [dynamicAreas, setDynamicAreas] = useState<{ label: string; value: string }[]>([
    { label: 'All Areas', value: '' },
  ]);
  const [dynamicPriceRanges, setDynamicPriceRanges] = useState<
    { label: string; value: string; min: string; max: string }[]
  >([{ label: 'Any Price', value: '', min: '', max: '' }]);

  // Data state
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Track if initial load
  const [initialLoad, setInitialLoad] = useState(true);

  // Parse price range value from combined select value
  const parsePriceRange = useCallback((val: string) => {
    if (!val) return { min: '', max: '' };
    const parts = val.split('|');
    return { min: parts[1] || '', max: parts[2] || '' };
  }, []);

  // Fetch apartments
  const fetchApartments = useCallback(
    async (offset = 0, append = false) => {
      if (offset === 0) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      try {
        const params = new URLSearchParams();
        if (search) params.set('search', search);
        if (city) params.set('city', city);
        if (area) params.set('area', area);
        if (tabCategory) params.set('category', tabCategory);
        if (tabFeatured) params.set('featured', tabFeatured);
        if (tabNewlyAdded) params.set('newlyAdded', tabNewlyAdded);
        if (tabStatus) params.set('status', tabStatus);

        const { min, max } = parsePriceRange(priceRange);
        if (min) params.set('minPrice', min);
        if (max) params.set('maxPrice', max);

        if (bedrooms) params.set('bedrooms', bedrooms);
        if (guests) params.set('minGuests', guests);

        params.set('limit', '20');
        params.set('offset', String(offset));

        const res = await fetch(`/api/apartments?${params.toString()}`);
        const data = await res.json();

        if (res.ok) {
          const fetched: Apartment[] = data.apartments;
          if (append) {
            setApartments((prev) => [...prev, ...fetched]);
          } else {
            setApartments(fetched);
          }
          setTotal(data.total);

          // Build dynamic filter options from apartment data (only on initial full load)
          if (!append && initialLoad) {
            // Derive unique areas
            const allApts = data.apartments || [];
            const uniqueAreas = [...new Set(allApts.map((a: Apartment) => a.area).filter(Boolean))].sort();
            setDynamicAreas([
              { label: 'All Areas', value: '' },
              ...uniqueAreas.map((a: string) => ({ label: a, value: a })),
            ]);

            // Derive price ranges from actual prices
            const prices = allApts.map((a: Apartment) => a.pricePerNight).filter((p: number) => p > 0);
            if (prices.length > 0) {
              const minP = Math.min(...prices);
              const maxP = Math.max(...prices);
              const ranges: { label: string; value: string; min: string; max: string }[] = [
                { label: 'Any Price', value: '', min: '', max: '' },
              ];
              const brackets = [100, 200, 400, 600, 1000, 1500, 2000].filter(
                (b) => b >= Math.floor(minP / 100) * 100
              );
              for (let i = 0; i < brackets.length; i++) {
                const lo = i === 0 ? Math.floor(minP / 100) * 100 : brackets[i - 1];
                const hi = brackets[i];
                if (lo < hi) {
                  ranges.push({
                    label: `GH₵ ${lo.toLocaleString()} - GH₵ ${hi.toLocaleString()}`,
                    value: `${lo}|${hi}`,
                    min: String(lo),
                    max: String(hi),
                  });
                }
              }
              // "Over" bracket for the highest
              const lastBracket = brackets[brackets.length - 1];
              if (lastBracket < maxP) {
                ranges.push({
                  label: `Over GH₵ ${lastBracket.toLocaleString()}`,
                  value: `${lastBracket}|`,
                  min: String(lastBracket),
                  max: '',
                });
              }
              setDynamicPriceRanges(ranges);
            }
          }
        }
      } catch (err) {
        console.error('Failed to fetch apartments:', err);
      } finally {
        setLoading(false);
        setLoadingMore(false);
        setInitialLoad(false);
      }
    },
    [search, city, area, tabCategory, tabFeatured, tabNewlyAdded, tabStatus, priceRange, bedrooms, guests, parsePriceRange]
  );

  // Handle select value changes (parsing combined value)
  const handleCityChange = (val: string) => {
    const parts = val.split('|');
    setCity(parts[0]);
  };
  const handleAreaChange = (val: string) => {
    const parts = val.split('|');
    setArea(parts[0]);
  };
  const handlePriceRangeChange = (val: string) => {
    setPriceRange(val);
  };
  const handleBedroomsChange = (val: string) => {
    const parts = val.split('|');
    setBedrooms(parts[0]);
  };
  const handleGuestsChange = (val: string) => {
    const parts = val.split('|');
    setGuests(parts[0]);
  };

  // Tab click
  const handleTabClick = (index: number) => {
    setActiveTab(index);
    const tab = CATEGORY_TABS[index];
    setTabCategory(tab.category);
    setTabFeatured(tab.featured);
    setTabNewlyAdded(tab.newlyAdded);
    setTabStatus(tab.status || '');
  };

  // Apply filters (triggers fetch)
  const applyFilters = () => {
    fetchApartments(0, false);
  };

  // Load more
  const loadMore = () => {
    fetchApartments(apartments.length, true);
  };

  // Reset all filters
  const resetFilters = () => {
    setSearch('');
    setCity('');
    setArea('');
    setPriceRange('');
    setBedrooms('');
    setGuests('');
    setActiveTab(0);
    setTabCategory('');
    setTabFeatured('');
    setTabNewlyAdded('');
    setTabStatus('');
  };

  // Auto-fetch when filters or tabs change
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchApartments(0, false);
    }, 100);
    return () => clearTimeout(timer);
  }, [tabCategory, tabFeatured, tabNewlyAdded, tabStatus, fetchApartments]);

  const hasMore = apartments.length < total;

  return (
    <div className="min-h-screen bg-[#F8F7F3]">
      {/* ── Hero Banner ──────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-[#2F3A33] via-[#5F8768] to-[#4A6B52] overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)',
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          {/* Back Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm font-medium mb-4 transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            Back to Home
          </Link>

          <div className="max-w-2xl">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight tracking-tight">
              Short-Stay Apartments
              <br />
              <span className="text-white/90">in Volta Region</span>
            </h1>
            <p className="mt-2 text-sm sm:text-base text-white/70 leading-relaxed max-w-lg">
              Discover handpicked short-term stays across Ho, Accra, and beyond.
              Find the perfect apartment for your visit to Ghana&apos;s beautiful Volta Region.
            </p>
          </div>
        </div>
      </section>

      {/* ── Sticky Search Bar ────────────────────────────────────────── */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E5E3DC] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop Search Row */}
          <div className="hidden md:flex items-center gap-2 py-3">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#6B7A6F]" />
              <Input
                placeholder="Search apartments..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && applyFilters()}
                className="pl-9 h-10 border-[#E5E3DC] bg-white"
              />
            </div>
            <FilterSelect
              value={city}
              onChange={handleCityChange}
              options={CITIES.map((c) => ({ label: c.label, value: c.value, min: '', max: '' }))}
              placeholder="All Cities"
              className="w-36"
            />
            <FilterSelect
              value={area}
              onChange={handleAreaChange}
              options={dynamicAreas.map((a) => ({ label: a.label, value: a.value, min: '', max: '' }))}
              placeholder="All Areas"
              className="w-40"
            />
            <FilterSelect
              value={priceRange}
              onChange={handlePriceRangeChange}
              options={dynamicPriceRanges}
              placeholder="Any Price"
              className="w-44"
            />
            <FilterSelect
              value={bedrooms}
              onChange={handleBedroomsChange}
              options={BEDROOM_OPTIONS.map((b) => ({ label: b.label, value: b.value, min: '', max: '' }))}
              placeholder="Any"
              className="w-28"
            />
            <FilterSelect
              value={guests}
              onChange={handleGuestsChange}
              options={GUEST_OPTIONS.map((g) => ({ label: g.label, value: g.value, min: '', max: '' }))}
              placeholder="Any"
              className="w-28"
            />
            <Button
              onClick={applyFilters}
              className="h-10 bg-[#5F8768] hover:bg-[#4A6B52] text-white gap-2 px-5 shrink-0"
            >
              <Search className="size-4" />
              Search
            </Button>
            {(search || city || area || priceRange || bedrooms || guests) && (
              <Button variant="ghost" size="icon" onClick={resetFilters} className="shrink-0 text-gray-400 hover:text-[#2F3A33]" title="Reset filters">
                <X className="size-4" />
              </Button>
            )}
          </div>

          {/* Mobile Search Row */}
          <div className="flex md:hidden items-center gap-2 py-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#6B7A6F]" />
              <Input
                placeholder="Search apartments..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 h-10 border-[#E5E3DC] bg-white text-sm"
              />
            </div>
            <MobileFilterSheet
              search={search}
              onSearchChange={setSearch}
              city={city}
              onCityChange={handleCityChange}
              area={area}
              onAreaChange={handleAreaChange}
              priceRange={priceRange}
              onPriceRangeChange={handlePriceRangeChange}
              bedrooms={bedrooms}
              onBedroomsChange={handleBedroomsChange}
              guests={guests}
              onGuestsChange={handleGuestsChange}
              onApply={applyFilters}
              areaOptions={dynamicAreas.map((a) => ({ label: a.label, value: a.value, min: '', max: '' }))}
              priceOptions={dynamicPriceRanges}
            />
            <Button
              onClick={applyFilters}
              size="icon"
              className="h-10 w-10 bg-[#5F8768] hover:bg-[#4A6B52] text-white shrink-0"
            >
              <Search className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* ── Category Tabs ────────────────────────────────────────────── */}
      <div className="border-b border-[#E5E3DC] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-2 -mb-px">
            {CATEGORY_TABS.map((tab, i) => {
              const Icon = tab.icon;
              const isActive = activeTab === i;
              return (
                <button
                  key={tab.label}
                  onClick={() => handleTabClick(i)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium whitespace-nowrap rounded-lg transition-all duration-200 shrink-0 ${
                    isActive
                      ? 'bg-[#5F8768] text-white shadow-sm'
                      : 'text-[#6B7A6F] hover:text-[#2F3A33] hover:bg-[#F0EFE9]'
                  }`}
                >
                  <Icon className="size-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Main Content ─────────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Results Count */}
        {!loading && !initialLoad && apartments.length > 0 && (
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-[#6B7A6F] mb-5 font-medium"
          >
            {total} apartment{total !== 1 ? 's' : ''} found
          </motion.p>
        )}

        {/* Loading State */}
        {loading && initialLoad && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !initialLoad && apartments.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-[#F0EFE9] flex items-center justify-center mb-4">
              <Building2 className="size-7 text-[#6B7A6F]" />
            </div>
            <h3 className="text-lg font-semibold text-[#2F3A33] mb-1">No apartments found</h3>
            <p className="text-sm text-[#6B7A6F] mb-5 max-w-sm">
              Try adjusting your search or filter criteria to discover available apartments.
            </p>
            <Button
              onClick={resetFilters}
              variant="outline"
              className="border-[#5F8768] text-[#5F8768] hover:bg-[#5F8768] hover:text-white gap-2"
            >
              <X className="size-4" />
              Reset Filters
            </Button>
          </motion.div>
        )}

        {/* Apartment Grid */}
        <AnimatePresence mode="popLayout">
          {!loading && apartments.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {apartments.map((apt, i) => (
                <ApartmentCard key={apt.id} apartment={apt} index={i} />
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* Load More */}
        {!loading && hasMore && apartments.length > 0 && (
          <div className="flex justify-center mt-8 mb-4">
            <Button
              onClick={loadMore}
              disabled={loadingMore}
              variant="outline"
              className="h-11 px-8 border-[#5F8768] text-[#5F8768] hover:bg-[#5F8768] hover:text-white gap-2 font-medium text-sm rounded-lg transition-all"
            >
              {loadingMore ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  Load More
                  <ArrowRight className="size-4" />
                </>
              )}
            </Button>
          </div>
        )}

        {/* End of results indicator */}
        {!loading && !hasMore && apartments.length > 0 && (
          <p className="text-center text-xs text-[#6B7A6F] mt-6 mb-4">
            You&apos;ve viewed all {apartments.length} apartments
          </p>
        )}
      </main>

      {/* ── Floating WhatsApp Button ─────────────────────────────────── */}
      <a
        href="https://wa.me/233204700023"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 whatsapp-pulse"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="size-6" />
      </a>
    </div>
  );
}