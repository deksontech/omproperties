import { Link } from 'react-router-dom'
import { ArrowRight, Check, Phone } from 'lucide-react'
import { getPhoneHref } from '../../../constants/contact'
import { heroStats, homeImages, trustBadges } from '../homeContent'

export function LuxuryHero() {
  return (
    <section className="luxury-hero">
      <img src={homeImages.hero} alt="" />
      <div className="luxury-hero__overlay" />
      <div className="luxury-hero__inner">
        <div className="luxury-hero__copy fade-up">
          <p className="luxury-kicker">Premium Property Advisory & Turnkey Execution</p>
          <h1>Find the Right Property. Build with Confidence.</h1>
          <p>OMProperties helps you buy, sell, rent, lease, and execute turnkey projects through one trusted advisory partner.</p>
          <div className="luxury-actions">
            <Link className="luxury-button luxury-button--gold" to="/properties">
              Explore Properties <ArrowRight size={18} />
            </Link>
            <a className="luxury-button luxury-button--glass" href={getPhoneHref()}>
              Talk to an Expert <Phone size={18} />
            </a>
          </div>
          <div className="luxury-trust-row">
            {trustBadges.map((badge) => (
              <span key={badge}>
                <Check size={16} /> {badge}
              </span>
            ))}
          </div>
        </div>
        <div className="luxury-stat-cloud" aria-label="OMProperties highlights">
          {heroStats.map(([value, label], index) => (
            <div className="luxury-glass-card" style={{ '--delay': `${index * 0.35}s` }} key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
