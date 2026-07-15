import { ArrowRight, CalendarClock, IndianRupee, MapPin, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { STORAGE_KEYS } from '../../constants/storageKeys'
import { useSiteVisit } from '../../context/SiteVisitContext'
import { safeStorage } from '../../utils/safeStorage'

const propertySlug = 'nh48-premium-plotted-development-prelaunch'
const propertyTitle = 'NH-48 Premium Plotted Development'

export function PrelaunchPlotPopup() {
  const { pathname } = useLocation()
  const { openSiteVisit } = useSiteVisit()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const isDismissed = safeStorage.get(STORAGE_KEYS.prelaunchPopupDismissed, false)
    const isCurrentProperty = pathname === `/property/${propertySlug}`

    if (isDismissed || isCurrentProperty) {
      return
    }

    const timer = window.setTimeout(() => setIsVisible(true), 1200)
    return () => window.clearTimeout(timer)
  }, [pathname])

  const dismissPopup = () => {
    safeStorage.set(STORAGE_KEYS.prelaunchPopupDismissed, true)
    setIsVisible(false)
  }

  const enquireNow = () => {
    dismissPopup()
    openSiteVisit({
      propertyName: propertyTitle,
      sourcePage: pathname,
    })
  }

  if (!isVisible) {
    return null
  }

  return (
    <div className="prelaunch-popup-backdrop" role="presentation">
      <section className="prelaunch-popup" role="dialog" aria-modal="true" aria-labelledby="prelaunch-popup-title">
        <button className="prelaunch-popup__close" type="button" aria-label="Close pre-launch popup" onClick={dismissPopup}>
          <X size={18} />
        </button>

        <div className="prelaunch-popup__media">
          <img
            src="/properties/nh48-premium-plotted-development/prelaunch-offer.jpeg"
            alt="Premium plotted development on NH-48 now open for booking"
          />
        </div>

        <div className="prelaunch-popup__content">
          <p className="eyebrow">Pre-launch Booking Open</p>
          <h2 id="prelaunch-popup-title">Premium plots bang on NH-48</h2>
          <p>
            Price revising on 19 July. Approx. 50 acres, 400 premium plots, gated society planning, and
            first-come first-allotment sequence.
          </p>

          <div className="prelaunch-popup__facts">
            <span><MapPin size={15} /> Delhi-Jaipur Highway</span>
            <span><IndianRupee size={15} /> Rs 37,900 / sq. yd.</span>
            <span><CalendarClock size={15} /> Possession in approx. 8 months</span>
          </div>

          <div className="prelaunch-popup__actions">
            <Link className="public-button primary" to={`/property/${propertySlug}`} onClick={dismissPopup}>
              View Details <ArrowRight size={17} />
            </Link>
            <button className="public-button secondary" type="button" onClick={enquireNow}>
              Enquire Now
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
