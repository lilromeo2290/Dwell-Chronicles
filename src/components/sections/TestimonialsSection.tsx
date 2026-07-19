'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Adebayo Ogunlesi',
    role: 'Property Investor',
    text: 'Dwell Chronicles helped me find the perfect investment property in Lagos. Their market knowledge and professional approach made the entire process seamless. The property has appreciated by 35% in just two years.',
    rating: 5,
    property: '3-Bedroom Apartment, Lekki Phase 1',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
  },
  {
    name: 'Amara Nwankwo',
    role: 'Homeowner',
    text: 'Building our dream home with Dwell Chronicles was the best decision we made. From architectural design to final construction, every detail was handled with excellence. We couldn\'t be happier with the result.',
    rating: 5,
    property: 'Custom Villa, Abuja',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
  },
  {
    name: 'Kwame Mensah',
    role: 'Business Owner',
    text: 'The commercial space Dwell Chronicles built for us exceeded all expectations. Their project management team kept everything on schedule and within budget. Highly recommended for any construction project.',
    rating: 5,
    property: 'Office Complex, Accra',
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80',
  },
  {
    name: 'Fatima Abdullahi',
    role: 'Real Estate Developer',
    text: 'As a developer, I\'ve worked with many construction companies. Dwell Chronicles stands out for their transparency, quality craftsmanship, and ability to deliver complex projects on time. They\'re my go-to partner.',
    rating: 5,
    property: 'Mixed-Use Development, Port Harcourt',
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80',
  },
]

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
}

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1)
      setCurrent(index)
    },
    [current]
  )

  const goNext = useCallback(() => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }, [])

  const goPrev = useCallback(() => {
    setDirection(-1)
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    )
  }, [])

  // Auto-advance every 5 seconds
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      goNext()
    }, 5000)

    return () => clearInterval(interval)
  }, [isPaused, goNext])

  const t = testimonials[current]

  return (
    <section className="bg-white py-20 md:py-28 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#2F3A33]">
            What Our Clients Say
          </h2>
          <p className="text-[#6B7A6F] mt-3 max-w-2xl mx-auto text-base md:text-lg">
            Real stories from property owners and investors who trusted Dwell
            Chronicles
          </p>
        </motion.div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Prev / Next Buttons */}
          <button
            onClick={goPrev}
            aria-label="Previous testimonial"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg border border-[#E8E6DF] flex items-center justify-center hover:bg-[#F8F7F3] transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-[#2F3A33]" />
          </button>
          <button
            onClick={goNext}
            aria-label="Next testimonial"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg border border-[#E8E6DF] flex items-center justify-center hover:bg-[#F8F7F3] transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-[#2F3A33]" />
          </button>

          {/* Featured Testimonial Card */}
          <div className="max-w-4xl mx-auto overflow-hidden min-h-[320px] md:min-h-[280px] flex items-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="w-full bg-[#F8F7F3] rounded-3xl p-8 md:p-12 relative"
              >
                {/* Quote Icon */}
                <Quote className="w-12 h-12 text-[#5F8768]/20 absolute top-6 left-8 md:top-8 md:left-12" />

                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-lg md:text-xl text-[#2F3A33] leading-relaxed italic mb-8">
                  &ldquo;{t.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-16 h-16 rounded-full object-cover ring-2 ring-[#5F8768]/20"
                  />
                  <div>
                    <p className="font-semibold text-[#2F3A33]">{t.name}</p>
                    <p className="text-sm text-[#6B7A6F]">{t.role}</p>
                    <p className="text-sm text-[#5F8768]">{t.property}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                aria-label={`Go to testimonial ${idx + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  idx === current
                    ? 'bg-[#5F8768] w-7'
                    : 'bg-[#5F8768]/30 hover:bg-[#5F8768]/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}