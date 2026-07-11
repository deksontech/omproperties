import { STORAGE_KEYS } from '../constants/storageKeys'
import { safeStorage } from '../utils/safeStorage'
import { mockApi } from './mockApi'

const MAX_RECENT_PROPERTIES = 8

const readRecentIds = () => safeStorage.get(STORAGE_KEYS.recentlyViewedProperties, [])

const writeRecentIds = (ids) => {
  safeStorage.set(STORAGE_KEYS.recentlyViewedProperties, ids.slice(0, MAX_RECENT_PROPERTIES))
}

export const recentlyViewedService = {
  getRecentIds: () => mockApi(readRecentIds()),

  addRecentlyViewed: (propertyId) => {
    const nextIds = [propertyId, ...readRecentIds().filter((id) => id !== propertyId)].slice(0, MAX_RECENT_PROPERTIES)
    writeRecentIds(nextIds)
    return mockApi(nextIds)
  },

  clearRecentlyViewed: () => {
    writeRecentIds([])
    return mockApi([])
  },
}
