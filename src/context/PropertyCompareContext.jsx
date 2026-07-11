import { useCallback, useEffect, useMemo, useState } from 'react'
import { propertyCompareService } from '../services/propertyCompareService'
import { PropertyCompareContext } from './propertyCompareContextValue'

export function PropertyCompareProvider({ children }) {
  const [compareIds, setCompareIds] = useState([])
  const [message, setMessage] = useState('')

  const refreshCompare = useCallback(() => {
    propertyCompareService.getCompareIds().then(setCompareIds)
  }, [])

  useEffect(() => {
    refreshCompare()
  }, [refreshCompare])

  const applyResult = useCallback((result, successMessage = '') => {
    setCompareIds(result.ids)
    setMessage(result.limited ? 'You can compare up to 3 properties at a time.' : successMessage)
  }, [])

  const toggleCompare = useCallback((propertyId) => {
    propertyCompareService.toggleProperty(propertyId).then((result) => {
      applyResult(result, result.ids.includes(propertyId) ? 'Added to comparison.' : 'Removed from comparison.')
    })
  }, [applyResult])

  const removeCompare = useCallback((propertyId) => {
    propertyCompareService.removeProperty(propertyId).then((result) => applyResult(result, 'Removed from comparison.'))
  }, [applyResult])

  const clearCompare = useCallback(() => {
    propertyCompareService.clearProperties().then((result) => applyResult(result, 'Comparison cleared.'))
  }, [applyResult])

  const dismissMessage = useCallback(() => setMessage(''), [])

  const value = useMemo(
    () => ({
      clearCompare,
      compareCount: compareIds.length,
      compareIds,
      dismissMessage,
      isCompared: (propertyId) => compareIds.includes(propertyId),
      message,
      removeCompare,
      toggleCompare,
    }),
    [clearCompare, compareIds, dismissMessage, message, removeCompare, toggleCompare],
  )

  return <PropertyCompareContext.Provider value={value}>{children}</PropertyCompareContext.Provider>
}
