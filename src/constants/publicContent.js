import {
  BadgeCheck,
  ClipboardCheck,
  FileCheck2,
  HandCoins,
  Hammer,
  Home,
  KeyRound,
  MapPinned,
  Scale,
  ShieldCheck,
  WalletCards,
} from 'lucide-react'

export const trustBadges = [
  ['Verified Properties', BadgeCheck],
  ['Legal Documentation Support', Scale],
  ['Loan Assistance', WalletCards],
  ['Turnkey Execution', Hammer],
  ['Transparent Pricing', ShieldCheck],
  ['Site Visit Assistance', MapPinned],
]

export const servicesBeyondProperty = [
  ['Property Buying Assistance', 'Shortlisting, market guidance, negotiation support, and site visit planning.', Home],
  ['Selling Assistance', 'Positioning, buyer coordination, documentation readiness, and closing support.', HandCoins],
  ['Rental & Leasing Support', 'Tenant or space search, visit coordination, term discussion, and agreement workflow.', KeyRound],
  ['Legal Documentation', 'Due diligence coordination, agreement checks, registry workflow, and ownership clarity.', FileCheck2],
  ['Interior & Turnkey Work', 'Interior, exterior, electrical, and carpentry execution through trusted partners.', Hammer],
  ['Site Visit Coordination', 'Planned visits, advisor support, and follow-up guidance for confident decisions.', ClipboardCheck],
]

export const propertyFaqs = [
  ['How do I schedule a site visit?', 'Use the Schedule Site Visit button and our team will coordinate a suitable date, location, and advisor support.'],
  ['Are properties verified?', 'Listings include verification support and OMProperties can assist with documentation and ownership checks before commitment.'],
  ['Can you help with loans?', 'Yes. We provide guidance for bank coordination, eligibility, and documentation through trusted partners.'],
]

export const turnkeyFaqs = [
  ['Can OMProperties manage complete interiors?', 'Yes. The turnkey team can coordinate interiors, electrical, exterior, and carpentry execution.'],
  ['Do you provide estimates before starting?', 'Yes. Requirements are reviewed first so scope, materials, timelines, and budget are clear before execution.'],
  ['Can turnkey work be combined with property purchase?', 'Yes. Buyers can plan possession, documentation, and turnkey execution through one advisory workflow.'],
]

export const contactFaqs = [
  ['What happens after I submit an enquiry?', 'Your lead is captured and the OMProperties team can follow up for requirements, site visits, or project consultation.'],
  ['Can I enquire for both property and turnkey work?', 'Yes. Share the combined requirement and the team will route it to the right advisor.'],
  ['Do you support commercial requirements?', 'Yes. OMProperties supports commercial properties, lands, leasing, and turnkey execution.'],
]

export const insights = [
  {
    slug: 'choose-right-property',
    title: 'How to Choose the Right Property',
    category: 'Buying Guide',
    summary: 'A practical framework for comparing location, budget, documentation, lifestyle fit, and long-term value.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
    body: [
      'The right property is not only the one that fits your budget. It should also match your lifestyle, commute, future needs, and resale potential.',
      'Start with location quality, builder or ownership clarity, usable layout, maintenance expectations, and legal documentation. A guided site visit helps you compare real details beyond brochure promises.',
      'OMProperties helps buyers shortlist verified options, ask the right questions, and move from interest to documentation with confidence.',
    ],
  },
  {
    slug: 'buy-vs-rent',
    title: 'Buy vs Rent: What Makes Sense?',
    category: 'Decision Guide',
    summary: 'Understand when buying builds value and when renting gives flexibility for your current stage.',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1200&q=80',
    body: [
      'Buying can create long-term stability and asset value, while renting can preserve flexibility and reduce upfront cost.',
      'The better choice depends on your career horizon, family needs, available down payment, loan comfort, and how long you plan to stay in the location.',
      'A property advisor can model both options with real local pricing and help you make a grounded decision.',
    ],
  },
  {
    slug: 'plots-smart-investment',
    title: 'Why Plots Can Be a Smart Investment',
    category: 'Investment',
    summary: 'Plots can offer flexibility, lower holding complexity, and strong appreciation in growth corridors.',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    body: [
      'Land can be attractive because it is flexible, scarce, and often linked to infrastructure-led appreciation.',
      'The key is verification: title clarity, zoning, road access, registry readiness, and future development potential matter more than headline pricing.',
      'OMProperties can help evaluate plot opportunities with documentation and location checks before you commit.',
    ],
  },
  {
    slug: 'turnkey-interiors-before-starting',
    title: 'Turnkey Interiors: What to Know Before Starting',
    category: 'Turnkey',
    summary: 'Define scope, materials, timeline, and responsibility before any interior execution begins.',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    body: [
      'Good interiors begin with clarity. Before execution, define layouts, material preferences, electrical points, storage needs, and finishing expectations.',
      'A turnkey partner should help coordinate vendors, timeline, sequencing, and quality checks so the project does not become fragmented.',
      'OMProperties supports interiors alongside property advisory, making the transition from purchase to possession smoother.',
    ],
  },
  {
    slug: 'commercial-property-checklist',
    title: 'Commercial Property Checklist',
    category: 'Commercial',
    summary: 'Review access, footfall, compliance, frontage, parking, lease terms, and operational fit.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    body: [
      'Commercial property decisions should be made around business performance, not only square footage.',
      'Check visibility, access, parking, floor efficiency, compliance readiness, lease flexibility, and the surrounding demand ecosystem.',
      'OMProperties helps commercial clients compare options and negotiate with operational priorities in mind.',
    ],
  },
]

export const getInsightBySlug = (slug) => insights.find((insight) => insight.slug === slug)
