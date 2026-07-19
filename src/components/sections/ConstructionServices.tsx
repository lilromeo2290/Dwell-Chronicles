'use client';

import { motion } from 'framer-motion';
import {
  Home,
  Building2,
  Paintbrush,
  Compass,
  ClipboardList,
  Ruler,
  Calculator,
  Lamp,
  Trees,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Service {
  icon: LucideIcon;
  title: string;
  desc: string;
}

const services: Service[] = [
  {
    icon: Home,
    title: 'Residential Construction',
    desc: 'Custom-built homes designed to match your vision, from luxury villas to modern family residences with premium finishes.',
  },
  {
    icon: Building2,
    title: 'Commercial Construction',
    desc: 'State-of-the-art commercial spaces including offices, retail centers, and mixed-use developments built for success.',
  },
  {
    icon: Paintbrush,
    title: 'Renovations',
    desc: 'Transform existing spaces with expert renovation services that breathe new life into your property.',
  },
  {
    icon: Compass,
    title: 'Architectural Design',
    desc: 'Innovative architectural solutions combining aesthetics, functionality, and sustainability for timeless designs.',
  },
  {
    icon: ClipboardList,
    title: 'Project Management',
    desc: 'End-to-end project management ensuring your construction project stays on time, on budget, and on quality.',
  },
  {
    icon: Ruler,
    title: 'Civil Engineering',
    desc: 'Comprehensive civil engineering services for infrastructure, drainage, road construction, and site development.',
  },
  {
    icon: Calculator,
    title: 'Quantity Surveying',
    desc: 'Accurate cost estimation, budget management, and material procurement for optimal resource allocation.',
  },
  {
    icon: Lamp,
    title: 'Interior Design',
    desc: 'Luxury interior design services creating beautiful, functional spaces that reflect your personality and style.',
  },
  {
    icon: Trees,
    title: 'Property Development',
    desc: 'Strategic property development from land acquisition through to completed, market-ready properties.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export default function ConstructionServices() {
  return (
    <section id="construction" className="bg-white py-20 md:py-28 px-4">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center md:mb-16"
        >
          <h2 className="text-3xl font-bold text-[#2F3A33] md:text-4xl">
            Our Construction Services
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[#6B7A6F]">
            From concept to completion, we deliver excellence in every project
          </p>
        </motion.div>

        {/* Service Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                className="service-card rounded-2xl bg-[#F8F7F3] p-6 md:p-8"
              >
                {/* Icon */}
                <div className="service-icon mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-white text-2xl text-[#5F8768] shadow-sm transition-colors">
                  <Icon strokeWidth={1.8} size={28} />
                </div>

                {/* Title */}
                <h3 className="mb-3 text-lg font-semibold text-[#2F3A33]">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="mb-5 text-sm leading-relaxed text-[#6B7A6F]">
                  {service.desc}
                </p>

                {/* Learn More Link */}
                <a
                  href="#"
                  className="text-sm font-medium text-[#5F8768] transition-colors hover:underline"
                >
                  Learn More &rarr;
                </a>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}