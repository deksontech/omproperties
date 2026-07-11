import { STORAGE_KEYS } from '../constants/storageKeys'
import { safeStorage } from '../utils/safeStorage'
import { mockApi } from './mockApi'

export const MAX_COMPARE_PROPERTIES = 3

const readCompareIds = () => safeStorage.get(STORAGE_KEYS.propertyCompare, [])

const writeCompareIds = (ids) => {
  safeStorage.set(STORAGE_KEYS.propertyCompare, ids.slice(0, MAX_COMPARE_PROPERTIES))
}

export const propertyCompareService = {
  getCompareIds: () => mockApi(readCompareIds()),

  addProperty: (propertyId) => {
    const ids = readCompareIds()

    if (ids.includes(propertyId)) {
      return mockApi({ ids, limited: false })
    }

    if (ids.length >= MAX_COMPARE_PROPERTIES) {
      return mockApi({ ids, limited: true })
    }

    const nextIds = [...ids, propertyId]
    writeCompareIds(nextIds)
    return mockApi({ ids: nextIds, limited: false })
  },

  removeProperty: (propertyId) => {
    const nextIds = readCompareIds().filter((id) => id !== propertyId)
    writeCompareIds(nextIds)
    return mockApi({ ids: nextIds, limited: false })
  },

  toggleProperty: (propertyId) => {
    const ids = readCompareIds()
    return ids.includes(propertyId)
      ? propertyCompareService.removeProperty(propertyId)
      : propertyCompareService.addProperty(propertyId)
  },

  clearProperties: () => {
    writeCompareIds([])
    return mockApi({ ids: [], limited: false })
  },
}
