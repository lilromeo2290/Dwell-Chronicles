'use client';

import { X, CheckCircle2, Shield, Search, FileText, Users, BarChart3, Wrench, Home, ClipboardCheck, MessageSquare, Building2, TrendingUp } from 'lucide-react';

const services = [
  { icon: <Search className="w-5 h-5" />, title: 'Tenant sourcing and screening' },
  { icon: <FileText className="w-5 h-5" />, title: 'Lease preparation and management' },
  { icon: <BarChart3 className="w-5 h-5" />, title: 'Rent collection and financial reporting' },
  { icon: <MessageSquare className="w-5 h-5" />, title: 'Tenant relationship and dispute resolution' },
  { icon: <ClipboardCheck className="w-5 h-5" />, title: 'Routine property inspections' },
  { icon: <Wrench className="w-5 h-5" />, title: 'Preventive and emergency maintenance coordination' },
  { icon: <Building2 className="w-5 h-5" />, title: 'Property marketing and vacancy management' },
  { icon: <Users className="w-5 h-5" />, title: 'Contractor and vendor management' },
  { icon: <Home className="w-5 h-5" />, title: 'Utility and service coordination' },
  { icon: <TrendingUp className="w-5 h-5" />, title: 'Property performance monitoring and reporting' },
  { icon: <Shield className="w-5 h-5" />, title: 'Compliance with property regulations' },
  { icon: <BarChart3 className="w-5 h-5" />, title: 'Investment property management for residential and commercial properties' },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function PropertyManagementModal({ open, onClose }: Props) {
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
              'url(https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?w=900&q=80)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#2F3A33] via-[#2F3A33]/60 to-transparent rounded-t-2xl" />
          <div className="absolute bottom-6 left-8 right-8">
            <span className="inline-block bg-[#5F8768] text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
              Professional Management
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
              Property Management<br />Services
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-10">
          {/* Intro Paragraph 1 */}
          <p className="text-[#2F3A33] leading-relaxed mb-6">
            Owning property should be a rewarding investment, not a constant source of stress. At{' '}
            <span className="font-semibold text-[#5F8768]">Dwell Chronicles</span>, we provide
            comprehensive property management services that help property owners maximize returns
            while ensuring their residential, commercial, and investment properties are
            professionally maintained and efficiently managed.
          </p>

          {/* Paragraph 2 — Day-to-day */}
          <p className="text-[#6B7A6F] leading-relaxed mb-6">
            Our experienced property management team takes care of the day-to-day responsibilities
            involved in managing your property, allowing you to enjoy the benefits of ownership
            without the administrative burden. From tenant acquisition and relationship management to
            rent collection, maintenance coordination, and regular property inspections, we ensure
            your investment remains in excellent condition and continues to generate value.
          </p>

          {/* Paragraph 3 — Quality tenants */}
          <p className="text-[#6B7A6F] leading-relaxed mb-6">
            We understand that quality tenants are key to a successful property investment.
            That&apos;s why we carefully market vacant properties, screen prospective tenants,
            verify references, and facilitate lease agreements to help secure responsible occupants.
            Throughout the tenancy, we maintain open communication with both landlords and tenants,
            addressing concerns promptly and fostering positive long-term relationships.
          </p>

          {/* Paragraph 4 — Maintenance */}
          <p className="text-[#6B7A6F] leading-relaxed mb-6">
            To preserve the value of your property, we coordinate routine maintenance, emergency
            repairs, and preventive maintenance services through trusted professionals. Regular
            inspections help identify potential issues early, minimizing costly repairs and ensuring
            your property remains safe, attractive, and compliant with relevant regulations.
          </p>

          {/* Paragraph 5 — Transparency */}
          <p className="text-[#6B7A6F] leading-relaxed mb-6">
            Transparency is at the core of our management approach. We provide property owners with
            regular updates, financial reports, maintenance records, and clear communication, giving
            you complete visibility into your property&apos;s performance. Whether you own a single
            rental property, multiple residential units, office buildings, commercial spaces, or an
            investment portfolio, our tailored management solutions are designed to meet your
            specific needs.
          </p>

          {/* Trust Badge */}
          <div className="bg-[#5F8768]/5 border border-[#5F8768]/15 rounded-xl p-5 mb-8 flex items-start gap-4">
            <Shield className="w-6 h-6 text-[#5F8768] mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-[#2F3A33] text-sm mb-1">
                Our Commitment to Your Investment
              </p>
              <p className="text-[#6B7A6F] text-sm leading-relaxed">
                At Dwell Chronicles, our goal is to protect your investment, enhance tenant
                satisfaction, reduce vacancy periods, and maximize the long-term profitability of
                your property through reliable, professional, and transparent management services.
              </p>
            </div>
          </div>

          {/* Services Grid */}
          <h3 className="text-lg font-bold text-[#2F3A33] mb-4">
            Our Property Management Services Include:
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
              With Dwell Chronicles as your trusted property management partner, you can enjoy
              peace of mind knowing your property is being managed with professionalism, integrity,
              and a commitment to delivering lasting value for your investment.
            </p>
            <a
              href="#contact"
              onClick={onClose}
              className="inline-flex items-center gap-2 bg-[#5F8768] hover:bg-[#4A6B52] text-white font-semibold text-sm rounded-xl px-6 py-3 transition-colors"
            >
              <Users className="w-4 h-4" />
              Get Property Management Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}