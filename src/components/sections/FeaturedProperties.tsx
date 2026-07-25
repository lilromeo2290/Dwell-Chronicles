'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  MapPin,
  Bed,
  Bath,
  Maximize,
  Eye,
  Video,
  Phone,
  MessageCircle,
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
} from 'lucide-react';
import Link from 'next/link';

interface Property {
  id: number;
  title: string;
  price: string;
  priceNum: number;
  location: string;
  city: string;
  beds: number;
  baths: number;
  land: string;
  landSqm: number;
  type: string;
  status: string;
  img: string;
  images: string[];
  videoUrl?: string;
  description: string;
  amenities: string[];
  nearbySchools: string[];
  nearbyHospitals: string[];
  nearbyBanks: string[];
  nearbyPolice: string[];
  agentName: string;
  agentPhone: string;
  agentImage: string;
  propertyId: string;
}

const properties: Property[] = [
  {
    id: 1,
    title: 'Sage Manor Estate',
    price: 'GH\u20b5 15,500,000',
    priceNum: 15500000,
    location: 'Ikoyi, Lagos',
    city: 'Lagos',
    beds: 5,
    baths: 4,
    land: '1,200 sqm',
    landSqm: 1200,
    type: 'Detached House',
    status: 'For Sale',
    img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80',
      'https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=1200&q=80',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80',
      'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80',
      'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=1200&q=80',
    ],
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    description: 'A magnificent 5-bedroom detached house in the prestigious Ikoyi neighbourhood. This property features spacious living areas, a modern kitchen with high-end appliances, and a lush garden. Perfect for discerning families seeking luxury and comfort.',
    amenities: ['Swimming Pool', 'Garden', 'Security', 'Parking', 'Gym', 'Smart Home', 'Generator', 'Water Treatment'],
    nearbySchools: ['British International School (1.2km)', 'Lekki British School (2.5km)'],
    nearbyHospitals: ['Lagoon Hospitals (1.8km)', 'Reddington Hospital (3.1km)'],
    nearbyBanks: ['Access Bank Ikoyi (0.8km)', 'GTBank (1.5km)', 'Zenith Bank (2.0km)'],
    nearbyPolice: ['Ikoyi Police Station (1.0km)'],
    agentName: 'Kofi Mensah',
    agentPhone: '233547293193',
    agentImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    propertyId: 'DC-2024-001',
  },
  {
    id: 2,
    title: 'The Skyline Penthouse',
    price: 'GH\u20b5 10,500,000',
    priceNum: 10500000,
    location: 'Maitama, Abuja',
    city: 'Abuja',
    beds: 4,
    baths: 3,
    land: '450 sqm',
    landSqm: 450,
    type: 'Apartment',
    status: 'For Sale',
    img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
    ],
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    description: 'An exquisite 4-bedroom penthouse with panoramic city views. Features floor-to-ceiling windows, a private terrace, and world-class finishes throughout.',
    amenities: ['Rooftop Terrace', 'Concierge', 'Gym', 'Pool', 'Parking', 'CCTV', 'Generator'],
    nearbySchools: ['American International School (2.0km)'],
    nearbyHospitals: ['Nigerian Turkish Hospital (1.5km)', 'Asokoro District Hospital (3.0km)'],
    nearbyBanks: ['UBA Maitama (0.5km)', 'First Bank (1.2km)'],
    nearbyPolice: ['Maitama Police Division (0.8km)'],
    agentName: 'Ama Adjei',
    agentPhone: '233547293193',
    agentImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    propertyId: 'DC-2024-002',
  },
  {
    id: 3,
    title: 'Harbour View Apartments',
    price: 'GH\u20b5 4,500/mo',
    priceNum: 4500,
    location: 'Lekki, Lagos',
    city: 'Lagos',
    beds: 3,
    baths: 2,
    land: '280 sqm',
    landSqm: 280,
    type: 'Apartment',
    status: 'For Rent',
    img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80',
    ],
    description: 'A modern 3-bedroom apartment with stunning harbour views in the heart of Lekki. Fully furnished with contemporary finishes.',
    amenities: ['Furnished', 'AC', 'Parking', 'Security', 'Pool', 'Gym'],
    nearbySchools: ['Lekki British School (1.5km)'],
    nearbyHospitals: ['Lagoon Hospitals Lekki (2.0km)'],
    nearbyBanks: ['GTBank Lekki (0.8km)', 'Access Bank (1.5km)'],
    nearbyPolice: ['Lekki Police Post (1.0km)'],
    agentName: 'Kofi Mensah',
    agentPhone: '233547293193',
    agentImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    propertyId: 'DC-2024-003',
  },
  {
    id: 4,
    title: 'Palm Grove Business Park',
    price: 'GH\u20b5 35,000,000',
    priceNum: 35000000,
    location: 'Port Harcourt',
    city: 'Port Harcourt',
    beds: 0,
    baths: 4,
    land: '3,500 sqm',
    landSqm: 3500,
    type: 'Commercial',
    status: 'For Sale',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80',
    ],
    description: 'A prime commercial property ideal for offices, retail, or mixed-use development in the heart of Port Harcourt.',
    amenities: ['Elevator', 'Parking', 'CCTV', 'Fire System', 'Generator', 'Fibre Internet'],
    nearbySchools: [],
    nearbyHospitals: ['University of Port Harcourt Teaching Hospital (3.0km)'],
    nearbyBanks: ['First Bank PH (0.5km)', 'UBA (1.0km)'],
    nearbyPolice: ['PH Police Headquarters (1.2km)'],
    agentName: 'Ama Adjei',
    agentPhone: '233547293193',
    agentImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    propertyId: 'DC-2024-004',
  },
  {
    id: 5,
    title: 'Riverside Family Villa',
    price: 'GH\u20b5 8,400,000',
    priceNum: 8400000,
    location: 'East Legon, Accra',
    city: 'Accra',
    beds: 4,
    baths: 3,
    land: '800 sqm',
    landSqm: 800,
    type: 'Detached House',
    status: 'For Sale',
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80',
    ],
    description: 'A beautiful 4-bedroom family villa in the prestigious East Legon area. Spacious rooms, modern kitchen, and a private garden.',
    amenities: ['Garden', 'Parking', 'Security', 'Generator', 'Water Tank', 'Fenced'],
    nearbySchools: ['American International School (1.5km)', 'Ghana International School (2.0km)'],
    nearbyHospitals: ['Legon Hospital (2.5km)', 'University of Ghana Hospital (3.0km)'],
    nearbyBanks: ['ECOBANK East Legon (0.8km)', 'GCB Bank (1.2km)'],
    nearbyPolice: ['East Legon Police Station (1.0km)'],
    agentName: 'Kofi Mensah',
    agentPhone: '233547293193',
    agentImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    propertyId: 'DC-2024-005',
  },
  {
    id: 6,
    title: 'Greenfield Estate Plot',
    price: 'GH\u20b5 1,500,000',
    priceNum: 1500000,
    location: 'Guzape, Abuja',
    city: 'Abuja',
    beds: 0,
    baths: 0,
    land: '1,000 sqm',
    landSqm: 1000,
    type: 'Land',
    status: 'For Sale',
    img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80',
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80',
    ],
    description: 'A prime 1,000 sqm plot in the rapidly developing Guzape area. Perfect for residential or commercial development.',
    amenities: ['Fenced', 'Gated Community', 'Tarred Road', 'Electricity Available'],
    nearbySchools: [],
    nearbyHospitals: ['Asokoro District Hospital (2.5km)'],
    nearbyBanks: ['Zenith Bank Guzape (1.0km)'],
    nearbyPolice: ['Guzape Police Outpost (0.5km)'],
    agentName: 'Ama Adjei',
    agentPhone: '233547293193',
    agentImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    propertyId: 'DC-2024-006',
  },
  {
    id: 7,
    title: 'Ocean Breeze 3BR Apartment',
    price: 'GH\u20b5 3,200/mo',
    priceNum: 3200,
    location: 'Tema, Accra',
    city: 'Accra',
    beds: 3,
    baths: 2,
    land: '200 sqm',
    landSqm: 200,
    type: 'Apartment',
    status: 'Rented',
    img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80',
    ],
    description: 'A well-furnished 3-bedroom apartment near the Tema coastline. Currently rented but available for waitlist.',
    amenities: ['Furnished', 'AC', 'Parking', 'Security', 'Pool'],
    nearbySchools: ['Tema International School (1.8km)'],
    nearbyHospitals: ['Tema General Hospital (2.0km)'],
    nearbyBanks: ['GCB Tema (0.5km)'],
    nearbyPolice: ['Tema Police Station (1.2km)'],
    agentName: 'Kofi Mensah',
    agentPhone: '233547293193',
    agentImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    propertyId: 'DC-2024-007',
  },
  {
    id: 8,
    title: 'Heritage 2BR Flat',
    price: 'GH\u20b5 2,800/mo',
    priceNum: 2800,
    location: 'Airport Residential, Accra',
    city: 'Accra',
    beds: 2,
    baths: 2,
    land: '150 sqm',
    landSqm: 150,
    type: 'Apartment',
    status: 'Available',
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80',
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80',
    ],
    description: 'A cozy 2-bedroom flat in the serene Airport Residential area. Ideal for professionals.',
    amenities: ['AC', 'Parking', 'Security', 'Generator'],
    nearbySchools: ['Airport International School (1.0km)'],
    nearbyHospitals: ['37 Military Hospital (2.0km)'],
    nearbyBanks: ['SBIC Bank (0.3km)', 'CAL Bank (0.8km)'],
    nearbyPolice: ['Airport Police Station (0.5km)'],
    agentName: 'Ama Adjei',
    agentPhone: '233547293193',
    agentImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    propertyId: 'DC-2024-008',
  },
];

