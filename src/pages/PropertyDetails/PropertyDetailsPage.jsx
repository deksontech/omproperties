import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowRight,
  Bath,
  BedDouble,
  Building2,
  CalendarCheck,
  Check,
  Download,
  FileCheck2,
  MapPin,
  Ruler,
  Share2,
  ShieldCheck,
} from 'lucide-react'
import { EmiCalculator } from '../../components/property/EmiCalculator'
import { PropertyCard } from '../../components/property/PropertyCard'
import { PropertyGallery } from '../../components/property/PropertyGallery'
import { PropertyRail } from '../../components/property/PropertyRail'
import { EnquiryForm } from '../../components/common/EnquiryForm'
import { Breadcrumb } from '../../components/public/Breadcrumb'
import { EmptyState } from '../../components/public/EmptyState'
import { SiteVisitButton } from '../../components/public/SiteVisitButton'
import { TrustBadges } from '../../components/public/TrustBadges'
import { CTAButtons } from '../../components/ui/CTAButtons'
import { useProperties } from '../../hooks/useProperties'
import { usePropertyCompare } from '../../hooks/usePropertyCompare'
import { useRecentlyViewed } from '../../hooks/useRecentlyViewed'
import { useSavedProperties } from '../../hooks/useSavedProperties'
import { useSeo } from '../../hooks/useSeo'
import './PropertyDetailsPage.css'

export function PropertyDetailsPage() {
  const { slug } = useParams()
  const [shareMessage, setShareMessage] = useState('')
  const { error, loading, properties } = useProperties()
  const { isSaved, toggleSaved } = useSavedProperties()
  const { isCompared, toggleCompare } = usePropertyCompare()
  const property = useMemo(() => properties.find((item) => item.slug === slug), [properties, slug])
  const { addRecentlyViewed, recentProperties } = useRecentlyViewed(properties, property?.id)
  const similarProperties = useMemo(
    () =>
      property
        ? properties
            .filter((item) => item.id !== property.id && (item.type === property.type || item.category === property.category))
            .slice(0, 3)
        : [],
    [properties, property],
  )

  useSeo({
    title: property ? `${property.title} | OMProperties` : 'Property not found | OMProperties',
    description: property
      ? `${property.title} in ${property.location}. ${property.description}`
      : 'The requested OMProperties listing could not be found.',
  })

  useEffect(() => {
    if (property) {
      addRecentlyViewed(property.id)
    }
  }, [addRecentlyViewed, property])

  if (loading) {
    return (
      <div className="premium-property-page public-page">
        <section className="public-section">
          <EmptyState title="Loading property..." message="Please wait while we prepare the listing details." />
        </section>
      </div>
    )
  }

  if (error) {
    return (
      <div className="premium-property-page public-page">
        <section className="public-section">
          <EmptyState title="Unable to load property." message={error} />
        </section>
      </div>
    )
  }

  if (!property) {
    return <PropertyNotFound />
  }

  const shareProperty = async () => {
    const url = window.location.href

    if (navigator.share) {
      await navigator.share({ title: property.title, text: property.description, url })
      return
    }

    await navigator.clipboard.writeText(url)
    setShareMessage('Property link copied.')
  }

  return (
    <div className="premium-property-page public-page">
      <Breadcrumb
        items={[
          { label: 'Home', to: '/' },
          { label: 'Properties', to: '/properties' },
          { label: property.title },
        ]}
      />

      <section className="premium-property-hero">
        <img src={property.images[0]} alt={property.title} />
        <div className="premium-property-hero__overlay" />
        <div className="premium-property-hero__content">
          <div>
            <div className="property-badge-row">
              <span className="purpose-badge">{property.purpose}</span>
              {(property.verified ?? true) && (
                <span className="detail-verified-badge">
                  <ShieldCheck size={16} /> Verified Property
                </span>
              )}
            </div>
            <h1>{property.title}</h1>
            <p>
              <MapPin size={18} /> {property.location}
            </p>
          </div>
          <aside className="premium-price-panel">
            <span>Listed Price</span>
            <strong>{property.price}</strong>
            <p>{property.type} / {property.category}</p>
            <SiteVisitButton propertyName={property.title} className="button primary" />
            <div className="property-detail-actions">
              <button className="button ghost" type="button" onClick={() => toggleSaved(property.id)}>
                {isSaved(property.id) ? 'Saved' : 'Save'}
              </button>
              <button className="button ghost" type="button" onClick={() => toggleCompare(property.id)}>
                {isCompared(property.id) ? 'Comparing' : 'Compare'}
              </button>
            </div>
          </aside>
        </div>
      </section>

      <PropertyGallery images={property.images} title={property.title} />

      <section className="premium-detail-layout">
        <article className="premium-detail-main">
          <TrustBadges compact />
          <PropertyOverview property={property} />

          <DetailSection title="Description">
            <p>{property.description}</p>
          </DetailSection>

          <PropertyFacts property={property} />

          <DetailSection title="Amenities">
            <div className="premium-amenities">
              {property.amenities.map((amenity) => (
                <span key={amenity}>
                  <Check size={16} /> {amenity}
                </span>
              ))}
            </div>
          </DetailSection>

          <DetailSection title="Verification & Legal Note">
            <p>{property.legalNote || property.reraNumber || property.rera || 'Verification assistance available.'}</p>
          </DetailSection>

          {property.nearbyPlaces?.length > 0 && (
            <DetailSection title="Nearby Places">
              <div className="premium-amenities">
                {property.nearbyPlaces.map((place) => (
                  <span key={place}>
                    <MapPin size={16} /> {place}
                  </span>
                ))}
              </div>
            </DetailSection>
          )}

          {property.videoUrl && <VideoTour videoUrl={property.videoUrl} title={property.title} />}

          <EmiCalculator property={property} />

          <DetailSection title="Location">
            <div className="premium-location-panel">
              <div>
                <MapPin size={20} />
                <p>{property.location}</p>
              </div>
              <iframe className="premium-map" src={property.map} title={`${property.title} map`} loading="lazy" />
            </div>
          </DetailSection>
        </article>

        <aside className="premium-contact-card" id="property-enquiry">
          <div className="premium-contact-intro">
            <p className="eyebrow">Speak To An Advisor</p>
            <h2>Interested in this property?</h2>
            <p>Share your details and OMProperties will help with site visits, pricing clarity, and documentation.</p>
          </div>
          <div className="advisor-highlights">
            <span>
              <CalendarCheck size={16} /> Site visit coordination
            </span>
            <span>
              <FileCheck2 size={16} /> Legal verification support
            </span>
            <span>
              <ShieldCheck size={16} /> Transparent pricing guidance
            </span>
          </div>
          <div className="property-share-actions">
            <button className="button muted" type="button" onClick={shareProperty}>
              <Share2 size={16} /> Share Property
            </button>
            {property.brochureUrl && (
              <a className="button muted" href={property.brochureUrl} target="_blank" rel="noreferrer">
                <Download size={16} /> Download Brochure
              </a>
            )}
          </div>
          {shareMessage && <p className="form-status success">{shareMessage}</p>}
          <EnquiryForm
            propertyName={property.title}
            source="Property Detail Page"
            sourcePage={`/property/${property.slug}`}
            title="Property Enquiry"
          />
          <SiteVisitButton propertyName={property.title} className="button dark" />
          <CTAButtons subject={property.title} />
        </aside>
      </section>

      {similarProperties.length > 0 && <SimilarProperties properties={similarProperties} />}
      <PropertyRail title="Recently viewed properties" eyebrow="Recently Viewed" properties={recentProperties} />
    </div>
  )
}

