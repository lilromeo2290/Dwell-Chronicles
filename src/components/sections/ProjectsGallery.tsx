'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin } from 'lucide-react';

interface Project {
  title: string;
  category: string;
  location: string;
  img: string;
  height: string;
}

const projects: Project[] = [
  { title: "Sage Valley Estate", category: "Houses", location: "Lagos", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80", height: "h-72" },
  { title: "The Horizon Tower", category: "Apartments", location: "Abuja", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80", height: "h-96" },
  { title: "Marina Business Complex", category: "Commercial", location: "Lagos", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80", height: "h-64" },
  { title: "Serenity Hotel & Suites", category: "Hospitality", location: "Accra", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80", height: "h-80" },
  { title: "Greenspring Academy", category: "Education", location: "Nairobi", img: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=80", height: "h-72" },
  { title: "Lakeside Villas Phase 2", category: "Houses", location: "Accra", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80", height: "h-96" },
  { title: "City Mall Expansion", category: "Commercial", location: "Lagos", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80", height: "h-64" },
  { title: "The Residence Towers", category: "Apartments", location: "Port Harcourt", img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80", height: "h-80" },
  { title: "Hope Medical Center", category: "Healthcare", location: "Abuja", img: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=600&q=80", height: "h-72" },
];

const categories = [
  'All',
  'Houses',
  'Apartments',
  'Commercial',
  'Hospitality',
  'Education',
  'Healthcare',
];

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
};

const filtersVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.2, ease: [0.4, 0, 0.2, 1] },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
  },
};

export default function ProjectsGallery() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'All') return true;
    return project.category === activeFilter;
  });

  return (
    <section id="projects" className="bg-[#F8F7F3] py-20 md:py-28 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-10"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#2F3A33]">
            Latest Projects
          </h2>
          <p className="mt-3 text-[#6B7A6F] text-center max-w-2xl mx-auto">
            Explore our portfolio of completed and ongoing developments across Africa
          </p>
        </motion.div>

        {/* Category Filter Tabs */}
        <motion.div
          className="flex flex-wrap gap-3 justify-center mb-10"
          variants={filtersVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                activeFilter === category
                  ? 'bg-[#5F8768] text-white'
                  : 'bg-white border border-[#E5E3DC] text-[#2F3A33] hover:border-[#5F8768]'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                exit="exit"
                viewport={{ once: true, margin: '-30px' }}
                transition={{ delay: index * 0.05 }}
                className="project-item relative rounded-2xl overflow-hidden cursor-pointer group break-inside-avoid"
              >
                <img
                  src={project.img}
                  alt={project.title}
                  loading="lazy"
                  className={`w-full ${project.height} object-cover transition-transform duration-500`}
                />
                <div className="project-overlay absolute inset-0 bg-gradient-to-t from-[#2F3A33]/90 via-[#2F3A33]/30 to-transparent opacity-0 transition-opacity duration-300" />
                <div className="project-overlay absolute inset-0 opacity-0 transition-opacity duration-300 flex items-end p-6">
                  <div className="space-y-2">
                    <h3 className="text-white font-semibold text-lg">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-white/80" />
                      <span className="text-white/80 text-sm">
                        {project.location}
                      </span>
                    </div>
                    <p className="text-white text-sm font-medium pt-1">
                      View Project →
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}