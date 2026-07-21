import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

// 15 diverse interior/exterior image URLs per apartment category
const studioImages = [
  { url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop", alt: "Living Area - Wide View" },
  { url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop", alt: "Bedroom with Natural Light" },
  { url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop", alt: "Kitchenette" },
  { url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop", alt: "Modern Bathroom" },
  { url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop", alt: "Bathroom Detail" },
  { url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop", alt: "Living Room from Entry" },
  { url: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&h=600&fit=crop", alt: "Cozy Bed Area" },
  { url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop", alt: "Kitchen Counter" },
  { url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop", alt: "Room Overview" },
  { url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop", alt: "Bed Corner" },
  { url: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&h=600&fit=crop", alt: "Dresser Area" },
  { url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop", alt: "Shower Room" },
  { url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop", alt: "Full Apartment View" },
  { url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop", alt: "Evening Ambience" },
  { url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop", alt: "Window View" },
];

const executiveImages = [
  { url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop", alt: "Executive Living Room" },
  { url: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&h=600&fit=crop", alt: "Master Bedroom" },
  { url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop", alt: "Luxury Bathroom" },
  { url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop", alt: "Modern Kitchen" },
  { url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop", alt: "Exterior View" },
  { url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop", alt: "Second Bedroom" },
  { url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop", alt: "En-suite Bathroom" },
  { url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop", alt: "Bedroom Panorama" },
  { url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop", alt: "Lounge Area" },
  { url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop", alt: "Kitchen Island" },
  { url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop", alt: "Balcony View" },
  { url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop", alt: "Dining Area" },
  { url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop", alt: "Breakfast Nook" },
  { url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop", alt: "Bathroom Vanity" },
  { url: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&h=600&fit=crop", alt: "King Bed Detail" },
];

const budgetImages = [
  { url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop", alt: "Budget Room - Main View" },
  { url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop", alt: "Bed Area" },
  { url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop", alt: "Clean Bathroom" },
  { url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop", alt: "Bedside View" },
  { url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop", alt: "Room Layout" },
  { url: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&h=600&fit=crop", alt: "Sleeping Area" },
  { url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop", alt: "Bathroom Tiles" },
  { url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop", alt: "Entry View" },
  { url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop", alt: "Small Kitchen Area" },
  { url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop", alt: "Counter Space" },
  { url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop", alt: "Shower" },
  { url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop", alt: "Room Corner" },
  { url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop", alt: "Cozy Corner" },
  { url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop", alt: "Window Light" },
  { url: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&h=600&fit=crop", alt: "Pillow Detail" },
];

const luxuryImages = [
  { url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop", alt: "Luxury Living Room - Wide" },
  { url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop", alt: "Master Bedroom Suite" },
  { url: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=600&fit=crop", alt: "Second Bedroom" },
  { url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop", alt: "Spa Bathroom" },
  { url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop", alt: "Kitchen with Island" },
  { url: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&h=600&fit=crop", alt: "Balcony Panorama" },
  { url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop", alt: "Living Area Evening" },
  { url: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&h=600&fit=crop", alt: "Third Bedroom" },
  { url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop", alt: "Master Bed Detail" },
  { url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop", alt: "Hallway" },
  { url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop", alt: "Chef's Kitchen" },
  { url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop", alt: "Bathroom Freestanding Tub" },
  { url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop", alt: "Open Plan Living" },
  { url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop", alt: "Building Exterior" },
  { url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop", alt: "Dining Space" },
];

const riversideImages = [
  { url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop", alt: "Riverside Living Room" },
  { url: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&h=600&fit=crop", alt: "Bedroom with River View" },
  { url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop", alt: "Kitchen" },
  { url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop", alt: "Bathroom" },
  { url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop", alt: "Sofa Area" },
  { url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop", alt: "Balcony Sunset View" },
  { url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop", alt: "Bed Detail" },
  { url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop", alt: "Shower Room" },
  { url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop", alt: "Cooking Area" },
  { url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop", alt: "Bathroom Sink" },
  { url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop", alt: "Full Interior" },
  { url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop", alt: "Reading Nook" },
  { url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop", alt: "Entryway" },
  { url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop", alt: "Evening Glow" },
  { url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop", alt: "Wardrobe Area" },
];

const penthouseImages = [
  { url: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&h=600&fit=crop", alt: "Penthouse Living" },
  { url: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&h=600&fit=crop", alt: "Master Suite" },
  { url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop", alt: "Modern Kitchen" },
  { url: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=600&fit=crop", alt: "Guest Room" },
  { url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop", alt: "Premium Bathroom" },
  { url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop", alt: "Panoramic View" },
  { url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop", alt: "Rooftop Terrace" },
  { url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop", alt: "Lounge Seating" },
  { url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop", alt: "Bedroom Vista" },
  { url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop", alt: "Kitchen Detail" },
  { url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop", alt: "Second Bathroom" },
  { url: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&h=600&fit=crop", alt: "Lake View from Balcony" },
  { url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop", alt: "Open Plan" },
  { url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop", alt: "Dining Setting" },
  { url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop", alt: "Building Facade" },
];

const lodgeImages = [
  { url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop", alt: "Mountain Lodge Interior" },
  { url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop", alt: "Bedroom with Fireplace View" },
  { url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop", alt: "Rustic Kitchen" },
  { url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop", alt: "Bathroom" },
  { url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop", alt: "Living Area" },
  { url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop", alt: "Private Deck" },
  { url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop", alt: "Second Bedroom" },
  { url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop", alt: "En-suite" },
  { url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop", alt: "Lounge" },
  { url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop", alt: "Kitchen Counter" },
  { url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop", alt: "Full Lodge View" },
  { url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop", alt: "Fireplace Nook" },
  { url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop", alt: "Mountain Bedroom" },
  { url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop", alt: "Deck View at Dusk" },
  { url: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&h=600&fit=crop", alt: "Cozy Bed Setup" },
];

const beachImages = [
  { url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop", alt: "Beachside Studio Main" },
  { url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop", alt: "Bathroom" },
  { url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop", alt: "Living Space" },
  { url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop", alt: "Bed Area" },
  { url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop", alt: "Kitchenette" },
  { url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop", alt: "Ocean View from Patio" },
  { url: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop", alt: "Shower" },
  { url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop", alt: "Bathroom Detail" },
  { url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop", alt: "Prep Area" },
  { url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop", alt: "Room Overview" },
  { url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop", alt: "Beach Bed" },
  { url: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800&h=600&fit=crop", alt: "Sunset Glow in Room" },
  { url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop", alt: "Full Studio" },
  { url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop", alt: "Tropical Decor" },
  { url: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&h=600&fit=crop", alt: "Patio View" },
];

async function seed() {
  await db.bookingEnquiry.deleteMany();
  await db.apartmentAvailability.deleteMany();
  await db.apartmentImage.deleteMany();
  await db.apartment.deleteMany();

  const apartments = [
    {
      name: "Sage Haven Studio",
      code: "DH-SHS-001",
      description: "A beautifully designed studio apartment in the heart of Ho. Perfect for solo travelers and business professionals. The space features modern furnishings, high-speed Wi-Fi, and a fully equipped kitchenette. Large windows flood the room with natural light, creating a warm and inviting atmosphere. Located just minutes from the city center with easy access to local restaurants and markets.",
      address: "12 Volta Road, Ho",
      city: "Ho",
      area: "Ho Central",
      latitude: "6.6100",
      longitude: "0.4700",
      pricePerNight: 180,
      weeklyPrice: 1050,
      monthlyPrice: 3600,
      cleaningFee: 50,
      securityDeposit: 500,
      bedrooms: 1,
      bathrooms: 1,
      maxGuests: 2,
      rating: 4.8,
      status: "available",
      category: "standard",
      featured: true,
      newlyAdded: false,
      amenities: JSON.stringify(["Wi-Fi", "Smart TV", "Air Conditioning", "Kitchen", "Refrigerator", "Microwave", "Hot Water", "Parking", "Security", "Workspace"]),
      whatsappNumber: "233204700023",
      images: studioImages,
    },
    {
      name: "Volta View Executive Suite",
      code: "DH-VVE-002",
      description: "An exquisite executive suite offering panoramic views of the Volta Region landscape. This premium apartment features a spacious living area, separate bedroom with king-size bed, and a luxurious bathroom with premium fixtures. Ideal for executives and couples seeking a refined stay experience. The suite includes a dedicated workspace, premium entertainment system, and access to a rooftop terrace.",
      address: "5 Adaklu Way, Ho",
      city: "Ho",
      area: "Hotel Area",
      latitude: "6.6150",
      longitude: "0.4750",
      pricePerNight: 350,
      weeklyPrice: 2100,
      monthlyPrice: 7200,
      cleaningFee: 80,
      securityDeposit: 1000,
      bedrooms: 2,
      bathrooms: 2,
      maxGuests: 4,
      rating: 4.9,
      status: "available",
      category: "executive",
      featured: true,
      newlyAdded: false,
      amenities: JSON.stringify(["Wi-Fi", "Smart TV", "Air Conditioning", "Kitchen", "Refrigerator", "Microwave", "Washing Machine", "Hot Water", "Parking", "Balcony", "Swimming Pool", "Security", "Generator", "Workspace"]),
      whatsappNumber: "233204700023",
      images: executiveImages,
    },
    {
      name: "Green Leaf Budget Room",
      code: "DH-GLB-003",
      description: "A clean, comfortable, and affordable room perfect for budget-conscious travelers. Located in a quiet neighborhood in Ho, this room offers all the essentials for a pleasant stay including comfortable bedding, clean bathroom, and reliable Wi-Fi. Great for students, interns, and solo adventurers exploring the Volta Region.",
      address: "28 Sokode Road, Ho",
      city: "Ho",
      area: "Sokode",
      latitude: "6.6050",
      longitude: "0.4650",
      pricePerNight: 85,
      weeklyPrice: 480,
      monthlyPrice: 1600,
      cleaningFee: 30,
      securityDeposit: 200,
      bedrooms: 1,
      bathrooms: 1,
      maxGuests: 1,
      rating: 4.3,
      status: "available",
      category: "budget",
      featured: false,
      newlyAdded: true,
      amenities: JSON.stringify(["Wi-Fi", "Air Conditioning", "Hot Water", "Security"]),
      whatsappNumber: "233204700023",
      images: budgetImages,
    },
    {
      name: "Royal Palm Luxury Apartment",
      code: "DH-RPL-004",
      description: "Experience unparalleled luxury in this stunning three-bedroom apartment. Featuring premium marble finishes, designer furniture, and state-of-the-art appliances. The open-plan living and dining area opens onto a private balcony with garden views. Perfect for families or groups seeking an extraordinary stay in Ho. Includes access to a swimming pool, gym, and 24/7 concierge service.",
      address: "1 Mission Road, Ho",
      city: "Ho",
      area: "Mission Hills",
      latitude: "6.6200",
      longitude: "0.4800",
      pricePerNight: 550,
      weeklyPrice: 3150,
      monthlyPrice: 11000,
      cleaningFee: 150,
      securityDeposit: 2000,
      bedrooms: 3,
      bathrooms: 3,
      maxGuests: 6,
      rating: 5.0,
      status: "available",
      category: "luxury",
      featured: true,
      newlyAdded: false,
      amenities: JSON.stringify(["Wi-Fi", "Smart TV", "Air Conditioning", "Kitchen", "Refrigerator", "Microwave", "Washing Machine", "Hot Water", "Parking", "Balcony", "Swimming Pool", "Security", "Generator", "Workspace"]),
      whatsappNumber: "233204700023",
      images: luxuryImages,
    },
    {
      name: "Ho Riverside Cozy Flat",
      code: "DH-HRC-005",
      description: "Charming one-bedroom flat overlooking the river in Ho. This cozy apartment combines modern comfort with natural beauty. Wake up to stunning river views and enjoy your morning coffee on the private balcony. The flat features a fully equipped kitchen, comfortable living area, and peaceful bedroom. Ideal for couples looking for a romantic getaway or professionals needing a quiet retreat.",
      address: "45 River Lane, Ho",
      city: "Ho",
      area: "Riverside",
      latitude: "6.6080",
      longitude: "0.4680",
      pricePerNight: 220,
      weeklyPrice: 1300,
      monthlyPrice: 4500,
      cleaningFee: 60,
      securityDeposit: 600,
      bedrooms: 1,
      bathrooms: 1,
      maxGuests: 3,
      rating: 4.7,
      status: "available",
      category: "standard",
      featured: true,
      newlyAdded: true,
      amenities: JSON.stringify(["Wi-Fi", "Smart TV", "Air Conditioning", "Kitchen", "Refrigerator", "Microwave", "Hot Water", "Parking", "Balcony", "Security", "Workspace"]),
      whatsappNumber: "233204700023",
      images: riversideImages,
    },
    {
      name: "Akosombo Heights Penthouse",
      code: "DH-AHP-006",
      description: "A spectacular penthouse apartment near Akosombo with breathtaking views of the Volta Lake. This premium property features floor-to-ceiling windows, a rooftop jacuzzi, and designer interiors throughout. With three spacious bedrooms and expansive living areas, it is perfect for luxury family vacations or high-profile corporate retreats. The building offers concierge service, underground parking, and a fitness center.",
      address: "8 Lakeview Drive, Akosombo",
      city: "Ho",
      area: "Lakeview",
      latitude: "6.2600",
      longitude: "0.0500",
      pricePerNight: 750,
      weeklyPrice: 4200,
      monthlyPrice: 15000,
      cleaningFee: 200,
      securityDeposit: 3000,
      bedrooms: 3,
      bathrooms: 3,
      maxGuests: 8,
      rating: 4.9,
      status: "available",
      category: "luxury",
      featured: true,
      newlyAdded: false,
      amenities: JSON.stringify(["Wi-Fi", "Smart TV", "Air Conditioning", "Kitchen", "Refrigerator", "Microwave", "Washing Machine", "Hot Water", "Parking", "Balcony", "Swimming Pool", "Security", "Generator", "Workspace"]),
      whatsappNumber: "233204700023",
      images: penthouseImages,
    },
    {
      name: "Hohoe Mountain Lodge",
      code: "DH-HML-007",
      description: "Nestled in the hills near Hohoe, this charming mountain lodge offers a unique retreat surrounded by nature. The two-bedroom lodge features rustic-chic interiors, a fireplace, and a private deck with mountain views. Perfect for nature lovers, hikers, and those seeking tranquility away from the city. Includes access to nature trails and a nearby waterfall.",
      address: "3 Mountain Pass Road, Hohoe",
      city: "Ho",
      area: "Mountain View",
      latitude: "7.1500",
      longitude: "0.4800",
      pricePerNight: 280,
      weeklyPrice: 1680,
      monthlyPrice: 5800,
      cleaningFee: 70,
      securityDeposit: 800,
      bedrooms: 2,
      bathrooms: 2,
      maxGuests: 5,
      rating: 4.6,
      status: "available",
      category: "executive",
      featured: false,
      newlyAdded: true,
      amenities: JSON.stringify(["Wi-Fi", "Smart TV", "Air Conditioning", "Kitchen", "Refrigerator", "Microwave", "Hot Water", "Parking", "Balcony", "Security", "Generator"]),
      whatsappNumber: "233204700023",
      images: lodgeImages,
    },
    {
      name: "Keta Beachside Studio",
      code: "DH-KBS-008",
      description: "A delightful beachside studio apartment in Keta, just steps from the Atlantic coast. Wake up to ocean sounds and enjoy stunning sunset views from your private patio. The studio features a modern open-plan design with a well-equipped kitchenette, comfortable sleeping area, and a clean bathroom. Ideal for beach lovers, solo travelers, and couples seeking a coastal getaway in the Volta Region.",
      address: "22 Coastal Road, Keta",
      city: "Ho",
      area: "Beachfront",
      latitude: "5.9200",
      longitude: "0.8300",
      pricePerNight: 150,
      weeklyPrice: 880,
      monthlyPrice: 3000,
      cleaningFee: 40,
      securityDeposit: 400,
      bedrooms: 1,
      bathrooms: 1,
      maxGuests: 2,
      rating: 4.5,
      status: "available",
      category: "budget",
      featured: true,
      newlyAdded: true,
      amenities: JSON.stringify(["Wi-Fi", "Air Conditioning", "Kitchen", "Refrigerator", "Hot Water", "Parking", "Security"]),
      whatsappNumber: "233204700023",
      images: beachImages,
    },
  ];

  // Generate 90 days of availability
  const today = new Date();
  const dates: string[] = [];
  for (let i = 0; i < 90; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    dates.push(d.toISOString().split('T')[0]);
  }

  for (const apt of apartments) {
    const { images: imgs, ...aptData } = apt;

    const apartment = await db.apartment.create({ data: aptData });

    for (let idx = 0; idx < imgs.length; idx++) {
      await db.apartmentImage.create({
        data: {
          apartmentId: apartment.id,
          url: imgs[idx].url,
          alt: imgs[idx].alt,
          sortOrder: idx,
        },
      });
    }

    for (const date of dates) {
      let status = 'available';
      const dateNum = new Date(date).getDate();
      if (dateNum % 7 === 0) status = 'booked';
      else if (dateNum % 11 === 0) status = 'reserved';
      else if (dateNum % 13 === 0) status = 'maintenance';

      await db.apartmentAvailability.create({
        data: { apartmentId: apartment.id, date, status },
      });
    }
  }

  console.log('✅ Seed completed: 8 apartments × 15 images = 120 images, 90-day availability');
}

seed()
  .catch(console.error)
  .finally(() => db.$disconnect());