import { MessageCircle, Phone } from 'lucide-react'
import { SiteVisitButton } from '../../../components/public/SiteVisitButton'
import { getPhoneHref, getWhatsAppHref } from '../../../constants/contact'
import { homeImages } from '../homeContent'

export function FinalCTA() {
  return (
    <section className="luxury-final-cta">
      <img src={homeImages.finalCta} alt="" />
      <div>
        <p className="luxury-kicker">Begin With Confidence</p>
        <h2>Let's Find Your Dream Property</h2>
        <div className="luxury-actions">
          <a className="luxury-button luxury-button--gold" href={getPhoneHref()}>
            <Phone size={18} /> Call Now
          </a>
          <a className="luxury-button luxury-button--glass" href={getWhatsAppHref('OMProperties consultation')} target="_blank" rel="noreferrer">
            <MessageCircle size={18} /> WhatsApp
          </a>
          <SiteVisitButton className="luxury-button luxury-button--glass" label="Schedule Site Visit" />
        </div>
      </div>
    </section>
  )
}
