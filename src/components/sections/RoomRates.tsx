'use client';

import { BedDouble, Crown, Sparkles, Star, Home, MessageCircle } from 'lucide-react';

const rates = [
  { type: '2 Bedroom', price: 'GHS 1,500', rooms: 'Room 101', icon: 'bed' },
  { type: 'Executive Suite', price: 'GHS 1,000', rooms: 'Rooms: 201, 202, 301, 302', icon: 'crown' },
  { type: 'Deluxe Suite', price: 'GHS 750', rooms: 'Rooms: 206, 207, 304, 306, 307', icon: 'sparkles' },
  { type: 'Superior Room', price: 'GHS 600', rooms: 'Rooms: 203, 204, 208, 303, 308', icon: 'star' },
  { type: 'Standard Room', price: 'GHS 500', rooms: 'Rooms: 205, 209, 305, 309', icon: 'home' },
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

export default function RoomRates() {
  return (
    <section className="bg-[#F8F7F3] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2F3A33]">Room Rates</h2>
          <p className="mt-2 text-sm sm:text-base text-[#6B7A6F] max-w-xl mx-auto">
            Opposite New Youth Resources Center, Ho - Adaklu Road, Volta Region
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {rates.map((rate) => (
            <div key={rate.type} className="relative bg-white rounded-2xl border border-[#E5E3DC] p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold tracking-wider uppercase text-[#5F8768] bg-green-100 px-2.5 py-1 rounded-full">{rate.type}</span>
                <RateIcon type={rate.icon} />
              </div>
              <p className="text-2xl font-bold text-[#2F3A33]">{rate.price}</p>
              <p className="text-xs text-[#6B7A6F] mt-2">{rate.rooms}</p>
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
    </section>
  );
}
