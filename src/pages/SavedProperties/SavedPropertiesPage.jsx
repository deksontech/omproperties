import { Link } from 'react-router-dom'
import { Trash2 } from 'lucide-react'
import { EmptyState } from '../../components/public/EmptyState'
import { PageHero } from '../../components/public/PageHero'
import { PropertyCard } from '../../components/property/PropertyCard'
import { PropertyRail } from '../../components/property/PropertyRail'
import { PROPERTIES_HERO_IMAGE } from '../../constants/pageContent'
import { useProperties } from '../../hooks/useProperties'
import { useRecentlyViewed } from '../../hooks/useRecentlyViewed'
import { useSavedProperties } from '../../hooks/useSavedProperties'
import { useSeo } from '../../hooks/useSeo'
import './SavedPropertiesPage.css'

export function SavedPropertiesPage() {
  const { properties } = useProperties()
  const { clearSaved, savedCount, savedIds } = useSavedProperties()
  const savedProperties = savedIds.map((id) => properties.find((property) => property.id === id)).filter(Boolean)
  const { recentProperties } = useRecentlyViewed(properties)

  useSeo({
    title: 'Saved Properties | OMProperties',
    description: 'Review your saved OMProperties listings and recently viewed properties.',
  })

  return (
    <div className="public-page saved-properties-page">
      <PageHero
        eyebrow="Saved Properties"
        title="Your shortlisted properties"
        subtitle="Keep track of homes, plots, and commercial spaces you want to revisit."
        image={PROPERTIES_HERO_IMAGE}
      />
      <section className="public-section">
        <div className="saved-properties-head">
          <div>
            <p className="eyebrow">Shortlist</p>
            <h2>{savedCount} saved {savedCount === 1 ? 'property' : 'properties'}</h2>
          </div>
          {savedCount > 0 && (
            <button className="public-button secondary" type="button" onClick={clearSaved}>
              <Trash2 size={17} /> Clear All
            </button>
          )}
        </div>
        {savedProperties.length > 0 ? (
          <div className="property-grid">
            {savedProperties.map((property) => (
              <PropertyCard property={property} key={property.id} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No saved properties yet."
            message="Save properties from listings or detail pages and they will appear here."
            action={<Link className="public-button primary" to="/properties">Browse Properties</Link>}
          />
        )}
      </section>
      <PropertyRail title="Recently viewed properties" eyebrow="Recently Viewed" properties={recentProperties} />
    </div>
  )
}
