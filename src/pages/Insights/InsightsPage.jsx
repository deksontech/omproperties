import { InsightCard } from '../../components/public/InsightCard'
import { PageHero } from '../../components/public/PageHero'
import { SectionHeader } from '../../components/public/SectionHeader'
import { TrustBadges } from '../../components/public/TrustBadges'
import { insights } from '../../constants/publicContent'
import { SEO } from '../../constants/seo'
import { useSeo } from '../../hooks/useSeo'

export function InsightsPage() {
  useSeo(SEO.insights)

  return (
    <div className="public-page">
      <PageHero
        eyebrow="Insights"
        title="Property guidance for better decisions"
        subtitle="Practical thinking on buying, renting, investing, turnkey execution, and commercial property planning."
        image={insights[0].image}
      />
      <section className="public-section">
        <SectionHeader
          eyebrow="Latest"
          title="Real estate and turnkey insights"
          subtitle="Simple, useful guides for clients who want clarity before they commit."
        />
        <TrustBadges compact />
        <div className="insight-grid">
          {insights.map((insight) => (
            <InsightCard insight={insight} key={insight.slug} />
          ))}
        </div>
      </section>
    </div>
  )
}
