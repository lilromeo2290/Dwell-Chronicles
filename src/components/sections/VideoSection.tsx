'use client';

import { motion } from 'framer-motion';
import {
  Play,
  Eye,
  Calendar,
  Youtube,
  ArrowRight,
} from 'lucide-react';

interface VideoItem {
  title: string;
  duration: string;
  views: string;
  date: string;
  img: string;
}

const featuredVideo: VideoItem = {
  title: 'Complete Luxury Home Tour — Sage Valley Estate',
  duration: '24:15',
  views: '45K views',
  date: 'Jul 12, 2026',
  img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
};

const videoList: VideoItem[] = [
  {
    title: '5 Tips for First-Time Property Investors',
    duration: '12:30',
    views: '24K views',
    date: '2 weeks ago',
    img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&q=80',
  },
  {
    title: 'Behind the Scenes: Building a Modern Villa',
    duration: '18:45',
    views: '18K views',
    date: '1 month ago',
    img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80',
  },
  {
    title: 'Commercial Real Estate Market Analysis 2026',
    duration: '15:20',
    views: '31K views',
    date: '3 weeks ago',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80',
  },
  {
    title: 'Interior Design Trends for Luxury Homes',
    duration: '10:55',
    views: '15K views',
    date: '1 week ago',
    img: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=400&q=80',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

export default function VideoSection() {
  return (
    <section id="videos" className="bg-[#F8F7F3] py-20 md:py-28 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#2F3A33]">
            Video Gallery
          </h2>
          <p className="mt-3 text-[#6B7A6F] max-w-2xl mx-auto">
            Property tours, construction insights, and expert advice from our
            YouTube channel
          </p>
        </motion.div>

        {/* Featured + List Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Featured Video */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="property-card rounded-2xl overflow-hidden relative aspect-video bg-[#2F3A33] group cursor-pointer">
              {/* Thumbnail */}
              <img
                src={featuredVideo.img}
                alt={featuredVideo.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />

              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-8 h-8 md:w-10 md:h-10 text-white fill-white ml-1" />
                </div>
              </div>

              {/* Duration Badge */}
              <span className="absolute bottom-16 right-4 bg-black/70 text-white text-xs font-medium px-2.5 py-1 rounded-md">
                {featuredVideo.duration}
              </span>

              {/* Title & Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <h3 className="text-white text-lg md:text-xl font-semibold leading-tight">
                  {featuredVideo.title}
                </h3>
                <div className="flex items-center gap-4 mt-2 text-white/80 text-xs">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    {featuredVideo.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {featuredVideo.date}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Video List */}
          <motion.div
            className="lg:col-span-2 flex flex-col gap-3 max-h-[520px] overflow-y-auto pr-1"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {videoList.map((video, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex gap-4 p-3 rounded-xl hover:bg-white transition-colors cursor-pointer group"
              >
                {/* Thumbnail */}
                <div className="w-40 h-24 rounded-lg overflow-hidden relative shrink-0 bg-[#2F3A33]">
                  <img
                    src={video.img}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Play Icon Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Play className="w-3.5 h-3.5 text-white fill-white ml-0.5" />
                    </div>
                  </div>
                  {/* Duration Badge */}
                  <span className="absolute bottom-1.5 right-1.5 bg-black/70 text-white text-[10px] font-medium px-1.5 py-0.5 rounded">
                    {video.duration}
                  </span>
                </div>

                {/* Info */}
                <div className="flex flex-col justify-center min-w-0">
                  <h4 className="font-medium text-sm text-[#2F3A33] line-clamp-2 group-hover:text-[#5F8768] transition-colors">
                    {video.title}
                  </h4>
                  <div className="flex items-center gap-3 mt-2 text-xs text-[#6B7A6F]">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {video.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {video.date}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Visit YouTube Button */}
        <div className="text-center mt-12">
          <button className="border-2 border-[#5F8768] text-[#5F8768] hover:bg-[#5F8768] hover:text-white rounded-xl px-8 py-3 font-medium transition-all cursor-pointer flex items-center gap-2 mx-auto">
            <Youtube className="w-5 h-5" />
            Visit Our YouTube Channel
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}