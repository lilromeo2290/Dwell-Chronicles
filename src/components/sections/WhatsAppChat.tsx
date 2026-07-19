'use client';

import { useState } from 'react';
import { MessageCircle, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl overflow-hidden w-80"
          >
            {/* Header */}
            <div className="bg-[#25D366] p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Dwell Chronicles</p>
                  <p className="text-xs text-white/80">Usually replies within minutes</p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-4">
              <div className="bg-[#F8F7F3] rounded-xl rounded-tl-none p-3 mb-4">
                <p className="text-sm text-[#2F3A33]">
                  Hello! 👋 Welcome to Dwell Chronicles. How can we help you today?
                </p>
                <p className="text-xs text-[#6B7A6F] mt-1">
                  Whether you&apos;re looking to buy, rent, or build — we&apos;re here to assist.
                </p>
              </div>

              <a
                href="https://wa.me/2348012345678?text=Hello%20Dwell%20Chronicles%2C%20I%27d%20like%20to%20inquire%20about%20your%20properties."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1DA851] text-white rounded-xl py-3 px-4 font-medium text-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Start Chat on WhatsApp
              </a>

              <a
                href="tel:+2348012345678"
                className="flex items-center justify-center gap-2 w-full border border-[#E5E3DC] hover:bg-[#F8F7F3] text-[#2F3A33] rounded-xl py-3 px-4 font-medium text-sm transition-colors mt-2"
              >
                <Phone className="w-4 h-4" />
                Call Us Directly
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main WhatsApp Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`relative w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-colors duration-300 ${
          isOpen
            ? 'bg-[#2F3A33] hover:bg-[#1a231d]'
            : 'bg-[#25D366] hover:bg-[#1DA851] whatsapp-pulse'
        }`}
        aria-label={isOpen ? 'Close chat' : 'Open WhatsApp chat'}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </motion.button>
    </div>
  );
}