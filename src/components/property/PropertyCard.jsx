import { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Bath, BedDouble, Building2, CalendarCheck, Heart, MapPin, Scale, Share2, ShieldCheck, Star } from 'lucide-react'
import { usePropertyCompare } from '../../hooks/usePropertyCompare'
import { useSavedProperties } from '../../hooks/useSavedProperties'
import { useSiteVisit } from '../../context/SiteVisitContext'

export const PropertyCard = memo(function PropertyCard({ property, compact = false }) {
  const { isSaved, toggleSaved } = useSavedProperties()
  const { isCompared, toggleCompare } = usePropertyCompare()
  const { openSiteVisit } = useSiteVisit()
  const saved = isSaved(property.id)
  const compared = isCompared(property.id)
  const [copied, setCopied] = useState(false)

  const shareProperty = async () => {
    const url = `${window.location.origin}/property/${property.slug}`
    try {
      if (navigator.share) {
        await navigator.share({ title: property.title, text: property.location, url })
      } else {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        window.setTimeout(() => setCopied(false), 1800)
      }
    } catch {
      setCopied(false)
    }
  }

  return (
    <article className={compact ? 'property-card compact' : 'property-card'}>
      <Link to={`/property/${property.slug}`} className="property-image">
        <img src={property.images[0]} alt={property.title} loading="lazy" />
        {property.featured && (
          <span className="badge">
            <Star size={14} /> Featured
          </span>
        )}
        {(property.verified ?? true) && (
          <span className="verified-badge">
            <ShieldCheck size={14} /> Verified
          </span>
        )}
      </Link>
      <div className="property-card-actions">
        <button type="button" className={saved ? 'active' : ''} onClick={() => toggleSaved(property.id)} aria-label={saved ? `Remove ${property.title} from saved properties` : `Save ${property.title}`}>
          <Heart size={17} fill={saved ? 'currentColor' : 'none'} />
        </button>
        <button type="button" className={compared ? 'active' : ''} onClick={() => toggleCompare(property.id)} aria-label={compared ? `Remove ${property.title} from comparison` : `Compare ${property.title}`}>
          <Scale size={17} />
        </button>
        <button type="button" className={copied ? 'active' : ''} onClick={shareProperty} aria-label={`Share ${property.title}`}>
          <Share2 size={17} />
        </button>
      </div>
      <div className="property-body">
        <div className="meta-row">
          <span>{property.purpose}</span>
          <span>{property.category}</span>
          <span>{property.status || 'Available'}</span>
        </div>
        <h3>
          <Link to={`/property/${property.slug}`}>{property.title}</Link>
        </h3>
        <p className="location">
          <MapPin size={16} /> {property.location}
        </p>
        <strong className="price">{property.price}</strong>
        <div className="specs">
          <span>
            <Building2 size={16} /> {property.type}
          </span>
          {property.bedrooms > 0 && (
            <span>
              <BedDouble size={16} /> {property.bedrooms} Beds
            </span>
          )}
          {property.bathrooms > 0 && (
            <span>
              <Bath size={16} /> {property.bathrooms} Baths
            </span>
          )}
          <span>{property.size}</span>
        </div>
        <div className="property-card-cta">
          <Link className="button primary" to={`/property/${property.slug}`}>View Details</Link>
          <button
            className="button muted"
            type="button"
            onClick={() => openSiteVisit({ propertyName: property.title, sourcePage: `/property/${property.slug}` })}
          >
            <CalendarCheck size={16} /> Site Visit
          </button>
        </div>
      </div>
    </article>
  )
})
