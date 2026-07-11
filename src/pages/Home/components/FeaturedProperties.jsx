import { PropertyCard } from '../../../components/property/PropertyCard'
import { LuxurySection } from './LuxurySection'

export function FeaturedProperties({ properties }) {
  return (
    <LuxurySection eyebrow="Featured Properties" title="Handpicked listings for elevated living and investment">
      <div className="luxury-featured-grid">
        {properties.slice(0, 3).map((property) => (
          <PropertyCard property={property} key={property.id} />
        ))}
      </div>
    </LuxurySection>
  )
}
