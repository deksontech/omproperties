import { memo } from 'react'
import { MessageCircle, Phone } from 'lucide-react'
import { getPhoneHref, getWhatsAppHref } from '../../constants/contact'

export const CTAButtons = memo(function CTAButtons({ subject }) {
  return (
    <div className="cta-stack">
      <a className="button primary" href={getPhoneHref()}>
        <Phone size={18} /> Call Now
      </a>
      <a className="button whatsapp" href={getWhatsAppHref(subject)} target="_blank" rel="noreferrer">
        <MessageCircle size={18} /> WhatsApp
      </a>
    </div>
  )
})
