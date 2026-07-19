'use client';

import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  Map,
  Send,
  User,
  AtSign,
} from 'lucide-react';

const contactInfo = [
  {
    icon: MapPin,
    label: 'Location',
    value: 'Ho, Ghana',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '233 20 470 0023',
    href: 'tel:+233204700023',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'info@dwellchronicles.com',
    href: 'mailto:info@dwellchronicles.com',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '233 20 470 0023',
    href: 'https://wa.me/233204700023',
    className: 'text-[#25D366]',
  },
  {
    icon: Clock,
    label: 'Business Hours',
    value: 'Mon - Fri: 8:00 AM - 6:00 PM | Sat: 9:00 AM - 2:00 PM',
  },
];

const subjectOptions = [
  'General Inquiry',
  'Property Purchase',
  'Construction Quote',
  'Investment Consultation',
  'Partnership',
];

export default function ContactSection() {
  return (
    <section id="contact" className="bg-[#F8F7F3] py-20 md:py-28 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2F3A33]">
            Get In Touch
          </h2>
          <p className="mt-4 text-[#6B7A6F] max-w-xl mx-auto leading-relaxed">
            We&apos;d love to hear from you. Reach out for inquiries,
            consultations, or partnerships.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column — Contact Info + Map */}
          <div>
            {/* Contact Cards */}
            <div className="flex flex-col gap-4">
              {contactInfo.map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-4 p-4 bg-white rounded-xl"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-[#5F8768]/10 rounded-lg flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-[#5F8768]" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[#6B7A6F] uppercase tracking-wider mb-1">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className={`text-sm font-medium text-[#2F3A33] hover:underline ${item.className || ''}`}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-[#2F3A33]">
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="relative h-64 rounded-2xl mt-6 overflow-hidden">
              {/* Grid pattern to simulate a map */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundColor: '#D8D5CC',
                  backgroundImage: `
                    linear-gradient(rgba(47,58,51,0.08) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(47,58,51,0.08) 1px, transparent 1px)
                  `,
                  backgroundSize: '30px 30px',
                }}
              />
              {/* Subtle road lines */}
              <div className="absolute inset-0">
                <div className="absolute top-1/3 left-0 right-0 h-[2px] bg-[#2F3A33]/15" />
                <div className="absolute top-2/3 left-0 right-0 h-[2px] bg-[#2F3A33]/15" />
                <div className="absolute left-1/4 top-0 bottom-0 w-[2px] bg-[#2F3A33]/15" />
                <div className="absolute left-2/3 top-0 bottom-0 w-[2px] bg-[#2F3A33]/15" />
                {/* Diagonal road */}
                <div
                  className="absolute top-0 left-0 w-[2px] bg-[#2F3A33]/10 origin-top-left"
                  style={{
                    height: '200%',
                    transform: 'rotate(35deg)',
                  }}
                />
              </div>
              {/* Pin marker */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="w-6 h-6 bg-[#5F8768] rounded-full flex items-center justify-center shadow-md">
                  <MapPin className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="w-2 h-2 bg-[#5F8768]/30 rounded-full mt-1 animate-ping" />
              </div>
              {/* Center text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Map className="w-8 h-8 text-[#6B7A6F]/40 mb-2" />
                <span className="text-[#6B7A6F] font-medium text-sm">
                  Interactive Map
                </span>
                <span className="text-[#6B7A6F]/60 text-xs mt-1">
                  Ho, Ghana
                </span>
              </div>
            </div>
          </div>

          {/* Right Column — Contact Form */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="flex flex-col gap-5"
            >
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-[#2F3A33] mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7A6F]" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full border border-[#E5E3DC] rounded-xl pl-10 pr-4 py-3 text-sm bg-[#F8F7F3] focus:outline-none focus:ring-2 focus:ring-[#5F8768] focus:border-transparent text-[#2F3A33] placeholder-[#6B7A6F]/60 transition-shadow"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-[#2F3A33] mb-1.5">
                  Email
                </label>
                <div className="relative">
                  <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7A6F]" />
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className="w-full border border-[#E5E3DC] rounded-xl pl-10 pr-4 py-3 text-sm bg-[#F8F7F3] focus:outline-none focus:ring-2 focus:ring-[#5F8768] focus:border-transparent text-[#2F3A33] placeholder-[#6B7A6F]/60 transition-shadow"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-[#2F3A33] mb-1.5">
                  Phone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7A6F]" />
                  <input
                    type="tel"
                    placeholder="+234 800 000 0000"
                    className="w-full border border-[#E5E3DC] rounded-xl pl-10 pr-4 py-3 text-sm bg-[#F8F7F3] focus:outline-none focus:ring-2 focus:ring-[#5F8768] focus:border-transparent text-[#2F3A33] placeholder-[#6B7A6F]/60 transition-shadow"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-[#2F3A33] mb-1.5">
                  Subject
                </label>
                <select
                  defaultValue=""
                  className="w-full border border-[#E5E3DC] rounded-xl px-4 py-3 text-sm bg-[#F8F7F3] focus:outline-none focus:ring-2 focus:ring-[#5F8768] focus:border-transparent text-[#2F3A33] transition-shadow appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236B7A6F' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 12px center',
                  }}
                >
                  <option value="" disabled>
                    Select a subject
                  </option>
                  {subjectOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-[#2F3A33] mb-1.5">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your project or inquiry..."
                  className="w-full border border-[#E5E3DC] rounded-xl px-4 py-3 text-sm bg-[#F8F7F3] focus:outline-none focus:ring-2 focus:ring-[#5F8768] focus:border-transparent text-[#2F3A33] placeholder-[#6B7A6F]/60 resize-none transition-shadow"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 bg-[#5F8768] hover:bg-[#4A6B52] text-white rounded-xl px-8 py-3 font-medium w-full transition-colors duration-200 mt-2"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>

              {/* WhatsApp note */}
              <p className="text-center text-sm text-[#6B7A6F]">
                Or reach us directly via{' '}
                <a
                  href="https://wa.me/233204700023"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#25D366] font-medium hover:underline"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}