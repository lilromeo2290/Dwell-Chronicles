export default function PropertyLandingStructuredData() {
  const realEstateAgent = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Dwell Chronicles Ghana',
    url: 'https://dwellchroniclesgh.com',
    logo: 'https://dwellchroniclesgh.com/logo.jpg',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
    description:
      'Dwell Chronicles Ghana is the leading property listing website in Ghana. We offer verified houses for sale, apartments for rent, lands for sale, short-stay Airbnb rentals, building construction, and property management services across all regions of Ghana.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ho',
      addressRegion: 'Volta Region',
      addressCountry: 'GH',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 6.6104,
      longitude: 0.4731,
    },
    telephone: '+233-XX-XXX-XXXX',
    areaServed: [
      { '@type': 'City', name: 'Accra' },
      { '@type': 'City', name: 'Kumasi' },
      { '@type': 'City', name: 'Ho' },
      { '@type': 'City', name: 'Tamale' },
      { '@type': 'City', name: 'Takoradi' },
      { '@type': 'City', name: 'Cape Coast' },
      { '@type': 'City', name: 'Tema' },
    ],
    sameAs: [
      'https://www.youtube.com/@DwellChronicles',
      'https://www.facebook.com/dwellchroniclesgh',
      'https://www.instagram.com/dwellchroniclesgh',
      'https://x.com/dwellchronicles',
    ],
    priceRange: 'GH₵50,000 - GH₵50,000,000',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '18:00',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127',
      bestRating: '5',
    },
  };

  const webSite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Dwell Chronicles Ghana',
    url: 'https://dwellchroniclesgh.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://dwellchroniclesgh.com/properties?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is Dwell Chronicles Ghana?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Dwell Chronicles Ghana is the leading property listing website in Ghana, offering verified houses for sale, apartments for rent, lands for sale, short-stay Airbnb rentals, building construction, and property management services across Accra, Ho, Kumasi, and all regions of Ghana.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I find property listings in Ghana on Dwell Chronicles?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Visit dwellchroniclesgh.com and browse our featured properties section. You can filter by location, property type, price range, and number of bedrooms. We list houses, apartments, lands, and commercial properties across all regions of Ghana including Accra, Kumasi, Ho, Tamale, and more.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I buy land in Ghana through Dwell Chronicles?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Dwell Chronicles lists verified lands for sale across Ghana. We assist with land registration, title verification, and due diligence to ensure your land purchase is secure. Our team covers regions including the Volta Region, Greater Accra, Ashanti Region, and more.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does Dwell Chronicles offer Airbnb short-stay rentals in Ghana?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, Dwell Chronicles offers executive short-stay apartments and Airbnb rentals in Ho and across Ghana. Our properties include studio, one-bedroom, two-bedroom, and three-bedroom apartments with amenities like WiFi, AC, kitchen, and housekeeping services.',
        },
      },
      {
        '@type': 'Question',
        name: 'What construction services does Dwell Chronicles provide in Ghana?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Dwell Chronicles provides comprehensive building and construction services in Ghana including residential building, commercial construction, project management, land registration, property management, and agent services. We handle projects from foundation to finishing across all regions of Ghana.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I list my property on Dwell Chronicles?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'To list your property on Dwell Chronicles Ghana, contact our team via WhatsApp or the contact form on our website. We will schedule a property inspection, take professional photos, verify documentation, and list your property on our platform for maximum visibility to potential buyers and renters.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Dwell Chronicles the best property listing website in Ghana?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Dwell Chronicles is among the top property listing websites in Ghana, offering the most comprehensive real estate services including property sales, rentals, land sales, Airbnb short-stays, construction services, and property management all in one platform. Our verified listings and dedicated customer service make us a trusted choice for real estate in Ghana.',
        },
      },
    ],
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dwellchroniclesgh.com' },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(realEstateAgent) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSite) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  );
}
