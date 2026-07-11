import { memo } from 'react'
import { PropertyCard } from './PropertyCard'

export const PropertyGrid = memo(function PropertyGrid({ properties }) {
  return (
    <div className="property-grid">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  )
})
