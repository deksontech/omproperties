import { STORAGE_KEYS } from '../constants/storageKeys'
import { safeStorage } from '../utils/safeStorage'
import { mockApi } from './mockApi'

const readSavedIds = () => safeStorage.get(STORAGE_KEYS.savedProperties, [])

const writeSavedIds = (ids) => {
  safeStorage.set(STORAGE_KEYS.savedProperties, [...new Set(ids)])
}

export const savedPropertyService = {
  getSavedIds: () => mockApi(readSavedIds()),

  saveProperty: (propertyId) => {
    const ids = readSavedIds()
    const nextIds = ids.includes(propertyId) ? ids : [propertyId, ...ids]
    writeSavedIds(nextIds)
    return mockApi(nextIds)
  },

  removeSavedProperty: (propertyId) => {
    const nextIds = readSavedIds().filter((id) => id !== propertyId)
    writeSavedIds(nextIds)
    return mockApi(nextIds)
  },

  toggleSavedProperty: (propertyId) => {
    const ids = readSavedIds()
    const nextIds = ids.includes(propertyId)
      ? ids.filter((id) => id !== propertyId)
      : [propertyId, ...ids]
    writeSavedIds(nextIds)
    return mockApi(nextIds)
  },

  clearSavedProperties: () => {
    writeSavedIds([])
    return mockApi([])
  },
}
