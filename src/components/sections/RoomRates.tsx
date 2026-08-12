'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  BedDouble,
  Crown,
  Sparkles,
  Star,
  Home,
  MessageCircle,
  Wifi,
  Tv,
  UtensilsCrossed,
  Coffee,
  ChevronLeft,
  ChevronRight,
  X,
  ShieldCheck,
  ShowerHead,
  Car,
  Armchair,
  WashingMachine,
  Zap,
  Eye,
  Sofa,
  MapPin,
  Heart,
  Users,
  Bath,
  Loader2,
} from 'lucide-react';

// ─── Types ──────────────────────────────────────────────────────────────────

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

// ─── Property 2: Near Mirage, Ho (static data) ─────────────────────────────

const property2Images = [
  { src: '/p2-1.jpg', alt: 'Living room with TV and sofas - Dwell Chronicles Luxury Apartment Ho' },
  { src: '/p2-2.jpg', alt: 'Bathroom with sink and tub - Dwell Chronicles Luxury Apartment Ho' },
  { src: '/p2-3.jpg', alt: 'Outdoor covered balcony area - Dwell Chronicles Luxury Apartment Ho' },
  { src: '/p2-4.jpg', alt: 'Bedroom with white bed sheets - Dwell Chronicles Luxury Apartment Ho' },
  { src: '/p2-5.jpg', alt: 'Bathroom with toilet and tub - Dwell Chronicles Luxury Apartment Ho' },
  { src: '/p2-6.jpg', alt: 'Modern kitchen with appliances - Dwell Chronicles Luxury Apartment Ho' },
  { src: '/p2-7.jpg', alt: 'Living room with purple LED lighting - Dwell Chronicles Luxury Apartment Ho' },
  { src: '/p2-8.jpg', alt: 'Hallway with ironing board - Dwell Chronicles Luxury Apartment Ho' },
  { src: '/p2-9.jpg', alt: 'Balcony with yellow walls - Dwell Chronicles Luxury Apartment Ho' },
  { src: '/p2-10.jpg', alt: 'Bedroom with red curtains - Dwell Chronicles Luxury Apartment Ho' },
  { src: '/p2-11.jpg', alt: 'Spacious living room area - Dwell Chronicles Luxury Apartment Ho' },
  { src: '/p2-12.jpg', alt: 'Dining room with table set - Dwell Chronicles Luxury Apartment Ho' },
];

const property2Amenities = [
  { label: 'Spacious Rooms', icon: 'sofa' },
  { label: 'Wardrobe', icon: 'home' },
  { label: 'CCTV & Electric Fence', icon: 'shield' },
  { label: 'Hot Water Shower', icon: 'shower' },
  { label: 'Netflix & DSTV', icon: 'tv' },
  { label: 'High-speed WiFi', icon: 'wifi' },
  { label: 'Ample Parking', icon: 'car' },
  { label: 'Terrace', icon: 'armchair' },
  { label: 'Visitor Washroom', icon: 'shower' },
  { label: 'Fitted Kitchen', icon: 'utensils' },
  { label: 'Washing Machine', icon: 'washing' },
  { label: 'Dining Area', icon: 'utensils' },
  { label: 'Standby Plant', icon: 'zap' },
  { label: 'Security at Post', icon: 'eye' },
  { label: 'Housekeeping', icon: 'sparkles' },
];

const property2Rates = [
  { type: '2 Bedroom', price: 'GHS 1,800', rooms: 'Per Night', icon: 'bed' },
  { type: '3 Bedroom', price: 'GHS 2,100', rooms: 'Per Night', icon: 'crown' },
];

// ─── Shared Components ─────────────────────────────────────────────────────

