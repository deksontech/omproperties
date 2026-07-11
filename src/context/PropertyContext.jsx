import { useCallback, useEffect, useMemo, useState } from 'react'
import { properties as propertySeed } from '../constants/mockData'
import { propertyService } from '../services/propertyService'
import { PropertyContext } from './propertyContextValue'

export function PropertyProvider({ children }) {
  const [properties, setProperties] = useState(propertySeed)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const refreshProperties = useCallback(() => {
    setLoading(true)
    setError('')
    propertyService
      .getProperties()
      .then(setProperties)
      .catch(() => setError('Unable to load properties right now.'))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    refreshProperties()
  }, [refreshProperties])

  const toggleFeatured = useCallback((propertyId) => {
    propertyService.toggleFeaturedProperty(propertyId).then(refreshProperties)
  }, [refreshProperties])

  const addProperty = useCallback((property) => {
    propertyService.createProperty(property).then(refreshProperties)
  }, [refreshProperties])

  const updateProperty = useCallback((propertyId, property) => {
    propertyService.updateProperty(propertyId, property).then(refreshProperties)
  }, [refreshProperties])

  const deleteProperty = useCallback((propertyId) => {
    propertyService.deleteProperty(propertyId).then(refreshProperties)
  }, [refreshProperties])

  const value = useMemo(
    () => ({
      properties,
      featuredProperties: properties.filter((property) => property.featured),
      error,
      loading,
      addProperty,
      deleteProperty,
      refreshProperties,
      toggleFeatured,
      updateProperty,
    }),
    [addProperty, deleteProperty, error, loading, properties, refreshProperties, toggleFeatured, updateProperty],
  )

  return <PropertyContext.Provider value={value}>{children}</PropertyContext.Provider>
}
