import { useContext } from 'react'
import { PropertyCompareContext } from '../context/propertyCompareContextValue'

export const usePropertyCompare = () => {
  const context = useContext(PropertyCompareContext)

  if (!context) {
    throw new Error('usePropertyCompare must be used within PropertyCompareProvider')
  }

  return context
}
