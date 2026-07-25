'use client';

import { useState } from 'react';
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
} from 'lucide-react';

// ─── Property 1: Opposite New Youth Resources Center ─────────────────────

const property1Rates = [
  { type: '2 Bedroom', price: 'GHS 1,500', rooms: 'Room 101', icon: 'bed' },
  { type: 'Executive Suite', price: 'GHS 1,000', rooms: 'Rooms: 201, 202, 301, 302', icon: 'crown' },
  { type: 'Deluxe Suite', price: 'GHS 750', rooms: 'Rooms: 206, 207, 304, 306, 307', icon: 'sparkles' },
  { type: 'Superior Room', price: 'GHS 600', rooms: 'Rooms: 203, 204, 208, 303, 308', icon: 'star' },
  { type: 'Standard Room', price: 'GHS 500', rooms: 'Rooms: 205, 209, 305, 309', icon: 'home' },
];

const property1Amenities = [
  { label: 'Breakfast Included', icon: 'coffee' },
  { label: 'Starlink Internet', icon: 'wifi' },
  { label: 'Smart TV', icon: 'tv' },
  { label: 'Restaurant', icon: 'utensils' },
  { label: 'Beautifully Furnished', icon: 'sparkles' },
];

const property1Images = [
  { src: '/room-exterior.jpg', alt: 'Modern apartment exterior - Dwell Chronicles Ho' },
  { src: '/room-living.jpg', alt: 'Spacious living room with Smart TV - Dwell Chronicles Ho' },
  { src: '/room-bedroom.jpg', alt: 'Modern bedroom with ensuite - Dwell Chronicles Ho' },
  { src: '/room-hallway.jpg', alt: 'Bright corridor with modern wall lights - Dwell Chronicles Ho' },
  { src: '/room-staircase.jpg', alt: 'Modern staircase with black railings - Dwell Chronicles Ho' },
  { src: '/room-living2.jpg', alt: 'Spacious living area with bar counter and kitchen - Dwell Chronicles Ho' },
  { src: '/room-kitchen.jpg', alt: 'Modern kitchen with induction cooktop - Dwell Chronicles Ho' },
];

// ─── Property 2: Near Mirage, Ho ─────────────────────────────────────────

const property2Rates = [
  { type: '2 Bedroom', price: 'GHS 1,800', rooms: 'Per Night', icon: 'bed' },
  { type: '3 Bedroom', price: 'GHS 2,100', rooms: 'Per Night', icon: 'crown' },
];

const property2Images = [
  { src: '/property2-living.jpg', alt: 'Luxury furnished living room with LED ceiling lights - Dwell Chronicles Ho Mirage' },
  { src: '/property2-bedroom.jpg', alt: 'Neat bedroom with white bed and colorful curtains - Dwell Chronicles Ho Mirage' },
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
  { label: 'Visitor\'s Washroom', icon: 'shower' },
  { label: 'Fitted Kitchen', icon: 'utensils' },
  { label: 'Washing Machine', icon: 'washing' },
  { label: 'Dining Area', icon: 'utensils' },
  { label: 'Standby Plant', icon: 'zap' },
  { label: 'Security at Post', icon: 'eye' },
  { label: 'Housekeeping', icon: 'sparkles' },
];

// ─── Shared ───────────────────────────────────────────────────────────────

