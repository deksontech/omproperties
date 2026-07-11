import { useCallback, useEffect, useMemo, useState } from 'react'
import { turnkeyServices as turnkeySeed } from '../constants/mockData'
import { turnkeyService } from '../services/turnkeyService'
import { TurnkeyContext } from './turnkeyContextValue'

export function TurnkeyProvider({ children }) {
  const [services, setServices] = useState(turnkeySeed)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const refreshServices = useCallback(() => {
    setLoading(true)
    setError('')
    turnkeyService
      .getServices()
      .then(setServices)
      .catch(() => setError('Unable to load turnkey services right now.'))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    refreshServices()
  }, [refreshServices])

  const addService = useCallback((service) => {
    turnkeyService.createService(service).then(refreshServices)
  }, [refreshServices])

  const updateService = useCallback((serviceId, service) => {
    turnkeyService.updateService(serviceId, service).then(refreshServices)
  }, [refreshServices])

  const deleteService = useCallback((serviceId) => {
    turnkeyService.deleteService(serviceId).then(refreshServices)
  }, [refreshServices])

  const toggleFeaturedService = useCallback((serviceId) => {
    turnkeyService.toggleFeaturedService(serviceId).then(refreshServices)
  }, [refreshServices])

  const value = useMemo(
    () => ({
      activeServices: services.filter((service) => service.status !== 'Inactive'),
      services,
      error,
      loading,
      addService,
      deleteService,
      refreshServices,
      toggleFeaturedService,
      updateService,
    }),
    [addService, deleteService, error, loading, refreshServices, services, toggleFeaturedService, updateService],
  )

  return <TurnkeyContext.Provider value={value}>{children}</TurnkeyContext.Provider>
}
