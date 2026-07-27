'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  Share2,
  Bookmark,
  ArrowRight,
  X,
  MapPin,
} from 'lucide-react';

interface BlogArticle {
  title: string;
  category: string;
  readTime: string;
  date: string;
  img: string;
  excerpt: string;
  content?: string;
  images?: string[];
}

const articles: BlogArticle[] = [
  {
    title: 'Why Ho, Volta Region is Ghana\'s Next Big Real Estate Hotspot',
    category: 'Real Estate',
    readTime: '7 min read',
    date: 'Jul 27, 2026',
    img: '/blog-ho1.jpg',
    excerpt:
      'Discover why Ho is fast becoming Ghana\'s hidden gem for real estate investment, from affordable land to booming commercial opportunities.',
    images: ['/blog-ho1.jpg', '/blog-ho2.jpg'],
    content: [
      'Imagine this: You are driving through a serene town nestled between lush green hills and stunning landscapes, where the air is fresh, the roads are less crowded, and opportunities are ripe. This is not a far-off dream. This is Ho, the capital of the Volta Region, and it is fast becoming Ghana\'s hidden gem for real estate investment. Ho could be your ticket to growth and long-term value if you are a first-time home builder, investor or someone from the diaspora looking for a place to invest or settle.',
      'Why Ho? Why Now?',
      'For many years, the spotlight has been on Accra, Kumasi, and Takoradi as Ghana\'s real estate hubs. But here is the thing: Now a metropolis, Ho is quietly transforming. As more people realize the untapped potential of this charming city, it is becoming a hotspot for both residential and commercial real estate.',
      'Ho has evolved into a metropolitan city with everything from quality education to healthcare and leisure spots. The local economy is thriving with new businesses, shopping centres, restaurants, and even an airport which is to be transformed into a pilot training school. With a mix of modern amenities and natural beauty, it is no wonder people from the diaspora are eyeing Ho for real estate opportunities.',
      'A Buyer\'s Market: Affordability Meets Opportunity',
      'Compared to Accra, where property prices are skyrocketing, Ho offers a more affordable alternative without compromising on growth potential. Whether you are looking to build a first home or set up a commercial property, the cost of land and development is significantly lower. For first-time home builders, this is a golden opportunity. You can stretch your budget further in Ho, allowing you to invest in higher-quality materials or build a larger home without breaking the bank.',
      'Moreover, Ho has a relatively lower cost of living compared to Accra making it attractive to people looking for a peaceful, affordable place to live while still maintaining easy access to major urban areas.',
      'Why African Americans and Expats Should Choose Ho Over Accra',
      'For African Americans and expats considering relocating to Ghana, the question often revolves around where to invest, whether in Accra or elsewhere. While Accra\'s appeal as the nation\'s capital is undeniable, Ho presents a compelling alternative, particularly for those seeking a more easy-going and authentic lifestyle.',
      'In Ho, you are not just buying property; you are investing in a quieter, natural and more culturally immersive experience. The town offers a slower pace of life that many expats find appealing. Unlike Accra, where the hustle and bustle can sometimes feel overwhelming, Ho gives you the space to breathe, reflect, and truly integrate into the Ghanaian way of life. Additionally, Ho\'s emerging infrastructure, combined with its relatively untapped market, means you are getting in early, potentially reaping greater returns as the area develops.',
      'The town is also more community-focused, allowing you to connect with locals and be part of a tight-knit environment. This sense of community makes it easier for expats to adjust and feel at home, which is something Accra cannot always offer with its fast-paced urban culture.',
      'Growing Appeal for the Diaspora',
      'For Ghanaians in the diaspora, there is always that dream of returning home, investing in property, and reconnecting with your roots. Ho offers a unique blend of tranquillity, culture, and development, making it an ideal place to consider. The influx of people returning home from abroad has led to a growing demand for modern homes and apartments, creating a thriving real estate market that is still in its early stages of growth.',
      'More importantly, the community in Ho is welcoming and tightly knit, giving you a real sense of belonging. It is the perfect environment to raise a family, build a retirement home, or set up a business that taps into both local and international markets.',
      'Ho is Booming: Commercial and Residential Growth',
      'What makes Ho even more attractive is the balance between residential and commercial investment opportunities. From cozy three-bedroom homes to luxury apartments, the options are diverse for people at all stages of life. The presence of universities, like the Ho Technical University, University of Health and Allied Sciences, ensures a steady demand for rental properties from students and staff.',
      'On the commercial side, Ho is experiencing a boom in hospitality, retail, and services, making it a prime location for businesses. Imagine owning a piece of prime commercial real estate in a town where the demand is growing, but competition is still relatively low compared to Accra.',
      'The Future is Bright',
      'With ongoing infrastructure projects, such as road developments and the construction of more modern amenities, the value of properties in Ho is set to increase. Real estate in Ho is more than just an investment for today, it is a long-term growth opportunity that could yield significant returns in the coming years.',
      'Ready to Invest in Ho?',
      'Whether you are a first-time home builder or a seasoned real estate investor in the diaspora or home, now is the perfect time to explore Ho\'s growing real estate market. You do not have to navigate this journey alone. Let us help you find the perfect property, guide you through the legal processes, and ensure you make the best investment decisions.',
      'Contact Dwell Chronicles for expert consultation and support in finding your dream property in Ho. Our team understands the market dynamics and can offer you the personalized advice you need to make your investment a success.',
      'Reach out today via info@dwellchroniclesgh.com or on WhatsApp +233204700023, and let us turn your real estate dreams into reality!',
    ].join('\n\n'),
  },
];

