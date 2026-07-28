// WhatsApp Business Platform API helpers

const WHATSAPP_API_BASE = 'https://graph.facebook.com/v18.0';

export interface WhatsAppConfig {
  accessToken: string;
  phoneNumberId: string;
  businessAccountId: string;
  verifyToken?: string;
}

export function buildPropertyMessage(property: {
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
}): string {
  const statusLabel = property.status === 'sale' ? 'For Sale' : 'For Rent';
  const featuresList = property.features
    .slice(0, 6)
    .map((f: string) => '  - ' + f)
    .join('\n');

  return (
    '\ud83c\udfe1 NEW PROPERTY ALERT\n\n' +
    'A beautiful ' + property.bedrooms + '-Bedroom ' + property.title + ' is now available ' + statusLabel + '.\n\n' +
    '\ud83d\udccd Location: ' + (property.district ? property.district + ', ' : '') + property.region + '\n\n' +
    '\ud83d\udcb0 Price: ' + property.price + '\n\n' +
    '\ud83d\udecf Bedrooms: ' + property.bedrooms + '\n' +
    '\ud83d\udecb Bathrooms: ' + property.bathrooms + '\n' +
    '\ud83c\udfe0 Type: ' + property.propertyType + '\n\n' +
    '\u2728 Features:\n' +
    featuresList + '\n\n' +
    'View full details and more pictures:\n' +
    property.url + '\n\n' +
    'Contact us today for inspection.\n\n' +
    '\ud83d\udcde Dwell Chronicles\n' +
    '\ud83c\udf10 https://dwellchroniclesgh.com'
  );
}

export function buildVideoMessage(video: {
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  channelName: string;
}): string {
  return (
    '\ud83d\udfa5 NEW PROPERTY VIDEO\n\n' +
    'Take a virtual tour of our latest property.\n\n' +
    '\ud83c\udfe1 ' + video.title + '\n\n' +
    'Watch the full video here:\n' +
    video.videoUrl + '\n\n' +
    'Visit our website for more listings.\n' +
    'https://dwellchroniclesgh.com'
  );
}

export function buildCustomMessage(title: string, body: string, url?: string): string {
  let msg = '\ud83d\udce3 ' + title + '\n\n' + body;
  if (url) {
    msg += '\n\n' + url;
  }
  msg += '\n\n\ud83d\udcde Dwell Chronicles\n\ud83c\udf10 https://dwellchroniclesgh.com';
  return msg;
}

export async function sendWhatsAppMessage(
  config: WhatsAppConfig,
  to: string,
  message: string,
  mediaUrl?: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const recipient = to.replace(/[^0-9]/g, '');
  if (!recipient.startsWith('233') && !recipient.startsWith('+233')) {
    return { success: false, error: 'Invalid Ghana phone number format' };
  }
  const formattedPhone = recipient.startsWith('+') ? recipient : '+' + recipient;

  try {
    if (mediaUrl) {
      const res = await fetch(
        WHATSAPP_API_BASE + '/' + config.phoneNumberId + '/messages',
        {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + config.accessToken,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messaging_product: 'whatsapp',
            to: formattedPhone,
            type: 'image',
            image: {
              link: mediaUrl,
              caption: message,
            },
          }),
        }
      );
      const data = await res.json();
      if (data.error) {
        return { success: false, error: data.error.message };
      }
      return { success: true, messageId: data.messages?.[0]?.id };
    } else {
      const res = await fetch(
        WHATSAPP_API_BASE + '/' + config.phoneNumberId + '/messages',
        {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + config.accessToken,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messaging_product: 'whatsapp',
            to: formattedPhone,
            type: 'text',
            text: { body: message },
          }),
        }
      );
      const data = await res.json();
      if (data.error) {
        return { success: false, error: data.error.message };
      }
      return { success: true, messageId: data.messages?.[0]?.id };
    }
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return { success: false, error: msg };
  }
}