function Lightbox({ images, index, onClose, onPrev, onNext }: {
  images: { src: string; alt: string }[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
        onClick={onClose}
        aria-label="Close"
      >
        <X className="size-7" />
      </button>
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous image"
      >
        <ChevronLeft className="size-8" />
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next image"
      >
        <ChevronRight className="size-8" />
      </button>
      <img
        src={images[index].src}
        alt={images[index].alt}
        className="max-w-full max-h-[85vh] object-contain rounded-lg"
        onClick={(e) => e.stopPropagation()}
      />
      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm">
        {index + 1} / {images.length}
      </p>
    </div>
  );
}

function AmenityIcon({ type }: { type: string }) {
  const cls = 'size-5 text-[#5F8768]';
  switch (type) {
    case 'coffee': return <Coffee className={cls} />;
    case 'wifi': return <Wifi className={cls} />;
    case 'tv': return <Tv className={cls} />;
    case 'utensils': return <UtensilsCrossed className={cls} />;
    case 'shield': return <ShieldCheck className={cls} />;
    case 'shower': return <ShowerHead className={cls} />;
    case 'car': return <Car className={cls} />;
    case 'armchair': return <Armchair className={cls} />;
    case 'washing': return <WashingMachine className={cls} />;
    case 'zap': return <Zap className={cls} />;
    case 'eye': return <Eye className={cls} />;
    case 'sofa': return <Sofa className={cls} />;
    default: return <Sparkles className={cls} />;
  }
}

// ─── Category Badge Helper ──────────────────────────────────────────────────

function getCategoryBadge(cat: string) {
  switch (cat) {
    case 'luxury': return { label: 'LUXURY', bg: 'bg-amber-400 text-amber-900' };
    case 'executive': return { label: 'FEATURED', bg: 'bg-amber-400 text-amber-900' };
    case 'deluxe': return { label: 'DELUXE', bg: 'bg-[#5F8768] text-white' };
    case 'superior': return { label: 'SUPERIOR', bg: 'bg-[#6B7A6F] text-white' };
    default: return { label: 'STANDARD', bg: 'bg-[#D8D5CC] text-[#2F3A33]' };
  }
}

// ─── Property 1 Card (matches screenshot layout) ───────────────────────────

function Property1Card({ apt, onImageClick }: { apt: Apartment; onImageClick: () => void }) {
  const [imgIdx, setImgIdx] = useState(0);
  const badge = getCategoryBadge(apt.category);
  const totalImages = apt.images.length;

  const nextImg = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setImgIdx((i) => (i + 1) % totalImages);
  }, [totalImages]);

  const prevImg = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setImgIdx((i) => (i === 0 ? totalImages - 1 : i - 1));
  }, [totalImages]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#E5E3DC] overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      {/* Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#E5E3DC]">
        <img
          src={apt.images[imgIdx]?.url || '/room-exterior.jpg'}
          alt={apt.images[imgIdx]?.alt || apt.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top-left badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <span className={badge.bg + ' text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full'}>{badge.label}</span>
          {apt.featured && (
            <span className="bg-amber-400 text-amber-900 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full flex items-center gap-1">
              <Home className="size-3" /> Featured
            </span>
          )}
        </div>

        {/* Top-right status */}
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <span className="bg-white/90 text-green-600 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-green-500" />
            Available
          </span>
        </div>

        {/* Heart icon */}
        <button
          className="absolute top-3 right-24 bg-white/80 rounded-full p-2 hover:bg-white transition-colors"
          aria-label="Save"
        >
          <Heart className="size-4 text-[#6B7A6F]" />
        </button>

        {/* Carousel nav */}
        {totalImages > 1 && (
          <>
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
              onClick={prevImg}
              aria-label="Previous"
            >
              <ChevronLeft className="size-4 text-[#2F3A33]" />
            </button>
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
              onClick={nextImg}
              aria-label="Next"
            >
              <ChevronRight className="size-4 text-[#2F3A33]" />
            </button>
          </>
        )}

        {/* Dots */}
        {totalImages > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {apt.images.slice(0, 5).map((_, i) => (
              <button
                key={i}
                className={
                  'rounded-full transition-all ' +
                  (i === imgIdx ? 'w-4 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/60')
                }
                onClick={(e) => { e.stopPropagation(); setImgIdx(i); }}
                aria-label={'Go to image ' + (i + 1)}
              />
            ))}
          </div>
        )}

        {/* Click to open lightbox on main image */}
        <div className="absolute inset-0 cursor-pointer" onClick={onImageClick} />
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-5">
        {/* Location */}
        <div className="flex items-center gap-1.5 mb-1.5">
          <MapPin className="size-3.5 text-[#6B7A6F]" />
          <span className="text-sm text-[#6B7A6F]">{apt.area || apt.city}</span>
        </div>

        {/* Title */}
        <h4 className="text-base sm:text-lg font-bold text-[#1F2937] leading-snug mb-1">{apt.name}</h4>

        {/* Code */}
        <p className="text-xs text-[#9CA3AF] font-medium tracking-wide uppercase mb-3">{apt.code}</p>

        {/* Beds, Baths, Guests */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1.5 text-sm text-[#6B7280]">
            <BedDouble className="size-4" />
            <span>{apt.bedrooms} Bed{apt.bedrooms > 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-[#6B7280]">
            <Bath className="size-4" />
            <span>{apt.bathrooms} Bath{apt.bathrooms > 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-[#6B7280]">
            <Users className="size-4" />
            <span>{apt.maxGuests} Guest{apt.maxGuests > 1 ? 's' : ''}</span>
          </div>
        </div>

        {/* Price + Rating row */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xl font-bold text-[#2F3A33]">GHC {apt.pricePerNight.toLocaleString()}</span>
            <span className="text-sm text-[#9CA3AF] ml-1">/night</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="size-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-semibold text-[#1F2937]">5.0</span>
          </div>
        </div>

        {/* CTA Button */}
        <Link
          href={'/airbnb/' + apt.id}
          className="block w-full text-center bg-[#3D6E33] hover:bg-[#2D5016] text-white font-medium text-sm py-3 rounded-xl transition-colors"
        >
          View Details &rarr;
        </Link>
      </div>
    </div>
  );
}

// ─── Property 1 Block (restructured to card grid) ──────────────────────────

function Property1Block() {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [lightboxAptIdx, setLightboxAptIdx] = useState<number>(0);

  useEffect(() => {
    fetch('/api/apartments?area=Adaklu+Road&status=available&limit=10')
      .then((r) => r.json())
      .then((data) => {
        const list = data.apartments || data.data || data || [];
        setApartments(list);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const allImages = apartments.flatMap((a) =>
    a.images.map((img) => ({ src: img.url, alt: img.alt || a.name }))
  );

  const openLightbox = (aptIdx: number) => {
    setLightboxAptIdx(aptIdx);
    setLightboxIdx(0);
  };

  // Build flat image index mapping for lightbox
  let globalOffset = 0;
  const imageOffsets = apartments.map((a) => {
    const start = globalOffset;
    globalOffset += a.images.length;
    return start;
  });

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="h-px flex-1 bg-[#E5E3DC]" />
        <span className="text-xs font-bold tracking-widest uppercase text-[#5F8768]">Property 1</span>
        <div className="h-px flex-1 bg-[#E5E3DC]" />
      </div>

      <h3 className="text-xl sm:text-2xl font-bold text-[#2F3A33] text-center mb-2">Room Rates</h3>
      <p className="text-sm text-[#6B7A6F] text-center mb-8">Opposite New Youth Resources Center, Ho - Adaklu Road, Volta Region</p>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="size-8 text-[#5F8768] animate-spin" />
        </div>
      ) : (
        <>
          <p className="text-sm text-[#6B7A6F] mb-4">{apartments.length} rooms available</p>

          {/* Card Grid — matches screenshot 2-column layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {apartments.map((apt, idx) => (
              <Property1Card
                key={apt.id}
                apt={apt}
                onImageClick={() => openLightbox(idx)}
              />
            ))}
          </div>

          {/* Amenities Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
            <div className="flex items-center gap-2.5 bg-white rounded-xl border border-[#E5E3DC] px-4 py-3">
              <Coffee className="size-5 text-[#5F8768]" />
              <span className="text-sm font-medium text-[#2F3A33]">Breakfast Included</span>
            </div>
            <div className="flex items-center gap-2.5 bg-white rounded-xl border border-[#E5E3DC] px-4 py-3">
              <Wifi className="size-5 text-[#5F8768]" />
              <span className="text-sm font-medium text-[#2F3A33]">Starlink Internet</span>
            </div>
            <div className="flex items-center gap-2.5 bg-white rounded-xl border border-[#E5E3DC] px-4 py-3">
              <Tv className="size-5 text-[#5F8768]" />
              <span className="text-sm font-medium text-[#2F3A33]">Smart TV</span>
            </div>
            <div className="flex items-center gap-2.5 bg-white rounded-xl border border-[#E5E3DC] px-4 py-3">
              <UtensilsCrossed className="size-5 text-[#5F8768]" />
              <span className="text-sm font-medium text-[#2F3A33]">Restaurant</span>
            </div>
            <div className="flex items-center gap-2.5 bg-white rounded-xl border border-[#E5E3DC] px-4 py-3">
              <Sparkles className="size-5 text-[#5F8768]" />
              <span className="text-sm font-medium text-[#2F3A33]">Beautifully Furnished</span>
            </div>
          </div>

          {/* WhatsApp CTA */}
          <div className="text-center mb-4">
            <a
              href="https://wa.me/233204700023?text=Hi%2C%20I%20am%20interested%20in%20booking%20a%20room%20at%20your%20Ho%20property.%20Please%20share%20availability."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#5F8768] hover:bg-[#4A6B52] text-white font-medium text-sm px-6 py-3 rounded-xl transition-colors"
            >
              <MessageCircle className="size-4" />
              Book a Room on WhatsApp
            </a>
          </div>
        </>
      )}

      {/* Lightbox */}
      {lightboxIdx !== null && allImages.length > 0 && (
        <Lightbox
          images={allImages}
          index={imageOffsets[lightboxAptIdx] + lightboxIdx}
          onClose={() => setLightboxIdx(null)}
          onPrev={() => {
            const currentGlobal = imageOffsets[lightboxAptIdx] + lightboxIdx;
            const newGlobal = currentGlobal === 0 ? allImages.length - 1 : currentGlobal - 1;
            // Find which apartment this belongs to
            let found = false;
            for (let i = 0; i < apartments.length; i++) {
              if (newGlobal >= imageOffsets[i] && newGlobal < imageOffsets[i] + apartments[i].images.length) {
                setLightboxAptIdx(i);
                setLightboxIdx(newGlobal - imageOffsets[i]);
                found = true;
                break;
              }
            }
            if (!found) { setLightboxIdx(0); setLightboxAptIdx(0); }
          }}
          onNext={() => {
            const currentGlobal = imageOffsets[lightboxAptIdx] + lightboxIdx;
            const newGlobal = currentGlobal === allImages.length - 1 ? 0 : currentGlobal + 1;
            let found = false;
            for (let i = 0; i < apartments.length; i++) {
              if (newGlobal >= imageOffsets[i] && newGlobal < imageOffsets[i] + apartments[i].images.length) {
                setLightboxAptIdx(i);
                setLightboxIdx(newGlobal - imageOffsets[i]);
                found = true;
                break;
              }
            }
            if (!found) { setLightboxIdx(0); setLightboxAptIdx(0); }
          }}
        />
      )}
    </div>
  );
}

// ─── Property 2 Block ─────────────────────────────────────────────────────

function Property2Block() {
  const [lbIdx, setLbIdx] = useState<number | null>(null);

  const open = (i: number) => setLbIdx(i);
  const close = () => setLbIdx(null);
  const prev = () => { if (lbIdx !== null) setLbIdx(lbIdx === 0 ? property2Images.length - 1 : lbIdx - 1); };
  const next = () => { if (lbIdx !== null) setLbIdx(lbIdx === property2Images.length - 1 ? 0 : lbIdx + 1); };

  return (
    <div className="mt-14">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-px flex-1 bg-[#E5E3DC]" />
        <span className="text-xs font-bold tracking-widest uppercase text-[#5F8768]">Property 2</span>
        <div className="h-px flex-1 bg-[#E5E3DC]" />
      </div>

      <h3 className="text-xl sm:text-2xl font-bold text-[#2F3A33] text-center mb-2">Luxury Furnished Apartments</h3>
      <p className="text-sm text-[#6B7A6F] text-center mb-6">A minute drive from Mirage, Ho - Volta Region</p>

      <div className="max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
        <div
          className="col-span-2 sm:col-span-2 row-span-2 rounded-2xl overflow-hidden cursor-pointer group"
          onClick={() => open(0)}
        >
          <img
            src={property2Images[0].src}
            alt={property2Images[0].alt}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
          />
        </div>
        {property2Images.slice(1, 5).map((img, i) => (
          <div
            key={img.src}
            className="rounded-2xl overflow-hidden cursor-pointer group"
            onClick={() => open(i + 1)}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-28 sm:h-32 object-cover group-hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
        ))}
        {property2Images.slice(5).map((img, i) => (
          <div
            key={img.src}
            className="rounded-2xl overflow-hidden cursor-pointer group"
            onClick={() => open(i + 5)}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-28 sm:h-32 object-cover group-hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
        ))}
      </div>

      <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-[#E5E3DC] p-6 sm:p-8 mb-8">
        <p className="text-[#2F3A33] leading-relaxed mb-4">
          Why settle for traditional accommodation when you can have the whole place to yourself?
          Our luxury Airbnb offers the privacy, space, and comfort you deserve. Enjoy a fully furnished home,
          cook your own meals, and relax in a serene environment — perfect for families, friends, or solo
          travellers looking for a more personal experience.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {property2Rates.map((rate) => (
            <div key={rate.type} className="bg-[#F8F7F3] rounded-xl border border-[#E5E3DC] p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold tracking-wider uppercase text-[#5F8768] bg-green-100 px-2.5 py-1 rounded-full">{rate.type}</span>
                <AmenityIcon type={rate.icon} />
              </div>
              <p className="text-2xl font-bold text-[#2F3A33]">{rate.price}</p>
              <p className="text-xs text-[#6B7A6F] mt-1">{rate.rooms}</p>
              <div className="mt-3 flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-green-500" style={{ animation: 'blink 1s step-end infinite' }} />
                <span className="text-sm font-bold text-green-600" style={{ animation: 'blink 1s step-end infinite' }}>Available</span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-[#6B7A6F] italic mb-6">* Prices are subject to change based on seasonal demand.</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {property2Amenities.map((a) => (
            <div
              key={a.label}
              className="flex items-center gap-2 bg-[#F8F7F3] rounded-lg px-3 py-2.5"
            >
              <AmenityIcon type={a.icon} />
              <span className="text-xs font-medium text-[#2F3A33]">{a.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          href="https://wa.me/233547293193?text=Hi%2C%20I%20am%20interested%20in%20booking%20the%20luxury%20apartment%20near%20Mirage%2C%20Ho.%20Please%20share%20availability."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#5F8768] hover:bg-[#4A6B52] text-white font-medium text-sm px-6 py-3 rounded-xl transition-colors"
        >
          <MessageCircle className="size-4" />
          Book via WhatsApp - 0547293193
        </a>
        <a
          href="tel:+233547293193"
          className="inline-flex items-center gap-2 border-2 border-[#5F8768] text-[#5F8768] hover:bg-[#5F8768] hover:text-white font-medium text-sm px-6 py-3 rounded-xl transition-colors"
        >
          Call 0547293193
        </a>
      </div>

      {lbIdx !== null && (
        <Lightbox
          images={property2Images}
          index={lbIdx}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </div>
  );
}

// ─── Main Export ───────────────────────────────────────────────────────────

export default function RoomRates() {
  return (
    <section className="bg-[#F8F7F3] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2F3A33]">Room Rates</h2>
          <p className="mt-2 text-sm sm:text-base text-[#6B7A6F] max-w-xl mx-auto">
            Browse our available properties in Ho, Volta Region
          </p>
        </div>

        <Property1Block />
        <Property2Block />
      </div>
    </section>
  );
}