const categories = [
  'All',
  'Real Estate',
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

function BlogModal({ article, onClose }: { article: BlogArticle; onClose: () => void }) {
  const paragraphs = (article.content || '').split('\n\n').filter((p) => p.trim().length > 0);
  const isHeading = (p: string) => {
    const trimmed = p.trim();
    return trimmed.length < 80 && !trimmed.includes('.') && !trimmed.includes(',');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-gray-800 p-4 pt-10 pb-10"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-3xl bg-white rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 hover:bg-gray-50 transition-colors cursor-pointer shadow-sm"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-[#2F3A33]" />
        </button>

        {/* Hero Image */}
        {article.images && article.images.length > 0 && (
          <div className="relative h-64 md:h-80">
            <img
              src={article.images[0]}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-700 to-transparent" />
            <div className="absolute bottom-4 left-6 right-16">
              <span className="inline-block bg-[#5F8768] text-white text-xs font-medium px-3 py-1 rounded-full mb-2">
                {article.category}
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-white leading-snug">
                {article.title}
              </h2>
            </div>
          </div>
        )}

        {/* Article Body */}
        <div className="p-6 md:p-8">
          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-[#6B7A6F] mb-6 pb-4 border-b border-[#E5E3DC]">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {article.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {article.readTime}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              Ho, Volta Region
            </span>
          </div>

          {/* Content paragraphs */}
          <div className="prose prose-lg max-w-none">
            {paragraphs.map((p, i) => {
              if (isHeading(p)) {
                return (
                  <h3 key={i} className="text-xl font-bold text-[#2F3A33] mt-8 mb-3">
                    {p.trim()}
                  </h3>
                );
              }
              return (
                <p key={i} className="text-[#2F3A33] leading-relaxed mb-4 text-[15px]">
                  {p.trim()}
                </p>
              );
            })}
          </div>

          {/* Second image */}
          {article.images && article.images.length > 1 && (
            <div className="mt-8 rounded-xl overflow-hidden">
              <img
                src={article.images[1]}
                alt="Ho Volta Region landscape"
                className="w-full h-56 md:h-72 object-cover"
              />
              <p className="text-xs text-[#6B7A6F] mt-2 italic">Scenic views of Ho, Volta Region</p>
            </div>
          )}

          {/* CTA Footer */}
          <div className="mt-8 p-6 rounded-xl bg-[#F8F7F3] border border-[#E5E3DC]">
            <p className="text-sm font-semibold text-[#2F3A33] mb-2">Ready to invest in Ho?</p>
            <p className="text-sm text-[#6B7A6F] mb-3">
              Contact Dwell Chronicles for expert consultation and support in finding your dream property in Ho.
            </p>
            <a
              href="https://wa.me/233204700023"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#5F8768] text-white text-sm font-medium rounded-xl px-5 py-2.5 hover:bg-[#4A6B52] transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const badgeClass = (active: boolean) =>
  active
    ? 'px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer bg-[#5F8768] text-white'
    : 'px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer bg-[#F8F7F3] border border-[#E5E3DC] text-[#2F3A33] hover:border-[#5F8768]';

export default function BlogSection() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [bookmarked, setBookmarked] = useState<Set<number>>(new Set());
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);

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
            Stay informed with the latest in real estate Ghana, property investment, and building construction insights
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={badgeClass(activeFilter === category)}
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
              key={activeFilter + '-' + index}
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
                <span className="inline-block bg-green-100 text-[#5F8768] text-xs font-medium px-3 py-1 rounded-full">
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
                        className={bookmarked.has(index) ? 'w-4 h-4 fill-[#5F8768] text-[#5F8768]' : 'w-4 h-4'}
                      />
                    </button>
                  </div>
                </div>

                {/* Read Article Link */}
                {article.content ? (
                  <button
                    onClick={() => setSelectedArticle(article)}
                    className="inline-flex items-center gap-1 text-[#5F8768] font-medium text-sm mt-3 hover:gap-2 transition-all cursor-pointer"
                  >
                    Read Article
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <a
                    href="#"
                    className="inline-flex items-center gap-1 text-[#5F8768] font-medium text-sm mt-3 hover:gap-2 transition-all"
                  >
                    Coming Soon
                    <ArrowRight className="w-4 h-4" />
                  </a>
                )}
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

      {/* Blog Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <BlogModal
            article={selectedArticle}
            onClose={() => setSelectedArticle(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
