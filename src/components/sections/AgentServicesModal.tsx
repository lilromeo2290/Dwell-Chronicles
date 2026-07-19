'use client';

import { X, CheckCircle2, Shield, Search, Eye, Users, BarChart3, Camera, Handshake, FileText, Home } from 'lucide-react';

const services = [
  { icon: <Search className="w-5 h-5" />, title: 'Personalized property search assistance' },
  { icon: <Handshake className="w-5 h-5" />, title: 'Buying, selling, and rental support' },
  { icon: <Camera className="w-5 h-5" />, title: 'Property marketing and promotion' },
  { icon: <BarChart3 className="w-5 h-5" />, title: 'Market analysis and pricing guidance' },
  { icon: <Eye className="w-5 h-5" />, title: 'Property viewings and virtual tours' },
  { icon: <Users className="w-5 h-5" />, title: 'Buyer and tenant representation' },
  { icon: <Home className="w-5 h-5" />, title: 'Seller and landlord representation' },
  { icon: <Handshake className="w-5 h-5" />, title: 'Negotiation and contract assistance' },
  { icon: <FileText className="w-5 h-5" />, title: 'Documentation and transaction coordination' },
  { icon: <BarChart3 className="w-5 h-5" />, title: 'Investment and real estate advisory services' },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AgentServicesModal({ open, onClose }: Props) {
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
              'url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&q=80)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#2F3A33] via-[#2F3A33]/60 to-transparent rounded-t-2xl" />
          <div className="absolute bottom-6 left-8 right-8">
            <span className="inline-block bg-[#5F8768] text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
              Expert Guidance
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
              Agent Services
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-10">
          {/* Intro Paragraph 1 */}
          <p className="text-[#2F3A33] leading-relaxed mb-6">
            Achieving your real estate goals is easier when you have knowledgeable professionals by
            your side. At{' '}
            <span className="font-semibold text-[#5F8768]">Dwell Chronicles</span>, our experienced
            real estate agents are committed to providing personalized, reliable, and transparent
            services that help clients confidently navigate every stage of the property market.
            Whether you are buying, selling, renting, or investing in real estate, our agents work
            diligently to ensure you receive expert guidance and the best possible outcome.
          </p>

          {/* Paragraph 2 — Understanding needs */}
          <p className="text-[#6B7A6F] leading-relaxed mb-6">
            We understand that every client has unique needs and objectives. That&apos;s why our
            agents take the time to understand your budget, preferences, and investment goals before
            recommending suitable properties or marketing your property to the right audience. Our
            in-depth knowledge of the local real estate market enables us to provide valuable
            insights on pricing, market trends, investment opportunities, and neighborhood
            developments, helping you make informed decisions.
          </p>

          {/* Paragraph 3 — Buyers & Sellers */}
          <p className="text-[#6B7A6F] leading-relaxed mb-6">
            For property buyers, our agents identify verified properties that match your
            requirements, arrange property inspections and virtual tours, negotiate favorable terms,
            and guide you through the documentation and purchase process. For sellers, we develop
            effective marketing strategies, showcase your property professionally, connect you with
            qualified buyers, and assist with negotiations to maximize your property&apos;s value.
          </p>

          {/* Paragraph 4 — Rentals */}
          <p className="text-[#6B7A6F] leading-relaxed mb-6">
            If you&apos;re looking for rental properties, our agents help you find quality homes,
            apartments, offices, or commercial spaces that suit your needs while ensuring a smooth
            leasing process. We also support landlords by marketing available properties, screening
            prospective tenants, and facilitating lease agreements.
          </p>

          {/* Trust Badge */}
          <div className="bg-[#5F8768]/5 border border-[#5F8768]/15 rounded-xl p-5 mb-8 flex items-start gap-4">
            <Shield className="w-6 h-6 text-[#5F8768] mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-[#2F3A33] text-sm mb-1">
                Professionalism, Honesty & Integrity
              </p>
              <p className="text-[#6B7A6F] text-sm leading-relaxed">
                At Dwell Chronicles, professionalism, honesty, and integrity are at the heart of
                everything we do. Our agents are dedicated to protecting your interests, maintaining
                clear communication, and delivering exceptional customer service from your first
                inquiry to the successful completion of your transaction.
              </p>
            </div>
          </div>

          {/* Services Grid */}
          <h3 className="text-lg font-bold text-[#2F3A33] mb-4">
            Our Agent Services Include:
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
              Whether you&apos;re purchasing your first home, selling a valuable property, searching
              for rental accommodation, or expanding your investment portfolio, Dwell Chronicles
              provides trusted real estate agents who are committed to making your property journey
              smooth, secure, and successful.
            </p>
            <a
              href="#contact"
              onClick={onClose}
              className="inline-flex items-center gap-2 bg-[#5F8768] hover:bg-[#4A6B52] text-white font-semibold text-sm rounded-xl px-6 py-3 transition-colors"
            >
              <Users className="w-4 h-4" />
              Connect With an Agent
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}