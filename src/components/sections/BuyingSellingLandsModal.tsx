'use client';

import { X, CheckCircle2, Shield, Search, Eye, FileCheck, Users, BarChart3, Camera, Handshake, ArrowRightLeft } from 'lucide-react';

const services = [
  { icon: <Shield className="w-5 h-5" />, title: 'Verified and litigation-free land listings' },
  { icon: <Building2Icon />, title: 'Residential, commercial, and agricultural lands' },
  { icon: <Eye className="w-5 h-5" />, title: 'Property inspections and site visits' },
  { icon: <FileCheck className="w-5 h-5" />, title: 'Land ownership and document verification' },
  { icon: <Users className="w-5 h-5" />, title: 'Buyer and seller consultation' },
  { icon: <BarChart3 className="w-5 h-5" />, title: 'Property valuation and market guidance' },
  { icon: <Camera className="w-5 h-5" />, title: 'Professional property marketing' },
  { icon: <Search className="w-5 h-5" />, title: 'Virtual property tours and detailed listings' },
  { icon: <Handshake className="w-5 h-5" />, title: 'Negotiation and transaction support' },
  { icon: <ArrowRightLeft className="w-5 h-5" />, title: 'Assistance with ownership transfer processes' },
];

function Building2Icon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-building-2">
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/>
      <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/>
      <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/>
      <path d="M10 6h4"/>
      <path d="M10 10h4"/>
      <path d="M10 14h4"/>
      <path d="M10 18h4"/>
    </svg>
  );
}

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function BuyingSellingLandsModal({ open, onClose }: Props) {
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
              'url(https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&q=80)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#2F3A33] via-[#2F3A33]/60 to-transparent rounded-t-2xl" />
          <div className="absolute bottom-6 left-8 right-8">
            <span className="inline-block bg-[#5F8768] text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
              Property Transactions
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
              Buying & Selling<br />of Lands
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-10">
          {/* Intro Paragraph 1 */}
          <p className="text-[#2F3A33] leading-relaxed mb-6">
            Finding the right land or selling your property successfully requires expert guidance,
            proper documentation, and a trusted partner who understands the complexities of the real
            estate market. At{' '}
            <span className="font-semibold text-[#5F8768]">Dwell Chronicles</span>, we provide
            professional land buying and selling services designed to make property transactions
            simple, secure, and rewarding.
          </p>

          {/* Intro Paragraph 2 — Buyers */}
          <p className="text-[#6B7A6F] leading-relaxed mb-6">
            For buyers, we offer access to a carefully selected portfolio of genuine,
            litigation-free lands suitable for residential, commercial, agricultural, and investment
            purposes. Every property is presented with detailed information, including location
            details, land size, ownership status, available documentation, development potential, and
            other important features to help you make confident investment decisions.
          </p>

          {/* Intro Paragraph 3 — Innovation */}
          <p className="text-[#6B7A6F] leading-relaxed mb-6">
            Through our innovative approach, we provide clients with comprehensive property insights,
            including high-quality images, virtual tours, and location guidance, allowing you to
            explore available lands conveniently before making a commitment. Our team conducts
            thorough checks and due diligence to help reduce risks associated with land acquisition
            and ensure a smooth purchasing experience.
          </p>

          {/* Intro Paragraph 4 — Sellers */}
          <p className="text-[#6B7A6F] leading-relaxed mb-6">
            For sellers, Dwell Chronicles provides professional marketing and property promotion
            services to connect your land with serious buyers. We help showcase your property
            through strategic advertising, accurate property descriptions, and targeted exposure to
            maximize its value and attract the right investors.
          </p>

          {/* Trust Badge */}
          <div className="bg-[#5F8768]/5 border border-[#5F8768]/15 rounded-xl p-5 mb-8 flex items-start gap-4">
            <Shield className="w-6 h-6 text-[#5F8768] mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-[#2F3A33] text-sm mb-1">
                Transparent & Customer-Focused Process
              </p>
              <p className="text-[#6B7A6F] text-sm leading-relaxed">
                Our transparent and customer-focused process ensures that every transaction is
                handled with integrity, professionalism, and attention to detail. From initial
                consultation and property inspection to negotiations, documentation, and final
                transfer, we provide the support needed to complete your transaction successfully.
              </p>
            </div>
          </div>

          {/* Services Grid */}
          <h3 className="text-lg font-bold text-[#2F3A33] mb-4">
            Our Land Buying & Selling Services Include:
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
              Whether you are looking to buy your dream property, expand your investment portfolio,
              or sell land at the right market value, Dwell Chronicles is your trusted partner for
              safe and successful land transactions. Invest with confidence knowing that every land
              transaction is guided by expertise, transparency, and a commitment to protecting your
              interests.
            </p>
            <a
              href="#contact"
              onClick={onClose}
              className="inline-flex items-center gap-2 bg-[#5F8768] hover:bg-[#4A6B52] text-white font-semibold text-sm rounded-xl px-6 py-3 transition-colors"
            >
              <Users className="w-4 h-4" />
              Contact Us to Get Started
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}