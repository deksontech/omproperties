import { enquiries } from '../constants/mockData'
import { CONTACT_SUBMISSIONS } from '../constants/pageContent'
import { STORAGE_KEYS } from '../constants/storageKeys'
import { safeStorage } from '../utils/safeStorage'
import { mockApi } from './mockApi'

export const LEAD_STATUSES = ['New', 'Contacted', 'Site Visit Scheduled', 'Closed', 'Lost']

const readLeadsFromStorage = () => safeStorage.get(STORAGE_KEYS.leads, [])

const writeLeadsToStorage = (leads) => {
  safeStorage.set(STORAGE_KEYS.leads, leads)
}

const createLeadRecord = (lead) => ({
  id: crypto.randomUUID(),
  name: lead.name.trim(),
  phone: lead.phone.trim(),
  email: lead.email.trim(),
  message: lead.message.trim(),
  propertyName: lead.propertyName || '',
  serviceName: lead.serviceName || '',
  preferredDate: lead.preferredDate || '',
  preferredTime: lead.preferredTime || '',
  visitors: lead.visitors || '',
  source: lead.source || 'Website',
  sourcePage: lead.sourcePage || window.location.pathname,
  status: 'New',
  createdAt: new Date().toISOString(),
})

export const leadService = {
  getLeads: () => mockApi(readLeadsFromStorage()),

  createLead: (lead) => {
    const nextLead = createLeadRecord(lead)
    const leads = [nextLead, ...readLeadsFromStorage()]
    writeLeadsToStorage(leads)
    return mockApi(nextLead)
  },

  updateLeadStatus: (leadId, status) => {
    const leads = readLeadsFromStorage().map((lead) =>
      lead.id === leadId ? { ...lead, status } : lead,
    )
    writeLeadsToStorage(leads)
    return mockApi(leads)
  },

  deleteLead: (leadId) => {
    const leads = readLeadsFromStorage().filter((lead) => lead.id !== leadId)
    writeLeadsToStorage(leads)
    return mockApi(leads)
  },

  getEnquiries: () => mockApi(enquiries),
  getContactSubmissions: () => mockApi(CONTACT_SUBMISSIONS),
}
