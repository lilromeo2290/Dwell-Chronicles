// Dynamic WhatsApp message generator with multiple marketing styles

export type MarketingStyle = 'professional' | 'urgent' | 'friendly' | 'luxury';

interface PropertyData {
  title: string;
  price: string;
  location: string;
  region: string;
  district: string;
  bedrooms: string;
  bathrooms: string;
  propertyType: string;
  status: string;
  description: string;
  size: string;
  features: string[];
  url: string;
  agent: string;
  imageUrl: string;
}

interface VideoData {
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
}

const styles: Record<MarketingStyle, { emoji: string; prefix: string; cta: string }> = {
  professional: {
    emoji: '\ud83c\udfe1',
    prefix: 'NEW PROPERTY ALERT',
    cta: 'Contact us today for inspection or viewing.',
  },
  urgent: {
    emoji: '\u26a1',
    prefix: 'HOT LISTING - JUST ADDED',
    cta: 'This property will not last long. Schedule a viewing NOW!',
  },
  friendly: {
    emoji: '\ud83c\udf3d',
    prefix: 'Great News! New Property Available',
    cta: 'We would love to show you around. Reach out anytime!',
  },
  luxury: {
    emoji: '\ud83d\udc51',
    prefix: 'EXCLUSIVE LISTING',
    cta: 'For private viewings and enquiries, contact our premium team.',
  },
};

export function generatePropertyMessage(data: PropertyData, style: MarketingStyle = 'professional'): string {
  const s = styles[style];
  const statusLabel = data.status === 'sale' ? 'For Sale' : 'For Rent';
  const featuresList = data.features
    .slice(0, 6)
    .map((f: string) => '  - ' + f)
    .join('\n');

  return (
    s.emoji + ' ' + s.prefix + '\n\n' +
    'A beautiful ' + data.bedrooms + '-Bedroom ' + data.title + ' is now available ' + statusLabel + '.\n\n' +
    '\ud83d\udccd Location: ' + (data.district ? data.district + ', ' : '') + data.region + '\n\n' +
    '\ud83d\udcb0 Price: ' + data.price + '\n\n' +
    '\ud83d\udecf Bedrooms: ' + data.bedrooms + '\n' +
    '\ud83d\udecb Bathrooms: ' + data.bathrooms + '\n' +
    '\ud83c\udfe0 Type: ' + data.propertyType +
    (data.size ? '\n\ud83d\udccf Size: ' + data.size : '') + '\n\n' +
    '\u2728 Features:\n' +
    featuresList + '\n\n' +
    'View full details and more pictures:\n' +
    data.url + '\n\n' +
    s.cta + '\n\n' +
    '\ud83d\udcde Dwell Chronicles\n' +
    '\ud83c\udf10 https://dwellchroniclesgh.com'
  );
}

export function generateVideoMessage(data: VideoData): string {
  return (
    '\ud83d\udfa5 NEW PROPERTY VIDEO\n\n' +
    'Take a virtual tour of our latest property.\n\n' +
    '\ud83c\udfe1 ' + data.title + '\n\n' +
    'Watch the full video here:\n' +
    data.videoUrl + '\n\n' +
    'Visit our website for more listings.\n' +
    'https://dwellchroniclesgh.com'
  );
}

export function generateCustomMessage(title: string, body: string, url?: string, style: MarketingStyle = 'professional'): string {
  const s = styles[style];
  let msg = s.emoji + ' ' + title + '\n\n' + body;
  if (url) {
    msg += '\n\n' + url;
  }
  msg += '\n\n\ud83d\udcde Dwell Chronicles\n\ud83c\udf10 https://dwellchroniclesgh.com';
  return msg;
}
