const PROPERTY_TYPE_ALIASES = {
  flat: 'Flats',
  flats: 'Flats',
  independenthouse: 'Independent Houses',
  independenthouses: 'Independent Houses',
  house: 'Independent Houses',
  houses: 'Independent Houses',
  villa: 'Villas',
  villas: 'Villas',
  plot: 'Plots',
  plots: 'Plots',
  commercialproperty: 'Commercial Properties',
  commercialproperties: 'Commercial Properties',
  commercialland: 'Commercial Lands',
  commerciallands: 'Commercial Lands',
}

const PURPOSE_ALIASES = {
  buy: 'Buy',
  sell: 'Sell',
  rent: 'Rent',
  lease: 'Lease',
}

const CATEGORY_ALIASES = {
  residential: 'Residential',
  commercial: 'Commercial',
}

const normalizeToken = (value = '') => value.toLowerCase().replace(/[^a-z0-9]/g, '')

const normalizeNumber = (value = '') => {
  const digits = String(value).replace(/[^0-9]/g, '')
  return digits || ''
}

export const normalizePurpose = (value = '') => PURPOSE_ALIASES[normalizeToken(value)] || ''

export const normalizePropertyType = (value = '') => PROPERTY_TYPE_ALIASES[normalizeToken(value)] || ''

export const normalizeCategory = (value = '') => CATEGORY_ALIASES[normalizeToken(value)] || ''

export const createInitialPropertyFilters = (search = '') => {
  const params = new URLSearchParams(search)

  return {
    purpose: normalizePurpose(params.get('purpose') || ''),
    type: normalizePropertyType(params.get('type') || ''),
    location: params.get('location') || '',
    budget: normalizeNumber(params.get('budget') || ''),
    bedrooms: normalizeNumber(params.get('bedrooms') || ''),
    area: normalizeNumber(params.get('area') || ''),
    category: normalizeCategory(params.get('category') || ''),
  }
}

export const createPropertySearchQuery = (filters) => {
  const params = new URLSearchParams()

  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      params.set(key, String(value).trim().toLowerCase())
    }
  })

  return params.toString()
}

export const filterProperties = (properties, filters) =>
  properties.filter((property) => {
    const matchesPurpose = !filters.purpose || normalizePurpose(property.purpose) === filters.purpose
    const matchesType = !filters.type || normalizePropertyType(property.type) === filters.type
    const matchesLocation =
      !filters.location || property.location.toLowerCase().includes(filters.location.toLowerCase())
    const matchesBudget = !filters.budget || property.budget <= Number(filters.budget)
    const matchesBedrooms = !filters.bedrooms || property.bedrooms >= Number(filters.bedrooms)
    const matchesArea = !filters.area || property.area >= Number(filters.area)
    const matchesCategory = !filters.category || normalizeCategory(property.category) === filters.category

    return (
      matchesPurpose &&
      matchesType &&
      matchesLocation &&
      matchesBudget &&
      matchesBedrooms &&
      matchesArea &&
      matchesCategory
    )
  })
