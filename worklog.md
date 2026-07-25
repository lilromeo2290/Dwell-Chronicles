# Worklog — Dwell Chronicles Airbnb Feature Build

---
Task ID: 1
Agent: Main Agent
Task: Build premium Airbnb-style short-stay apartment section

Work Log:
- Explored project structure: single-page Next.js 16 site with hash-based navigation
- Designed Prisma schema: Apartment, ApartmentImage, ApartmentAvailability, BookingEnquiry models
- Pushed schema to SQLite database via `bun run db:push`
- Created seed script with 8 apartments across Ho, Hohoe, Keta, Akosombo (90-day availability each)
- Built 5 API routes: apartments CRUD, availability management, booking enquiries
- Built Airbnb listing page (/airbnb) with search, filters, category tabs, animated cards
- Built apartment detail page (/airbnb/[id]) with gallery, calendar, amenities, WhatsApp booking, inquiry form
- Built admin dashboard (/admin/airbnb) with apartment CRUD, availability calendar, enquiries, settings tabs
- Built admin rentals page (/admin/rentals) with status toggle (available/taken), filters, add/edit
- Added "Airbnb" to main navigation (using Next.js Link for page navigation)
- Added "ADMIN" column to footer beside Connect (links to /admin/rentals and /admin/airbnb)
- Verified all pages with agent browser: listing, detail, admin, homepage nav, footer

Stage Summary:
- All pages compile cleanly (0 lint errors)
- 8 seed apartments with images, 90-day availability calendars
- Full Airbnb-quality short-stay booking experience with WhatsApp integration
- Admin can manage apartments, availability dates, and enquiries
- Footer now has 5 columns: Quick Links, Services, Resources, Admin, Connect

---
Task ID: 2
Agent: Main Agent
Task: Deploy Dwell Chronicles to live server (dwellchroniclesgh.com)

Work Log:
- Diagnosed nginx 404: Webuzo-managed nginx, vhost config in conf.d/
- Created custom nginx location block at /var/webuzo-data/nginx/custom/domains/dwellchroniclesgh.com.conf
- Discovered port 3000 occupied by another bun process (user clipe233)
- Scanned all ports, chose port 3003 (free)
- Installed bun, PM2 on VPS (CentOS-based, no apt-get)
- Used bun install to avoid npm dependency conflicts
- Pinned Prisma to v6 (project version), avoided v7 breaking changes
- Discovered Next.js 16 standalone binds to public IP by default, not 127.0.0.1
- Fixed with HOSTNAME=0.0.0.0 env var in PM2 ecosystem config
- PM2 + systemd startup configured for auto-restart on reboot
- Site confirmed live: curl returns full HTML on port 3003

Stage Summary:
- Live at https://dwellchroniclesgh.com
- Port: 3003, PM2 ecosystem config at /root/dwellchronicles/ecosystem.config.js
- Update: cd /root/dwellchronicles && git pull && bun install && bunx prisma generate && bun run build && pm2 restart dwellchronicles