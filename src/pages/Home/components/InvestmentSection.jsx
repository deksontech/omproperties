import { Link } from 'react-router-dom'
import { getPhoneHref } from '../../../constants/contact'
import { homeImages, investmentPills } from '../homeContent'

export function InvestmentSection() {
  return (
    <section className="luxury-invest fade-up">
      <img src={homeImages.investment} alt="Premium investment property" />
      <div>
        <p className="luxury-kicker">Why Invest With Us</p>
        <h2>Build a portfolio with clarity, location intelligence, and disciplined execution.</h2>
        <p>
          OMProperties helps investors evaluate residential homes, commercial spaces, plots, and rental
          yield opportunities with a practical view of demand, documentation, exit potential, and upkeep.
        </p>
        <div className="luxury-invest-pills">
          {investmentPills.map(([item, Icon]) => (
            <span key={item}>
              <Icon size={16} /> {item}
            </span>
          ))}
        </div>
        <div className="luxury-actions">
          <Link className="luxury-button luxury-button--gold" to="/about">
            Learn More
          </Link>
          <a className="luxury-button luxury-button--outline" href={getPhoneHref()}>
            Contact Advisor
          </a>
        </div>
      </div>
    </section>
  )
}
