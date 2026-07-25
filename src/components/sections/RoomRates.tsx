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
} from 'lucide-react';

const rates = [
  { type: '2 Bedroom', price: 'GHS 1,500', rooms: 'Room 101', icon: 'bed' },
  { type: 'Executive Suite', price: 'GHS 1,000', rooms: 'Rooms: 201, 202, 301, 302', icon: 'crown' },
  { type: 'Deluxe Suite', price: 'GHS 750', rooms: 'Rooms: 206, 207, 304, 306, 307', icon: 'sparkles' },
  { type: 'Superior Room', price: 'GHS 600', rooms: 'Rooms: 203, 204, 208, 303, 308', icon: 'star' },
  { type: 'Standard Room', price: 'GHS 500', rooms: 'Rooms: 205, 209, 305, 309', icon: 'home' },
];

const amenities = [
  { label: 'Breakfast Included', icon: 'coffee' },
  { label: 'Starlink Internet', icon: 'wifi' },
  { label: 'Smart TV', icon: 'tv' },
  { label: 'Restaurant', icon: 'utensils' },
  { label: 'Beautifully Furnished', icon: 'sparkles' },
];

const galleryImages = [
  { src: '/room-exterior.jpg', alt: 'Modern apartment exterior - Dwell Chronicles Ho' },
  { src: '/room-living.jpg', alt: 'Spacious living room with Smart TV - Dwell Chronicles Ho' },
  { src: '/room-bedroom.jpg', alt: 'Modern bedroom with ensuite - Dwell Chronicles Ho' },
  { src: '/room-hallway.jpg', alt: 'Bright corridor with modern wall lights - Dwell Chronicles Ho' },
  { src: '/room-staircase.jpg', alt: 'Modern staircase with black railings - Dwell Chronicles Ho' },
  { src: '/room-living2.jpg', alt: 'Spacious living area with bar counter and kitchen - Dwell Chronicles Ho' },
  { src: '/room-kitchen.jpg', alt: 'Modern kitchen with induction cooktop - Dwell Chronicles Ho' },
];

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
    default: return <Sparkles className={cls} />;
  }
}

export default function RoomRates() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex(lightboxIndex === 0 ? galleryImages.length - 1 : lightboxIndex - 1);
  };
  const nextImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex(lightboxIndex === galleryImages.length - 1 ? 0 : lightboxIndex + 1);
  };

  return (
    <section className="bg-[#F8F7F3] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2F3A33]">Room Rates</h2>
          <p className="mt-2 text-sm sm:text-base text-[#6B7A6F] max-w-xl mx-auto">
            Opposite New Youth Resources Center, Ho - Adaklu Road, Volta Region
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
            {rates.map((rate) => (
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
              onClick={() => openLightbox(1)}
            >
              <img
                src={galleryImages[1].src}
                alt={galleryImages[1].alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div
              className="rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => openLightbox(0)}
            >
              <img
                src={galleryImages[0].src}
                alt={galleryImages[0].alt}
                className="w-full h-24 sm:h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div
              className="rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => openLightbox(2)}
            >
              <img
                src={galleryImages[2].src}
                alt={galleryImages[2].alt}
                className="w-full h-24 sm:h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div
              className="col-span-3 rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => openLightbox(5)}
            >
              <img
                src={galleryImages[5].src}
                alt={galleryImages[5].alt}
                className="w-full h-36 sm:h-40 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div
              className="rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => openLightbox(3)}
            >
              <img
                src={galleryImages[3].src}
                alt={galleryImages[3].alt}
                className="w-full h-24 sm:h-28 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div
              className="rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => openLightbox(4)}
            >
              <img
                src={galleryImages[4].src}
                alt={galleryImages[4].alt}
                className="w-full h-24 sm:h-28 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div
              className="rounded-2xl overflow-hidden cursor-pointer group"
              onClick={() => openLightbox(6)}
            >
              <img
                src={galleryImages[6].src}
                alt={galleryImages[6].alt}
                className="w-full h-24 sm:h-28 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
          {amenities.map((a) => (
            <div
              key={a.label}
              className="flex items-center gap-2.5 bg-white rounded-xl border border-[#E5E3DC] px-4 py-3"
            >
              <AmenityIcon type={a.icon} />
              <span className="text-sm font-medium text-[#2F3A33]">{a.label}</span>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
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
      </div>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
            onClick={closeLightbox}
            aria-label="Close"
          >
            <X className="size-7" />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            aria-label="Previous image"
          >
            <ChevronLeft className="size-8" />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            aria-label="Next image"
          >
            <ChevronRight className="size-8" />
          </button>
          <img
            src={galleryImages[lightboxIndex].src}
            alt={galleryImages[lightboxIndex].alt}
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            {lightboxIndex + 1} / {galleryImages.length}
          </p>
        </div>
      )}
    </section>
  );
}
