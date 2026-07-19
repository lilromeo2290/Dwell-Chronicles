import Navigation from '@/components/sections/Navigation';
import Hero from '@/components/sections/Hero';
import FeaturedProperties from '@/components/sections/FeaturedProperties';
import ConstructionServices from '@/components/sections/ConstructionServices';
import ProjectsGallery from '@/components/sections/ProjectsGallery';
import InvestmentStats from '@/components/sections/InvestmentStats';
import BlogSection from '@/components/sections/BlogSection';
import VideoSection from '@/components/sections/VideoSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CTABanner from '@/components/sections/CTABanner';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/sections/Footer';
import WhatsAppChat from '@/components/sections/WhatsAppChat';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Hero />
        <FeaturedProperties />
        <ConstructionServices />
        <ProjectsGallery />
        <InvestmentStats />
        <BlogSection />
        <VideoSection />
        <TestimonialsSection />
        <CTABanner />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppChat />
    </div>
  );
}