const uniqueCities = [...new Set(properties.map((p) => p.city))];
const uniqueTypes = [...new Set(properties.map((p) => p.type))];
const uniqueStatuses = ['Available', 'For Sale', 'For Rent', 'Rented', 'Sold'];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
};

export default function FeaturedProperties() {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    city: '',
    type: '',
    bedrooms: '',
    priceRange: '',
    landSize: '',
    status: '',
  });
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      if (filters.city && p.city !== filters.city) return false;
      if (filters.type && p.type !== filters.type) return false;
      if (filters.status && p.status !== filters.status) return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (
          !p.title.toLowerCase().includes(q) &&
          !p.location.toLowerCase().includes(q) &&
          !p.description.toLowerCase().includes(q)
        )
          return false;
      }
      if (filters.bedrooms) {
        const min = parseInt(filters.bedrooms);
        if (filters.bedrooms === '5+' ? p.beds < 5 : p.beds !== min) return false;
      }
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split('-').map(Number);
        if (p.priceNum < min || (max && p.priceNum > max)) return false;
      }
      if (filters.landSize) {
        const [min, max] = filters.landSize.split('-').map(Number);
        if (p.landSqm < min || (max && p.landSqm > max)) return false;
      }
      return true;
    });
  }, [filters]);

  const activeCount = [filters.city, filters.type, filters.status, filters.bedrooms, filters.priceRange, filters.landSize, filters.search].filter(Boolean).length;

  const filterBtnClass = showFilters || activeCount > 0
    ? 'flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-medium transition-all sm:px-6 border-[#5F8768] bg-green-100 text-[#5F8768]'
    : 'flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-medium transition-all sm:px-6 border-[#E5E3DC] text-[#2F3A33] hover:border-[#5F8768]';

  const clearFilters = () => setFilters({ search: '', city: '', type: '', bedrooms: '', priceRange: '', landSize: '', status: '' });

  const propertyLink = (id: string) => '/property/' + id;
  const whatsappLink = (phone: string, title: string, propId: string, price: string) => {
    return 'https://wa.me/' + phone + '?text=' + encodeURIComponent('Hi, I\'m interested in ' + title + ' (' + propId + ') - ' + price);
  };
  const telLink = (phone: string) => 'tel:+' + phone;
  const statusBadgeClass = (status: string) => {
    const base = 'absolute top-3 left-3 text-white text-xs font-medium px-3 py-1 rounded-full ';
    if (status === 'For Sale') return base + 'bg-[#5F8768]';
    if (status === 'For Rent' || status === 'Available') return base + 'bg-amber-500';
    if (status === 'Rented' || status === 'Sold') return base + 'bg-red-500';
    return base + 'bg-gray-500';
  };
  const heartClass = (id: string) => favorites.has(id) ? 'w-4 h-4 fill-red-500 text-red-500' : 'w-4 h-4 text-[#2F3A33]';

  const SelectField = ({ label, value, onChange, children, className = '' }: { label: string; value: string; onChange: (v: string) => void; children: React.ReactNode; className?: string }) => (
    <div className={className}>
      <label className="mb-1.5 block text-xs font-semibold tracking-wider text-[#6B7A6F] uppercase">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-xl border border-[#E5E3DC] bg-white py-2.5 pl-3 pr-8 text-sm text-[#2F3A33] focus:border-[#5F8768] focus:outline-none focus:ring-1 focus:ring-[#5F8768]"
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#6B7A6F]" />
      </div>
    </div>
  );

  return (
    <section id="properties" className="bg-[#F8F7F3] py-20 md:py-28 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2F3A33]">
            Featured Properties
          </h2>
          <p className="mt-3 text-[#6B7A6F] max-w-2xl mx-auto">
            Handpicked properties across Ghana — homes, apartments for rent, lands for sale, and commercial real estate Ghana listings matching your lifestyle and investment goals
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="mb-8 rounded-2xl border border-[#E5E3DC] bg-white p-4 shadow-sm md:p-5">
          {/* Search Row */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7A6F]" />
              <input
                type="text"
                placeholder="Search by name, location, or keyword..."
                value={filters.search}
                onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
                className="w-full rounded-xl border border-[#E5E3DC] bg-[#F8F7F3] py-2.5 pl-10 pr-4 text-sm text-[#2F3A33] placeholder:text-[#9ca3af] focus:border-[#5F8768] focus:outline-none focus:ring-1 focus:ring-[#5F8768]"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={filterBtnClass}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {activeCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#5F8768] text-xs text-white">{activeCount}</span>
              )}
            </button>
          </div>

          {/* Expandable Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-2 gap-3 pt-4 sm:grid-cols-3 md:grid-cols-6 border-t border-[#E5E3DC] mt-3">
                  <SelectField label="Location" value={filters.city} onChange={(v) => setFilters((f) => ({ ...f, city: v }))}>
                    <option value="">All Cities</option>
                    {uniqueCities.map((c) => <option key={c} value={c}>{c}</option>)}
                  </SelectField>

                  <SelectField label="Property Type" value={filters.type} onChange={(v) => setFilters((f) => ({ ...f, type: v }))}>
                    <option value="">All Types</option>
                    {uniqueTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                  </SelectField>

                  <SelectField label="Price Range" value={filters.priceRange} onChange={(v) => setFilters((f) => ({ ...f, priceRange: v }))}>
                    <option value="">Any Price</option>
                    <option value="0-3000">Under GH\u20b5 3,000</option>
                    <option value="3000-10000">GH\u20b5 3K - 10K</option>
                    <option value="10000-100000">GH\u20b5 10K - 100K</option>
                    <option value="100000-1000000">GH\u20b5 100K - 1M</option>
                    <option value="1000000-">Above GH\u20b5 1M</option>
                  </SelectField>

                  <SelectField label="Bedrooms" value={filters.bedrooms} onChange={(v) => setFilters((f) => ({ ...f, bedrooms: v }))}>
                    <option value="">Any</option>
                    <option value="1">1 Bedroom</option>
                    <option value="2">2 Bedrooms</option>
                    <option value="3">3 Bedrooms</option>
                    <option value="4">4 Bedrooms</option>
                    <option value="5+">5+</option>
                  </SelectField>

                  <SelectField label="Land Size" value={filters.landSize} onChange={(v) => setFilters((f) => ({ ...f, landSize: v }))}>
                    <option value="">Any Size</option>
                    <option value="0-200">Under 200 sqm</option>
                    <option value="200-500">200 - 500 sqm</option>
                    <option value="500-1000">500 - 1,000 sqm</option>
                    <option value="1000-">Above 1,000 sqm</option>
                  </SelectField>

                  <SelectField label="Status" value={filters.status} onChange={(v) => setFilters((f) => ({ ...f, status: v }))}>
                    <option value="">All Statuses</option>
                    {uniqueStatuses.map((s) => <option key={s} value={s}>{s}</option>)}
                  </SelectField>
                </div>

                {activeCount > 0 && (
                  <div className="flex items-center justify-between pt-3 mt-2 border-t border-[#E5E3DC]">
                    <span className="text-sm text-[#6B7A6F]">{filteredProperties.length} result{filteredProperties.length !== 1 ? 's' : ''} found</span>
                    <button
                      onClick={clearFilters}
                      className="flex items-center gap-1 text-sm font-medium text-red-500 hover:text-red-600"
                    >
                      <X className="h-3.5 w-3.5" />
                      Clear all
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Results count when filters active but panel closed */}
        {!showFilters && activeCount > 0 && (
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-[#6B7A6F]">Showing {filteredProperties.length} of {properties.length} properties</p>
            <button onClick={clearFilters} className="text-sm font-medium text-[#5F8768] hover:underline">Clear filters</button>
          </div>
        )}

        {/* Property Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <AnimatePresence mode="popLayout">
            {filteredProperties.map((property) => (
              <motion.div
                key={property.id}
                variants={cardVariants}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="property-card rounded-2xl overflow-hidden bg-white shadow-sm"
              >
                {/* Image */}
                <Link href={propertyLink(property.id)}>
                  <div className="relative h-56 cursor-pointer">
                    <img
                      src={property.img}
                      alt={property.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                    <span
                      className={statusBadgeClass(property.status)}
                    >
                      {property.status}
                    </span>
                    <button
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(property.id); }}
                      className="absolute top-3 right-3 bg-white rounded-full p-2 hover:bg-red-50 transition-colors cursor-pointer"
                      aria-label="Toggle favorite"
                    >
                      <Heart className={heartClass(property.id)} />
                    </button>
                    {/* Photo count */}
                    <span className="absolute bottom-3 right-3 bg-gray-800 text-white text-xs px-2 py-0.5 rounded-full">
                      {property.images.length} photos
                    </span>
                  </div>
                </Link>

                {/* Content */}
                <div className="p-5">
                  <p className="text-2xl font-bold text-[#5F8768]">{property.price}</p>
                  <h3 className="text-lg font-semibold text-[#2F3A33] mt-1">{property.title}</h3>
                  <div className="flex items-center gap-1.5 mt-2">
                    <MapPin className="w-4 h-4 text-[#6B7A6F] shrink-0" />
                    <span className="text-sm text-[#6B7A6F]">{property.location}</span>
                  </div>

                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-[#E5E3DC]">
                    {property.beds > 0 && (
                      <div className="flex items-center gap-1.5">
                        <Bed className="w-4 h-4 text-[#6B7A6F]" />
                        <span className="text-sm text-[#6B7A6F]">{property.beds} Beds</span>
                      </div>
                    )}
                    {property.beds > 0 && property.baths > 0 && <div className="w-px h-4 bg-[#E5E3DC]" />}
                    {property.baths > 0 && (
                      <div className="flex items-center gap-1.5">
                        <Bath className="w-4 h-4 text-[#6B7A6F]" />
                        <span className="text-sm text-[#6B7A6F]">{property.baths} Baths</span>
                      </div>
                    )}
                    <div className="w-px h-4 bg-[#E5E3DC]" />
                    <div className="flex items-center gap-1.5">
                      <Maximize className="w-4 h-4 text-[#6B7A6F]" />
                      <span className="text-sm text-[#6B7A6F]">{property.land}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-5">
                    <Link href={propertyLink(property.id)} className="flex-1 bg-[#5F8768] text-white text-sm font-medium rounded-xl px-4 py-2.5 hover:bg-[#4A6B52] transition-colors flex items-center justify-center gap-1.5">
                      <Eye className="w-4 h-4" />
                      View Details
                    </Link>
                    <a
                      href={whatsappLink(property.agentPhone, property.title, property.propertyId, property.price)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl border border-[#E5E3DC] text-[#2F3A33] hover:border-[#25D366] hover:text-[#25D366] transition-colors"
                      aria-label="WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                    <a
                      href={telLink(property.agentPhone)}
                      className="p-2.5 rounded-xl border border-[#E5E3DC] text-[#2F3A33] hover:border-[#5F8768] hover:text-[#5F8768] transition-colors"
                      aria-label="Call agent"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-16">
            <Search className="mx-auto h-12 w-12 text-[#E5E3DC] mb-4" />
            <p className="text-lg font-semibold text-[#2F3A33]">No properties match your filters</p>
            <p className="text-sm text-[#6B7A6F] mt-1">Try adjusting your search criteria</p>
            <button onClick={clearFilters} className="mt-4 text-sm font-medium text-[#5F8768] hover:underline">Clear all filters</button>
          </div>
        )}
      </div>
    </section>
  );
}
