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
  ChevronLeft,
  ChevronRight,
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
  {
    title: 'Why You Need a Gutter System in Your Building Maintenance',
    category: 'Building Tips',
    readTime: '5 min read',
    date: 'Jul 27, 2026',
    img: '/blog-gutter1.jpg',
    excerpt:
      'Gutters protect your building from water damage, erosion, and pest infestation. Learn why a gutter system is essential for property maintenance in Ghana.',
    images: ['/blog-gutter1.jpg', '/blog-gutter2.jpg'],
    content: [
      'When it comes to maintaining a building\'s structural integrity, one often overlooked yet crucial component is the gutter system. Gutters are essential for directing rainwater and debris away from a building\'s foundation, which helps prevent various forms of damage. In this blog post, we will explore the importance of gutter systems, the potential problems caused by the absence of gutters, and tips for maintaining an effective gutter system.',
      'WHAT IS A GUTTER SYSTEM?',
      'A gutter system is installed along the edge of a roof, typically at the eaves. It collects rainwater and channels it away from the building. This simple mechanism plays a significant role in protecting your property from water-related damage, especially in Ghana\'s rainy seasons.',
      'THE PROBLEMS CAUSED BY MISSING GUTTER SYSTEMS',
      'The absence of a gutter system can lead to numerous issues, including:',
      '1. Water Damage: Without gutters, rainwater can seep into the walls and foundation, causing damage to walls, ceilings, and insulation. Over time, this can lead to mold growth and structural deterioration.',
      '2. Erosion: Water accumulating around the foundation can erode the soil, causing the foundation to settle or shift. This can result in structural issues that compromise the building\'s stability.',
      '3. Pest Infestation: Stagnant water around the foundation is an attractive breeding ground for pests such as mosquitoes, rodents, snakes, and insects. These pests can infiltrate the building, causing further issues.',
      '4. Foundation Problems: Accumulated water around the foundation can cause cracks and shifts, leading to significant structural problems that can be expensive to repair or impossible to repair.',
      '5. Aesthetic Damage: When water splashes back onto the building, it can lead to ugly stains and peeling paint, taking away from the beauty of the building\'s exterior. This not only diminishes the property\'s beauty but also may require frequent repainting.',
      'TIPS FOR GUTTER MAINTENANCE',
      'To ensure your gutter system functions effectively, regular maintenance is essential. Here are some tips for keeping your gutters in top condition:',
      '- Regular Inspections: Check your gutters at least twice a year, especially before and after the rainy season, to ensure they are clear of debris, have no cracks and functioning correctly.',
      '- Clean Debris: Remove leaves, twigs, grass and other debris that can block the flow of water in your gutters.',
      '- Check for Leaks and Damage: Inspect for any leaks, holes, or damage to the gutters and downspouts, and repair them promptly.',
      '- Ensure Proper Slope: Make sure your gutters are sloped correctly to facilitate water flow towards the downspouts. This depends on the artisan for the job, get a qualified and experienced artisan.',
      '- Install Gutter Guards: Consider installing gutter guards to prevent debris from accumulating in the gutters.',
      'In conclusion, a well-installed and maintained gutter system is vital for protecting your building from water-related damage. By taking the time to inspect and maintain your gutters, you can save yourself from costly repairs and ensure your property remains in excellent condition.',
      'By incorporating a reliable gutter system, you safeguard your property against the damaging effects of water and protect your investment for years to come. Remember, prevention is always better than cure when it comes to building maintenance.',
      'Contact Dwell Chronicles to Learn More or Expert Hiring: Call +233(0)547293193 or WhatsApp +233204700023',
    ].join('\n\n'),
  },
  {
    title: 'The Importance of a Damp Proof Course (DPC) in Building Construction',
    category: 'Building Tips',
    readTime: '6 min read',
    date: 'Jul 27, 2026',
    img: '/blog-dpc1.jpg',
    excerpt:
      'Are you experiencing damp issues in your home? Learn how a Damp Proof Course prevents rising damp, mold, and structural damage during construction.',
    images: ['/blog-dpc1.jpg', '/blog-dpc2.jpg'],
    content: [
      'Are you experiencing damp issues in your home? You might be dealing with a common problem known as Rising Damp. This issue often arises due to the absence of a Damp Proof Membrane (DPM) during construction, a cost-effective solution. However, the main culprit is often ignorance about its importance. Addressing the problem post-construction can cost millions, making it crucial to understand and implement this preventative measure during the building phase.',
      'What is a Damp Proof Course (DPC)?',
      'A Damp Proof Course is a horizontal barrier installed within a building\'s structure to prevent moisture from rising from the ground into the walls and floors. This simple yet essential component helps maintain the building\'s integrity and prevent many problems associated with dampness.',
      'Problems Caused by the Absence of a DPC',
      'Failing to install or maintain a DPC can lead to numerous issues, including:',
      '1. Mold and Mildew Growth: Moisture creates an ideal environment for mold and mildew, leading to health problems, unpleasant odours, and ugly stains.',
      '2. Water Damage: Without a DPC, water can penetrate walls and floors, damaging insulation, plaster, and other building materials. This often results in costly repairs and potential structural issues.',
      '3. Rising Damp: This phenomenon occurs when water rises from the ground, causing damage to walls and floors, which can compromise the building\'s structural integrity.',
      '4. Condensation: Excessive moisture buildup on walls and windows can lead to condensation, worsening mold and mildew growth.',
      '5. Timber Decay: Moisture can penetrate the building\'s timber frame, leading to rot and decay, resulting in structural failures.',
      '6. Health Risks: Dampness and mold can worsen respiratory issues, such as asthma, and trigger allergic reactions.',
      '7. Reduced Property Value: Properties with damp or water damage can be challenging to sell or rent, potentially lowering their value.',
      '8. Crevices and Cracks: Without a DPC, moisture can cause gaps and cracks in walls and floors, providing entry points for pests and rodents.',
      '9. Structural Issues: In severe cases, neglecting a DPC can lead to significant structural problems, such as bowed walls or ceilings, compromising the building\'s safety.',
      'The Solution: Proper Installation and Maintenance of a DPC',
      'To avoid these problems, ensuring your building has a properly installed and maintained DPC is crucial. Here are some steps to consider:',
      '- Engage Professionals: Hire experienced builders or contractors who understand the importance of installing a DPC during construction.',
      '- Use Quality Materials: Invest in high-quality materials for your DPC to ensure long-lasting protection against moisture.',
      '- Regular Inspections: Conduct regular inspections of your DPC and address any signs of damage or wear immediately.',
      '- Educate Yourself: Understanding the role of a DPC in building construction can help you make informed decisions and prevent costly issues in the future.',
      'In conclusion, investing in a Damp Proof Course is a small price to pay for peace of mind and long-term protection against rising dampness and related issues. Don\'t let ignorance cost you more in the future. Prioritize the installation and maintenance of a DPC in your building projects.',
      'Contact Dwell Chronicles to Learn More or Expert Hiring: Call +233(0)547293193 or WhatsApp +233204700023',
    ].join('\n\n'),
  },
  {
    title: 'Damp Proof Course vs Damp Proof Membrane in Building Construction',
    category: 'Building Tips',
    readTime: '5 min read',
    date: 'Jul 27, 2026',
    img: '/blog-dpcvsdpm1.jpg',
    excerpt:
      'Understanding the difference between DPC and DPM is crucial for protecting your home from dampness, structural damage, and health issues.',
    images: ['/blog-dpcvsdpm1.jpg', '/blog-dpcvsdpm2.jpg'],
    content: [
      'Dampness is a persistent issue in many Ghanaian homes, causing discomfort, health problems, and structural damage. To combat this, understanding the difference between a Damp Proof Course (DPC) and a Damp Proof Membrane (DPM) is crucial.',
      'What is a Damp Proof Course (DPC)?',
      'A DPC is a horizontal barrier installed in walls to prevent moisture from rising from the ground. It is typically placed at ground level or just above, acting as a shield against rising dampness. The material used for DPC depends on factors like climate, building type, and the specific conditions of the site. Common DPC materials include bitumen, slate, and engineering bricks.',
      'Key points about DPC:',
      '- Prevents rising damp',
      '- Installed horizontally in walls',
      '- Material varies based on conditions',
      'What is a Damp Proof Membrane (DPM)?',
      'A DPM is a flexible sheet material used to prevent moisture transmission. It is commonly laid under concrete slabs or oversight concrete to stop moisture from rising. DPMs also protect building structures from damp. Polyethylene sheeting is a widely used DPM material.',
      'Key points about DPM:',
      '- Prevents moisture transmission',
      '- Commonly used under concrete slabs or oversight concrete',
      '- Available in various lengths and gauges',
      'Why are DPC and DPM Essential?',
      'Both DPC and DPM are crucial for creating a dry and healthy living environment. Neglecting these elements can lead to:',
      'Structural damage: Dampness can weaken walls, floors, and foundations, leading to costly repairs.',
      'Health issues: Mold and mildew thrive in damp conditions, causing respiratory problems, allergies, and other health issues.',
      'Discomfort: Dampness creates a cold, unpleasant atmosphere, reducing your overall comfort.',
      'Choosing the Right Materials and Installation',
      'Selecting high-quality DPC and DPM materials is essential for effective protection against damp. We at Dwell Chronicles recommend purchasing from reputable suppliers to avoid future problems. Remember, investing in quality materials upfront can save you money on costly repairs later.',
      'Proper installation is equally important. Consulting with a qualified building engineer will ensure that the DPC and DPM are installed correctly to provide maximum protection for your home.',
      'Signs of Dampness',
      'Recognizing the signs of dampness early on is crucial. Common indicators include:',
      '- Visible mold or mildew growth',
      '- Damp patches on walls or ceilings',
      '- Peeling paint or wallpaper',
      '- Condensation on windows',
      '- Musty smell',
      'If you notice any of these signs, it is essential to investigate the cause and take appropriate action to prevent further damage.',
      'By understanding the difference between DPC and DPM, choosing the right materials, and ensuring proper installation, you can create a dry and healthy living environment for your family.',
      'Dwell Chronicles is here to provide expert advice and guidance on all aspects of home maintenance and improvement. Contact us today to learn more about protecting your home from damp.',
      'Contact Dwell Chronicles to Learn More or Expert Hiring: Call +233(0)547293193 or WhatsApp +233204700023',
    ].join('\n\n'),
  },
];

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
                <button
                  onClick={prevSlide}
                  className="pointer-events-auto bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100 transition-colors cursor-pointer"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4 text-[#2F3A33]" />
                </button>
                <button
                  onClick={nextSlide}
                  className="pointer-events-auto bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100 transition-colors cursor-pointer"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4 h-4 text-[#2F3A33]" />
                </button>
              </div>
            )}
            {totalSlides > 1 && (
              <div className="absolute bottom-4 right-6 flex gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSlideIndex(i)}
                    className={slideIndex === i ? 'w-6 h-2 rounded-full bg-white' : 'w-2 h-2 rounded-full bg-gray-300 hover:bg-gray-200 transition-all cursor-pointer'}
                    aria-label={'Go to image ' + (i + 1)}
                  />
                ))}
              </div>
            )}
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
