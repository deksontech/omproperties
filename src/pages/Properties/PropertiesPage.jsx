import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import { EmptyState } from '../../components/public/EmptyState'
import { FAQSection } from '../../components/public/FAQSection'
import { PageHero } from '../../components/public/PageHero'
import { SiteVisitButton } from '../../components/public/SiteVisitButton'
import { SkeletonGrid } from '../../components/public/SkeletonGrid'
import { TrustBadges } from '../../components/public/TrustBadges'
import { PropertyFilters } from '../../components/property/PropertyFilters'
import { PropertyGrid } from '../../components/property/PropertyGrid'
import { PROPERTIES_HERO_IMAGE } from '../../constants/pageContent'
import { AREA_OPTIONS, BEDROOM_OPTIONS, BUDGET_OPTIONS } from '../../constants/propertyOptions'
import { propertyFaqs } from '../../constants/publicContent'
import { SEO } from '../../constants/seo'
import { useProperties } from '../../hooks/useProperties'
import { useSearch } from '../../hooks/useSearch'
import { useSeo } from '../../hooks/useSeo'

const getPropertyViewContent = (filters) => {
  if (filters.type === 'Villas') {
    return {
      eyebrow: 'Villas',
      title: 'Explore premium villas',
      subtitle: 'Private villa residences with space, privacy, verified assistance, and guided site visits.',
    }
  }

  if (filters.category === 'Commercial') {
    return {
      eyebrow: 'Commercial Properties',
      title: 'Commercial property opportunities',
      subtitle: 'Browse commercial spaces and land parcels for business, leasing, and long-term investment.',
    }
  }

  if (filters.purpose === 'Rent') {
    return {
      eyebrow: 'Rentals',
      title: 'Rental homes and commercial spaces',
      subtitle: 'Find ready-to-occupy rental options with transparent advisory and visit coordination.',
    }
  }

  if (filters.purpose === 'Buy') {
    return {
      eyebrow: 'Buy Property',
      title: 'Buy verified residential and commercial properties',
      subtitle: 'Shortlist premium opportunities with documentation, loan, and site visit support.',
    }
  }

  return {
    eyebrow: 'Property Listings',
    title: 'Find the right property faster',
    subtitle: 'Browse premium residential and commercial opportunities with advisory support from search to registration.',
  }
}

const getOptionLabel = (options, value) => options.find((option) => option.value === value)?.label || value

const getActiveFilterLabels = (filters) => {
  const labels = []

  if (filters.purpose) labels.push(`Purpose: ${filters.purpose}`)
  if (filters.type) labels.push(`Property Type: ${filters.type}`)
  if (filters.location) labels.push(`Location: ${filters.location}`)
  if (filters.budget) labels.push(`Budget: ${getOptionLabel(BUDGET_OPTIONS, filters.budget)}`)
  if (filters.bedrooms) labels.push(`Bedrooms: ${getOptionLabel(BEDROOM_OPTIONS, filters.bedrooms)}`)
  if (filters.area) labels.push(`Area: ${getOptionLabel(AREA_OPTIONS, filters.area)}`)
  if (filters.category) labels.push(`Category: ${filters.category}`)

  return labels
}

export function PropertiesPage() {
  const { error, loading, properties } = useProperties()
  const { applyFilters, filters, getFilteredProperties, resetFilters, updateFilter } = useSearch()
  const filteredProperties = useMemo(
    () => getFilteredProperties(properties),
    [getFilteredProperties, properties],
  )
  const viewContent = useMemo(() => getPropertyViewContent(filters), [filters])
  const activeFilterLabels = useMemo(() => getActiveFilterLabels(filters), [filters])

  useSeo(SEO.properties)

  return (
    <div className="public-page">
      <PageHero
        eyebrow={viewContent.eyebrow}
        title={viewContent.title}
        subtitle={viewContent.subtitle}
        image={PROPERTIES_HERO_IMAGE}
      />
      <section className="section compact">
        <TrustBadges compact />
        <PropertyFilters filters={filters} onFilterChange={updateFilter} onReset={resetFilters} onSearch={applyFilters} />
        <div className="result-bar">
          <div>
            <span>{filteredProperties.length} listings found</span>
            {activeFilterLabels.length > 0 && (
              <div className="active-filter-pills" aria-label="Active filters">
                {activeFilterLabels.map((label) => (
                  <span key={label}>{label}</span>
                ))}
              </div>
            )}
          </div>
          <SiteVisitButton className="public-button primary" label="Schedule Site Visit" />
        </div>
        {loading ? (
          <SkeletonGrid count={6} type="property" />
        ) : error ? (
          <EmptyState title="Unable to load properties." message={error} action={<Link className="public-button primary" to="/contact">Contact Advisor</Link>} />
        ) : filteredProperties.length > 0 ? (
          <PropertyGrid properties={filteredProperties} />
        ) : (
          <EmptyState
            title="No matching properties found."
            message="Try changing your search filters."
          />
        )}
      </section>
      <FAQSection faqs={propertyFaqs} title="Property questions, answered" />
    </div>
  )
}
