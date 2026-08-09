export default function PropertiesStructuredData() {
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Property Listings in Ghana',
    description: 'Browse verified property listings across Ghana including houses for sale, apartments for rent, and lands for sale.',
    numberOfItems: 12,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Sage Manor Estate', url: 'https://dwellchroniclesgh.com/property/1' },
      { '@type': 'ListItem', position: 2, name: 'The Skyline Penthouse', url: 'https://dwellchroniclesgh.com/property/2' },
      { '@type': 'ListItem', position: 3, name: 'Greenfield Villa', url: 'https://dwellchroniclesgh.com/property/3' },
      { '@type': 'ListItem', position: 4, name: 'Harbour View Apartments', url: 'https://dwellchroniclesgh.com/property/4' },
      { '@type': 'ListItem', position: 5, name: 'Savanna Lodge', url: 'https://dwellchroniclesgh.com/property/5' },
      { '@type': 'ListItem', position: 6, name: 'Coastal Breeze Residence', url: 'https://dwellchroniclesgh.com/property/6' },
      { '@type': 'ListItem', position: 7, name: 'Akan Heights Estate', url: 'https://dwellchroniclesgh.com/property/7' },
      { '@type': 'ListItem', position: 8, name: 'The Oasis Condo', url: 'https://dwellchroniclesgh.com/property/8' },
      { '@type': 'ListItem', position: 9, name: 'Royal Palm Mansion', url: 'https://dwellchroniclesgh.com/property/9' },
      { '@type': 'ListItem', position: 10, name: 'Sunset Ridge Townhouse', url: 'https://dwellchroniclesgh.com/property/10' },
      { '@type': 'ListItem', position: 11, name: 'Lakeside Modern Villa', url: 'https://dwellchroniclesgh.com/property/11' },
      { '@type': 'ListItem', position: 12, name: 'The Horizon Tower', url: 'https://dwellchroniclesgh.com/property/12' },
    ],
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dwellchroniclesgh.com' },
      { '@type': 'ListItem', position: 2, name: 'Properties', item: 'https://dwellchroniclesgh.com/properties' },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  );
}
