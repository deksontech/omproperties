import { useCallback, useEffect, useMemo, useState } from 'react'
import { savedPropertyService } from '../services/savedPropertyService'
import { SavedPropertiesContext } from './savedPropertiesContextValue'

export function SavedPropertiesProvider({ children }) {
  const [savedIds, setSavedIds] = useState([])

  const refreshSaved = useCallback(() => {
    savedPropertyService.getSavedIds().then(setSavedIds)
  }, [])

  useEffect(() => {
    refreshSaved()
  }, [refreshSaved])

  const toggleSaved = useCallback((propertyId) => {
    savedPropertyService.toggleSavedProperty(propertyId).then(setSavedIds)
  }, [])

  const removeSaved = useCallback((propertyId) => {
    savedPropertyService.removeSavedProperty(propertyId).then(setSavedIds)
  }, [])

  const clearSaved = useCallback(() => {
    savedPropertyService.clearSavedProperties().then(setSavedIds)
  }, [])

  const value = useMemo(
    () => ({
      clearSaved,
      isSaved: (propertyId) => savedIds.includes(propertyId),
      removeSaved,
      savedCount: savedIds.length,
      savedIds,
      toggleSaved,
    }),
    [clearSaved, removeSaved, savedIds, toggleSaved],
  )

  return <SavedPropertiesContext.Provider value={value}>{children}</SavedPropertiesContext.Provider>
}
