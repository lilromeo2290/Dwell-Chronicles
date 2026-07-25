'use client'

import { motion } from 'framer-motion'
import {
  Search,
  ChevronDown,
  BedDouble,
  LandPlot,
  Tag,
  CalendarCheck,
  HeadphonesIcon,
  ArrowRight,
} from 'lucide-react'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const bounceAnimation = {
  y: [0, 8, 0],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: 'easeInOut',
  },
}

const actions = [
  {
    label: 'Search Properties',
    description: 'Find property in Ghana',
    icon: Search,
    href: '#properties',
    color: 'from-[#5F8768] to-[#4A6B52]',
  },
  {
    label: 'Executive Rooms',
    description: 'Apartments for rent',
    icon: BedDouble,
    href: '/airbnb',
    color: 'from-[#2F3A33] to-[#1a231d]',
  },
  {
    label: 'Buy Land',
    description: 'Lands for sale in Ghana',
    icon: LandPlot,
    href: '#contact',
    color: 'from-[#8B7355] to-[#6B5740]',
  },
  {
    label: 'Sell Property',
    description: 'Sell property in Ghana',
    icon: Tag,
    href: '#contact',
    color: 'from-[#5F7687] to-[#4A5E6B]',
  },
  {
    label: 'Book Inspection',
    description: 'Schedule a visit',
    icon: CalendarCheck,
    href: '#contact',
    color: 'from-[#87655F] to-[#6B4E4A]',
  },
  {
    label: 'Contact an Agent',
    description: 'Speak to us now',
    icon: HeadphonesIcon,
    href: '#contact',
    color: 'from-[#6B5F87] to-[#554A6B]',
  },
]

export default function Hero() {
  const handleClick = (href: string) => {
    if (href.startsWith('#')) {
      const el = document.querySelector(href)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.location.href = href
  }

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden"
      style={{
        minHeight: '100dvh',
        backgroundImage:
          'url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark gradient overlay */}
      <div className="hero-overlay absolute inset-0 z-10" />

      {/* Content */}
      <div className="relative z-20 flex min-h-[100dvh] flex-col items-center justify-center px-4 py-20 sm:px-6 md:px-8">
        <motion.div
          className="mx-auto flex max-w-6xl flex-col items-center text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={fadeUp} className="mb-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-white/90 uppercase backdrop-blur-sm">
              <span className="inline-block h-2 w-2 rounded-full bg-[#5F8768] animate-pulse" />
              Your Trusted Real Estate Partner in Ghana
            </span>
          </motion.div>

          {/* Headline — SEO-optimized H1 */}
          <motion.h1
            className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
            variants={fadeUp}
          >
            Property Listings and Real Estate Services in Ghana
          </motion.h1>

          {/* Subtitle — shorter */}
          <motion.p
            className="mt-4 max-w-xl text-base leading-relaxed text-white/80 md:mt-5 md:text-lg"
            variants={fadeUp}
          >
            Discover property in Ghana — from apartments for rent to lands for sale. Dwell Chronicles Ghana is your trusted partner for real estate, building construction, and property management.
          </motion.p>

          {/* ── Quick Action Grid ─────────────────────────── */}
          <motion.div
            className="mt-8 w-full max-w-5xl md:mt-10"
            variants={fadeUp}
          >
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
              {actions.map((action) => {
                const Icon = action.icon
                return (
                  <button
                    key={action.label}
                    onClick={() => handleClick(action.href)}
                    className="group relative flex flex-col items-center gap-2.5 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/20 hover:shadow-xl hover:shadow-black/20 sm:p-5"
                  >
                    {/* Icon circle */}
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${action.color} shadow-lg transition-transform duration-300 group-hover:scale-110 sm:h-14 sm:w-14`}
                    >
                      <Icon className="h-5 w-5 text-white sm:h-6 sm:w-6" />
                    </div>
                    {/* Label */}
                    <span className="text-sm font-semibold text-white sm:text-base">
                      {action.label}
                    </span>
                    {/* Sub-label */}
                    <span className="text-[11px] text-white/60 sm:text-xs">
                      {action.description}
                    </span>
                    {/* Hover arrow */}
                    <ArrowRight className="absolute right-3 top-3 h-3.5 w-3.5 text-white/0 transition-all duration-300 group-hover:text-white/70 sm:right-3 sm:top-3" />
                  </button>
                )
              })}
            </div>
          </motion.div>

          {/* Bottom CTA bar */}
          <motion.div
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:gap-4 md:mt-10"
            variants={fadeUp}
          >
            <button
              onClick={() => handleClick('#properties')}
              className="flex items-center gap-2 rounded-xl bg-[#5F8768] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-[#5F8768]/25 transition-all duration-300 hover:bg-[#4A6B52] hover:shadow-[#5F8768]/40"
            >
              <Search className="h-4 w-4" />
              Browse All Properties
            </button>
            <button
              onClick={() => handleClick('/airbnb')}
              className="flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-7 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:border-white/40"
            >
              <BedDouble className="h-4 w-4" />
              Book Airbnb Stay
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Down Indicator */}
        <motion.div
          className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2"
          animate={bounceAnimation}
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] font-medium tracking-widest text-white/50 uppercase">
              Scroll
            </span>
            <ChevronDown className="h-5 w-5 text-white/50" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
