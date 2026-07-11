import { memo } from 'react'
import { Link } from 'react-router-dom'
import { APP_CONFIG } from '../../constants/appConfig'
import { CONTACT_EMAIL, PHONE_NUMBER } from '../../constants/contact'
import { FOOTER_ITEMS } from '../../constants/navigation'
import footerLogo from '../../assets/omproperties-logo-full.png'

const quickLinks = [
  ['Properties', '/properties'],
  ['Saved Properties', '/saved-properties'],
  ['Turnkey', '/turnkey'],
  ['Cost Estimator', '/turnkey-cost-estimator'],
  ['Insights', '/insights'],
  ['About', '/about'],
  ['Contact', '/contact'],
]

const socialLinks = ['Instagram', 'Facebook', 'LinkedIn']

export const PublicFooter = memo(function PublicFooter() {
  return (
    <footer className="public-footer">
      <div className="public-footer-grid">
        <div>
          <Link className="public-footer-brand" to="/">
            <img className="public-footer-logo" src={footerLogo} alt={`${APP_CONFIG.appName} logo`} />
          </Link>
          <p>
            Premium real estate advisory and turnkey project execution for buyers, sellers, investors, and owners.
          </p>
        </div>

        <div>
          <h3>Quick Links</h3>
          <ul>
            {quickLinks.map(([label, to]) => (
              <li key={label}>
                <Link to={to}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Contact</h3>
          <p>{PHONE_NUMBER}</p>
          <p>{CONTACT_EMAIL}</p>
          <p>{APP_CONFIG.officeAddress}</p>
          <div className="public-footer-trust" aria-label="Trust highlights">
            <span>Verified Listings</span>
            <span>Legal Support</span>
            <span>Turnkey Execution</span>
          </div>
          <div className="public-socials">
            {socialLinks.map((item) => (
              <a key={item} href="/" aria-label={item}>
                {item.slice(0, 2)}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3>Map</h3>
          <iframe
            src={APP_CONFIG.googleMapUrl}
            title="OMProperties location map"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
          <form className="public-newsletter" aria-label="Newsletter signup">
            <input type="email" placeholder="Email for property updates" aria-label="Email for property updates" />
            <button type="button">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="public-footer-bottom">
        <span>Copyright {new Date().getFullYear()} OMProperties. All rights reserved.</span>
        <span>{FOOTER_ITEMS.join(' • ')}</span>
      </div>
    </footer>
  )
})
