import { CheckCircle2, Handshake, ShieldCheck, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CTASection } from '../../components/public/CTASection'
import { PageHero } from '../../components/public/PageHero'
import { PremiumCard } from '../../components/public/PremiumCard'
import { SectionHeader } from '../../components/public/SectionHeader'
import { TrustBadges } from '../../components/public/TrustBadges'
import { PROPERTIES_HERO_IMAGE, TURNKEY_HERO_IMAGE } from '../../constants/pageContent'
import { SEO } from '../../constants/seo'
import { useSeo } from '../../hooks/useSeo'

const values = [
  ['Verified Advisory', 'Curated property options supported by clear location, pricing, and documentation guidance.', ShieldCheck],
  ['End-to-End Support', 'From discovery and site visits to negotiation, registration, and turnkey execution.', Handshake],
  ['Premium Finish', 'A design-conscious execution mindset for interiors, exteriors, electrical, and carpentry work.', Sparkles],
]

const trustPoints = ['Residential and commercial advisory', 'Legal and documentation coordination', 'Turnkey project execution', 'Transparent communication']

export function AboutPage() {
  useSeo(SEO.about)

  return (
    <div className="public-page">
      <PageHero
        eyebrow="About OMProperties"
        title="Real estate advisory with turnkey execution depth"
        subtitle="We help clients buy, sell, rent, lease, and improve premium residential and commercial properties through one trusted partner."
        image={PROPERTIES_HERO_IMAGE}
      />

      <section className="public-section public-about-feature">
        <div>
          <TrustBadges compact />
          <SectionHeader
            eyebrow="Company"
            title="Built for confident property decisions"
            subtitle="OMProperties combines market knowledge, verified listings, practical documentation support, and execution partners for clients who want clarity before commitment."
          />
          <div className="public-values-grid">
            <PremiumCard>
              <h3>Mission</h3>
              <p>Make property transactions and project execution simpler, cleaner, and more transparent.</p>
            </PremiumCard>
            <PremiumCard>
              <h3>Vision</h3>
              <p>Become the preferred advisory partner for premium property ownership and improvement.</p>
            </PremiumCard>
            <PremiumCard>
              <h3>Promise</h3>
              <p>Clear guidance, verified options, responsive coordination, and premium finish control.</p>
            </PremiumCard>
          </div>
        </div>
        <img src={TURNKEY_HERO_IMAGE} alt="Premium turnkey interior project" />
      </section>

      <section className="public-section">
        <SectionHeader
          eyebrow="Why OMProperties"
          title="A more complete advisory experience"
          subtitle="Every client gets structured support across property search, transaction confidence, and project readiness."
        />
        <div className="public-about-grid">
          {values.map(([title, text, Icon]) => (
            <PremiumCard key={title}>
              <Icon size={28} color="#c9a227" />
              <h3>{title}</h3>
              <p>{text}</p>
            </PremiumCard>
          ))}
        </div>
      </section>

      <section className="public-section">
        <SectionHeader eyebrow="Trust" title="What clients can expect" />
        <div className="public-values-grid">
          {trustPoints.map((point) => (
            <PremiumCard key={point}>
              <CheckCircle2 size={24} color="#c9a227" />
              <h3>{point}</h3>
            </PremiumCard>
          ))}
        </div>
      </section>

      <CTASection
        eyebrow="Start With Clarity"
        title="Let us guide your next move"
        text="Whether you are buying, leasing, selling, or planning a turnkey project, OMProperties can help you move with confidence."
        image={PROPERTIES_HERO_IMAGE}
      >
        <Link className="public-button primary" to="/contact">Talk to an Advisor</Link>
        <Link className="public-button secondary" to="/properties">Browse Properties</Link>
      </CTASection>
    </div>
  )
}
