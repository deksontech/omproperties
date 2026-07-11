import { useCallback, useEffect, useMemo, useState } from 'react'
import { recentlyViewedService } from '../services/recentlyViewedService'

export function useRecentlyViewed(properties = [], excludeId = '') {
  const [recentIds, setRecentIds] = useState([])

  const refreshRecent = useCallback(() => {
    recentlyViewedService.getRecentIds().then(setRecentIds)
  }, [])

  useEffect(() => {
    refreshRecent()
  }, [refreshRecent])

  const addRecentlyViewed = useCallback((propertyId) => {
    recentlyViewedService.addRecentlyViewed(propertyId).then(setRecentIds)
  }, [])

  const recentProperties = useMemo(
    () =>
      recentIds
        .filter((id) => id !== excludeId)
        .map((id) => properties.find((property) => property.id === id))
        .filter(Boolean),
    [excludeId, properties, recentIds],
  )

  return { addRecentlyViewed, recentIds, recentProperties, refreshRecent }
}
