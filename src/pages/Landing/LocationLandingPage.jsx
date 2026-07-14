import { Link, useParams } from 'react-router-dom'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { CTASection } from '../../components/public/CTASection'
import { EmptyState } from '../../components/public/EmptyState'
import { FAQSection } from '../../components/public/FAQSection'
import { PageHero } from '../../components/public/PageHero'
import { SiteVisitButton } from '../../components/public/SiteVisitButton'
import { PropertyGrid } from '../../components/property/PropertyGrid'
import { getLandingPageBySlug } from '../../constants/landingPages'
import { HERO_IMAGE } from '../../constants/pageContent'
import { useProperties } from '../../hooks/useProperties'
import { useSeo } from '../../hooks/useSeo'

const normalize = (value = '') => String(value).toLowerCase().replace(/[-_]/g, ' ').trim()

const propertyMatches = (property, filters = []) =>
  filters.every((filter) => {
    const propertyValue = normalize(property[filter.field])
    const expectedValue = normalize(filter.equals || filter.includes)

    if (filter.equals) {
      return propertyValue === expectedValue
    }

    return propertyValue.includes(expectedValue)
  })

export function LocationLandingPage() {
  const { slug } = useParams()
  const page = getLandingPageBySlug(slug)
  const { error, loading, properties } = useProperties()

  useSeo({
    title: page?.seoTitle || 'Location not found | OMProperties',
    description: page?.seoDescription || 'The requested OMProperties location page could not be found.',
  })

  if (!page) {
    return (
      <div className="public-page">
        <section className="public-section">
          <EmptyState
            title="Page not found."
            message="This location page is not available yet."
            action={<Link className="public-button primary" to="/properties">Browse Properties</Link>}
          />
        </section>
      </div>
    )
  }

  const matchingProperties = properties.filter((property) => propertyMatches(property, page.filters)).slice(0, 6)

  return (
    <div className="public-page location-landing-page">
      <PageHero eyebrow={page.eyebrow} title={page.title} subtitle={page.subtitle} image={page.image} />

      <section className="public-section compact">
        <div className="landing-intro-grid">
          <article className="premium-card landing-intro-card">
            <p className="eyebrow">Why OMProperties</p>
            <h2>Local guidance, verified options, and complete execution support.</h2>
            <p>
              OMProperties helps you move from search to site visit, documentation, negotiation, and turnkey execution
              through one advisory workflow.
            </p>
            <div className="landing-actions">
              <Link className="public-button primary" to={page.searchLink}>
                View Matching Listings <ArrowRight size={17} />
              </Link>
              <SiteVisitButton className="public-button secondary" />
            </div>
          </article>

          <div className="landing-highlight-list">
            {page.highlights.map((highlight) => (
              <article className="premium-card" key={highlight}>
                <CheckCircle2 aria-hidden="true" />
                <span>{highlight}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="public-section compact">
        <div className="public-section-header">
          <div>
            <p className="eyebrow">Available Options</p>
            <h2>Relevant listings</h2>
          </div>
          <Link className="public-button secondary" to={page.searchLink}>Explore All</Link>
        </div>

        {loading ? (
          <EmptyState title="Loading listings..." message="Please wait while we fetch the latest available properties." />
        ) : error ? (
          <EmptyState title="Unable to load listings." message={error} />
        ) : matchingProperties.length > 0 ? (
          <PropertyGrid properties={matchingProperties} />
        ) : (
          <EmptyState
            title="No matching listings available right now."
            message="Share your requirement and OMProperties will help shortlist suitable options."
            action={<Link className="public-button primary" to="/contact">Send Requirement</Link>}
          />
        )}
      </section>

      <FAQSection faqs={page.faqs} title={`${page.eyebrow} questions`} />

      <CTASection
        eyebrow="Advisor Support"
        title="Need help shortlisting the right option?"
        text="Share your preferred location, budget, and purpose. OMProperties will help you compare practical choices."
        image={HERO_IMAGE}
      >
        <Link to="/contact">Contact Advisor</Link>
        <SiteVisitButton className="public-button secondary" />
      </CTASection>
    </div>
  )
}
