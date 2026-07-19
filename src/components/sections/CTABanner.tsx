'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Calendar, Eye } from 'lucide-react';

export default function CTABanner() {
  return (
    <section id="cta" className="relative w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80"
          alt="Luxury property background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#2F3A33]/90 via-[#5F8768]/80 to-[#2F3A33]/90" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white py-24 md:py-32 px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-3xl md:text-5xl font-bold leading-tight"
        >
          Let&apos;s Build Your Future Together.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
          className="mt-6 text-lg text-white/80 max-w-2xl mx-auto leading-relaxed"
        >
          Whether you&apos;re buying your first home, investing in commercial
          property, or starting a construction project — we&apos;re here to make
          it happen.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
          className="flex flex-wrap justify-center gap-4 mt-8"
        >
          {/* Contact Us Button */}
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-white text-[#2F3A33] hover:bg-[#D8D5CC] rounded-xl px-8 py-3 font-medium transition-colors duration-200"
          >
            <MessageCircle className="w-5 h-5" />
            Contact Us
          </a>

          {/* Book Consultation Button */}
          <a
            href="#contact"
            className="inline-flex items-center gap-2 border-2 border-white text-white hover:bg-white hover:text-[#2F3A33] rounded-xl px-8 py-3 font-medium transition-colors duration-200"
          >
            <Calendar className="w-5 h-5" />
            Book Consultation
          </a>

          {/* View Properties Button */}
          <a
            href="#properties"
            className="inline-flex items-center gap-2 border-2 border-white/50 text-white hover:border-white hover:bg-white/10 rounded-xl px-8 py-3 font-medium transition-colors duration-200"
          >
            <Eye className="w-5 h-5" />
            View Properties
          </a>
        </motion.div>
      </div>
    </section>
  );
}