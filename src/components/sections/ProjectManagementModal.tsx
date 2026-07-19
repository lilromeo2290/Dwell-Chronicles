'use client';

import { X, CheckCircle2, Shield, ClipboardList, BarChart3, Calendar, Users, Package, Eye, AlertTriangle, MessageSquare, FileText, CheckCircle, Handshake } from 'lucide-react';

const services = [
  { icon: <ClipboardList className="w-5 h-5" />, title: 'Project planning and feasibility studies' },
  { icon: <BarChart3 className="w-5 h-5" />, title: 'Budget development and cost control' },
  { icon: <Calendar className="w-5 h-5" />, title: 'Project scheduling and timeline management' },
  { icon: <Users className="w-5 h-5" />, title: 'Contractor and consultant coordination' },
  { icon: <Package className="w-5 h-5" />, title: 'Procurement and resource management' },
  { icon: <Eye className="w-5 h-5" />, title: 'Site supervision and quality assurance' },
  { icon: <AlertTriangle className="w-5 h-5" />, title: 'Risk assessment and mitigation' },
  { icon: <Shield className="w-5 h-5" />, title: 'Health, safety, and regulatory compliance' },
  { icon: <BarChart3 className="w-5 h-5" />, title: 'Progress monitoring and performance reporting' },
  { icon: <MessageSquare className="w-5 h-5" />, title: 'Stakeholder communication and coordination' },
  { icon: <FileText className="w-5 h-5" />, title: 'Project documentation and contract administration' },
  { icon: <CheckCircle className="w-5 h-5" />, title: 'Final inspection, commissioning, and project handover' },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ProjectManagementModal({ open, onClose }: Props) {
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
              'url(https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#2F3A33] via-[#2F3A33]/60 to-transparent rounded-t-2xl" />
          <div className="absolute bottom-6 left-8 right-8">
            <span className="inline-block bg-[#5F8768] text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
              End-to-End Oversight
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
              Project Management<br />Services
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-10">
          {/* Intro Paragraph 1 */}
          <p className="text-[#2F3A33] leading-relaxed mb-6">
            Successful real estate and construction projects require careful planning, effective
            coordination, and professional oversight to ensure they are completed on time, within
            budget, and to the highest quality standards. At{' '}
            <span className="font-semibold text-[#5F8768]">Dwell Chronicles</span>, we provide
            comprehensive project management services that oversee every stage of your project,
            ensuring a seamless and efficient process from concept to completion.
          </p>

          {/* Paragraph 2 — Coordination */}
          <p className="text-[#6B7A6F] leading-relaxed mb-6">
            Our experienced project managers work closely with clients, architects, engineers,
            contractors, consultants, and suppliers to coordinate all aspects of the project. We
            develop detailed project plans, establish realistic timelines, manage budgets, monitor
            progress, and proactively address potential challenges before they become costly delays.
            Our goal is to keep your project moving forward smoothly while maintaining complete
            transparency throughout the process.
          </p>

          {/* Paragraph 3 — Process */}
          <p className="text-[#6B7A6F] leading-relaxed mb-6">
            From the initial feasibility assessment and project planning to procurement, construction
            supervision, quality control, and final handover, we ensure that every activity is
            executed according to your specifications and industry best practices. We also ensure
            compliance with relevant building regulations, safety standards, and contractual
            obligations, giving you confidence that your project is being managed professionally and
            responsibly.
          </p>

          {/* Paragraph 4 — Communication */}
          <p className="text-[#6B7A6F] leading-relaxed mb-6">
            Effective communication is one of the cornerstones of our project management approach. We
            provide regular progress reports, budget updates, site inspections, and performance
            evaluations, keeping you informed at every milestone. Our transparent reporting allows
            you to make timely decisions while maintaining full visibility into the status of your
            investment.
          </p>

          {/* Trust Badge */}
          <div className="bg-[#5F8768]/5 border border-[#5F8768]/15 rounded-xl p-5 mb-8 flex items-start gap-4">
            <Shield className="w-6 h-6 text-[#5F8768] mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-[#2F3A33] text-sm mb-1">
                Professionalism, Accountability & Excellence
              </p>
              <p className="text-[#6B7A6F] text-sm leading-relaxed">
                Whether you are constructing a private residence, developing a commercial complex,
                managing a housing estate, renovating an existing property, or overseeing a
                large-scale infrastructure project, Dwell Chronicles delivers tailored project
                management solutions designed to achieve outstanding results with minimal risk.
              </p>
            </div>
          </div>

          {/* Services Grid */}
          <h3 className="text-lg font-bold text-[#2F3A33] mb-4">
            Our Project Management Services Include:
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
              At Dwell Chronicles, we are committed to delivering projects with professionalism,
              accountability, and excellence. By combining strategic planning, technical expertise,
              and transparent management, we help clients achieve successful project outcomes while
              protecting their investment and ensuring long-term value.
            </p>
            <a
              href="#contact"
              onClick={onClose}
              className="inline-flex items-center gap-2 bg-[#5F8768] hover:bg-[#4A6B52] text-white font-semibold text-sm rounded-xl px-6 py-3 transition-colors"
            >
              <Handshake className="w-4 h-4" />
              Discuss Your Project With Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}