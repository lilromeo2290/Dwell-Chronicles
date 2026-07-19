'use client';

import {
  ArrowRight,
  Youtube,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Send,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Properties', href: '#properties' },
  { label: 'Construction', href: '#construction' },
  { label: 'Blog', href: '#blog' },
  { label: 'Videos', href: '#videos' },
  { label: 'Contact', href: '#contact' },
];

const services = [
  { label: 'Construction', href: '#construction' },
  { label: 'Property Sales', href: '#properties' },
  { label: 'Rentals', href: '#properties' },
  { label: 'Consultancy', href: '#contact' },
  { label: 'Property Management', href: '#services' },
];

const resources = [
  { label: 'Blog', href: '#blog' },
  { label: 'FAQs', href: '#faq' },
  { label: 'Guides', href: '#guides' },
  { label: 'Market Reports', href: '#reports' },
  { label: 'Investment Calculator', href: '#calculator' },
];

const socialLinks = [
  {
    icon: Youtube,
    href: '#',
    bg: 'bg-red-600',
    label: 'YouTube',
  },
  {
    icon: Facebook,
    href: '#',
    bg: 'bg-blue-600',
    label: 'Facebook',
  },
  {
    icon: Instagram,
    href: '#',
    bg: 'bg-pink-600',
    label: 'Instagram',
  },
  {
    icon: Linkedin,
    href: '#',
    bg: 'bg-blue-700',
    label: 'LinkedIn',
  },
  {
    icon: Twitter,
    href: '#',
    bg: 'bg-black',
    label: 'Twitter',
  },
];

const footerLinks = [
  { label: 'Privacy Policy', href: '#privacy' },
  { label: 'Terms of Service', href: '#terms' },
  { label: 'Sitemap', href: '#sitemap' },
];

export default function Footer() {
  return (
    <footer className="bg-[#2F3A33] text-white pt-16 pb-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Brand Area */}
        <div className="text-center max-w-2xl mx-auto">
          <img
            src="/logo.jpg"
            alt="Dwell Chronicles"
            className="h-12 w-auto object-contain mx-auto brightness-0 invert"
          />
          <p className="mt-3 text-white/60 text-sm leading-relaxed">
            Your trusted partner in premium property listings, construction
            solutions, and real estate investment across Africa.
          </p>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-12">
          {/* Column 1 — Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/40 mb-5">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-[#7BA384] transition-colors duration-200 group"
                  >
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2 — Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/40 mb-5">
              Services
            </h3>
            <ul className="flex flex-col gap-3">
              {services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-[#7BA384] transition-colors duration-200 group"
                  >
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Resources */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/40 mb-5">
              Resources
            </h3>
            <ul className="flex flex-col gap-3">
              {resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-[#7BA384] transition-colors duration-200 group"
                  >
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Connect */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/40 mb-5">
              Connect
            </h3>

            {/* Social Icons */}
            <div className="flex flex-wrap gap-3 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className={`${social.bg} w-10 h-10 rounded-xl flex items-center justify-center hover:opacity-80 transition-opacity duration-200`}
                >
                  <social.icon className="w-5 h-5 text-white" />
                </a>
              ))}
            </div>

            {/* Contact Info */}
            <div className="flex flex-col gap-3">
              <a
                href="mailto:info@dwellchronicles.com"
                className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-[#7BA384] transition-colors duration-200"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                info@dwellchronicles.com
              </a>
              <a
                href="tel:+233204700023"
                className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-[#7BA384] transition-colors duration-200"
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                233 20 470 0023
              </a>
              <span className="inline-flex items-center gap-2 text-sm text-white/70">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                Ho, Volta Region, Ghana
              </span>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 border-t border-white/10 pt-10">
          <div className="text-center max-w-xl mx-auto">
            <h3 className="text-lg font-semibold mb-2">
              Stay Updated
            </h3>
            <p className="text-sm text-white/60 mb-6 leading-relaxed">
              Stay Updated with the Latest Property Listings and Construction
              Insights.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-white/10 border border-white/20 rounded-l-xl px-4 py-3 text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#5F8768] focus:border-transparent transition-shadow"
              />
              <button className="bg-[#5F8768] hover:bg-[#4A6B52] rounded-r-xl px-6 text-white font-medium text-sm inline-flex items-center gap-2 transition-colors duration-200">
                <Send className="w-4 h-4" />
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-white/10 pt-8 flex justify-between items-center flex-wrap gap-4">
          <p className="text-sm text-white/50">
            &copy; 2026 Dwell Chronicles. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white/60 hover:text-white text-sm transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}