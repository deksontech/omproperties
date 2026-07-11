import { APP_CONFIG } from './appConfig'

export const CONTACT_EMAIL = APP_CONFIG.contactEmail
export const PHONE_NUMBER = APP_CONFIG.contactPhone
export const WHATSAPP_NUMBER = APP_CONFIG.whatsappNumber

export const getPhoneHref = () => `tel:${PHONE_NUMBER.replaceAll(' ', '')}`

export const getWhatsAppHref = (subject) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=I%20am%20interested%20in%20${encodeURIComponent(subject)}`
