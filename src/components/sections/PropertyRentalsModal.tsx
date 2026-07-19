'use client';

import { X, CheckCircle2, Shield, Home, Building2, Star, GraduationCap, Briefcase, Store, Warehouse, Eye, Users, FileText, BarChart3 } from 'lucide-react';

const services = [
  { icon: <Home className="w-5 h-5" />, title: 'Residential house rentals' },
  { icon: <Building2 className="w-5 h-5" />, title: 'Apartments and flats' },
  { icon: <Star className="w-5 h-5" />, title: 'Luxury homes and executive residences' },
  { icon: <Home className="w-5 h-5" />, title: 'Furnished and serviced apartments' },
  { icon: <GraduationCap className="w-5 h-5" />, title: 'Student accommodation' },
  { icon: <Briefcase className="w-5 h-5" />, title: 'Office and commercial space rentals' },
  { icon: <Store className="w-5 h-5" />, title: 'Retail shops and business premises' },
  { icon: <Warehouse className="w-5 h-5" />, title: 'Warehouse and industrial property rentals' },
  { icon: <Eye className="w-5 h-5" />, title: 'Property viewing coordination and virtual tours' },
  { icon: <Users className="w-5 h-5" />, title: 'Tenant and landlord matching' },
  { icon: <FileText className="w-5 h-5" />, title: 'Lease agreement preparation and guidance' },
  { icon: <BarChart3 className="w-5 h-5" />, title: 'Rental advisory and market insights' },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function PropertyRentalsModal({ open, onClose }: Props) {
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
              'url(https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=900&q=80)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#2F3A33] via-[#2F3A33]/60 to-transparent rounded-t-2xl" />
          <div className="absolute bottom-6 left-8 right-8">
            <span className="inline-block bg-[#5F8768] text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
              Rental Solutions
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
              Property Rental<br />Services
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-10">
          {/* Intro Paragraph 1 */}
          <p className="text-[#2F3A33] leading-relaxed mb-6">
            Finding the perfect rental property should be simple, convenient, and stress-free. At{' '}
            <span className="font-semibold text-[#5F8768]">Dwell Chronicles</span>, we connect
            individuals, families, students, professionals, expatriates, and businesses with quality
            rental properties that suit every lifestyle, budget, and purpose. Whether you&apos;re
            searching for a cozy apartment, an executive residence, office space, retail shop,
            warehouse, or luxury home, we provide trusted rental solutions across Ghana.
          </p>

          {/* Paragraph 2 — Listings */}
          <p className="text-[#6B7A6F] leading-relaxed mb-6">
            Our carefully curated property listings feature a diverse selection of residential and
            commercial rentals in prime locations. Every listing includes detailed property
            descriptions, high-quality photographs, virtual tours, pricing information, amenities, and
            neighborhood insights, giving you everything you need to make informed decisions before
            scheduling a viewing.
          </p>

          {/* Paragraph 3 — Transparency */}
          <p className="text-[#6B7A6F] leading-relaxed mb-6">
            Transparency is at the heart of our rental services. We ensure that all available
            properties are properly verified, accurately represented, and supported with clear rental
            terms to eliminate surprises during the leasing process. Our team works closely with both
            tenants and landlords to facilitate smooth negotiations, lease agreements, and property
            handovers, making every transaction professional and hassle-free.
          </p>

          {/* Paragraph 4 — For Tenants */}
          <p className="text-[#6B7A6F] leading-relaxed mb-6">
            For tenants, we provide personalized property recommendations based on your location
            preferences, lifestyle, and budget. Whether you need short-term accommodation, long-term
            rentals, furnished apartments, student housing, executive suites, or commercial premises,
            our experienced team is dedicated to helping you find the right property quickly and
            efficiently.
          </p>

          {/* Paragraph 5 — For Landlords */}
          <p className="text-[#6B7A6F] leading-relaxed mb-6">
            For landlords and property owners, Dwell Chronicles offers comprehensive rental marketing
            services designed to maximize occupancy and attract qualified tenants. We professionally
            market your property through our digital platforms, social media channels, and extensive
            network, ensuring your property receives maximum visibility. We also assist with tenant
            screening, lease preparation, rental advisory services, and ongoing support to help you
            achieve consistent rental income.
          </p>

          {/* Trust Badge */}
          <div className="bg-[#5F8768]/5 border border-[#5F8768]/15 rounded-xl p-5 mb-8 flex items-start gap-4">
            <Shield className="w-6 h-6 text-[#5F8768] mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-[#2F3A33] text-sm mb-1">
                Easy, Transparent & Accessible
              </p>
              <p className="text-[#6B7A6F] text-sm leading-relaxed">
                Our mission is to make renting property in Ghana easy, transparent, and accessible
                for everyone while delivering exceptional customer service at every stage of the
                rental journey.
              </p>
            </div>
          </div>

          {/* Services Grid */}
          <h3 className="text-lg font-bold text-[#2F3A33] mb-4">
            Our Property Rental Services Include:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {services.map((s) => (
              <div
                key={s.title}
                className="flex items-center gap-3 bg-[#F8F7F3] rounded-xl px-4 py-3"
              >
                <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#5F8768]/10 text-[#5F8768] shrink-0">
                  {s.icon}
                </span>
                <span className="text-sm font-medium text-[#2F3A33]">{s.title}</span>
                <CheckCircle2 className="w-4 h-4 text-[#5F8768] shrink-0 ml-auto" />
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-[#2F3A33] rounded-xl p-6 text-center">
            <p className="text-white/90 text-sm leading-relaxed mb-4">
              At Dwell Chronicles, we are committed to helping you find the perfect place to live,
              work, or grow your business. With verified listings, transparent processes, and
              dedicated professional support, we make property rentals in Ghana a seamless and
              rewarding experience.
            </p>
            <a
              href="#contact"
              onClick={onClose}
              className="inline-flex items-center gap-2 bg-[#5F8768] hover:bg-[#4A6B52] text-white font-semibold text-sm rounded-xl px-6 py-3 transition-colors"
            >
              <Users className="w-4 h-4" />
              Find Your Perfect Rental
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}