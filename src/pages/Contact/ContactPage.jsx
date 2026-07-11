import { ArrowUpRight, Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { ContactForm } from '../../components/common/ContactForm'
import { CTASection } from '../../components/public/CTASection'
import { FAQSection } from '../../components/public/FAQSection'
import { PageHero } from '../../components/public/PageHero'
import { PremiumCard } from '../../components/public/PremiumCard'
import { SectionHeader } from '../../components/public/SectionHeader'
import { TrustBadges } from '../../components/public/TrustBadges'
import { APP_CONFIG } from '../../constants/appConfig'
import { CONTACT_EMAIL, PHONE_NUMBER, getPhoneHref, getWhatsAppHref } from '../../constants/contact'
import { TURNKEY_HERO_IMAGE } from '../../constants/pageContent'
import { contactFaqs } from '../../constants/publicContent'
import { SEO } from '../../constants/seo'
import { useSeo } from '../../hooks/useSeo'

const contactCards = [
  ['Call', PHONE_NUMBER, Phone, getPhoneHref()],
  ['Email', CONTACT_EMAIL, Mail, `mailto:${CONTACT_EMAIL}`],
  ['Location', 'Tapukara, Bhiwadi, Rajasthan', MapPin, APP_CONFIG.googleMapLink],
]

export function ContactPage() {
  useSeo(SEO.contact)

  return (
    <div className="public-page contact-page">
      <PageHero
        eyebrow="Contact"
        title="Speak with OMProperties"
        subtitle="Tell us what you need and our advisory team will help with property options, site visits, and turnkey project planning."
        image={TURNKEY_HERO_IMAGE}
      />
      <section className="public-section">
        <TrustBadges compact />
        <SectionHeader
          eyebrow="Reach Us"
          title="Start a conversation"
          subtitle="Use the form or connect directly for faster property and project guidance."
        />
        <div className="public-contact-grid">
          {contactCards.map(([title, text, Icon, href]) => (
            <PremiumCard as="a" className="contact-info-card" key={title} href={href} target={title === 'Location' ? '_blank' : undefined} rel={title === 'Location' ? 'noreferrer' : undefined}>
              <Icon size={26} color="#c9a227" />
              <span>{title}</span>
              <p>{text}</p>
              <ArrowUpRight size={18} />
            </PremiumCard>
          ))}
        </div>
      </section>

      <section className="public-section contact-enquiry-section">
        <div className="contact-command-panel">
          <div className="contact-form-column">
            <p className="eyebrow">Enquiry</p>
            <h2>Send your requirement</h2>
            <p>
              Share your property or turnkey requirement. OMProperties will help with shortlisting, site visits,
              documentation guidance, and project execution planning.
            </p>
            <ContactForm />
          </div>

          <aside className="contact-office-column">
            <div className="contact-office-card">
              <p className="eyebrow">Visit Office</p>
              <h3>OMProperties, Tapukara</h3>
              <p>{APP_CONFIG.officeAddress}</p>
              <div className="contact-office-meta">
                <span>
                  <Clock size={17} /> Mon-Sat, 10 AM-7 PM
                </span>
                <span>
                  <MapPin size={17} /> Site visits by appointment
                </span>
              </div>
              <div className="public-cta-actions">
                <a className="public-button primary" href={getPhoneHref()}>
                  <Phone size={18} /> Call Now
                </a>
                <a className="public-button secondary" href={getWhatsAppHref('OMProperties consultation')} target="_blank" rel="noreferrer">
                  <MessageCircle size={18} /> WhatsApp
                </a>
              </div>
            </div>

            <div className="contact-map-card">
              <iframe
                src={APP_CONFIG.googleMapUrl}
                title="OMProperties map"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
              <a className="public-map-link" href={APP_CONFIG.googleMapLink} target="_blank" rel="noreferrer">
                Open in Google Maps <ArrowUpRight size={16} />
              </a>
            </div>
          </aside>
        </div>
      </section>

      <FAQSection faqs={contactFaqs} title="Contact and enquiry questions" />

      <CTASection
        eyebrow="Immediate Support"
        title="Prefer to speak directly?"
        text="Call or WhatsApp OMProperties for property shortlisting, leasing guidance, or turnkey project consultation."
        image={TURNKEY_HERO_IMAGE}
      >
        <a className="public-button primary" href={getPhoneHref()}>
          <Phone size={18} /> Call Now
        </a>
        <a className="public-button secondary" href={getWhatsAppHref('OMProperties consultation')} target="_blank" rel="noreferrer">
          <MessageCircle size={18} /> WhatsApp
        </a>
      </CTASection>
    </div>
  )
}
