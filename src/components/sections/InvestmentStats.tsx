'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Shield, Lock, DollarSign, Users, Award } from 'lucide-react'

const trustItems = [
  {
    icon: TrendingUp,
    title: 'High ROI Properties',
    desc: 'Properties with proven returns averaging 15-25% annually',
  },
  {
    icon: Shield,
    title: 'Trusted Experts',
    desc: 'Over 15 years of construction and real estate excellence',
  },
  {
    icon: Lock,
    title: 'Secure Transactions',
    desc: 'Fully verified and legally compliant property deals',
  },
  {
    icon: DollarSign,
    title: 'Transparent Pricing',
    desc: 'No hidden costs with detailed breakdowns provided',
  },
  {
    icon: Users,
    title: 'Professional Support',
    desc: 'Dedicated agents and consultants at every step',
  },
]

const stats = [
  { value: 500, suffix: '+', label: 'Properties Sold' },
  { value: 120, suffix: '+', label: 'Projects Completed' },
  { value: 2000, suffix: '+', label: 'Happy Clients' },
  { value: 15, suffix: '+', label: 'Cities Covered' },
  { value: 15, suffix: '+', label: 'Years Experience' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
]

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

function AnimatedCounter({
  value,
  suffix,
  label,
  shouldAnimate,
}: {
  value: number
  suffix: string
  label: string
  shouldAnimate: boolean
}) {
  const [count, setCount] = useState(0)
  const animatedRef = useRef(false)

  useEffect(() => {
    if (!shouldAnimate || animatedRef.current) return
    animatedRef.current = true

    const duration = 2000
    const startTime = performance.now()

    function step(currentTime: number) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutCubic(progress)
      setCount(Math.floor(easedProgress * value))

      if (progress < 1) {
        requestAnimationFrame(step)
      } else {
        setCount(value)
      }
    }

    requestAnimationFrame(step)
  }, [shouldAnimate, value])

  return (
    <div className="text-center">
      <span className="text-4xl md:text-5xl font-bold text-[#7BA384]">
        {count}
        {suffix}
      </span>
      <p className="text-white/70 text-sm mt-1">{label}</p>
    </div>
  )
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

const statItemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export default function InvestmentStats() {
  const statsRef = useRef<HTMLDivElement>(null)
  const [statsVisible, setStatsVisible] = useState(false)

  useEffect(() => {
    const el = statsRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <section className="bg-[#2F3A33] text-white py-20 md:py-28 px-4 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute w-96 h-96 rounded-full bg-[#5F8768]/10 -top-48 -right-48 pointer-events-none" />
      <div className="absolute w-96 h-96 rounded-full bg-[#5F8768]/5 bottom-0 -left-48 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Why Invest With Us */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          Why Invest With Us
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          {trustItems.map((item) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                variants={itemVariants}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-[#5F8768]/20 flex items-center justify-center mx-auto mb-3">
                  <Icon className="text-[#7BA384] text-2xl" />
                </div>
                <h3 className="text-white font-semibold text-sm">{item.title}</h3>
                <p className="text-white/60 text-xs mt-1">{item.desc}</p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Track Record Stats */}
        <div ref={statsRef} className="mt-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-bold text-center mb-10"
          >
            Our Track Record
          </motion.h3>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
          >
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={statItemVariants}>
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  shouldAnimate={statsVisible}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}