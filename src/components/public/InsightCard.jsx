import { memo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export const InsightCard = memo(function InsightCard({ insight }) {
  return (
    <article className="insight-card">
      <Link to={`/insights/${insight.slug}`}>
        <img src={insight.image} alt={insight.title} />
      </Link>
      <div>
        <span>{insight.category}</span>
        <h3>
          <Link to={`/insights/${insight.slug}`}>{insight.title}</Link>
        </h3>
        <p>{insight.summary}</p>
        <Link className="premium-text-link" to={`/insights/${insight.slug}`}>
          Read Insight <ArrowRight size={15} />
        </Link>
      </div>
    </article>
  )
})
