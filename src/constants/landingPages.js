export const landingPages = [
  {
    slug: 'properties-in-bhiwadi',
    eyebrow: 'Bhiwadi Properties',
    title: 'Verified properties in Bhiwadi for buyers and investors',
    subtitle:
      'Explore flats, plots, villas, and commercial opportunities across Bhiwadi with documentation, site visit, and turnkey support.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1800&q=80',
    seoTitle: 'Properties in Bhiwadi | OMProperties',
    seoDescription:
      'Browse verified properties in Bhiwadi including flats, plots, villas, commercial spaces, and investment opportunities with OMProperties.',
    searchLink: '/properties?location=bhiwadi',
    filters: [{ field: 'location', includes: 'bhiwadi' }],
    highlights: [
      'Residential and commercial property advisory',
      'Site visit coordination across key Bhiwadi sectors',
      'Legal documentation and verification assistance',
      'Turnkey execution support after purchase',
    ],
    faqs: [
      ['Can OMProperties help me compare Bhiwadi properties?', 'Yes. Our team can shortlist options based on budget, location, purpose, documentation, and future value.'],
      ['Do you help with site visits in Bhiwadi?', 'Yes. Site visits can be coordinated for available properties with advisor support.'],
      ['Can you assist with interiors after purchase?', 'Yes. OMProperties also supports turnkey interiors, electrical, exterior, and carpentry execution.'],
    ],
  },
  {
    slug: 'plots-on-bhiwadi-tijara-highway',
    eyebrow: 'Plot Investment',
    title: 'Premium plots on Bhiwadi-Tijara Highway',
    subtitle:
      'Discover plotted development opportunities on SH-25 with launch pricing, highway access, and long-term investment potential.',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1800&q=80',
    seoTitle: 'Plots on Bhiwadi Tijara Highway | OMProperties',
    seoDescription:
      'Explore premium plots on Bhiwadi-Tijara Highway with launch offers, site plan guidance, and legal verification support.',
    searchLink: '/properties?type=plots&location=bhiwadi',
    filters: [
      { field: 'type', equals: 'plots' },
      { field: 'location', includes: 'bhiwadi-tijara' },
    ],
    highlights: [
      'Approx. 105-200 sq. yd. plotted options',
      'Highway-linked growth corridor',
      'Priority allotment and limited inventory guidance',
      'Registry and documentation support',
    ],
    faqs: [
      ['Why consider plots on Bhiwadi-Tijara Highway?', 'The corridor offers visibility, connectivity, and potential appreciation linked to infrastructure and township growth.'],
      ['Can I verify plot documents before booking?', 'Yes. OMProperties can assist with verification and documentation checks before commitment.'],
      ['Can I schedule a guided visit?', 'Yes. Use the site visit button and our team will coordinate the visit.'],
    ],
  },
  {
    slug: 'flats-in-sector-16-bhiwadi',
    eyebrow: 'Sector 16 Flats',
    title: 'Premium flats in Sector 16, Bhiwadi',
    subtitle:
      'Find modern apartments in Sector 16, Bhiwadi with clubhouse amenities, green planning, and advisor-led buying support.',
    image: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1800&q=80',
    seoTitle: 'Flats in Sector 16 Bhiwadi | OMProperties',
    seoDescription:
      'Browse flats in Sector 16 Bhiwadi including 2 BHK, 3 BHK, and 4 BHK options with OMProperties advisory support.',
    searchLink: '/properties?type=flats&location=sector%2016',
    filters: [
      { field: 'type', equals: 'flats' },
      { field: 'location', includes: 'sector 16' },
    ],
    highlights: [
      '2 BHK, 3 BHK, and 4 BHK apartment guidance',
      'Amenity-led residential project options',
      'Loan and documentation assistance',
      'Turnkey interior support after possession',
    ],
    faqs: [
      ['Are there under-construction flats in Sector 16?', 'Yes. OMProperties can help evaluate under-construction apartment options and possession timelines.'],
      ['Can you help compare 2 BHK and 3 BHK options?', 'Yes. We can compare budget, carpet area, layout usability, and resale potential.'],
      ['Do you help with loan coordination?', 'Yes. Loan assistance can be coordinated through trusted partners.'],
    ],
  },
  {
    slug: 'properties-in-tapukara',
    eyebrow: 'Tapukara Advisory',
    title: 'Property advisory for Tapukara and nearby Bhiwadi corridors',
    subtitle:
      'Get guided support for buying, selling, renting, leasing, and turnkey execution around Tapukara, Bhiwadi, and nearby growth zones.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=80',
    seoTitle: 'Properties in Tapukara | OMProperties',
    seoDescription:
      'Connect with OMProperties for property buying, selling, renting, leasing, and turnkey support in Tapukara and nearby Bhiwadi corridors.',
    searchLink: '/properties?location=tapukara',
    filters: [{ field: 'location', includes: 'tapukara' }],
    highlights: [
      'Local office presence near Tapukara and Bhiwadi',
      'Residential, commercial, rental, and leasing support',
      'Advisor-led shortlisting and visits',
      'Documentation and turnkey assistance',
    ],
    faqs: [
      ['Does OMProperties serve Tapukara?', 'Yes. OMProperties is based near Tapukara and supports nearby Bhiwadi property requirements.'],
      ['Can I submit a custom requirement?', 'Yes. Share your budget, purpose, and preferred location through the enquiry form.'],
      ['Do you support commercial leasing?', 'Yes. Commercial property and leasing requirements are supported.'],
    ],
  },
]

export const getLandingPageBySlug = (slug) => landingPages.find((page) => page.slug === slug)
