import { PropertyCard } from './PropertyCard'

export function PropertyRail({ title, eyebrow = 'Properties', properties }) {
  if (!properties.length) {
    return null
  }

  return (
    <section className="property-rail">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
        </div>
      </div>
      <div className="property-grid">
        {properties.slice(0, 3).map((property) => (
          <PropertyCard property={property} key={property.id} compact />
        ))}
      </div>
    </section>
  )
}
