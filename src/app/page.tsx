import Navigation from '@/components/sections/Navigation';
import Hero from '@/components/sections/Hero';
import FeaturedProperties from '@/components/sections/FeaturedProperties';
import InvestmentStats from '@/components/sections/InvestmentStats';
import ConstructionServices from '@/components/sections/ConstructionServices';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CTABanner from '@/components/sections/CTABanner';
import BlogSection from '@/components/sections/BlogSection';
import VideoSection from '@/components/sections/VideoSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/sections/Footer';
import WhatsAppChat from '@/components/sections/WhatsAppChat';
import PropertyLandingStructuredData from '@/components/seo/PropertyLandingStructuredData';

export default function Home() {
  return (
    <>
      <PropertyLandingStructuredData />
      <Navigation />
      <Hero />
      <FeaturedProperties />
      <InvestmentStats />
      <ConstructionServices />
      <TestimonialsSection />
      <CTABanner />
      <BlogSection />
      <VideoSection />
      <ContactSection />
      <Footer />
      <WhatsAppChat />
    </>
  );
}