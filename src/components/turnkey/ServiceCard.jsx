import { memo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck } from 'lucide-react'

export const ServiceCard = memo(function ServiceCard({ service }) {
  return (
    <Link className="service-card" to={`/turnkey/${service.slug}`}>
      <span className="service-card__media">
        <img src={service.hero} alt={service.title} loading="lazy" />
        {service.featured && (
          <span className="verified-badge">
            <ShieldCheck size={14} /> Featured
          </span>
        )}
      </span>
      <div>
        <p className="eyebrow">Service</p>
        <h2>{service.title}</h2>
        <p>{service.summary}</p>
        <span>
          View Service <ArrowRight size={16} />
        </span>
      </div>
    </Link>
  )
})
