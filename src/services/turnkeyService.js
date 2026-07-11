import { turnkeyServices as seedServices } from '../constants/mockData'
import { STORAGE_KEYS } from '../constants/storageKeys'
import { safeStorage } from '../utils/safeStorage'
import { mockApi } from './mockApi'

export const TURNKEY_CATEGORIES = ['Electrical', 'Interior', 'Exterior', 'Carpenter']
export const TURNKEY_STATUSES = ['Active', 'Inactive']

const normalizeService = (service) => {
  const gallery = Array.isArray(service.gallery) ? service.gallery : []
  const hero = service.hero || gallery[0] || ''

  return {
    ...service,
    category: service.category || service.title || 'Interior',
    featured: Boolean(service.featured),
    status: service.status || 'Active',
    summary: service.summary || '',
    description: service.description || '',
    hero,
    gallery: gallery.length ? gallery : hero ? [hero] : [],
    features: Array.isArray(service.features) ? service.features : [],
  }
}

const readStoredServices = () => safeStorage.get(STORAGE_KEYS.turnkeyServices, [])

const writeStoredServices = (services) => {
  safeStorage.set(STORAGE_KEYS.turnkeyServices, services.map(normalizeService))
}

const ensureSeededServices = () => {
  const storedServices = readStoredServices()

  if (storedServices.length > 0) {
    return storedServices.map(normalizeService)
  }

  const seededServices = seedServices.map((service, index) =>
    normalizeService({
      ...service,
      category: service.title,
      featured: index < 2,
      status: 'Active',
    }),
  )
  writeStoredServices(seededServices)
  return seededServices
}

const createServiceRecord = (service) =>
  normalizeService({
    ...service,
    id: crypto.randomUUID(),
  })

export const turnkeyService = {
  getServices: () => mockApi(ensureSeededServices()),

  getServiceBySlug: (slug) =>
    mockApi(ensureSeededServices().find((service) => service.slug === slug)),

  createService: (service) => {
    const nextService = createServiceRecord(service)
    const services = [nextService, ...ensureSeededServices()]
    writeStoredServices(services)
    return mockApi(nextService)
  },

  updateService: (serviceId, service) => {
    const services = ensureSeededServices().map((item) =>
      item.id === serviceId ? normalizeService({ ...item, ...service, id: serviceId }) : item,
    )
    writeStoredServices(services)
    return mockApi(services.find((serviceItem) => serviceItem.id === serviceId))
  },

  deleteService: (serviceId) => {
    const services = ensureSeededServices().filter((service) => service.id !== serviceId)
    writeStoredServices(services)
    return mockApi(services)
  },

  toggleFeaturedService: (serviceId) => {
    const services = ensureSeededServices().map((service) =>
      service.id === serviceId ? { ...service, featured: !service.featured } : service,
    )
    writeStoredServices(services)
    return mockApi(services.find((service) => service.id === serviceId))
  },
}
