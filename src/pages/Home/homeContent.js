import {
  BadgeCheck,
  ClipboardCheck,
  FileCheck2,
  Hammer,
  MapPin,
  Scale,
  Search,
  ShieldCheck,
  TrendingUp,
  Users,
  WalletCards,
} from 'lucide-react'

export const homeImages = {
  hero:
    'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=2000&q=85',
  investment:
    'https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?auto=format&fit=crop&w=1400&q=85',
  finalCta:
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=85',
}

export const categoryImages = {
  Flats: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80',
  'Independent Houses':
    'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=900&q=80',
  Villas: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&q=80',
  Plots: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80',
  'Commercial Properties':
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80',
  'Commercial Lands':
    'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80',
}

export const trustBadges = ['Verified Listings', 'Legal Assistance', 'Turnkey Solutions', 'End-to-End Support']

export const heroStats = [
  ['500+', 'Properties'],
  ['100+', 'Happy Clients'],
  ['10+', 'Years Experience'],
  ['24/7', 'Turnkey Experts'],
]

export const valueCards = [
  ['Verified Listings', 'Curated properties with ownership, location, and pricing checks.', BadgeCheck],
  ['Expert Guidance', 'Senior advisors for residential, commercial, rental, and land decisions.', Users],
  ['Legal Documentation', 'Support for due diligence, agreements, registry, and transfer workflow.', Scale],
  ['Loan Assistance', 'Guidance through bank coordination, eligibility, and documentation.', WalletCards],
  ['Turnkey Projects', 'Electrical, interior, exterior, and carpentry execution under one roof.', Hammer],
  ['Transparent Pricing', 'Clear advice on market value, negotiation, fees, and timelines.', ShieldCheck],
]

export const workSteps = [
  ['Consultation', Users],
  ['Property Search', Search],
  ['Site Visit', MapPin],
  ['Documentation', FileCheck2],
  ['Registration', ClipboardCheck],
  ['Project Execution', Hammer],
]

export const investmentPills = [
  ['Residential', TrendingUp],
  ['Commercial', TrendingUp],
  ['Plots', TrendingUp],
  ['Rental Returns', TrendingUp],
]

export const testimonials = [
  {
    name: 'Radhika Sethi',
    location: 'Gurugram',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    review:
      'OMProperties handled our apartment search, documentation, and interior coordination with rare clarity. The experience felt calm and premium from day one.',
  },
  {
    name: 'Arjun Mehra',
    location: 'New Delhi',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    review:
      'Their commercial leasing advice was precise and practical. We shortlisted faster, negotiated better, and moved into the space without friction.',
  },
  {
    name: 'Neha Kapoor',
    location: 'Faridabad',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    review:
      'The turnkey team delivered interiors and electrical work with excellent finish control. It felt like one accountable partner owned the project.',
  },
]

export const faqs = [
  [
    'How do I buy property?',
    'Start with a consultation. We shortlist verified options, arrange site visits, support negotiation, and guide documentation through registration.',
  ],
  [
    'Can OMProperties help with legal work?',
    'Yes. We support due diligence, agreement review coordination, registry workflow, and document readiness with trusted legal partners.',
  ],
  [
    'Do you provide interiors?',
    'Yes. Our turnkey division handles interiors along with electrical, exterior, and carpentry work for homes and commercial sites.',
  ],
  [
    'How does leasing work?',
    'We understand your requirement, shortlist suitable spaces, coordinate visits, negotiate terms, and help close lease documentation.',
  ],
]
