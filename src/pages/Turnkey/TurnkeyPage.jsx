import { Link } from 'react-router-dom'
import { CTASection } from '../../components/public/CTASection'
import { EmptyState } from '../../components/public/EmptyState'
import { FAQSection } from '../../components/public/FAQSection'
import { PageHero } from '../../components/public/PageHero'
import { SectionHeader } from '../../components/public/SectionHeader'
import { SkeletonGrid } from '../../components/public/SkeletonGrid'
import { TrustBadges } from '../../components/public/TrustBadges'
import { ServiceGrid } from '../../components/turnkey/ServiceGrid'
import { TURNKEY_HERO_IMAGE } from '../../constants/pageContent'
import { turnkeyFaqs } from '../../constants/publicContent'
import { SEO } from '../../constants/seo'
import { useSeo } from '../../hooks/useSeo'
import { useTurnkey } from '../../hooks/useTurnkey'

export function TurnkeyPage() {
  const { activeServices, error, loading } = useTurnkey()

  useSeo(SEO.turnkey)

  return (
    <div className="public-page">
      <PageHero
        eyebrow="Turnkey Projects"
        title="Project execution with premium finish control"
        subtitle="Electrical, interior, exterior, and carpentry services coordinated through one accountable team."
        image={TURNKEY_HERO_IMAGE}
      />
      <section className="section">
        <SectionHeader
          eyebrow="Services"
          title="Complete turnkey solutions"
          subtitle="Plan, manage, and execute your property improvement with experienced project partners."
        />
        <TrustBadges compact />
        {loading ? (
          <SkeletonGrid count={4} type="service" />
        ) : error ? (
          <EmptyState title="Unable to load services." message={error} />
        ) : activeServices.length > 0 ? (
          <ServiceGrid services={activeServices} />
        ) : (
          <EmptyState title="No services found." message="Turnkey services will appear here once they are active." />
        )}
      </section>
      <FAQSection faqs={turnkeyFaqs} title="Turnkey project questions" />
      <CTASection
        eyebrow="Project Advisory"
        title="Need a complete execution partner?"
        text="Discuss your site, scope, timeline, and budget with OMProperties."
        image={TURNKEY_HERO_IMAGE}
      >
        <Link className="public-button primary" to="/contact">Start Consultation</Link>
        <Link className="public-button secondary" to="/turnkey-cost-estimator">Estimate Project Cost</Link>
        <Link className="public-button secondary" to="/properties">Explore Properties</Link>
      </CTASection>
    </div>
  )
}
