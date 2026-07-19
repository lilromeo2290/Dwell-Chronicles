'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Building2,
  DollarSign,
  Key,
  Warehouse,
  HardHat,
  FolderOpen,
  BookOpen,
  Play,
  Info,
  Phone,
  Menu,
  ChevronDown,
  KeyRound,
  ClipboardList,
  Users,
  MapPin,
  FileCheck,
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
import LandRegistrationModal from './LandRegistrationModal';
import BuyingSellingLandsModal from './BuyingSellingLandsModal';
import AgentServicesModal from './AgentServicesModal';
import PropertyManagementModal from './PropertyManagementModal';
import BuildingConstructionModal from './BuildingConstructionModal';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface SubMenuItem {
  label: string;
  href?: string;
  action?: string;
  icon: React.ReactNode;
}

interface NavLink {
  label: string;
  href: string;
  icon: React.ReactNode;
  children?: SubMenuItem[];
}

const PROPERTIES_SUBMENU = [
  { label: 'Property Rentals', href: '#properties', icon: <KeyRound className="size-4" /> },
  { label: 'Project Management', href: '#construction', icon: <ClipboardList className="size-4" /> },
  { label: 'Building Construction', action: 'building-construction', icon: <HardHat className="size-4" /> },
  { label: 'Property Management', action: 'property-management', icon: <Building2 className="size-4" /> },
  { label: 'Agent Services', action: 'agent-services', icon: <Users className="size-4" /> },
  { label: 'Buying & Selling of Lands', action: 'buying-selling', icon: <MapPin className="size-4" /> },
  { label: 'Land Registration & Consultancy', action: 'land-registration', icon: <FileCheck className="size-4" /> },
];

const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '#home', icon: <Home className="size-[18px]" /> },
  { label: 'Properties', href: '#properties', icon: <Building2 className="size-[18px]" />, children: PROPERTIES_SUBMENU },
  { label: 'Buy', href: '#buy', icon: <DollarSign className="size-[18px]" /> },
  { label: 'Rent', href: '#rent', icon: <Key className="size-[18px]" /> },
  { label: 'Commercial', href: '#commercial', icon: <Warehouse className="size-[18px]" /> },
  { label: 'Construction', href: '#construction', icon: <HardHat className="size-[18px]" /> },
  { label: 'Projects', href: '#projects', icon: <FolderOpen className="size-[18px]" /> },
  { label: 'Blog', href: '#blog', icon: <BookOpen className="size-[18px]" /> },
  { label: 'Videos', href: '#videos', icon: <Play className="size-[18px]" /> },
  { label: 'About', href: '#about', icon: <Info className="size-[18px]" /> },
  { label: 'Contact', href: '#contact', icon: <Phone className="size-[18px]" /> },
];

const SCROLL_THRESHOLD = 80;

/* ------------------------------------------------------------------ */
/*  Desktop Properties Dropdown                                         */
/* ------------------------------------------------------------------ */

