'use client';

import { X, CheckCircle2, Shield, Search, Bell, Users, Home, Star, Heart, Eye, MessageSquare, ArrowRight, Key } from 'lucide-react';

const listingTypes = [
  'Single rooms',
  'Chamber and hall accommodations',
  'Self-contained apartments',
  'Studio apartments',
  'One, two, and three-bedroom apartments',
  'Executive and luxury apartments',
  'Shared accommodation',
  'Student housing',
  'Family homes',
  'Commercial rental spaces',
];

const listingDetails = [
  'Detailed property descriptions',
  'Rental prices and payment terms',
  'Available amenities',
  'High-quality photographs',
  'Virtual property tours',
  'Location and neighborhood information',
  'Accessibility to schools, hospitals, markets, and transport',
  'Security and parking information',
  'Contact details and viewing arrangements',
];

const guidanceSteps = [
  'Identify suitable properties',
  'Schedule inspections and viewings',
  'Understand rental agreements',
  'Compare rental options',
  'Negotiate with landlords and agents',
  'Complete rental documentation',
  'Prepare for a smooth move-in process',
];

const whyChoose = [
  'Wide selection of verified rental properties',
  'Personalized property recommendations',
  'Affordable options for every budget',
  'Detailed property information and virtual tours',
  'Professional advice from experienced real estate specialists',
  'Real-time notifications on new listings',
  'Transparent and trustworthy rental process',
  'Dedicated customer support from search to move-in',
  'Rental solutions for individuals, families, students, and businesses',
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function RentModal({ open, onClose }: Props) {
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
              'url(https://images.unsplash.com/photo-1554995207-c18c203602cb?w=900&q=80)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#2F3A33] via-[#2F3A33]/60 to-transparent rounded-t-2xl" />
          <div className="absolute bottom-6 left-8 right-8">
            <span className="inline-block bg-[#5F8768] text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
              Plan Your Move
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
              Find Your Perfect<br />Room Today
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-10">
          {/* Intro */}
          <p className="text-[#2F3A33] leading-relaxed mb-6">
            Moving to a new home doesn&apos;t have to be stressful. Whether your lease is ending in
            a few weeks or several months from now, planning ahead is the smartest way to secure the
            right accommodation without the pressure of last-minute decisions. At{' '}
            <span className="font-semibold text-[#5F8768]">Dwell Chronicles</span>, we make the
            relocation process simple, convenient, and worry-free by helping you find a room,
            apartment, or home that perfectly matches your lifestyle, budget, and location
            preferences.
          </p>

          <p className="text-[#6B7A6F] leading-relaxed mb-8">
            Our goal is to connect you with quality rental properties while providing the guidance
            and support you need throughout your property search. With our trusted platform and
            experienced team, you can focus on preparing for your next chapter while we help you
            find the ideal place to call home.
          </p>

          {/* Why Start Early */}
          <div className="bg-[#5F8768]/5 border border-[#5F8768]/15 rounded-xl p-5 mb-8">
            <h3 className="font-bold text-[#2F3A33] text-base mb-2 flex items-center gap-2">
              <Star className="w-5 h-5 text-[#5F8768]" />
              Why Start Your Search Early?
            </h3>
            <p className="text-[#6B7A6F] text-sm leading-relaxed">
              Beginning your property search months before your current lease expires gives you
              access to a wider selection of available properties, better rental prices, and enough
              time to compare options before making a decision. Early planning also helps you avoid
              the stress of rushed choices, unexpected expenses, and limited availability during
              peak rental seasons.
            </p>
            <p className="text-[#5F8768] font-semibold text-sm mt-3">
              With Dwell Chronicles, you&apos;ll have the confidence of knowing your next home is
              already waiting for you.
            </p>
          </div>

          {/* Services Section Title */}
          <h3 className="text-lg font-bold text-[#2F3A33] mb-5">
            Our Room & Property Search Services
          </h3>

          {/* Personalized Matching */}
          <div className="mb-6">
            <h4 className="font-semibold text-[#2F3A33] text-sm mb-2 flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#5F8768]" />
              Personalized Property Matching
            </h4>
            <p className="text-[#6B7A6F] text-sm leading-relaxed">
              Every renter has unique needs. Whether you&apos;re a student, young professional,
              family, expatriate, or business executive, we carefully match you with properties
              that suit your budget, preferred location, lifestyle, and desired amenities. Our
              personalized recommendations save you time and make your search more efficient.
            </p>
          </div>

          {/* Extensive Listings */}
          <div className="mb-6">
            <h4 className="font-semibold text-[#2F3A33] text-sm mb-2 flex items-center gap-2">
              <Search className="w-4 h-4 text-[#5F8768]" />
              Extensive Property Listings
            </h4>
            <p className="text-[#6B7A6F] text-sm leading-relaxed mb-3">
              Explore a wide variety of rental options across Ghana, including:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
              {listingTypes.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#5F8768] shrink-0" />
                  <span className="text-sm text-[#2F3A33]">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-[#6B7A6F] text-sm">
              Our growing database ensures you always have access to verified and up-to-date rental
              opportunities.
            </p>
          </div>

          {/* Comprehensive Info */}
          <div className="mb-6">
            <h4 className="font-semibold text-[#2F3A33] text-sm mb-2 flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#5F8768]" />
              Comprehensive Property Information
            </h4>
            <p className="text-[#6B7A6F] text-sm leading-relaxed mb-3">
              Every listing on Dwell Chronicles is designed to help you make informed decisions. We
              provide:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
              {listingDetails.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#5F8768] shrink-0" />
                  <span className="text-sm text-[#2F3A33]">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-[#6B7A6F] text-sm">
              This allows you to compare properties confidently before scheduling a visit.
            </p>
          </div>

          {/* Real-Time Alerts */}
          <div className="mb-6">
            <h4 className="font-semibold text-[#2F3A33] text-sm mb-2 flex items-center gap-2">
              <Bell className="w-4 h-4 text-[#5F8768]" />
              Real-Time Property Alerts
            </h4>
            <p className="text-[#6B7A6F] text-sm leading-relaxed">
              Never miss your ideal rental opportunity. Once you create an account and set your
              preferences, Dwell Chronicles notifies you whenever new properties matching your
              criteria become available. You&apos;ll receive timely updates, allowing you to contact
              property owners or agents before the best listings are taken.
            </p>
          </div>

          {/* Professional Guidance */}
          <div className="mb-6">
            <h4 className="font-semibold text-[#2F3A33] text-sm mb-2 flex items-center gap-2">
              <Users className="w-4 h-4 text-[#5F8768]" />
              Professional Guidance Every Step of the Way
            </h4>
            <p className="text-[#6B7A6F] text-sm leading-relaxed mb-3">
              Finding a property is only the beginning. Our experienced team provides support
              throughout your entire rental journey by helping you:
            </p>
            <div className="space-y-2 mb-3">
              {guidanceSteps.map((step, i) => (
                <div key={step} className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#5F8768] text-white text-xs font-bold shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-sm text-[#2F3A33]">{step}</span>
                </div>
              ))}
            </div>
            <p className="text-[#6B7A6F] text-sm">
              Our experts are committed to making your relocation simple, transparent, and
              stress-free.
            </p>
          </div>

          {/* Verified Listings */}
          <div className="mb-6">
            <h4 className="font-semibold text-[#2F3A33] text-sm mb-2 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#5F8768]" />
              Verified Listings You Can Trust
            </h4>
            <p className="text-[#6B7A6F] text-sm leading-relaxed">
              At Dwell Chronicles, we prioritize quality and transparency. We strive to ensure that
              listed properties are accurately represented with honest descriptions, verified
              information, and current availability. This helps reduce the risk of misinformation
              and gives renters greater confidence throughout the search process.
            </p>
          </div>

          {/* Seamless Move */}
          <div className="mb-8">
            <h4 className="font-semibold text-[#2F3A33] text-sm mb-2 flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-[#5F8768]" />
              A Seamless Moving Experience
            </h4>
            <p className="text-[#6B7A6F] text-sm leading-relaxed">
              Planning ahead allows you to relocate comfortably without unnecessary pressure.
              Whether you&apos;re moving for work, school, business, or a fresh start, Dwell
              Chronicles helps you transition smoothly into your new home while minimizing delays
              and uncertainty.
            </p>
          </div>

          {/* Why Choose */}
          <h3 className="text-lg font-bold text-[#2F3A33] mb-4">
            Why Choose Dwell Chronicles?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {whyChoose.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 bg-[#F8F7F3] rounded-xl px-4 py-3"
              >
                <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#5F8768]/10 text-[#5F8768] shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </span>
                <span className="text-sm font-medium text-[#2F3A33]">{item}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-[#2F3A33] rounded-xl p-6 text-center">
            <p className="text-white font-semibold text-base mb-1">
              Start Your Search Today
            </p>
            <p className="text-white/80 text-sm leading-relaxed mb-4">
              Whether you&apos;re looking for a single room, an executive apartment, student
              accommodation, or a family home, Dwell Chronicles is your trusted partner in finding
              the right property at the right time. Let us help you move with confidence and make
              your next home your best one yet.
            </p>
            <a
              href="#contact"
              onClick={onClose}
              className="inline-flex items-center gap-2 bg-[#5F8768] hover:bg-[#4A6B52] text-white font-semibold text-sm rounded-xl px-6 py-3 transition-colors"
            >
              <Key className="w-4 h-4" />
              Find Your Perfect Room
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}