import { Link } from 'react-router-dom'
import { EmptyState } from '../../components/public/EmptyState'
import { PageHero } from '../../components/public/PageHero'
import { PROPERTIES_HERO_IMAGE } from '../../constants/pageContent'
import { useProperties } from '../../hooks/useProperties'
import { usePropertyCompare } from '../../hooks/usePropertyCompare'
import { useSeo } from '../../hooks/useSeo'
import './ComparePropertiesPage.css'

const compareRows = [
  ['Price', (property) => property.price],
  ['Purpose', (property) => property.purpose],
  ['Property Type', (property) => property.type],
  ['Category', (property) => property.category],
  ['Location', (property) => property.location],
  ['Bedrooms', (property) => property.bedrooms || 'NA'],
  ['Bathrooms', (property) => property.bathrooms || 'NA'],
  ['Area', (property) => property.size],
  ['Status', (property) => property.status || 'Available'],
  ['Verified', (property) => (property.verified ?? true ? 'Yes' : 'Assistance available')],
  ['Amenities', (property) => property.amenities?.join(', ') || 'NA'],
  ['Summary', (property) => property.description],
]

export function ComparePropertiesPage() {
  const { properties } = useProperties()
  const { clearCompare, compareIds, removeCompare } = usePropertyCompare()
  const selectedProperties = compareIds.map((id) => properties.find((property) => property.id === id)).filter(Boolean)

  useSeo({
    title: 'Compare Properties | OMProperties',
    description: 'Compare saved OMProperties listings by price, location, size, amenities, status, and enquiry actions.',
  })

  return (
    <div className="public-page compare-properties-page">
      <PageHero
        eyebrow="Compare"
        title="Compare shortlisted properties"
        subtitle="Review key details side by side before scheduling a site visit or enquiry."
        image={PROPERTIES_HERO_IMAGE}
      />
      <section className="public-section">
        {selectedProperties.length > 0 ? (
          <>
            <div className="compare-page-head">
              <p>{selectedProperties.length} properties selected</p>
              <button className="public-button secondary" type="button" onClick={clearCompare}>Clear Comparison</button>
            </div>
            <div className="compare-table-wrap">
              <table className="compare-table">
                <thead>
                  <tr>
                    <th>Field</th>
                    {selectedProperties.map((property) => (
                      <th key={property.id}>
                        <img src={property.images[0]} alt={property.title} />
                        <strong>{property.title}</strong>
                        <button type="button" onClick={() => removeCompare(property.id)}>Remove</button>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map(([label, getValue]) => (
                    <tr key={label}>
                      <td>{label}</td>
                      {selectedProperties.map((property) => (
                        <td key={`${property.id}-${label}`}>{getValue(property)}</td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td>Actions</td>
                    {selectedProperties.map((property) => (
                      <td key={`${property.id}-actions`}>
                        <Link className="public-button primary" to={`/property/${property.slug}`}>View Details</Link>
                        <Link className="public-button secondary" to={`/property/${property.slug}#property-enquiry`}>Enquire</Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <EmptyState
            title="No properties selected for comparison."
            message="Add up to 3 properties from listing cards or property detail pages."
            action={<Link className="public-button primary" to="/properties">Browse Properties</Link>}
          />
        )}
      </section>
    </div>
  )
}
