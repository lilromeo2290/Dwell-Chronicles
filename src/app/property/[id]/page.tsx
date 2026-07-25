'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  MapPin,
  Bed,
  Bath,
  Maximize,
  Heart,
  Share2,
  MessageCircle,
  Phone,
  Video,
  GraduationCap,
  Hospital,
  Landmark,
  Shield,
  Calculator,
  ChevronLeft,
  ChevronRight,
  X,
  Home,
  CheckCircle2,
  Copy,
} from 'lucide-react';
import Link from 'next/link';

/* ─── Property data (same as FeaturedProperties) ─── */
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
    id: 1, title: 'Sage Manor Estate', price: 'GH\u20b5 15,500,000', priceNum: 15500000, location: 'Ikoyi, Lagos', city: 'Lagos', beds: 5, baths: 4, land: '1,200 sqm', landSqm: 1200, type: 'Detached House', status: 'For Sale',
    img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80','https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80','https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80','https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80','https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80','https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80','https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80','https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=1200&q=80','https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80','https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=1200&q=80','https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80','https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=1200&q=80'],
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    description: 'A magnificent 5-bedroom detached house in the prestigious Ikoyi neighbourhood. This property features spacious living areas, a modern kitchen with high-end appliances, and a lush garden. Perfect for discerning families seeking luxury and comfort. The master suite includes a walk-in closet, en-suite bathroom with jacuzzi, and a private balcony overlooking the garden.',
    amenities: ['Swimming Pool','Garden','24/7 Security','Covered Parking for 4 Cars','Home Gym','Smart Home System','Standby Generator','Water Treatment Plant','CCTV','Serviced Quarters'],
    nearbySchools: ['British International School (1.2km)','Lekki British School (2.5km)','Grange School (3.0km)'],
    nearbyHospitals: ['Lagoon Hospitals (1.8km)','Reddington Hospital (3.1km)','St. Nicholas Hospital (3.5km)'],
    nearbyBanks: ['Access Bank Ikoyi (0.8km)','GTBank (1.5km)','Zenith Bank (2.0km)','First Bank (2.3km)'],
    nearbyPolice: ['Ikoyi Police Station (1.0km)'],
    agentName: 'Kofi Mensah', agentPhone: '233547293193', agentImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80', propertyId: 'DC-2024-001',
  },
  {
    id: 2, title: 'The Skyline Penthouse', price: 'GH\u20b5 10,500,000', priceNum: 10500000, location: 'Maitama, Abuja', city: 'Abuja', beds: 4, baths: 3, land: '450 sqm', landSqm: 450, type: 'Apartment', status: 'For Sale',
    img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80','https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80','https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80','https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80','https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80','https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80'],
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    description: 'An exquisite 4-bedroom penthouse with panoramic city views. Features floor-to-ceiling windows, a private terrace, and world-class finishes throughout.',
    amenities: ['Rooftop Terrace','Concierge','Gym','Pool','Parking','CCTV','Generator'],
    nearbySchools: ['American International School (2.0km)'], nearbyHospitals: ['Nigerian Turkish Hospital (1.5km)','Asokoro District Hospital (3.0km)'],
    nearbyBanks: ['UBA Maitama (0.5km)','First Bank (1.2km)'], nearbyPolice: ['Maitama Police Division (0.8km)'],
    agentName: 'Ama Adjei', agentPhone: '233547293193', agentImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80', propertyId: 'DC-2024-002',
  },
  {
    id: 3, title: 'Harbour View Apartments', price: 'GH\u20b5 4,500/mo', priceNum: 4500, location: 'Lekki, Lagos', city: 'Lagos', beds: 3, baths: 2, land: '280 sqm', landSqm: 280, type: 'Apartment', status: 'For Rent',
    img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80','https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80','https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80','https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80'],
    description: 'A modern 3-bedroom apartment with stunning harbour views in the heart of Lekki. Fully furnished with contemporary finishes.',
    amenities: ['Furnished','AC','Parking','Security','Pool','Gym'],
    nearbySchools: ['Lekki British School (1.5km)'], nearbyHospitals: ['Lagoon Hospitals Lekki (2.0km)'], nearbyBanks: ['GTBank Lekki (0.8km)','Access Bank (1.5km)'], nearbyPolice: ['Lekki Police Post (1.0km)'],
    agentName: 'Kofi Mensah', agentPhone: '233547293193', agentImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80', propertyId: 'DC-2024-003',
  },
  {
    id: 4, title: 'Palm Grove Business Park', price: 'GH\u20b5 35,000,000', priceNum: 35000000, location: 'Port Harcourt', city: 'Port Harcourt', beds: 0, baths: 4, land: '3,500 sqm', landSqm: 3500, type: 'Commercial', status: 'For Sale',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80','https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80','https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80'],
    description: 'A prime commercial property ideal for offices, retail, or mixed-use development in the heart of Port Harcourt.',
    amenities: ['Elevator','Parking','CCTV','Fire System','Generator','Fibre Internet'],
    nearbySchools: [], nearbyHospitals: ['University of Port Harcourt Teaching Hospital (3.0km)'], nearbyBanks: ['First Bank PH (0.5km)','UBA (1.0km)'], nearbyPolice: ['PH Police Headquarters (1.2km)'],
    agentName: 'Ama Adjei', agentPhone: '233547293193', agentImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80', propertyId: 'DC-2024-004',
  },
  {
    id: 5, title: 'Riverside Family Villa', price: 'GH\u20b5 8,400,000', priceNum: 8400000, location: 'East Legon, Accra', city: 'Accra', beds: 4, baths: 3, land: '800 sqm', landSqm: 800, type: 'Detached House', status: 'For Sale',
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80','https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80','https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80','https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80','https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80'],
    description: 'A beautiful 4-bedroom family villa in the prestigious East Legon area. Spacious rooms, modern kitchen, and a private garden.',
    amenities: ['Garden','Parking','Security','Generator','Water Tank','Fenced'],
    nearbySchools: ['American International School (1.5km)','Ghana International School (2.0km)'], nearbyHospitals: ['Legon Hospital (2.5km)','University of Ghana Hospital (3.0km)'], nearbyBanks: ['ECOBANK East Legon (0.8km)','GCB Bank (1.2km)'], nearbyPolice: ['East Legon Police Station (1.0km)'],
    agentName: 'Kofi Mensah', agentPhone: '233547293193', agentImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80', propertyId: 'DC-2024-005',
  },
  {
    id: 6, title: 'Greenfield Estate Plot', price: 'GH\u20b5 1,500,000', priceNum: 1500000, location: 'Guzape, Abuja', city: 'Abuja', beds: 0, baths: 0, land: '1,000 sqm', landSqm: 1000, type: 'Land', status: 'For Sale',
    img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80','https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80'],
    description: 'A prime 1,000 sqm plot in the rapidly developing Guzape area. Perfect for residential or commercial development.',
    amenities: ['Fenced','Gated Community','Tarred Road','Electricity Available'],
    nearbySchools: [], nearbyHospitals: ['Asokoro District Hospital (2.5km)'], nearbyBanks: ['Zenith Bank Guzape (1.0km)'], nearbyPolice: ['Guzape Police Outpost (0.5km)'],
    agentName: 'Ama Adjei', agentPhone: '233547293193', agentImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80', propertyId: 'DC-2024-006',
  },
  {
    id: 7, title: 'Ocean Breeze 3BR Apartment', price: 'GH\u20b5 3,200/mo', priceNum: 3200, location: 'Tema, Accra', city: 'Accra', beds: 3, baths: 2, land: '200 sqm', landSqm: 200, type: 'Apartment', status: 'Rented',
    img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80','https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80','https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80'],
    description: 'A well-furnished 3-bedroom apartment near the Tema coastline. Currently rented but available for waitlist.',
    amenities: ['Furnished','AC','Parking','Security','Pool'],
    nearbySchools: ['Tema International School (1.8km)'], nearbyHospitals: ['Tema General Hospital (2.0km)'], nearbyBanks: ['GCB Tema (0.5km)'], nearbyPolice: ['Tema Police Station (1.2km)'],
    agentName: 'Kofi Mensah', agentPhone: '233547293193', agentImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80', propertyId: 'DC-2024-007',
  },
  {
    id: 8, title: 'Heritage 2BR Flat', price: 'GH\u20b5 2,800/mo', priceNum: 2800, location: 'Airport Residential, Accra', city: 'Accra', beds: 2, baths: 2, land: '150 sqm', landSqm: 150, type: 'Apartment', status: 'Available',
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80',
    images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80','https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80'],
    description: 'A cozy 2-bedroom flat in the serene Airport Residential area. Ideal for professionals.',
    amenities: ['AC','Parking','Security','Generator'],
    nearbySchools: ['Airport International School (1.0km)'], nearbyHospitals: ['37 Military Hospital (2.0km)'], nearbyBanks: ['SBIC Bank (0.3km)','CAL Bank (0.8km)'], nearbyPolice: ['Airport Police Station (0.5km)'],
    agentName: 'Ama Adjei', agentPhone: '233547293193', agentImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80', propertyId: 'DC-2024-008',
  },
];

