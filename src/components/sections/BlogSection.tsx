'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  Bookmark,
  ArrowRight,
  X,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Link as LinkIcon,
  Copy,
  Check,
} from 'lucide-react';
import { articles, getArticleUrl, type BlogArticle } from '@/data/articles';

const categories = [
  'All',
  'Real Estate',
  'Building Tips',
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

function ShareButtons({ article }: { article: BlogArticle }) {
  const [copied, setCopied] = useState(false);
  const url = getArticleUrl(article.slug);

  const shareWhatsApp = () => {
    window.open('https://wa.me/?text=' + encodeURIComponent(article.title + ' - ' + url), '_blank');
  };

  const shareFacebook = () => {
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url), '_blank');
  };

  const shareTwitter = () => {
    window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(article.title) + '&url=' + encodeURIComponent(url), '_blank');
  };

  const copyLink = useCallback(() => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [url]);

  const btnClass = 'flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors cursor-pointer';

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      <button onClick={shareWhatsApp} className={btnClass + ' bg-green-100 text-green-700 hover:bg-green-200'}>
        WhatsApp
      </button>
      <button onClick={shareFacebook} className={btnClass + ' bg-blue-100 text-blue-700 hover:bg-blue-200'}>
        Facebook
      </button>
      <button onClick={shareTwitter} className={btnClass + ' bg-gray-100 text-gray-700 hover:bg-gray-200'}>
        Twitter
      </button>
      <button onClick={copyLink} className={btnClass + ' bg-gray-100 text-gray-700 hover:bg-gray-200'}>
        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
        {copied ? 'Copied!' : 'Copy Link'}
      </button>
    </div>
  );
}

function BlogModal({ article, onClose }: { article: BlogArticle; onClose: () => void }) {
  const [slideIndex, setSlideIndex] = useState(0);
  const images = article.images || (article.img ? [article.img] : []);
  const totalSlides = images.length;
  const nextSlide = () => { setSlideIndex((prev) => (prev + 1) % totalSlides); };
  const prevSlide = () => { setSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides); };

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

        {/* Image Slider */}
        {totalSlides > 0 && (
          <div className="relative h-64 md:h-80 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={slideIndex}
                src={images[slideIndex]}
                alt={article.title}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-700 to-transparent" />
            <div className="absolute bottom-4 left-6 right-16">
              <span className="inline-block bg-[#5F8768] text-white text-xs font-medium px-3 py-1 rounded-full mb-2">
                {article.category}
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-white leading-snug">
                {article.title}
              </h2>
            </div>
            {totalSlides > 1 && (
              <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3 pointer-events-none">
                <button onClick={prevSlide} className="pointer-events-auto bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100 transition-colors cursor-pointer" aria-label="Previous image">
                  <ChevronLeft className="w-4 h-4 text-[#2F3A33]" />
                </button>
                <button onClick={nextSlide} className="pointer-events-auto bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100 transition-colors cursor-pointer" aria-label="Next image">
                  <ChevronRight className="w-4 h-4 text-[#2F3A33]" />
                </button>
              </div>
            )}
            {totalSlides > 1 && (
              <div className="absolute bottom-4 right-6 flex gap-1.5">
                {images.map((_, i) => (
                  <button key={i} onClick={() => setSlideIndex(i)} className={slideIndex === i ? 'w-6 h-2 rounded-full bg-white' : 'w-2 h-2 rounded-full bg-gray-300 hover:bg-gray-200 transition-all cursor-pointer'} aria-label={'Go to image ' + (i + 1)} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Article Body */}
        <div className="p-6 md:p-8">
          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-[#6B7A6F] mb-4 pb-4 border-b border-[#E5E3DC]">
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{article.date}</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{article.readTime}</span>
          </div>

          {/* Share buttons */}
          <div className="mb-6">
            <ShareButtons article={article} />
          </div>

          {/* Content paragraphs */}
          <div className="prose prose-lg max-w-none">
            {paragraphs.map((p, i) => {
              if (isHeading(p)) {
                return <h3 key={i} className="text-xl font-bold text-[#2F3A33] mt-8 mb-3">{p.trim()}</h3>;
              }
              return <p key={i} className="text-[#2F3A33] leading-relaxed mb-4 text-[15px]">{p.trim()}</p>;
            })}
          </div>

          {/* CTA Footer */}
          <div className="mt-8 p-6 rounded-xl bg-[#F8F7F3] border border-[#E5E3DC]">
            <p className="text-sm font-semibold text-[#2F3A33] mb-2">Ready to invest?</p>
            <p className="text-sm text-[#6B7A6F] mb-3">
              Contact Dwell Chronicles for expert consultation and support.
            </p>
            <a href="https://wa.me/233204700023" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#5F8768] text-white text-sm font-medium rounded-xl px-5 py-2.5 hover:bg-[#4A6B52] transition-colors">
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
      if (next.has(index)) { next.delete(index); } else { next.add(index); }
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
          <h2 className="text-3xl md:text-4xl font-bold text-[#2F3A33]">Insights &amp; Articles</h2>
          <p className="mt-3 text-[#6B7A6F] max-w-2xl mx-auto">
            Stay informed with the latest in real estate Ghana, property investment, and building construction insights
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {categories.map((category) => (
            <button key={category} onClick={() => setActiveFilter(category)} className={badgeClass(activeFilter === category)}>
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
                <img src={article.img} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" />
              </div>

              {/* Content */}
              <div className="p-6">
                <span className="inline-block bg-green-100 text-[#5F8768] text-xs font-medium px-3 py-1 rounded-full">{article.category}</span>
                <h3 className="text-lg font-semibold text-[#2F3A33] mt-3 mb-2 line-clamp-2">{article.title}</h3>
                <p className="text-sm text-[#6B7A6F] mb-4 line-clamp-2">{article.excerpt}</p>

                {/* Footer */}
                <div className="flex justify-between items-center text-xs text-[#6B7A6F] mb-3">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{article.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{article.readTime}</span>
                  </div>
                  <button onClick={() => toggleBookmark(index)} className="p-1.5 rounded-lg hover:bg-white transition-colors cursor-pointer" aria-label="Bookmark article">
                    <Bookmark className={bookmarked.has(index) ? 'w-4 h-4 fill-[#5F8768] text-[#5F8768]' : 'w-4 h-4'} />
                  </button>
                </div>

                {/* Share buttons */}
                <ShareButtons article={article} />

                {/* Read Article Link */}
                {article.content ? (
                  <button onClick={() => setSelectedArticle(article)} className="inline-flex items-center gap-1 text-[#5F8768] font-medium text-sm mt-3 hover:gap-2 transition-all cursor-pointer">
                    Read Article <ArrowRight className="w-4 h-4" />
                  </button>
                ) : null}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="border-2 border-[#5F8768] text-[#5F8768] hover:bg-[#5F8768] hover:text-white rounded-xl px-8 py-3 font-medium transition-all cursor-pointer flex items-center gap-2 mx-auto">
            View All Articles <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Blog Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <BlogModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