function PropertyFacts({ property }) {
  const facts = [
    ['RERA', property.reraNumber],
    ['Furnishing', property.furnishing],
    ['Parking', property.parking],
    ['Age of Property', property.ageOfProperty],
    ['Possession', property.possessionStatus],
    ['Facing', property.facing],
    ['Floor', property.floorNumber && property.totalFloors ? `${property.floorNumber} of ${property.totalFloors}` : property.floorNumber],
  ].filter(([, value]) => value)

  if (!facts.length) return null

  return (
    <DetailSection title="Property Facts">
      <div className="property-facts-grid">
        {facts.map(([label, value]) => (
          <article key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </article>
        ))}
      </div>
    </DetailSection>
  )
}

function getVideoEmbedUrl(url) {
  try {
    const parsedUrl = new URL(url)

    if (parsedUrl.hostname.includes('youtube.com')) {
      const id = parsedUrl.searchParams.get('v')
      return id ? `https://www.youtube.com/embed/${id}` : ''
    }

    if (parsedUrl.hostname.includes('youtu.be')) {
      return `https://www.youtube.com/embed/${parsedUrl.pathname.slice(1)}`
    }

    return parsedUrl.protocol === 'https:' ? url : ''
  } catch {
    return ''
  }
}

function VideoTour({ videoUrl, title }) {
  const embedUrl = getVideoEmbedUrl(videoUrl)

  if (!embedUrl) return null

  return (
    <DetailSection title="Video Tour">
      <div className="video-tour">
        <iframe src={embedUrl} title={`${title} video tour`} loading="lazy" allowFullScreen />
      </div>
    </DetailSection>
  )
}

function PropertyOverview({ property }) {
  const overview = [
    ['Bedrooms', property.bedrooms || 'NA', BedDouble],
    ['Bathrooms', property.bathrooms || 'NA', Bath],
    ['Area', property.size, Ruler],
    ['Property Type', property.type, Building2],
  ]

  return (
    <section className="premium-overview-grid" aria-label="Property overview">
      {overview.map(([label, value, Icon]) => (
        <article key={label}>
          <Icon size={24} />
          <span>{label}</span>
          <strong>{value}</strong>
        </article>
      ))}
    </section>
  )
}

function DetailSection({ title, children }) {
  return (
    <section className="premium-detail-section">
      <h2>{title}</h2>
      {children}
    </section>
  )
}

function SimilarProperties({ properties }) {
  return (
    <section className="similar-properties-section">
      <div className="section-heading">
        <p className="eyebrow">Similar Properties</p>
        <h2>You may also like</h2>
      </div>
      <div className="similar-property-grid">
        {properties.map((property) => (
          <PropertyCard property={property} key={property.id} compact />
        ))}
      </div>
    </section>
  )
}

function PropertyNotFound() {
  return (
    <div className="premium-property-page public-page">
      <section className="public-section">
        <EmptyState
          title="Property not found."
          message="The property you are looking for may have been removed or the link may be incorrect."
          action={
            <Link className="button primary" to="/properties">
              Browse Properties <ArrowRight size={18} />
            </Link>
          }
        />
      </section>
    </div>
  )
}
