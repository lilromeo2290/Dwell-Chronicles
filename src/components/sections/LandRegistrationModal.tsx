'use client';

import { X, CheckCircle2, Shield, FileText, Landmark, Scale, Users, Search, MapPinned, BarChart3, MessageSquare } from 'lucide-react';

const services = [
  { icon: <Search className="w-5 h-5" />, title: 'Land Title & Ownership Verification' },
  { icon: <FileText className="w-5 h-5" />, title: 'Due Diligence & Document Authentication' },
  { icon: <Landmark className="w-5 h-5" />, title: 'Land Registration Guidance & Processing' },
  { icon: <Scale className="w-5 h-5" />, title: 'Property Title Transfer Assistance' },
  { icon: <MapPinned className="w-5 h-5" />, title: 'Site & Boundary Verification' },
  { icon: <Shield className="w-5 h-5" />, title: 'Legal Documentation Support' },
  { icon: <BarChart3 className="w-5 h-5" />, title: 'Property Investment Consultation' },
  { icon: <FileText className="w-5 h-5" />, title: 'Compliance with Land Administration Regulations' },
  { icon: <MessageSquare className="w-5 h-5" />, title: 'General Real Estate & Land Advisory Services' },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function LandRegistrationModal({ open, onClose }: Props) {
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
              Professional Services
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
              Land Registration &<br />Consultancy Services
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-10">
          {/* Intro */}
          <p className="text-[#2F3A33] leading-relaxed mb-6">
            Navigating the land registration process can be challenging, especially with the legal
            requirements, documentation, and verification procedures involved. At{' '}
            <span className="font-semibold text-[#5F8768]">Dwell Chronicles</span>, we make the
            process simple, transparent, and stress-free by providing professional land registration
            and consultancy services tailored to individuals, families, businesses, and property
            investors.
          </p>

          <p className="text-[#6B7A6F] leading-relaxed mb-6">
            Our experienced team works closely with clients to ensure that every stage of the
            registration process is handled with accuracy and compliance. From conducting due
            diligence and land title verification to preparing documentation, liaising with the
            relevant authorities, and tracking registration progress, we help protect you from
            costly mistakes, fraud, and legal disputes.
          </p>

          <p className="text-[#6B7A6F] leading-relaxed mb-8">
            Whether you are purchasing land for residential development, commercial projects,
            agriculture, or long-term investment, we provide expert guidance to help you make
            informed decisions. We also offer professional advice on land ownership, title transfers,
            boundary issues, documentation requirements, and regulatory compliance, ensuring that
            your property transactions are secure and legally recognized.
          </p>

          {/* Trust Badge */}
          <div className="bg-[#5F8768]/5 border border-[#5F8768]/15 rounded-xl p-5 mb-8 flex items-start gap-4">
            <Shield className="w-6 h-6 text-[#5F8768] mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-[#2F3A33] text-sm mb-1">
                Our Commitment to You
              </p>
              <p className="text-[#6B7A6F] text-sm leading-relaxed">
                At Dwell Chronicles, we are committed to honesty, transparency, and
                professionalism. Our goal is to safeguard your investment, minimize delays, and give
                you complete confidence throughout the land registration journey. With our trusted
                consultancy services, you can focus on building your future while we handle the
                complexities of securing your property rights.
              </p>
            </div>
          </div>

          {/* Services Grid */}
          <h3 className="text-lg font-bold text-[#2F3A33] mb-4">
            Our Land Registration & Consultancy Services Include:
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
              Protect your investment with expert guidance from Dwell Chronicles and enjoy the
              confidence that comes with legally secure land ownership.
            </p>
            <a
              href="#contact"
              onClick={onClose}
              className="inline-flex items-center gap-2 bg-[#5F8768] hover:bg-[#4A6B52] text-white font-semibold text-sm rounded-xl px-6 py-3 transition-colors"
            >
              <Users className="w-4 h-4" />
              Contact Us for Consultation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}