function getYouTubeEmbedUrl(url?: string) {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

function MortgageEstimate({ priceNum, status }: { priceNum: number; status: string }) {
  if (status === 'For Rent' || status === 'Rented' || status === 'Available') return null;
  const downPayment = priceNum * 0.2;
  const loanAmount = priceNum - downPayment;
  const rate = 0.25 / 12;
  const months = 20 * 12;
  const monthly = (loanAmount * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
  const totalPayment = monthly * months;
  return (
    <div className="rounded-2xl border border-[#E5E3DC] bg-white p-6">
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="h-5 w-5 text-[#5F8768]" />
        <h3 className="font-semibold text-[#2F3A33]">Mortgage Estimate</h3>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div><p className="text-[#6B7A6F]">Property Price</p><p className="font-semibold text-[#2F3A33]">GH\u20b5 {priceNum.toLocaleString()}</p></div>
        <div><p className="text-[#6B7A6F]">20% Down Payment</p><p className="font-semibold text-[#2F3A33]">GH\u20b5 {downPayment.toLocaleString()}</p></div>
        <div><p className="text-[#6B7A6F]">Loan Amount</p><p className="font-semibold text-[#2F3A33]">GH\u20b5 {loanAmount.toLocaleString()}</p></div>
        <div><p className="text-[#6B7A6F]">Interest Rate</p><p className="font-semibold text-[#2F3A33]">25% / year</p></div>
        <div><p className="text-[#6B7A6F]">Loan Term</p><p className="font-semibold text-[#2F3A33]">20 years</p></div>
        <div><p className="text-[#6B7A6F]">Monthly Payment</p><p className="font-bold text-[#5F8768] text-base">GH\u20b5 {Math.round(monthly).toLocaleString()}</p></div>
      </div>
      <p className="mt-3 text-xs text-[#6B7A6F]">* Estimate based on 25% annual rate over 20 years. Actual rates may vary.</p>
    </div>
  );
}

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [currentImg, setCurrentImg] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isFav, setIsFav] = useState(false);

  const property = properties.find((p) => p.id === Number(params.id));
  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F7F3]">
        <div className="text-center">
          <Home className="mx-auto h-16 w-16 text-[#E5E3DC] mb-4" />
          <h2 className="text-2xl font-bold text-[#2F3A33]">Property Not Found</h2>
          <Link href="/" className="mt-4 inline-block text-[#5F8768] hover:underline">Back to Home</Link>
        </div>
      </div>
    );
  }

  const youtubeEmbed = getYouTubeEmbedUrl(property.videoUrl);
  const whatsappMsg = encodeURIComponent(`Hi, I'm interested in ${property.title} (${property.propertyId}) - ${property.price}. Please share more details.`);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: property.title, url: window.location.href });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {}
  };

  const NearbySection = ({ icon: Icon, title, items, color }: { icon: React.ElementType; title: string; items: string[]; color: string }) => {
    if (items.length === 0) return null;
    return (
      <div className="flex gap-3 items-start p-3 rounded-xl bg-[#F8F7F3]">
        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${color}`}>
          <Icon className="h-4 w-4 text-white" />
        </div>
        <div>
          <h4 className="font-semibold text-sm text-[#2F3A33]">{title}</h4>
          {items.map((item, i) => (
            <p key={i} className="text-xs text-[#6B7A6F]">{item}</p>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8F7F3]">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 flex items-center justify-between bg-white/90 backdrop-blur-md border-b border-[#E5E3DC] px-4 py-3">
        <button onClick={() => router.push('/')} className="flex items-center gap-2 text-sm font-medium text-[#2F3A33] hover:text-[#5F8768] transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Properties
        </button>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#6B7A6F] font-mono">{property.propertyId}</span>
          <button onClick={() => setIsFav(!isFav)} className="p-2 rounded-lg hover:bg-[#F8F7F3] transition-colors">
            <Heart className={`h-5 w-5 ${isFav ? 'fill-red-500 text-red-500' : 'text-[#2F3A33]'}`} />
          </button>
          <button onClick={handleShare} className="p-2 rounded-lg hover:bg-[#F8F7F3] transition-colors relative">
            {copied ? <CheckCircle2 className="h-5 w-5 text-[#5F8768]" /> : <Share2 className="h-5 w-5 text-[#2F3A33]" />}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ─── Left Column (2/3) ─── */}
          <div className="lg:col-span-2 space-y-8">
            {/* Photo Gallery */}
            <div>
              {/* Main Image */}
              <div
                className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#2F3A33] cursor-pointer group"
                onClick={() => setShowLightbox(true)}
              >
                <img src={property.images[currentImg]} alt={property.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                <span className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full">
                  {currentImg + 1} / {property.images.length} photos
                </span>
                {currentImg > 0 && (
                  <button onClick={(e) => { e.stopPropagation(); setCurrentImg((i) => i - 1); }} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 shadow-lg hover:bg-white transition-colors">
                    <ChevronLeft className="h-5 w-5 text-[#2F3A33]" />
                  </button>
                )}
                {currentImg < property.images.length - 1 && (
                  <button onClick={(e) => { e.stopPropagation(); setCurrentImg((i) => i + 1); }} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 shadow-lg hover:bg-white transition-colors">
                    <ChevronRight className="h-5 w-5 text-[#2F3A33]" />
                  </button>
                )}
              </div>
              {/* Thumbnails */}
              <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
                {property.images.map((img, i) => (
                  <button key={i} onClick={() => setCurrentImg(i)} className={`shrink-0 h-16 w-24 rounded-lg overflow-hidden border-2 transition-all ${i === currentImg ? 'border-[#5F8768] shadow-md' : 'border-transparent opacity-70 hover:opacity-100'}`}>
                    <img src={img} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
                {youtubeEmbed && (
                  <button onClick={() => setShowVideo(true)} className="shrink-0 flex h-16 w-24 flex-col items-center justify-center gap-1 rounded-lg border-2 border-[#E5E3DC] bg-white hover:border-[#5F8768] transition-colors">
                    <Video className="h-5 w-5 text-[#5F8768]" />
                    <span className="text-[10px] text-[#6B7A6F]">Video</span>
                  </button>
                )}
              </div>
            </div>

            {/* Video Modal */}
            <AnimatePresence>
              {showVideo && youtubeEmbed && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4" onClick={() => setShowVideo(false)}>
                  <div className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
                    <iframe src={youtubeEmbed} className="w-full h-full" allowFullScreen allow="autoplay" />
                    <button onClick={() => setShowVideo(false)} className="absolute top-3 right-3 bg-white/90 rounded-full p-2 hover:bg-white transition-colors"><X className="h-5 w-5" /></button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Lightbox */}
            <AnimatePresence>
              {showLightbox && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4" onClick={() => setShowLightbox(false)}>
                  <button onClick={() => setShowLightbox(false)} className="absolute top-4 right-4 bg-white/90 rounded-full p-2 hover:bg-white z-10"><X className="h-5 w-5" /></button>
                  <button onClick={(e) => { e.stopPropagation(); setCurrentImg((i) => (i - 1 + property.images.length) % property.images.length); }} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-3 hover:bg-white z-10"><ChevronLeft className="h-6 w-6" /></button>
                  <img src={property.images[currentImg]} alt="" className="max-h-[85vh] max-w-full object-contain rounded-lg" onClick={(e) => e.stopPropagation()} />
                  <button onClick={(e) => { e.stopPropagation(); setCurrentImg((i) => (i + 1) % property.images.length); }} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-3 hover:bg-white z-10"><ChevronRight className="h-6 w-6" /></button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Description */}
            <div className="rounded-2xl border border-[#E5E3DC] bg-white p-6 md:p-8">
              <h2 className="text-xl font-bold text-[#2F3A33] mb-4">Description</h2>
              <p className="text-[#4A5249] leading-relaxed">{property.description}</p>
              <div className="flex flex-wrap gap-6 mt-6 pt-6 border-t border-[#E5E3DC]">
                <div className="flex items-center gap-2"><Bed className="h-4 w-4 text-[#5F8768]" /><span className="text-sm text-[#2F3A33] font-medium">{property.beds > 0 ? `${property.beds} Bedroom${property.beds > 1 ? 's' : ''}` : 'N/A'}</span></div>
                <div className="flex items-center gap-2"><Bath className="h-4 w-4 text-[#5F8768]" /><span className="text-sm text-[#2F3A33] font-medium">{property.baths > 0 ? `${property.baths} Bathroom${property.baths > 1 ? 's' : ''}` : 'N/A'}</span></div>
                <div className="flex items-center gap-2"><Maximize className="h-4 w-4 text-[#5F8768]" /><span className="text-sm text-[#2F3A33] font-medium">{property.land}</span></div>
                <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[#5F8768]" /><span className="text-sm text-[#2F3A33] font-medium">{property.location}</span></div>
              </div>
            </div>

            {/* Amenities */}
            <div className="rounded-2xl border border-[#E5E3DC] bg-white p-6 md:p-8">
              <h2 className="text-xl font-bold text-[#2F3A33] mb-4">Amenities & Features</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.amenities.map((a) => (
                  <div key={a} className="flex items-center gap-2 text-sm text-[#4A5249]"><CheckCircle2 className="h-4 w-4 text-[#5F8768] shrink-0" />{a}</div>
                ))}
              </div>
            </div>

            {/* Google Map */}
            <div className="rounded-2xl border border-[#E5E3DC] bg-white p-6 md:p-8">
              <h2 className="text-xl font-bold text-[#2F3A33] mb-4">Location</h2>
              <div className="aspect-[16/9] rounded-xl overflow-hidden bg-[#E5E3DC]">
                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(property.location + ', Ghana')}&zoom=14`}
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <p className="mt-3 flex items-center gap-1.5 text-sm text-[#6B7A6F]"><MapPin className="h-4 w-4" />{property.location}</p>
            </div>

            {/* Nearby Amenities */}
            {(property.nearbySchools.length > 0 || property.nearbyHospitals.length > 0 || property.nearbyBanks.length > 0 || property.nearbyPolice.length > 0) && (
              <div className="rounded-2xl border border-[#E5E3DC] bg-white p-6 md:p-8">
                <h2 className="text-xl font-bold text-[#2F3A33] mb-4">Nearby Amenities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <NearbySection icon={GraduationCap} title="Schools" items={property.nearbySchools} color="bg-blue-500" />
                  <NearbySection icon={Hospital} title="Hospitals" items={property.nearbyHospitals} color="bg-red-500" />
                  <NearbySection icon={Landmark} title="Banks" items={property.nearbyBanks} color="bg-amber-600" />
                  <NearbySection icon={Shield} title="Police Stations" items={property.nearbyPolice} color="bg-indigo-600" />
                </div>
              </div>
            )}
          </div>

          {/* ─── Right Column (1/3) ─── */}
          <div className="space-y-6">
            {/* Price Card */}
            <div className="rounded-2xl border border-[#E5E3DC] bg-white p-6 sticky top-16">
              <span className={`inline-block text-xs font-medium px-3 py-1 rounded-full mb-3 ${property.status === 'For Sale' ? 'bg-[#5F8768]/10 text-[#5F8768]' : property.status === 'For Rent' || property.status === 'Available' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>{property.status}</span>
              <p className="text-3xl font-bold text-[#5F8768]">{property.price}</p>
              <h1 className="text-lg font-bold text-[#2F3A33] mt-2">{property.title}</h1>
              <p className="text-sm text-[#6B7A6F] mt-1 flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{property.location}</p>

              {/* Quick Stats */}
              <div className="flex gap-4 mt-4 pt-4 border-t border-[#E5E3DC]">
                {property.beds > 0 && <div className="text-center"><Bed className="mx-auto h-4 w-4 text-[#6B7A6F]" /><p className="text-xs text-[#6B7A6F] mt-1">{property.beds} Bed</p></div>}
                {property.baths > 0 && <div className="text-center"><Bath className="mx-auto h-4 w-4 text-[#6B7A6F]" /><p className="text-xs text-[#6B7A6F] mt-1">{property.baths} Bath</p></div>}
                <div className="text-center"><Maximize className="mx-auto h-4 w-4 text-[#6B7A6F]" /><p className="text-xs text-[#6B7A6F] mt-1">{property.land}</p></div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3 mt-6">
                <a
                  href={`https://wa.me/${property.agentPhone}?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 text-sm font-semibold text-white hover:bg-[#1fb855] transition-colors"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp Enquiry
                </a>
                <a
                  href={`tel:+${property.agentPhone}`}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#5F8768] py-3 text-sm font-semibold text-[#5F8768] hover:bg-[#5F8768] hover:text-white transition-colors"
                >
                  <Phone className="h-4 w-4" /> Call Agent
                </a>
              </div>

              {/* Agent Profile */}
              <div className="flex items-center gap-3 mt-6 pt-6 border-t border-[#E5E3DC]">
                <img src={property.agentImage} alt={property.agentName} className="h-12 w-12 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-semibold text-[#2F3A33]">{property.agentName}</p>
                  <p className="text-xs text-[#6B7A6F]">Property Consultant</p>
                </div>
              </div>
            </div>

            {/* Mortgage Estimate */}
            <MortgageEstimate priceNum={property.priceNum} status={property.status} />
          </div>
        </div>
      </div>
    </div>
  );
}
