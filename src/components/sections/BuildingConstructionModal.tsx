'use client';

import { X, CheckCircle2, Shield, Home, Building2, HardHat, Wrench, Layers, ClipboardCheck, Lightbulb, Ruler, Paintbrush, Zap, Droplets, TreePine } from 'lucide-react';

const services = [
  { icon: <Home className="w-5 h-5" />, title: 'Residential home construction' },
  { icon: <Building2 className="w-5 h-5" />, title: 'Commercial building construction' },
  { icon: <Layers className="w-5 h-5" />, title: 'Luxury homes and estate development' },
  { icon: <Building2 className="w-5 h-5" />, title: 'Apartment and multi-unit residential projects' },
  { icon: <Home className="w-5 h-5" />, title: 'Office and retail space construction' },
  { icon: <Ruler className="w-5 h-5" />, title: 'Foundation and structural works' },
  { icon: <Wrench className="w-5 h-5" />, title: 'Renovation and building extensions' },
  { icon: <Paintbrush className="w-5 h-5" />, title: 'Interior and exterior finishing' },
  { icon: <Zap className="w-5 h-5" />, title: 'Roofing, plumbing, and electrical coordination' },
  { icon: <ClipboardCheck className="w-5 h-5" />, title: 'Project planning and site supervision' },
  { icon: <HardHat className="w-5 h-5" />, title: 'Construction project management' },
  { icon: <Shield className="w-5 h-5" />, title: 'Quality assurance and safety compliance' },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function BuildingConstructionModal({ open, onClose }: Props) {
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
              'url(https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#2F3A33] via-[#2F3A33]/60 to-transparent rounded-t-2xl" />
          <div className="absolute bottom-6 left-8 right-8">
            <span className="inline-block bg-[#5F8768] text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
              Construction Excellence
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
              Building Construction<br />Services
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-10">
          {/* Intro Paragraph 1 */}
          <p className="text-[#2F3A33] leading-relaxed mb-6">
            Turn your vision into reality with{' '}
            <span className="font-semibold text-[#5F8768]">Dwell Chronicles</span>&apos;
            professional building construction services. We specialize in delivering high-quality
            construction solutions that combine exceptional craftsmanship, innovative building
            techniques, and strict quality standards to create structures that are durable,
            functional, and aesthetically appealing. Whether you&apos;re planning a residential
            home, commercial facility, office complex, apartment building, or luxury estate, our
            experienced team is committed to bringing your project to life with precision and
            excellence.
          </p>

          {/* Paragraph 2 — Planning */}
          <p className="text-[#6B7A6F] leading-relaxed mb-6">
            From the initial planning stage to project completion, we work closely with clients to
            understand their goals, budget, design preferences, and timeline. Our collaborative
            approach ensures that every project reflects your unique vision while meeting industry
            standards, building regulations, and safety requirements. We believe that successful
            construction begins with proper planning, transparent communication, and attention to
            every detail.
          </p>

          {/* Paragraph 3 — Process */}
          <p className="text-[#6B7A6F] leading-relaxed mb-6">
            Our team manages every aspect of the construction process, including site preparation,
            foundation works, structural construction, roofing, electrical and plumbing coordination,
            finishing, landscaping, and final project delivery. By working with skilled engineers,
            architects, project managers, and qualified artisans, we ensure that each phase is
            completed efficiently without compromising on quality.
          </p>

          {/* Paragraph 4 — Quality */}
          <p className="text-[#6B7A6F] leading-relaxed mb-6">
            Quality and durability are at the heart of every project we undertake. We use reliable
            construction methods and quality building materials to deliver structures that stand the
            test of time while providing comfort, safety, and long-term value. Throughout the
            construction journey, clients receive regular project updates, progress reports, and
            professional guidance, ensuring complete transparency and confidence from start to finish.
          </p>

          {/* Trust Badge */}
          <div className="bg-[#5F8768]/5 border border-[#5F8768]/15 rounded-xl p-5 mb-8 flex items-start gap-4">
            <Shield className="w-6 h-6 text-[#5F8768] mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-[#2F3A33] text-sm mb-1">
                Excellence, Innovation & Lasting Value
              </p>
              <p className="text-[#6B7A6F] text-sm leading-relaxed">
                Whether you are building your dream home, developing a commercial property,
                constructing rental apartments, or investing in large-scale real estate developments,
                Dwell Chronicles provides dependable construction solutions tailored to your needs.
              </p>
            </div>
          </div>

          {/* Services Grid */}
          <h3 className="text-lg font-bold text-[#2F3A33] mb-4">
            Our Building Construction Services Include:
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
              At Dwell Chronicles, we are committed to delivering buildings that reflect excellence,
              innovation, and lasting value. With our experienced professionals, transparent
              processes, and dedication to quality, you can build with confidence knowing your
              project is in capable hands from concept to completion.
            </p>
            <a
              href="#contact"
              onClick={onClose}
              className="inline-flex items-center gap-2 bg-[#5F8768] hover:bg-[#4A6B52] text-white font-semibold text-sm rounded-xl px-6 py-3 transition-colors"
            >
              <HardHat className="w-4 h-4" />
              Start Your Construction Project
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}