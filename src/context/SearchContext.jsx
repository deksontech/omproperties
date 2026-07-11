import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  createInitialPropertyFilters,
  createPropertySearchQuery,
  filterProperties,
} from '../utils/propertyFilters'
import { SearchContext } from './searchContextValue'

export function SearchProvider({ children }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [filters, setFilters] = useState(() => createInitialPropertyFilters(location.search))

  useEffect(() => {
    setFilters(createInitialPropertyFilters(location.search))
  }, [location.search])

  const resetFilters = useCallback(() => {
    setFilters(createInitialPropertyFilters())
    if (location.pathname === '/properties') {
      navigate('/properties')
    }
  }, [location.pathname, navigate])

  const applyFilters = useCallback(
    (nextFilters) => {
      setFilters(nextFilters)
      if (location.pathname === '/properties') {
        const query = createPropertySearchQuery(nextFilters)
        navigate(query ? `/properties?${query}` : '/properties')
      }
    },
    [location.pathname, navigate],
  )

  const updateFilter = useCallback(
    (name, value) => {
      setFilters((current) => {
        const nextFilters = { ...current, [name]: value }

        if (location.pathname === '/properties') {
          const query = createPropertySearchQuery(nextFilters)
          navigate(query ? `/properties?${query}` : '/properties')
        }

        return nextFilters
      })
    },
    [location.pathname, navigate],
  )

  const getFilteredProperties = useCallback(
    (properties) => filterProperties(properties, filters),
    [filters],
  )

  const value = useMemo(
    () => ({
      filters,
      applyFilters,
      setFilters,
      updateFilter,
      resetFilters,
      getFilteredProperties,
    }),
    [applyFilters, filters, getFilteredProperties, resetFilters, updateFilter],
  )

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
}
