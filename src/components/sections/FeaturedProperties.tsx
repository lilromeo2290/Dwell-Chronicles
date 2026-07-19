'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Heart,
  MapPin,
  Bed,
  Bath,
  Maximize,
  Eye,
  Video,
  Phone,
  MessageCircle,
} from 'lucide-react';

interface Property {
  id: number;
  title: string;
  price: string;
  location: string;
  beds: number;
  baths: number;
  land: string;
  type: string;
  status: string;
  img: string;
}

const properties: Property[] = [
  {
    id: 1,
    title: 'Sage Manor Estate',
    price: 'GH₵ 15,500,000',
    location: 'Lagos, Ikoyi',
    beds: 5,
    baths: 4,
    land: '1,200 sqm',
    type: 'Detached House',
    status: 'For Sale',
    img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80',
  },
  {
    id: 2,
    title: 'The Skyline Penthouse',
    price: 'GH₵ 10,500,000',
    location: 'Abuja, Maitama',
    beds: 4,
    baths: 3,
    land: '450 sqm',
    type: 'Apartment',
    status: 'For Sale',
    img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80',
  },
  {
    id: 3,
    title: 'Harbour View Apartments',
    price: 'GH₵ 4,500/mo',
    location: 'Lagos, Lekki',
    beds: 3,
    baths: 2,
    land: '280 sqm',
    type: 'Apartment',
    status: 'For Rent',
    img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80',
  },
  {
    id: 4,
    title: 'Palm Grove Business Park',
    price: 'GH₵ 35,000,000',
    location: 'Port Harcourt',
    beds: 0,
    baths: 4,
    land: '3,500 sqm',
    type: 'Commercial',
    status: 'For Sale',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80',
  },
  {
    id: 5,
    title: 'Riverside Family Villa',
    price: 'GH₵ 8,400,000',
    location: 'Accra, East Legon',
    beds: 4,
    baths: 3,
    land: '800 sqm',
    type: 'Detached House',
    status: 'For Sale',
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80',
  },
  {
    id: 6,
    title: 'Greenfield Estate Plot',
    price: 'GH₵ 1,500,000',
    location: 'Abuja, Guzape',
    beds: 0,
    baths: 0,
    land: '1,000 sqm',
    type: 'Land',
    status: 'For Sale',
    img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80',
  },
];

const categories = [
  'All',
  'For Sale',
  'For Rent',
  'House',
  'Apartment',
  'Commercial',
  'Land',
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export default function FeaturedProperties() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const filteredProperties = properties.filter((property) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'For Sale') return property.status === 'For Sale';
    if (activeFilter === 'For Rent') return property.status === 'For Rent';
    if (activeFilter === 'House') return property.type === 'Detached House';
    if (activeFilter === 'Apartment') return property.type === 'Apartment';
    if (activeFilter === 'Commercial') return property.type === 'Commercial';
    if (activeFilter === 'Land') return property.type === 'Land';
    return true;
  });

  return (
    <section id="properties" className="bg-[#F8F7F3] py-20 md:py-28 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2F3A33]">
            Featured Properties
          </h2>
          <p className="mt-3 text-[#6B7A6F] max-w-2xl mx-auto">
            Handpicked premium properties matching your lifestyle and investment
            goals
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
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
        </div>

        {/* Property Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          key={activeFilter}
        >
          {filteredProperties.map((property) => (
            <motion.div
              key={property.id}
              variants={cardVariants}
              className="property-card rounded-2xl overflow-hidden bg-white shadow-sm"
            >
              {/* Image Section */}
              <div className="relative h-56">
                <img
                  src={property.img}
                  alt={property.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Status Badge */}
                <span
                  className={`absolute top-3 left-3 text-white text-xs font-medium px-3 py-1 rounded-full ${
                    property.status === 'For Sale'
                      ? 'bg-[#5F8768]'
                      : 'bg-amber-500'
                  }`}
                >
                  {property.status}
                </span>
                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(property.id)}
                  className="absolute top-3 right-3 bg-white/90 rounded-full p-2 hover:bg-red-50 transition-colors cursor-pointer"
                  aria-label={
                    favorites.has(property.id)
                      ? 'Remove from favorites'
                      : 'Add to favorites'
                  }
                >
                  <Heart
                    className={`w-4 h-4 ${
                      favorites.has(property.id)
                        ? 'fill-red-500 text-red-500'
                        : 'text-[#2F3A33]'
                    }`}
                  />
                </button>
              </div>

              {/* Card Content */}
              <div className="p-5">
                {/* Price */}
                <p className="text-2xl font-bold text-[#5F8768]">
                  {property.price}
                </p>

                {/* Title */}
                <h3 className="text-lg font-semibold text-[#2F3A33] mt-1">
                  {property.title}
                </h3>

                {/* Location */}
                <div className="flex items-center gap-1.5 mt-2">
                  <MapPin className="w-4 h-4 text-[#6B7A6F] shrink-0" />
                  <span className="text-sm text-[#6B7A6F]">
                    {property.location}
                  </span>
                </div>

                {/* Stats Row */}
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-[#E5E3DC]">
                  {property.beds > 0 && (
                    <div className="flex items-center gap-1.5">
                      <Bed className="w-4 h-4 text-[#6B7A6F]" />
                      <span className="text-sm text-[#6B7A6F]">
                        {property.beds} Beds
                      </span>
                    </div>
                  )}
                  {property.beds > 0 && property.baths > 0 && (
                    <div className="w-px h-4 bg-[#E5E3DC]" />
                  )}
                  {property.baths > 0 && (
                    <div className="flex items-center gap-1.5">
                      <Bath className="w-4 h-4 text-[#6B7A6F]" />
                      <span className="text-sm text-[#6B7A6F]">
                        {property.baths} Baths
                      </span>
                    </div>
                  )}
                  {(property.beds > 0 || property.baths > 0) && (
                    <div className="w-px h-4 bg-[#E5E3DC]" />
                  )}
                  <div className="flex items-center gap-1.5">
                    <Maximize className="w-4 h-4 text-[#6B7A6F]" />
                    <span className="text-sm text-[#6B7A6F]">
                      {property.land}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 mt-5">
                  <button className="flex-1 bg-[#5F8768] text-white text-sm font-medium rounded-xl px-4 py-2 hover:bg-[#4A6B52] transition-colors flex items-center justify-center gap-1.5 cursor-pointer">
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                  <button className="flex items-center gap-1.5 border border-[#E5E3DC] rounded-xl px-3 py-2 text-sm text-[#2F3A33] hover:border-[#5F8768] transition-colors cursor-pointer">
                    <Video className="w-4 h-4" />
                    <span className="hidden sm:inline">Virtual Tour</span>
                  </button>
                  <button
                    className="p-2 rounded-xl border border-[#E5E3DC] text-[#2F3A33] hover:border-[#25D366] hover:text-[#25D366] transition-colors cursor-pointer"
                    aria-label="Contact on WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </button>
                  <button
                    className="p-2 rounded-xl border border-[#E5E3DC] text-[#2F3A33] hover:border-[#5F8768] hover:text-[#5F8768] transition-colors cursor-pointer"
                    aria-label="Call agent"
                  >
                    <Phone className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="border-2 border-[#5F8768] text-[#5F8768] hover:bg-[#5F8768] hover:text-white rounded-xl px-8 py-3 font-medium transition-all cursor-pointer">
            View All Properties
          </button>
        </div>
      </div>
    </section>
  );
}