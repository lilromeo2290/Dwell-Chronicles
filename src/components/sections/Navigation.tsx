'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  KeyRound,
  ClipboardList,
  HardHat,
  Building2,
  Users,
  MapPin,
  FileCheck,
  BookOpen,
  Play,
  Phone,
  Menu,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface NavLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '#home', icon: <Home className="size-[18px]" /> },
  { label: 'Property Rentals', href: '#properties', icon: <KeyRound className="size-[18px]" /> },
  { label: 'Project Management', href: '#construction', icon: <ClipboardList className="size-[18px]" /> },
  { label: 'Building Construction', href: '#construction', icon: <HardHat className="size-[18px]" /> },
  { label: 'Property Management', href: '#properties', icon: <Building2 className="size-[18px]" /> },
  { label: 'Agent Services', href: '#contact', icon: <Users className="size-[18px]" /> },
  { label: 'Buying & Selling Lands', href: '#properties', icon: <MapPin className="size-[18px]" /> },
  { label: 'Land Registration', href: '#contact', icon: <FileCheck className="size-[18px]" /> },
  { label: 'Blog', href: '#blog', icon: <BookOpen className="size-[18px]" /> },
  { label: 'Videos', href: '#videos', icon: <Play className="size-[18px]" /> },
  { label: 'Contact', href: '#contact', icon: <Phone className="size-[18px]" /> },
];

const SCROLL_THRESHOLD = 80;

/* ------------------------------------------------------------------ */
/*  Mobile Menu Item                                                    */
/* ------------------------------------------------------------------ */

function MobileMenuItem({ link, isScrolled }: { link: NavLink; isScrolled: boolean }) {
  return (
    <SheetClose asChild>
      <a
        href={link.href}
        className={cn(
          'group flex items-center gap-3.5 rounded-lg px-3 py-3 text-[15px] font-medium',
          'transition-colors duration-200',
          isScrolled
            ? 'text-[#2F3A33] hover:bg-[#5F8768]/10 hover:text-[#5F8768]'
            : 'text-[#2F3A33] hover:bg-[#5F8768]/10 hover:text-[#5F8768]'
        )}
      >
        <span
          className={cn(
            'flex size-9 shrink-0 items-center justify-center rounded-md transition-colors duration-200',
            'bg-[#5F8768]/10 text-[#5F8768] group-hover:bg-[#5F8768] group-hover:text-white'
          )}
        >
          {link.icon}
        </span>
        {link.label}
      </a>
    </SheetClose>
  );
}

/* ------------------------------------------------------------------ */
/*  Navigation Component                                                */
/* ------------------------------------------------------------------ */

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.scrollY > SCROLL_THRESHOLD;
    }
    return false;
  });
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  /* shared classes that change based on scroll state */
  const textColor = isScrolled
    ? 'text-white'
    : 'text-[#2F3A33]';

  return (
    <>
      {/* ---------- Desktop / Main Nav ---------- */}
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-[#5F8768] shadow-lg shadow-[#5F8768]/15'
            : 'bg-white/60 backdrop-blur-xl border-b border-[#D8D5CC]/50'
        )}
      >
        <nav
          className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-5 lg:px-10"
          aria-label="Main navigation"
        >
          {/* ---- Logo ---- */}
          <a
            href="#home"
            className="flex items-center gap-2.5 transition-colors duration-300"
          >
            <img
              src="/logo.jpg"
              alt="Dwell Chronicles"
              className="h-10 w-auto object-contain rounded-lg"
            />
          </a>

          {/* ---- Desktop Links ---- */}
          <ul className="hidden xl:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={cn(
                    'relative inline-flex items-center px-3 py-2 text-[13.5px] font-medium tracking-wide',
                    'rounded-md transition-colors duration-200',
                    textColor,
                    isScrolled
                      ? 'hover:bg-white/15 hover:text-white'
                      : 'hover:bg-[#5F8768]/10 hover:text-[#5F8768]'
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* ---- Right Actions ---- */}
          <div className="flex items-center gap-3">
            {/* CTA Button – visible on md+ */}
            <Button
              asChild
              className={cn(
                'hidden md:inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-semibold tracking-wide',
                'transition-all duration-300 shadow-sm',
                isScrolled
                  ? 'bg-white text-[#5F8768] hover:bg-white/90 hover:shadow-md'
                  : 'bg-[#5F8768] text-white hover:bg-[#5F8768]/90 hover:shadow-md'
              )}
              size="sm"
            >
              <a href="#contact">
                <Phone className="size-3.5" />
                Get in Touch
              </a>
            </Button>

            {/* Mobile Hamburger – visible below xl breakpoint */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button
                  className={cn(
                    'inline-flex xl:hidden items-center justify-center size-10 rounded-lg',
                    'transition-colors duration-200',
                    isScrolled
                      ? 'text-white hover:bg-white/15'
                      : 'text-[#2F3A33] hover:bg-[#5F8768]/10'
                  )}
                  aria-label="Open menu"
                >
                  <Menu className="size-5" />
                </button>
              </SheetTrigger>

              {/* ---- Mobile Sheet Content ---- */}
              <SheetContent
                side="right"
                className="w-[320px] bg-[#F8F7F3] p-0"
              >
                <div className="flex h-full flex-col">
                  {/* Header */}
                  <SheetHeader className="border-b border-[#D8D5CC] px-5 py-4">
                    <SheetTitle className="flex items-center gap-2.5 text-[#2F3A33]">
                      <img
                        src="/logo.jpg"
                        alt="Dwell Chronicles"
                        className="h-8 w-auto object-contain"
                      />
                    </SheetTitle>
                  </SheetHeader>

                  {/* Links List */}
                  <div className="flex-1 overflow-y-auto px-3 py-4">
                    <AnimatePresence mode="wait">
                      {mobileOpen && (
                        <motion.div
                          key="mobile-nav-links"
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.25, ease: 'easeOut' }}
                          className="flex flex-col gap-0.5"
                        >
                          {NAV_LINKS.map((link, i) => (
                            <motion.div
                              key={link.label}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.2,
                                delay: 0.04 * i,
                                ease: 'easeOut',
                              }}
                            >
                              <MobileMenuItem link={link} isScrolled={isScrolled} />
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Footer CTA */}
                  <div className="border-t border-[#D8D5CC] p-4">
                    <SheetClose asChild>
                      <Button
                        asChild
                        className={cn(
                          'flex w-full items-center justify-center gap-2 rounded-full py-3',
                          'bg-[#5F8768] text-white text-[14px] font-semibold tracking-wide',
                          'hover:bg-[#5F8768]/90 transition-colors duration-200 shadow-sm'
                        )}
                      >
                        <a href="#contact">
                          <Phone className="size-4" />
                          Get in Touch
                        </a>
                      </Button>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>
    </>
  );
}