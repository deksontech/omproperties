import { Link } from 'react-router-dom'
import { CTASection } from '../../components/public/CTASection'
import { EmptyState } from '../../components/public/EmptyState'
import { TrustBadges } from '../../components/public/TrustBadges'
import { PROPERTIES_HERO_IMAGE } from '../../constants/pageContent'
import { useSeo } from '../../hooks/useSeo'

export function NotFoundPage() {
  useSeo({
    title: 'Page not found | OMProperties',
    description: 'The requested OMProperties page could not be found.',
  })

  return (
    <div className="public-page">
      <section className="public-page-hero">
        <img src={PROPERTIES_HERO_IMAGE} alt="" aria-hidden="true" />
        <div>
          <p className="eyebrow">404</p>
          <h1>Page not found.</h1>
          <p>The page you are looking for may have moved or the link may be incorrect.</p>
        </div>
      </section>
      <section className="public-section">
        <TrustBadges compact />
        <EmptyState
          title="Let us get you back on track."
          message="Explore properties or contact OMProperties for direct assistance."
          action={
            <div className="public-cta-actions">
              <Link className="public-button primary" to="/properties">Browse Properties</Link>
              <Link className="public-button secondary" to="/contact">Contact Us</Link>
            </div>
          }
        />
      </section>
      <CTASection
        eyebrow="OMProperties"
        title="A complete property advisory and turnkey execution partner"
        text="Return to verified properties, turnkey services, or contact our team for guidance."
        image={PROPERTIES_HERO_IMAGE}
      >
        <Link className="public-button primary" to="/properties">View Properties</Link>
        <Link className="public-button secondary" to="/turnkey">Turnkey Services</Link>
      </CTASection>
    </div>
  )
}
