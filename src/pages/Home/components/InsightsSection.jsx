import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { InsightCard } from '../../../components/public/InsightCard'
import { insights } from '../../../constants/publicContent'
import { LuxurySection } from './LuxurySection'

export function InsightsSection() {
  return (
    <LuxurySection eyebrow="Insights" title="Guidance for better property decisions">
      <div className="luxury-section-action">
        <Link to="/insights">
          View All Insights <ArrowRight size={16} />
        </Link>
      </div>
      <div className="insight-grid">
        {insights.slice(0, 3).map((insight) => (
          <InsightCard insight={insight} key={insight.slug} />
        ))}
      </div>
    </LuxurySection>
  )
}
