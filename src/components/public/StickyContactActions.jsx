import { memo } from 'react'
import { CalendarCheck, MessageCircle, Phone } from 'lucide-react'
import { getPhoneHref, getWhatsAppHref } from '../../constants/contact'

export const StickyContactActions = memo(function StickyContactActions({ onSiteVisit }) {
  return (
    <div className="sticky-contact-actions" aria-label="Contact actions">
      <a href={getPhoneHref()} aria-label="Call OMProperties">
        <Phone size={18} />
        <span>Call</span>
      </a>
      <a href={getWhatsAppHref('OMProperties consultation')} target="_blank" rel="noreferrer" aria-label="WhatsApp OMProperties">
        <MessageCircle size={18} />
        <span>WhatsApp</span>
      </a>
      <button type="button" onClick={onSiteVisit} aria-label="Enquire with OMProperties">
        <CalendarCheck size={18} />
        <span>Enquire</span>
      </button>
    </div>
  )
})
