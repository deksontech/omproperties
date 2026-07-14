import { memo, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ChevronDown, Menu, Phone, X } from 'lucide-react'
import { APP_CONFIG } from '../../constants/appConfig'
import { getPhoneHref } from '../../constants/contact'
import { useSavedProperties } from '../../hooks/useSavedProperties'
import headerLogo from '../../assets/omproperties-logo-header.png'

const propertyMenu = [
  ['Buy Property', 'Verified homes and investment assets', '/properties?purpose=buy'],
  ['Rent Property', 'Ready rental homes and workspaces', '/properties?purpose=rent'],
  ['Bhiwadi Properties', 'Local flats, plots, and investments', '/locations/properties-in-bhiwadi'],
  ['SH-25 Plots', 'Bhiwadi-Tijara highway launch options', '/locations/plots-on-bhiwadi-tijara-highway'],
  ['Sector 16 Flats', 'Apartment projects in Bhiwadi', '/locations/flats-in-sector-16-bhiwadi'],
  ['Commercial', 'Retail, office, and land opportunities', '/properties?category=commercial'],
]

const turnkeyMenu = [
  ['All Services', 'Complete execution support', '/turnkey'],
  ['Interior', 'Premium interior execution', '/turnkey/interior'],
  ['Electrical', 'Electrical planning and delivery', '/turnkey/electrical'],
  ['Estimator', 'Approximate project budgeting', '/turnkey-cost-estimator'],
]

export const PublicHeader = memo(function PublicHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const { savedCount } = useSavedProperties()

  const closeMenu = () => setIsOpen(false)

  return (
    <header className="public-header">
      <Link className="public-brand" to="/" onClick={closeMenu}>
        <img className="public-brand-logo" src={headerLogo} alt={`${APP_CONFIG.appName} logo`} />
      </Link>

      <nav className={`public-nav ${isOpen ? 'open' : ''}`} aria-label="Primary navigation">
        <NavLink to="/" onClick={closeMenu}>Home</NavLink>

        <div className="public-nav-group">
          <NavLink to="/properties" onClick={closeMenu}>
            Properties <ChevronDown size={15} />
          </NavLink>
          <div className="public-mega-menu">
            {propertyMenu.map(([label, description, to]) => (
              <Link key={label} to={to} onClick={closeMenu}>
                <strong>{label}</strong>
                <small>{description}</small>
              </Link>
            ))}
          </div>
        </div>

        <NavLink to="/saved-properties" onClick={closeMenu}>
          Saved
          {savedCount > 0 && <span className="nav-count-badge">{savedCount}</span>}
        </NavLink>

        <div className="public-nav-group">
          <NavLink to="/turnkey" onClick={closeMenu}>
            Turnkey <ChevronDown size={15} />
          </NavLink>
          <div className="public-mega-menu">
            {turnkeyMenu.map(([label, description, to]) => (
              <Link key={label} to={to} onClick={closeMenu}>
                <strong>{label}</strong>
                <small>{description}</small>
              </Link>
            ))}
          </div>
        </div>

        <NavLink to="/insights" onClick={closeMenu}>Insights</NavLink>
        <NavLink to="/about" onClick={closeMenu}>About</NavLink>
        <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
      </nav>

      <div className="public-header-actions">
        <a className="public-nav-call" href={getPhoneHref()}>
          <Phone size={17} /> Call Now
        </a>
        <button
          className="public-menu-button"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  )
})
