import { properties as seedProperties } from '../constants/mockData'
import { STORAGE_KEYS } from '../constants/storageKeys'
import { safeStorage } from '../utils/safeStorage'
import { mockApi } from './mockApi'

export const PROPERTY_STATUSES = ['Available', 'Sold', 'Rented', 'Leased']

const REMOVED_PROPERTY_SLUGS = new Set([
  'golden-arc-residences',
  'elysian-villa-estate',
  'signature-retail-bay',
  'sector-83-investment-plot',
  'oakline-family-house',
  'nh8-commercial-land',
  [['con', 'fidential'].join(''), 'nh48', 'premium', 'plotted', 'development'].join('-'),
])

const normalizeProperty = (property) => ({
  ...property,
  status: property.status || 'Available',
  featured: Boolean(property.featured),
  bedrooms: Number(property.bedrooms) || 0,
  bathrooms: Number(property.bathrooms) || 0,
  area: Number(property.area) || 0,
  budget: Number(property.budget) || Number(String(property.price || '').replace(/[^0-9]/g, '')) || 0,
  amenities: Array.isArray(property.amenities) ? property.amenities : [],
  images: Array.isArray(property.images) ? property.images : [],
  nearbyPlaces: Array.isArray(property.nearbyPlaces) ? property.nearbyPlaces : [],
  verified: property.verified ?? true,
})

const readStoredProperties = () => safeStorage.get(STORAGE_KEYS.properties, [])

const writeStoredProperties = (properties) => {
  safeStorage.set(STORAGE_KEYS.properties, properties.map(normalizeProperty))
}

const mergeSeedUpdates = (storedProperties) =>
  storedProperties.map((storedProperty) => {
    const seedProperty = seedProperties.find((property) => property.slug === storedProperty.slug)

    if (storedProperty.slug === 'rosewood-by-trimont' && seedProperty && !storedProperty.longDescription) {
      return normalizeProperty({ ...storedProperty, ...seedProperty, id: storedProperty.id })
    }

    if (
      storedProperty.slug === 'greenwood-city-bhiwadi-tijara-highway' &&
      seedProperty &&
      storedProperty.images?.includes('/properties/greenwood-city/payment-plan.jpeg')
    ) {
      return normalizeProperty({ ...storedProperty, ...seedProperty, id: storedProperty.id })
    }

    return normalizeProperty(storedProperty)
  })

const ensureSeededProperties = () => {
  const storedProperties = readStoredProperties().filter(
    (property) => !REMOVED_PROPERTY_SLUGS.has(property.slug),
  )

  if (storedProperties.length > 0) {
    const storedSlugs = new Set(storedProperties.map((property) => property.slug))
    const missingSeedProperties = seedProperties.filter((property) => !storedSlugs.has(property.slug))

    if (missingSeedProperties.length > 0) {
      const mergedProperties = mergeSeedUpdates([...missingSeedProperties, ...storedProperties])
      writeStoredProperties(mergedProperties)
      return mergedProperties
    }

    const updatedProperties = mergeSeedUpdates(storedProperties)
    writeStoredProperties(updatedProperties)
    return updatedProperties
  }

  const seededProperties = seedProperties.map(normalizeProperty)
  writeStoredProperties(seededProperties)
  return seededProperties
}

const createPropertyRecord = (property) =>
  normalizeProperty({
    ...property,
    id: crypto.randomUUID(),
    featured: Boolean(property.featured),
    status: property.status || 'Available',
  })

export const propertyService = {
  getProperties: () => mockApi(ensureSeededProperties()),

  getFeaturedProperties: () =>
    mockApi(ensureSeededProperties().filter((property) => property.featured)),

  getPropertyBySlug: (slug) =>
    mockApi(ensureSeededProperties().find((property) => property.slug === slug)),

  createProperty: (property) => {
    const nextProperty = createPropertyRecord(property)
    const properties = [nextProperty, ...ensureSeededProperties()]
    writeStoredProperties(properties)
    return mockApi(nextProperty)
  },

  updateProperty: (propertyId, property) => {
    const properties = ensureSeededProperties().map((item) =>
      item.id === propertyId ? normalizeProperty({ ...item, ...property, id: propertyId }) : item,
    )
    writeStoredProperties(properties)
    return mockApi(properties.find((item) => item.id === propertyId))
  },

  deleteProperty: (propertyId) => {
    const properties = ensureSeededProperties().filter((property) => property.id !== propertyId)
    writeStoredProperties(properties)
    return mockApi(properties)
  },

  toggleFeaturedProperty: (propertyId) => {
    const properties = ensureSeededProperties().map((property) =>
      property.id === propertyId ? { ...property, featured: !property.featured } : property,
    )
    writeStoredProperties(properties)
    return mockApi(properties.find((property) => property.id === propertyId))
  },
}