function RateIcon({ type }: { type: string }) {
  const cls = 'size-4 text-[#6B7A6F]';
  switch (type) {
    case 'bed': return <BedDouble className={cls} />;
    case 'crown': return <Crown className={cls} />;
    case 'sparkles': return <Sparkles className={cls} />;
    case 'star': return <Star className={cls} />;
    default: return <Home className={cls} />;
  }
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

function useLightbox(maxIndex: number) {
  const [index, setIndex] = useState<number | null>(null);
  const open = (i: number) => setIndex(i);
  const close = () => setIndex(null);
  const prev = () => { if (index !== null) setIndex(index === 0 ? maxIndex - 1 : index - 1); };
  const next = () => { if (index !== null) setIndex(index === maxIndex - 1 ? 0 : index + 1); };
  return { index, open, close, prev, next };
}

// ─── Property 1 Block ─────────────────────────────────────────────────────

function Property1Block() {
  const lb = useLightbox(property1Images.length);

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="h-px flex-1 bg-[#E5E3DC]" />
        <span className="text-xs font-bold tracking-widest uppercase text-[#5F8768]">Property 1</span>
        <div className="h-px flex-1 bg-[#E5E3DC]" />
      </div>

      <h3 className="text-xl sm:text-2xl font-bold text-[#2F3A33] text-center mb-2">Room Rates</h3>
      <p className="text-sm text-[#6B7A6F] text-center mb-8">Opposite New Youth Resources Center, Ho - Adaklu Road, Volta Region</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
          {property1Rates.map((rate) => (
            <div key={rate.type} className="relative bg-white rounded-2xl border border-[#E5E3DC] p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold tracking-wider uppercase text-[#5F8768] bg-green-100 px-2.5 py-1 rounded-full">{rate.type}</span>
                <RateIcon type={rate.icon} />
              </div>
              <p className="text-2xl font-bold text-[#2F3A33]">{rate.price}</p>
              <p className="text-xs text-[#6B7A6F] mt-2">{rate.rooms}</p>
              <div className="mt-3 flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-green-500" style={{ animation: 'blink 1s step-end infinite' }} />
                <span className="text-sm font-bold text-green-600" style={{ animation: 'blink 1s step-end infinite' }}>Available</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div
            className="col-span-3 sm:col-span-2 row-span-2 rounded-2xl overflow-hidden cursor-pointer group"
            onClick={() => lb.open(1)}
          >
            <img
              src={property1Images[1].src}
              alt={property1Images[1].alt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div
            className="rounded-2xl overflow-hidden cursor-pointer group"
            onClick={() => lb.open(0)}
          >
            <img
              src={property1Images[0].src}
              alt={property1Images[0].alt}
              className="w-full h-24 sm:h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div
            className="rounded-2xl overflow-hidden cursor-pointer group"
            onClick={() => lb.open(2)}
          >
            <img
              src={property1Images[2].src}
              alt={property1Images[2].alt}
              className="w-full h-24 sm:h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div
            className="col-span-3 rounded-2xl overflow-hidden cursor-pointer group"
            onClick={() => lb.open(5)}
          >
            <img
              src={property1Images[5].src}
              alt={property1Images[5].alt}
              className="w-full h-36 sm:h-40 object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div
            className="rounded-2xl overflow-hidden cursor-pointer group"
            onClick={() => lb.open(3)}
          >
            <img
              src={property1Images[3].src}
              alt={property1Images[3].alt}
              className="w-full h-24 sm:h-28 object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div
            className="rounded-2xl overflow-hidden cursor-pointer group"
            onClick={() => lb.open(4)}
          >
            <img
              src={property1Images[4].src}
              alt={property1Images[4].alt}
              className="w-full h-24 sm:h-28 object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div
            className="rounded-2xl overflow-hidden cursor-pointer group"
            onClick={() => lb.open(6)}
          >
            <img
              src={property1Images[6].src}
              alt={property1Images[6].alt}
              className="w-full h-24 sm:h-28 object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
        {property1Amenities.map((a) => (
          <div
            key={a.label}
            className="flex items-center gap-2.5 bg-white rounded-xl border border-[#E5E3DC] px-4 py-3"
          >
            <AmenityIcon type={a.icon} />
            <span className="text-sm font-medium text-[#2F3A33]">{a.label}</span>
          </div>
        ))}
      </div>

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

      {lb.index !== null && (
        <Lightbox
          images={property1Images}
          index={lb.index}
          onClose={lb.close}
          onPrev={lb.prev}
          onNext={lb.next}
        />
      )}
    </div>
  );
}

// ─── Property 2 Block ─────────────────────────────────────────────────────

function Property2Block() {
  const lb = useLightbox(property2Images.length);

  return (
    <div className="mt-14">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-px flex-1 bg-[#E5E3DC]" />
        <span className="text-xs font-bold tracking-widest uppercase text-[#5F8768]">Property 2</span>
        <div className="h-px flex-1 bg-[#E5E3DC]" />
      </div>

      <h3 className="text-xl sm:text-2xl font-bold text-[#2F3A33] text-center mb-2">Luxury Furnished Apartments</h3>
      <p className="text-sm text-[#6B7A6F] text-center mb-6">A minute drive from Mirage, Ho - Volta Region</p>

      <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        <div
          className="rounded-2xl overflow-hidden cursor-pointer group"
          onClick={() => lb.open(0)}
        >
          <img
            src={property2Images[0].src}
            alt={property2Images[0].alt}
            className="w-full h-56 sm:h-72 object-cover group-hover:scale-[1.02] transition-transform duration-500"
          />
        </div>
        <div
          className="rounded-2xl overflow-hidden cursor-pointer group"
          onClick={() => lb.open(1)}
        >
          <img
            src={property2Images[1].src}
            alt={property2Images[1].alt}
            className="w-full h-56 sm:h-72 object-cover group-hover:scale-[1.02] transition-transform duration-500"
          />
        </div>
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
                <RateIcon type={rate.icon} />
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

      {lb.index !== null && (
        <Lightbox
          images={property2Images}
          index={lb.index}
          onClose={lb.close}
          onPrev={lb.prev}
          onNext={lb.next}
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
