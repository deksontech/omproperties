import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { LuxurySection } from './LuxurySection'

const getHomeServiceTitle = (title) => {
  if (title === 'Interior') return 'Interior Design'
  if (title === 'Exterior') return 'Exterior Development'
  return title
}

export function TurnkeyHomeSection({ services }) {
  return (
    <LuxurySection eyebrow="Turnkey Project Services" title="Design, execute, and finish your space with one accountable team">
      <div className="luxury-service-grid">
        {services.map((service) => (
          <Link className="luxury-service-card" to={`/turnkey/${service.slug}`} key={service.id}>
            <img src={service.hero} alt={service.title} />
            <div>
              <h3>{getHomeServiceTitle(service.title)}</h3>
              <p>{service.summary}</p>
              <span>
                Explore <ArrowRight size={16} />
              </span>
            </div>
          </Link>
        ))}
      </div>
      <div className="luxury-section-action">
        <Link to="/turnkey-cost-estimator">
          Estimate Turnkey Cost <ArrowRight size={16} />
        </Link>
      </div>
    </LuxurySection>
  )
}
