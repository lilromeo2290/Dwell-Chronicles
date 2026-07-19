'use client'

import { motion } from 'framer-motion'
import { Search, HardHat, Play, MapPin, ChevronDown } from 'lucide-react'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

const searchBarVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.75 },
  },
}

const bounceAnimation = {
  y: [0, 10, 0],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: 'easeInOut',
  },
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden"
      style={{
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
      <div className="relative z-20 flex min-h-screen flex-col items-center justify-center px-4 py-20 sm:px-6 md:px-8">
        <motion.div
          className="mx-auto flex max-w-5xl flex-col items-center text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Headline */}
          <motion.h1
            className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-7xl"
            variants={fadeUp}
          >
            Find Your Dream Property.
            <br />
            <span className="mt-2 block">Build Your Future.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90 md:mt-8 md:text-xl"
            variants={fadeUp}
          >
            Premium Property Listings, Construction Solutions, Real Estate Insights &
            Investment Opportunities.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row md:mt-12"
            variants={fadeUp}
          >
            <button
              className="group inline-flex items-center gap-2.5 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#2F3A33] shadow-lg shadow-black/10 transition-all duration-300 hover:bg-[#D8D5CC] md:px-8 md:py-4 md:text-base"
              aria-label="Explore Properties"
            >
              <Search className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              Explore Properties
            </button>

            <button
              className="group inline-flex items-center gap-2.5 rounded-xl border-2 border-white px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-white hover:text-[#2F3A33] md:px-8 md:py-4 md:text-base"
              aria-label="Request Construction Quote"
            >
              <HardHat className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              Request Construction Quote
            </button>

            <button
              className="group inline-flex items-center gap-2.5 rounded-xl border-2 border-white px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10 md:px-8 md:py-4 md:text-base"
              aria-label="Watch Our Videos"
            >
              <Play className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              Watch Our Videos
            </button>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            className="mt-14 w-full max-w-5xl md:mt-16"
            variants={searchBarVariants}
          >
            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-xl md:p-6">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {/* Location */}
                <div className="relative">
                  <label
                    htmlFor="hero-location"
                    className="mb-1.5 block text-left text-xs font-medium tracking-wide text-white/70 uppercase"
                  >
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                    <select
                      id="hero-location"
                      defaultValue=""
                      className="w-full appearance-none rounded-xl border border-white/20 bg-white/10 py-3 pl-10 pr-10 text-sm text-white focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/30"
                      aria-label="Select location"
                    >
                      <option value="" disabled className="bg-[#2F3A33] text-white">
                        Any Location
                      </option>
                      <option value="lagos" className="bg-[#2F3A33] text-white">
                        Lagos
                      </option>
                      <option value="abuja" className="bg-[#2F3A33] text-white">
                        Abuja
                      </option>
                      <option value="port-harcourt" className="bg-[#2F3A33] text-white">
                        Port Harcourt
                      </option>
                      <option value="accra" className="bg-[#2F3A33] text-white">
                        Accra
                      </option>
                      <option value="nairobi" className="bg-[#2F3A33] text-white">
                        Nairobi
                      </option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                  </div>
                </div>

                {/* Property Type */}
                <div>
                  <label
                    htmlFor="hero-type"
                    className="mb-1.5 block text-left text-xs font-medium tracking-wide text-white/70 uppercase"
                  >
                    Property Type
                  </label>
                  <div className="relative">
                    <select
                      id="hero-type"
                      defaultValue=""
                      className="w-full appearance-none rounded-xl border border-white/20 bg-white/10 px-4 py-3 pr-10 text-sm text-white focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/30"
                      aria-label="Select property type"
                    >
                      <option value="" disabled className="bg-[#2F3A33] text-white">
                        All Types
                      </option>
                      <option value="detached-house" className="bg-[#2F3A33] text-white">
                        Detached House
                      </option>
                      <option value="apartment" className="bg-[#2F3A33] text-white">
                        Apartment
                      </option>
                      <option value="commercial" className="bg-[#2F3A33] text-white">
                        Commercial
                      </option>
                      <option value="land" className="bg-[#2F3A33] text-white">
                        Land
                      </option>
                      <option value="townhouse" className="bg-[#2F3A33] text-white">
                        Townhouse
                      </option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label
                    htmlFor="hero-price"
                    className="mb-1.5 block text-left text-xs font-medium tracking-wide text-white/70 uppercase"
                  >
                    Price Range
                  </label>
                  <div className="relative">
                    <select
                      id="hero-price"
                      defaultValue=""
                      className="w-full appearance-none rounded-xl border border-white/20 bg-white/10 px-4 py-3 pr-10 text-sm text-white focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/30"
                      aria-label="Select price range"
                    >
                      <option value="" disabled className="bg-[#2F3A33] text-white">
                        Any Price
                      </option>
                      <option value="under-100k" className="bg-[#2F3A33] text-white">
                        Under $100K
                      </option>
                      <option value="100k-250k" className="bg-[#2F3A33] text-white">
                        $100K - $250K
                      </option>
                      <option value="250k-500k" className="bg-[#2F3A33] text-white">
                        $250K - $500K
                      </option>
                      <option value="500k-1m" className="bg-[#2F3A33] text-white">
                        $500K - $1M
                      </option>
                      <option value="over-1m" className="bg-[#2F3A33] text-white">
                        Over $1M
                      </option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                  </div>
                </div>

                {/* Bedrooms */}
                <div>
                  <label
                    htmlFor="hero-bedrooms"
                    className="mb-1.5 block text-left text-xs font-medium tracking-wide text-white/70 uppercase"
                  >
                    Bedrooms
                  </label>
                  <div className="relative">
                    <select
                      id="hero-bedrooms"
                      defaultValue=""
                      className="w-full appearance-none rounded-xl border border-white/20 bg-white/10 px-4 py-3 pr-10 text-sm text-white focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/30"
                      aria-label="Select number of bedrooms"
                    >
                      <option value="" disabled className="bg-[#2F3A33] text-white">
                        Any
                      </option>
                      <option value="1+" className="bg-[#2F3A33] text-white">
                        1+
                      </option>
                      <option value="2+" className="bg-[#2F3A33] text-white">
                        2+
                      </option>
                      <option value="3+" className="bg-[#2F3A33] text-white">
                        3+
                      </option>
                      <option value="4+" className="bg-[#2F3A33] text-white">
                        4+
                      </option>
                      <option value="5+" className="bg-[#2F3A33] text-white">
                        5+
                      </option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                  </div>
                </div>

                {/* Search Button */}
                <div className="flex items-end">
                  <button
                    className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#5F8768] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#5F8768]/25 transition-all duration-300 hover:bg-[#4A6B52] hover:shadow-[#5F8768]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#5F8768] lg:py-3.5"
                    aria-label="Search properties"
                  >
                    <Search className="h-4 w-4" />
                    Search
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Down Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
          animate={bounceAnimation}
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-1">
            <span className="text-xs font-medium tracking-widest text-white/60 uppercase">
              Scroll Down
            </span>
            <ChevronDown className="h-6 w-6 text-white/60" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}