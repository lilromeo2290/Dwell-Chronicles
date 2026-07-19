'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  Share2,
  Bookmark,
  ArrowRight,
} from 'lucide-react';

interface BlogArticle {
  title: string;
  category: string;
  readTime: string;
  date: string;
  img: string;
  excerpt: string;
}

const articles: BlogArticle[] = [
  {
    title: 'Top 10 Investment Hotspots in West Africa 2026',
    category: 'Investment',
    readTime: '8 min read',
    date: 'Jul 15, 2026',
    img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80',
    excerpt:
      'Discover the most promising locations for property investment with the highest projected returns across the region.',
  },
  {
    title: 'Sustainable Building Materials for Modern Homes',
    category: 'Construction Tips',
    readTime: '6 min read',
    date: 'Jul 10, 2026',
    img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
    excerpt:
      'Explore eco-friendly materials that reduce costs and environmental impact without compromising quality.',
  },
  {
    title: 'Property Market Forecast: What to Expect',
    category: 'Market News',
    readTime: '10 min read',
    date: 'Jul 5, 2026',
    img: 'https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?w=600&q=80',
    excerpt:
      'Expert analysis of property market trends, pricing forecasts, and economic factors shaping real estate.',
  },
  {
    title: 'Complete Guide to Home Renovation',
    category: 'Home Improvement',
    readTime: '12 min read',
    date: 'Jun 28, 2026',
    img: 'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=600&q=80',
    excerpt:
      'Everything you need to know about planning, budgeting, and executing a successful home renovation.',
  },
  {
    title: "First-Time Home Buyer's Essential Checklist",
    category: 'Buying Guides',
    readTime: '7 min read',
    date: 'Jun 22, 2026',
    img: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=600&q=80',
    excerpt:
      'A comprehensive checklist to guide first-time buyers through the entire property purchase process.',
  },
  {
    title: "How to Maximize Your Property's Selling Price",
    category: 'Selling Guides',
    readTime: '9 min read',
    date: 'Jun 15, 2026',
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80',
    excerpt:
      'Proven strategies and expert tips to increase your property value and attract serious buyers.',
  },
];

const categories = [
  'All',
  'Investment',
  'Construction Tips',
  'Market News',
  'Home Improvement',
  'Buying Guides',
  'Selling Guides',
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

export default function BlogSection() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [bookmarked, setBookmarked] = useState<Set<number>>(new Set());

  const toggleBookmark = (index: number) => {
    setBookmarked((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const filteredArticles = articles.filter((article) => {
    if (activeFilter === 'All') return true;
    return article.category === activeFilter;
  });

  return (
    <section id="blog" className="bg-white py-20 md:py-28 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2F3A33]">
            Insights &amp; Articles
          </h2>
          <p className="mt-3 text-[#6B7A6F] max-w-2xl mx-auto">
            Stay informed with the latest in real estate, construction, and
            property investment
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                activeFilter === category
                  ? 'bg-[#5F8768] text-white'
                  : 'bg-[#F8F7F3] border border-[#E5E3DC] text-[#2F3A33] hover:border-[#5F8768]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          key={activeFilter}
        >
          {filteredArticles.map((article, index) => (
            <motion.div
              key={`${activeFilter}-${index}`}
              variants={cardVariants}
              className="property-card rounded-2xl overflow-hidden bg-[#F8F7F3]"
            >
              {/* Image */}
              <div className="h-48 overflow-hidden">
                <img
                  src={article.img}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Category Badge */}
                <span className="inline-block bg-[#5F8768]/10 text-[#5F8768] text-xs font-medium px-3 py-1 rounded-full">
                  {article.category}
                </span>

                {/* Title */}
                <h3 className="text-lg font-semibold text-[#2F3A33] mt-3 mb-2 line-clamp-2">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-[#6B7A6F] mb-4 line-clamp-2">
                  {article.excerpt}
                </p>

                {/* Footer */}
                <div className="flex justify-between items-center text-xs text-[#6B7A6F]">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {article.readTime}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="p-1.5 rounded-lg hover:bg-white transition-colors cursor-pointer"
                      aria-label="Share article"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toggleBookmark(index)}
                      className="p-1.5 rounded-lg hover:bg-white transition-colors cursor-pointer"
                      aria-label="Bookmark article"
                    >
                      <Bookmark
                        className={`w-4 h-4 ${
                          bookmarked.has(index)
                            ? 'fill-[#5F8768] text-[#5F8768]'
                            : ''
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Read Article Link */}
                <a
                  href="#"
                  className="inline-flex items-center gap-1 text-[#5F8768] font-medium text-sm mt-3 hover:gap-2 transition-all"
                >
                  Read Article
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="border-2 border-[#5F8768] text-[#5F8768] hover:bg-[#5F8768] hover:text-white rounded-xl px-8 py-3 font-medium transition-all cursor-pointer flex items-center gap-2 mx-auto">
            View All Articles
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}