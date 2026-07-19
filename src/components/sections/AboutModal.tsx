'use client';

import { X, CheckCircle2, Shield, Eye, Heart, Handshake, Home, Star, Globe, Users } from 'lucide-react';

const highlights = [
  { icon: <Shield className="w-5 h-5" />, title: 'Transparency & Honesty' },
  { icon: <Eye className="w-5 h-5" />, title: 'Virtual Tours & Detailed Listings' },
  { icon: <Globe className="w-5 h-5" />, title: 'Serving Ghana & the Diaspora' },
  { icon: <Heart className="w-5 h-5" />, title: 'Personalized Service' },
  { icon: <Star className="w-5 h-5" />, title: 'Residential, Commercial & Luxury' },
  { icon: <Home className="w-5 h-5" />, title: 'Litigation-Free Properties' },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AboutModal({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#2F3A33]/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#F8F7F3] flex items-center justify-center hover:bg-[#E5E3DC] transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-[#2F3A33]" />
        </button>

        {/* Hero Banner */}
        <div
          className="relative h-48 md:h-56 bg-cover bg-center rounded-t-2xl"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#2F3A33] via-[#2F3A33]/60 to-transparent rounded-t-2xl" />
          <div className="absolute bottom-6 left-8 right-8">
            <span className="inline-block bg-[#5F8768] text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
              About Us
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
              Welcome to<br />Dwell Chronicles
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-10">
          {/* Paragraph 1 */}
          <p className="text-[#2F3A33] leading-relaxed mb-6">
            Welcome to{' '}
            <span className="font-semibold text-[#5F8768]">Dwell Chronicles</span>, your trusted
            one-stop destination for transparent real estate solutions in Ghana. At Dwell Chronicles,
            we are dedicated to providing first-time homebuyers in Ghana, especially in the diaspora
            and working professionals in Ghana with comprehensive, honest, and reliable real estate
            services.
          </p>

          {/* Paragraph 2 — Vision */}
          <p className="text-[#6B7A6F] leading-relaxed mb-6">
            Founded with a vision to revolutionize the real estate industry, Dwell Chronicles is not
            just a platform for property listings; it is a beacon of transparency and trust. Our
            commitment to honesty and integrity sets us apart. We believe that every individual
            deserves to find their dream home, litigation-free parcel of land or ideal executive room
            without any hidden agendas or surprises.
          </p>

          {/* Paragraph 3 — Listings */}
          <p className="text-[#6B7A6F] leading-relaxed mb-6">
            With a mix of residential homes, commercial properties, and luxury estates, our listings
            cater to diverse needs and preferences. Whether you&apos;re searching for a spacious
            family home, a vibrant commercial space, or a cosy executive room in a safe community, we
            have you covered.
          </p>

          {/* Paragraph 4 — What makes us unique */}
          <p className="text-[#6B7A6F] leading-relaxed mb-6">
            What makes us unique is our dedication to transparency. We go beyond traditional real
            estate practices by offering virtual tours, detailed property descriptions, and honest
            insights into each listing. Our goal is to empower you with all the information you need
            to make informed decisions about your real estate investments.
          </p>

          {/* Paragraph 5 — Core values */}
          <p className="text-[#6B7A6F] leading-relaxed mb-6">
            Driven by our core values of transparency, trust, and integrity, Dwell Chronicles is more
            than just a real estate platform; it&apos;s a partner you can rely on. With our expert
            advice, market insights, and personalized service, we strive to make your real estate
            journey smooth, seamless, and rewarding.
          </p>

          {/* Trust Badge */}
          <div className="bg-[#5F8768]/5 border border-[#5F8768]/15 rounded-xl p-5 mb-8 flex items-start gap-4">
            <Shield className="w-6 h-6 text-[#5F8768] mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-[#2F3A33] text-sm mb-1">
                Where Transparency Meets Trust
              </p>
              <p className="text-[#6B7A6F] text-sm leading-relaxed">
                Explore Dwell Chronicles today and embark on your journey to finding your perfect
                property or executive room in Ghana. Trust us to guide you every step of the way,
                because, at Dwell Chronicles, your satisfaction and peace of mind are our top
                priorities.
              </p>
            </div>
          </div>

          {/* Highlights Grid */}
          <h3 className="text-lg font-bold text-[#2F3A33] mb-4">
            Why Choose Dwell Chronicles
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {highlights.map((h) => (
              <div
                key={h.title}
                className="flex items-center gap-3 bg-[#F8F7F3] rounded-xl px-4 py-3"
              >
                <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#5F8768]/10 text-[#5F8768] shrink-0">
                  {h.icon}
                </span>
                <span className="text-sm font-medium text-[#2F3A33]">{h.title}</span>
                <CheckCircle2 className="w-4 h-4 text-[#5F8768] shrink-0 ml-auto" />
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-[#2F3A33] rounded-xl p-6 text-center">
            <p className="text-white font-semibold text-base mb-1">
              Welcome home to Dwell Chronicles
            </p>
            <p className="text-white/80 text-sm leading-relaxed mb-4">
              Where transparency meets trust in the world of real estate.
            </p>
            <a
              href="#properties"
              onClick={onClose}
              className="inline-flex items-center gap-2 bg-[#5F8768] hover:bg-[#4A6B52] text-white font-semibold text-sm rounded-xl px-6 py-3 transition-colors"
            >
              <Home className="w-4 h-4" />
              Explore Our Properties
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}