function PropertiesDropdown({ isScrolled, onAction }: { isScrolled: boolean; onAction: (action: string) => void }) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const textColor = isScrolled ? 'text-white' : 'text-[#2F3A33]';

  const handleEnter = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  }, []);

  const handleLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <li
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        className={cn(
          'inline-flex items-center gap-1 px-3 py-2 text-[13.5px] font-medium tracking-wide rounded-md transition-colors duration-200',
          textColor,
          isScrolled
            ? 'hover:bg-white/15 hover:text-white'
            : 'hover:bg-[#5F8768]/10 hover:text-[#5F8768]'
        )}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="true"
      >
        Properties
        <ChevronDown
          className={cn(
            'size-3.5 transition-transform duration-200',
            open && 'rotate-180'
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={cn(
              'absolute top-full left-0 mt-1 w-64 rounded-xl border shadow-xl p-2 z-50',
              isScrolled
                ? 'bg-[#5F8768] border-[#5F8768]/60 shadow-[#2F3A33]/20'
                : 'bg-white border-[#E5E3DC] shadow-[#2F3A33]/10'
            )}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
          >
            {PROPERTIES_SUBMENU.map((sub) => (
              sub.action ? (
                <button
                  key={sub.label}
                  type="button"
                  onClick={() => { setOpen(false); onAction(sub.action!); }}
                  className={cn(
                    'flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 text-left',
                    isScrolled
                      ? 'text-white/90 hover:bg-white/15 hover:text-white'
                      : 'text-[#2F3A33] hover:bg-[#5F8768]/10 hover:text-[#5F8768]'
                  )}
                >
                  <span
                    className={cn(
                      'flex size-8 shrink-0 items-center justify-center rounded-md',
                      isScrolled
                        ? 'bg-white/15 text-white'
                        : 'bg-[#5F8768]/10 text-[#5F8768]'
                    )}
                  >
                    {sub.icon}
                  </span>
                  {sub.label}
                </button>
              ) : (
                <a
                  key={sub.label}
                  href={sub.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150',
                    isScrolled
                      ? 'text-white/90 hover:bg-white/15 hover:text-white'
                      : 'text-[#2F3A33] hover:bg-[#5F8768]/10 hover:text-[#5F8768]'
                  )}
                >
                  <span
                    className={cn(
                      'flex size-8 shrink-0 items-center justify-center rounded-md',
                      isScrolled
                        ? 'bg-white/15 text-white'
                        : 'bg-[#5F8768]/10 text-[#5F8768]'
                    )}
                  >
                    {sub.icon}
                  </span>
                  {sub.label}
                </a>
              )
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/*  Mobile Menu Item                                                    */
/* ------------------------------------------------------------------ */

function MobileMenuItem({
  link,
  isScrolled,
  onAction,
}: {
  link: NavLink;
  isScrolled: boolean;
  onAction: (action: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = link.children && link.children.length > 0;

  if (hasChildren) {
    return (
      <div>
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="group flex w-full items-center justify-between rounded-lg px-3 py-3 text-[15px] font-medium text-[#2F3A33] transition-colors duration-200 hover:bg-[#5F8768]/10"
        >
          <span className="flex items-center gap-3.5">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-[#5F8768]/10 text-[#5F8768]">
              {link.icon}
            </span>
            {link.label}
          </span>
          <ChevronDown
            className={cn(
              'size-4 text-[#6B7A6F] transition-transform duration-200',
              expanded && 'rotate-180'
            )}
          />
        </button>
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="overflow-hidden ml-6 border-l-2 border-[#5F8768]/20 pl-4"
            >
              {link.children!.map((sub) =>
                sub.action ? (
                  <SheetClose asChild key={sub.label}>
                    <button
                      type="button"
                      onClick={() => onAction(sub.action!)}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] text-[#6B7A6F] transition-colors duration-150 hover:text-[#5F8768] hover:bg-[#5F8768]/5 text-left"
                    >
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-[#5F8768]/5">
                        {sub.icon}
                      </span>
                      {sub.label}
                    </button>
                  </SheetClose>
                ) : (
                  <SheetClose asChild key={sub.label}>
                    <a
                      href={sub.href}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] text-[#6B7A6F] transition-colors duration-150 hover:text-[#5F8768] hover:bg-[#5F8768]/5"
                    >
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-[#5F8768]/5">
                        {sub.icon}
                      </span>
                      {sub.label}
                    </a>
                  </SheetClose>
                )
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <SheetClose asChild>
      <a
        href={link.href}
        className="group flex items-center gap-3.5 rounded-lg px-3 py-3 text-[15px] font-medium text-[#2F3A33] transition-colors duration-200 hover:bg-[#5F8768]/10 hover:text-[#5F8768]"
      >
        <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-[#5F8768]/10 text-[#5F8768] group-hover:bg-[#5F8768] group-hover:text-white transition-colors duration-200">
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
  const [modalAction, setModalAction] = useState<string | null>(null);

  const handleAction = useCallback((action: string) => {
    setModalAction(action);
  }, []);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const textColor = isScrolled ? 'text-white' : 'text-[#2F3A33]';

  return (
    <>
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
            {NAV_LINKS.map((link) =>
              link.children ? (
                <PropertiesDropdown
                  key={link.label}
                  isScrolled={isScrolled}
                  onAction={handleAction}
                />
              ) : (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={cn(
                      'inline-flex items-center px-3 py-2 text-[13.5px] font-medium tracking-wide rounded-md transition-colors duration-200',
                      textColor,
                      isScrolled
                        ? 'hover:bg-white/15 hover:text-white'
                        : 'hover:bg-[#5F8768]/10 hover:text-[#5F8768]'
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              )
            )}
          </ul>

          {/* ---- Right Actions ---- */}
          <div className="flex items-center gap-3">
            <Button
              asChild
              className={cn(
                'hidden md:inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-semibold tracking-wide transition-all duration-300 shadow-sm',
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

            {/* Mobile Hamburger */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button
                  className={cn(
                    'inline-flex xl:hidden items-center justify-center size-10 rounded-lg transition-colors duration-200',
                    isScrolled
                      ? 'text-white hover:bg-white/15'
                      : 'text-[#2F3A33] hover:bg-[#5F8768]/10'
                  )}
                  aria-label="Open menu"
                >
                  <Menu className="size-5" />
                </button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-[320px] bg-[#F8F7F3] p-0"
              >
                <div className="flex h-full flex-col">
                  <SheetHeader className="border-b border-[#D8D5CC] px-5 py-4">
                    <SheetTitle className="flex items-center gap-2.5 text-[#2F3A33]">
                      <img
                        src="/logo.jpg"
                        alt="Dwell Chronicles"
                        className="h-8 w-auto object-contain"
                      />
                    </SheetTitle>
                  </SheetHeader>

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
                              <MobileMenuItem
                                link={link}
                                isScrolled={isScrolled}
                                onAction={handleAction}
                              />
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="border-t border-[#D8D5CC] p-4">
                    <SheetClose asChild>
                      <Button
                        asChild
                        className="flex w-full items-center justify-center gap-2 rounded-full py-3 bg-[#5F8768] text-white text-[14px] font-semibold tracking-wide hover:bg-[#5F8768]/90 transition-colors duration-200 shadow-sm"
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
      <LandRegistrationModal
        open={modalAction === 'land-registration'}
        onClose={() => setModalAction(null)}
      />
      <BuyingSellingLandsModal
        open={modalAction === 'buying-selling'}
        onClose={() => setModalAction(null)}
      />
      <AgentServicesModal
        open={modalAction === 'agent-services'}
        onClose={() => setModalAction(null)}
      />
      <PropertyManagementModal
        open={modalAction === 'property-management'}
        onClose={() => setModalAction(null)}
      />
      <BuildingConstructionModal
        open={modalAction === 'building-construction'}
        onClose={() => setModalAction(null)}
      />
    </>
  );
}