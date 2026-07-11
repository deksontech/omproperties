import { Link, useParams } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Breadcrumb } from '../../components/public/Breadcrumb'
import { CTASection } from '../../components/public/CTASection'
import { EmptyState } from '../../components/public/EmptyState'
import { PageHero } from '../../components/public/PageHero'
import { SiteVisitButton } from '../../components/public/SiteVisitButton'
import { TrustBadges } from '../../components/public/TrustBadges'
import { getInsightBySlug, insights } from '../../constants/publicContent'
import { useSeo } from '../../hooks/useSeo'

export function InsightDetailsPage() {
  const { slug } = useParams()
  const insight = getInsightBySlug(slug)

  useSeo({
    title: insight ? `${insight.title} | OMProperties Insights` : 'Insight not found | OMProperties',
    description: insight?.summary || 'The requested OMProperties insight could not be found.',
  })

  if (!insight) {
    return (
      <div className="public-page">
        <section className="public-section">
          <EmptyState
            title="Insight not found."
            message="The article you are looking for may have moved or the link may be incorrect."
            action={<Link className="public-button primary" to="/insights">Browse Insights</Link>}
          />
        </section>
      </div>
    )
  }

  const relatedInsights = insights.filter((item) => item.slug !== insight.slug).slice(0, 3)

  return (
    <div className="public-page">
      <Breadcrumb
        items={[
          { label: 'Home', to: '/' },
          { label: 'Insights', to: '/insights' },
          { label: insight.title },
        ]}
      />
      <PageHero eyebrow={insight.category} title={insight.title} subtitle={insight.summary} image={insight.image} />
      <section className="public-section insight-detail-layout">
        <article className="insight-article">
          <TrustBadges compact />
          {insight.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="public-cta-actions">
            <SiteVisitButton className="public-button primary" label="Discuss With Advisor" />
            <Link className="public-button secondary" to="/properties">
              Explore Properties <ArrowRight size={16} />
            </Link>
          </div>
        </article>
        <aside className="insight-related">
          <h2>Related insights</h2>
          {relatedInsights.map((item) => (
            <Link key={item.slug} to={`/insights/${item.slug}`}>
              <span>{item.category}</span>
              <strong>{item.title}</strong>
            </Link>
          ))}
        </aside>
      </section>
      <CTASection
        eyebrow="Advisory"
        title="Need help applying this to your property decision?"
        text="Speak with OMProperties for buying, leasing, investment, documentation, and turnkey planning."
        image={insight.image}
      >
        <SiteVisitButton className="public-button primary" label="Schedule Consultation" />
        <Link className="public-button secondary" to="/contact">Contact Team</Link>
      </CTASection>
    </div>
  )
}
